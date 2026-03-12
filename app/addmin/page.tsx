'use client';

import { useState, useEffect, useCallback } from 'react';

// ── Types ─────────────────────────────────────────────────────────────────────
interface AdminUser {
    registrationId: string;
    name: string;
    email: string;
    phone: string;
    college: string;
    gender: string;
    emailVerified: boolean;
    paymentVerified: boolean;
    paymentStatus: 'pending' | 'approved' | 'rejected';
    adminVerified: boolean;
    adminNote: string;
    paymentScreenshot: string;
    screenshotUrl: string | null;
    registeredAt: string;
}

interface ParticipantDetail {
    registrationId: string;
    name: string;
    email: string;
    phone: string;
    college: string;
    gender: string;
    isCaptain: boolean;
}

interface EventReg {
    _id: string;
    eventId: string;
    eventName: string;
    teamName: string;
    college: string;
    registeredBy: string;
    registeredAt: string;
    participants: ParticipantDetail[];
}

type FilterStatus = 'all' | 'pending' | 'approved' | 'rejected';
type Tab = 'participants' | 'events';

// ── Root ──────────────────────────────────────────────────────────────────────
export default function AdminPage() {
    const [authed, setAuthed] = useState(false);
    const [password, setPassword] = useState('');
    const [loginErr, setLoginErr] = useState('');
    const [logging, setLogging] = useState(false);

    useEffect(() => {
        fetch('/api/addmin/users').then((r) => { if (r.ok) setAuthed(true); }).catch(() => { });
    }, []);

    async function handleLogin(e: React.FormEvent) {
        e.preventDefault();
        setLoginErr('');
        setLogging(true);
        try {
            const res = await fetch('/api/addmin/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ password }) });
            if (!res.ok) { const d = await res.json(); setLoginErr(d.error || 'Invalid password'); return; }
            setAuthed(true);
        } finally { setLogging(false); }
    }

    if (!authed) return <LoginScreen onLogin={handleLogin} password={password} setPassword={setPassword} error={loginErr} loading={logging} />;
    return <Dashboard onLogout={() => setAuthed(false)} />;
}

// ── Login Screen ──────────────────────────────────────────────────────────────
function LoginScreen({ onLogin, password, setPassword, error, loading }: { onLogin: (e: React.FormEvent) => void; password: string; setPassword: (v: string) => void; error: string; loading: boolean; }) {
    return (
        <div style={s.loginBg}>
            <form onSubmit={onLogin} style={s.loginCard}>
                <div style={s.loginLogo}>🔐</div>
                <h1 style={s.loginTitle}>Admin Panel</h1>
                <p style={s.loginSub}>Prithvi 2026 · Internal Access Only</p>
                <input type="password" placeholder="Enter admin password" value={password} onChange={(e) => setPassword(e.target.value)} style={s.loginInput} required autoFocus />
                {error && <p style={s.loginError}>{error}</p>}
                <button type="submit" style={s.loginBtn} disabled={loading}>{loading ? 'Verifying…' : 'Login →'}</button>
                <p style={s.loginHint}>This page is not linked anywhere. Do not share its URL.</p>
            </form>
        </div>
    );
}

// ── Dashboard ─────────────────────────────────────────────────────────────────
function Dashboard({ onLogout }: { onLogout: () => void }) {
    const [tab, setTab] = useState<Tab>('participants');
    const [toast, setToast] = useState('');

    async function logout() { await fetch('/api/addmin/logout', { method: 'POST' }); onLogout(); }
    function showToast(msg: string) { setToast(msg); setTimeout(() => setToast(''), 3000); }

    return (
        <div style={s.dashBg}>
            <header style={s.header}>
                <div style={s.headerLeft}>
                    <span style={s.headerLogo}>🌍</span>
                    <div>
                        <div style={s.headerTitle}>Prithvi 2026 — Admin Panel</div>
                        <div style={s.headerSub}>Internal Management</div>
                    </div>
                </div>
                <div style={s.headerRight}>
                    <button onClick={() => setTab('participants')} style={{ ...s.tabBtn, ...(tab === 'participants' ? s.tabBtnActive : {}) }}>👥 Participants</button>
                    <button onClick={() => setTab('events')} style={{ ...s.tabBtn, ...(tab === 'events' ? s.tabBtnActive : {}) }}>🏆 Event Registrations</button>
                    <button onClick={() => window.open('/api/addmin/export', '_blank')} style={s.exportBtn}>📊 Export Excel</button>
                    <button onClick={logout} style={s.logoutBtn}>Logout</button>
                </div>
            </header>

            {tab === 'participants' ? <ParticipantsDashboard onToast={showToast} onLogout={onLogout} /> : <EventsDashboard onToast={showToast} />}
            {toast && <div style={s.toast}>{toast}</div>}
        </div>
    );
}

// ── Participants Dashboard (original functionality) ────────────────────────────
function ParticipantsDashboard({ onToast, onLogout }: { onToast: (m: string) => void; onLogout: () => void }) {
    const [users, setUsers] = useState<AdminUser[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState<FilterStatus>('all');
    const [search, setSearch] = useState('');
    const [selected, setSelected] = useState<AdminUser | null>(null);
    const [note, setNote] = useState('');
    const [saving, setSaving] = useState(false);
    const [toggling, setToggling] = useState(false);

    const loadUsers = useCallback(async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/addmin/users');
            if (res.status === 401) { onLogout(); return; }
            const data = await res.json();
            setUsers(data.users || []);
        } finally { setLoading(false); }
    }, [onLogout]);

    useEffect(() => { loadUsers(); }, [loadUsers]);

    async function handleVerify(status: 'approved' | 'rejected') {
        if (!selected) return;
        setSaving(true);
        try {
            const res = await fetch('/api/addmin/verify', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ registrationId: selected.registrationId, action: 'status', status, adminNote: note }) });
            if (!res.ok) throw new Error('Failed');
            const updated = { ...selected, paymentStatus: status, adminNote: note };
            setSelected(updated);
            setUsers((prev) => prev.map((u) => u.registrationId === updated.registrationId ? updated : u));
            onToast(status === 'approved' ? '✅ Payment approved!' : '❌ Payment rejected!');
        } catch { onToast('Error updating status'); }
        finally { setSaving(false); }
    }

    async function handleAdminVerifiedToggle(newValue: boolean) {
        if (!selected) return;
        setToggling(true);
        try {
            const res = await fetch('/api/addmin/verify', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ registrationId: selected.registrationId, action: 'toggle', adminVerified: newValue, adminNote: note }) });
            if (!res.ok) throw new Error('Failed');
            const updated = { ...selected, adminVerified: newValue, adminNote: note };
            setSelected(updated);
            setUsers((prev) => prev.map((u) => u.registrationId === updated.registrationId ? updated : u));
            onToast(newValue ? '🔓 Admin Verified!' : '🔒 Verification removed');
        } catch { onToast('Error toggling'); }
        finally { setToggling(false); }
    }

    const displayed = users.filter((u) => {
        if (filter !== 'all' && u.paymentStatus !== filter) return false;
        if (search) { const q = search.toLowerCase(); return u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q) || u.registrationId.toLowerCase().includes(q) || u.college.toLowerCase().includes(q); }
        return true;
    });
    const counts = { all: users.length, pending: users.filter(u => u.paymentStatus === 'pending').length, approved: users.filter(u => u.paymentStatus === 'approved').length, rejected: users.filter(u => u.paymentStatus === 'rejected').length };
    const verifiedCount = users.filter(u => u.adminVerified).length;

    return (
        <div style={s.dashLayout}>
            <aside style={s.sidebar}>
                <div style={{ padding: '12px 16px', color: '#32dc64', fontSize: 12, fontWeight: 600 }}>🔓 {verifiedCount} / {users.length} Admin Verified</div>
                <div style={s.statsGrid}>
                    {(['all', 'pending', 'approved', 'rejected'] as FilterStatus[]).map((st) => (
                        <button key={st} onClick={() => setFilter(st)} style={{ ...s.statCard, ...(filter === st ? s.statCardActive : {}) }}>
                            <div style={s.statNum}>{counts[st]}</div>
                            <div style={s.statLabel}>{st === 'all' ? '📋 Total' : st === 'pending' ? '⏳ Pending' : st === 'approved' ? '✅ Approved' : '❌ Rejected'}</div>
                        </button>
                    ))}
                </div>
                <input placeholder="Search…" value={search} onChange={(e) => setSearch(e.target.value)} style={s.searchInput} />
                <div style={s.userList}>
                    {loading ? <div style={s.loadingText}>Loading…</div> : displayed.length === 0 ? <div style={s.loadingText}>No results</div> :
                        displayed.map((u) => (
                            <button key={u.registrationId} onClick={() => { setSelected(u); setNote(u.adminNote || ''); }} style={{ ...s.userRow, ...(selected?.registrationId === u.registrationId ? s.userRowActive : {}) }}>
                                <div style={s.userRowTop}>
                                    <span style={s.userRowName}>{u.name}</span>
                                    <div style={{ display: 'flex', gap: 4 }}>
                                        {u.adminVerified && <span title="Admin Verified">🔓</span>}
                                        <span style={{ ...s.statusBadge, ...(u.paymentStatus === 'approved' ? s.badgeApproved : u.paymentStatus === 'rejected' ? s.badgeRejected : s.badgePending) }}>{u.paymentStatus}</span>
                                    </div>
                                </div>
                                <div style={s.userRowId}>{u.registrationId}</div>
                                <div style={s.userRowEmail}>{u.email}</div>
                                <div style={s.userRowCollege}>{u.college}</div>
                            </button>
                        ))
                    }
                </div>
            </aside>
            <main style={s.detail}>
                {!selected ? (
                    <div style={s.detailEmpty}><div style={{ fontSize: 64 }}>📋</div><p style={{ color: '#555', marginTop: 16 }}>Select a registrant to review</p></div>
                ) : (
                    <div style={s.detailCard}>
                        <div style={s.detailHeader}>
                            <div><h2 style={s.detailName}>{selected.name}</h2><div style={s.detailId}>{selected.registrationId}</div></div>
                            <span style={{ ...s.statusBadgeLg, ...(selected.paymentStatus === 'approved' ? s.badgeApproved : selected.paymentStatus === 'rejected' ? s.badgeRejected : s.badgePending) }}>{selected.paymentStatus.toUpperCase()}</span>
                        </div>
                        <div style={s.infoGrid}>
                            {[['📧 Email', selected.email], ['📞 Phone', selected.phone], ['🏫 College', selected.college], ['⚧ Gender', selected.gender], ['📅 Registered', new Date(selected.registeredAt).toLocaleString('en-IN')], ['✉️ Email verified', selected.emailVerified ? '✅ Yes' : '❌ No']].map(([label, value]) => (
                                <div key={label} style={s.infoItem}><div style={s.infoLabel}>{label}</div><div style={s.infoValue}>{value}</div></div>
                            ))}
                        </div>
                        <div style={s.screenshotSection}>
                            <h3 style={s.screenshotTitle}>💳 Payment Screenshot</h3>
                            {selected.screenshotUrl ? (
                                <div style={s.screenshotWrapper}>
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img src={selected.screenshotUrl} alt="Payment screenshot" style={s.screenshotImg} />
                                    <a href={selected.screenshotUrl} target="_blank" rel="noreferrer" style={s.screenshotLink}>Open full image ↗</a>
                                </div>
                            ) : <div style={s.screenshotMissing}>No screenshot uploaded</div>}
                        </div>
                        <div style={s.noteSection}><label style={s.noteLabel}>Admin Note</label><textarea value={note} onChange={(e) => setNote(e.target.value)} placeholder="Optional note…" style={s.noteTextarea} rows={3} /></div>
                        <div style={s.actionRow}>
                            <button onClick={() => handleVerify('approved')} disabled={saving || selected.paymentStatus === 'approved'} style={{ ...s.actionBtn, ...s.approveBtn, ...(selected.paymentStatus === 'approved' ? s.actionBtnDisabled : {}) }}>{saving ? '…' : '✅ Approve'}</button>
                            <button onClick={() => handleVerify('rejected')} disabled={saving || selected.paymentStatus === 'rejected'} style={{ ...s.actionBtn, ...s.rejectBtn, ...(selected.paymentStatus === 'rejected' ? s.actionBtnDisabled : {}) }}>{saving ? '…' : '❌ Reject'}</button>
                        </div>
                        <div style={s.toggleSection}>
                            <div style={s.toggleHeader}>
                                <div><div style={s.toggleTitle}>🔓 Admin Payment Verification</div><div style={s.toggleSubtitle}>Manually confirm the payment is genuine.</div></div>
                                <button onClick={() => handleAdminVerifiedToggle(!selected.adminVerified)} disabled={toggling} style={{ ...s.toggleSwitch, ...(selected.adminVerified ? s.toggleSwitchOn : s.toggleSwitchOff) }}>
                                    <div style={{ ...s.toggleKnob, transform: selected.adminVerified ? 'translateX(26px)' : 'translateX(2px)' }} />
                                </button>
                            </div>
                            <div style={{ ...s.toggleStatus, ...(selected.adminVerified ? s.toggleStatusOn : s.toggleStatusOff) }}>
                                {toggling ? 'Saving…' : selected.adminVerified ? '✅ Verified by admin' : '⏳ Not yet verified'}
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}

// ── Events Dashboard ──────────────────────────────────────────────────────────
function EventsDashboard({ onToast }: { onToast: (m: string) => void }) {
    const [registrations, setRegistrations] = useState<EventReg[]>([]);
    const [loading, setLoading] = useState(true);
    const [eventFilter, setEventFilter] = useState('all');
    const [search, setSearch] = useState('');
    const [modalParticipant, setModalParticipant] = useState<ParticipantDetail | null>(null);

    useEffect(() => {
        fetch('/api/addmin/event-registrations')
            .then(r => r.json())
            .then(d => { setRegistrations(d.registrations || []); })
            .catch(() => onToast('Failed to load event registrations'))
            .finally(() => setLoading(false));
    }, [onToast]);

    const eventNames = [...new Set(registrations.map(r => r.eventName))];
    const filtered = registrations.filter(r => {
        if (eventFilter !== 'all' && r.eventId !== eventFilter) return false;
        if (search) {
            const q = search.toLowerCase();
            return r.teamName.toLowerCase().includes(q) || r.college.toLowerCase().includes(q) || r.participants.some(p => p.registrationId.toLowerCase().includes(q) || p.name.toLowerCase().includes(q));
        }
        return true;
    });

    const byEvent = EVENTS_ORDER.map(ev => ({
        eventId: ev,
        eventName: filtered.find(r => r.eventId === ev)?.eventName || ev,
        teams: filtered.filter(r => r.eventId === ev),
    })).filter(g => g.teams.length > 0);

    return (
        <div style={{ padding: 28, overflowY: 'auto', height: 'calc(100vh - 65px)' }}>
            <div style={{ display: 'flex', gap: 12, marginBottom: 24, flexWrap: 'wrap' }}>
                <select value={eventFilter} onChange={e => setEventFilter(e.target.value)} style={s.filterSelect}>
                    <option value="all">All Events</option>
                    {eventNames.map(en => {
                        const r = registrations.find(x => x.eventName === en);
                        return <option key={r?.eventId} value={r?.eventId}>{en}</option>;
                    })}
                </select>
                <input placeholder="Search team / college / participant ID…" value={search} onChange={e => setSearch(e.target.value)} style={{ ...s.searchInput, flex: 1, borderRadius: 10, border: '1px solid rgba(255,255,255,0.12)' }} />
                <div style={{ color: '#4fd1ff', fontSize: 13, fontWeight: 600, display: 'flex', alignItems: 'center' }}>
                    {filtered.length} team{filtered.length !== 1 ? 's' : ''} total
                </div>
            </div>

            {loading ? <div style={s.loadingText}>Loading…</div> : filtered.length === 0 ? (
                <div style={s.detailEmpty}><div style={{ fontSize: 48 }}>🏆</div><p style={{ color: '#445', marginTop: 16 }}>No event registrations yet</p></div>
            ) : (
                eventFilter === 'all' ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
                        {byEvent.map(group => (
                            <div key={group.eventId}>
                                <h3 style={{ color: '#fff', fontSize: 18, fontWeight: 700, marginBottom: 12, paddingBottom: 8, borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                                    🏆 {group.eventName} <span style={{ color: '#4fd1ff', fontSize: 13, fontWeight: 400 }}>({group.teams.length} team{group.teams.length !== 1 ? 's' : ''})</span>
                                </h3>
                                <TeamsTable teams={group.teams} onParticipantClick={setModalParticipant} />
                            </div>
                        ))}
                    </div>
                ) : <TeamsTable teams={filtered} onParticipantClick={setModalParticipant} />
            )}

            {/* Participant Detail Modal */}
            {modalParticipant && (
                <div style={s.modalOverlay} onClick={() => setModalParticipant(null)}>
                    <div style={s.modalCard} onClick={e => e.stopPropagation()}>
                        <div style={s.modalHeader}>
                            <div>
                                <div style={s.modalId}>{modalParticipant.registrationId}</div>
                                <div style={s.modalName}>{modalParticipant.name}</div>
                                {modalParticipant.isCaptain && <span style={s.captainBadge}>👑 Team Captain</span>}
                            </div>
                            <button onClick={() => setModalParticipant(null)} style={s.modalClose}>✕</button>
                        </div>
                        <div style={s.infoGrid}>
                            {[['🏫 College', modalParticipant.college], ['📧 Email', modalParticipant.email], ['📞 Phone', modalParticipant.phone], ['⚧ Gender', modalParticipant.gender]].map(([label, value]) => (
                                <div key={label} style={s.infoItem}><div style={s.infoLabel}>{label}</div><div style={s.infoValue}>{value || '—'}</div></div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

const EVENTS_ORDER = ['geoquiz', 'rock-mineral', 'seismic-workshop', 'remote-sensing', 'research-paper', 'geoart', 'guest-lecture'];

function TeamsTable({ teams, onParticipantClick }: { teams: EventReg[]; onParticipantClick: (p: ParticipantDetail) => void }) {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {teams.map(team => (
                <div key={team._id} style={s.teamCard}>
                    <div style={s.teamCardHeader}>
                        <div>
                            <span style={s.teamName}>{team.teamName}</span>
                            <span style={s.collegeBadge}>{team.college}</span>
                        </div>
                        <div style={s.teamMeta}>
                            <span>🕐 {new Date(team.registeredAt).toLocaleString('en-IN', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })}</span>
                        </div>
                    </div>
                    <div style={s.participantsRow}>
                        {team.participants.map(p => (
                            <button key={p.registrationId} onClick={() => onParticipantClick(p)} style={{ ...s.participantChipAdmin, ...(p.isCaptain ? s.captainChip : {}) }} title="Click to view details">
                                <span style={{ fontWeight: 700, fontSize: 11 }}>{p.registrationId}</span>
                                <span>{p.name}</span>
                                {p.isCaptain && <span style={{ fontSize: 10 }}>👑</span>}
                            </button>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}

// ── Styles ────────────────────────────────────────────────────────────────────
const s: Record<string, React.CSSProperties> = {
    loginBg: { minHeight: '100vh', background: '#050a19', display: 'flex', alignItems: 'center', justifyContent: 'center' },
    loginCard: { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 20, padding: '48px 40px', width: '100%', maxWidth: 420, display: 'flex', flexDirection: 'column', gap: 16, textAlign: 'center' },
    loginLogo: { fontSize: 48, marginBottom: 8 },
    loginTitle: { color: '#fff', fontSize: 26, fontWeight: 700, margin: 0 },
    loginSub: { color: '#667', fontSize: 14, margin: 0 },
    loginInput: { background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 10, color: '#fff', padding: '14px 16px', fontSize: 15, outline: 'none', textAlign: 'center', letterSpacing: 4 },
    loginError: { color: '#ff6b6b', fontSize: 13, margin: 0 },
    loginBtn: { background: 'linear-gradient(135deg,#4fd1ff,#7c3aed)', color: '#fff', border: 'none', borderRadius: 10, padding: '14px 20px', fontSize: 15, fontWeight: 700, cursor: 'pointer' },
    loginHint: { color: '#444', fontSize: 12, margin: 0 },

    dashBg: { minHeight: '100vh', background: '#050a19', fontFamily: 'system-ui, sans-serif', color: '#ccc' },
    header: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 28px', borderBottom: '1px solid rgba(255,255,255,0.08)', background: 'rgba(0,0,0,0.4)', position: 'sticky', top: 0, zIndex: 100, flexWrap: 'wrap', gap: 8 },
    headerLeft: { display: 'flex', alignItems: 'center', gap: 14 },
    headerRight: { display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' },
    headerLogo: { fontSize: 32 },
    headerTitle: { color: '#fff', fontWeight: 700, fontSize: 18 },
    headerSub: { color: '#556', fontSize: 12 },
    tabBtn: { background: 'transparent', border: '1px solid rgba(255,255,255,0.15)', color: '#aab', borderRadius: 8, padding: '8px 16px', cursor: 'pointer', fontSize: 13, fontWeight: 600, transition: 'all .15s' },
    tabBtnActive: { background: 'rgba(79,209,255,0.15)', border: '1px solid #4fd1ff', color: '#4fd1ff' },
    logoutBtn: { background: 'rgba(255,100,100,0.15)', border: '1px solid rgba(255,100,100,0.3)', color: '#ff6b6b', borderRadius: 8, padding: '8px 18px', cursor: 'pointer', fontSize: 13 },
    exportBtn: { background: 'rgba(50,220,100,0.15)', border: '1px solid rgba(50,220,100,0.3)', color: '#32dc64', borderRadius: 8, padding: '8px 18px', cursor: 'pointer', fontSize: 13, fontWeight: 600 },
    toast: { position: 'fixed', bottom: 28, left: '50%', transform: 'translateX(-50%)', background: '#181f38', border: '1px solid rgba(255,255,255,0.15)', color: '#fff', padding: '12px 28px', borderRadius: 12, fontSize: 14, fontWeight: 600, zIndex: 9999, pointerEvents: 'none' },

    dashLayout: { display: 'flex', height: 'calc(100vh - 65px)' },
    sidebar: { width: 360, minWidth: 320, borderRight: '1px solid rgba(255,255,255,0.08)', display: 'flex', flexDirection: 'column', overflow: 'hidden' },
    statsGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, borderBottom: '1px solid rgba(255,255,255,0.06)' },
    statCard: { background: 'transparent', border: 'none', padding: '14px 16px', cursor: 'pointer', textAlign: 'center', borderBottom: '2px solid transparent', transition: 'all .15s' },
    statCardActive: { background: 'rgba(79,209,255,0.08)', borderBottom: '2px solid #4fd1ff' },
    statNum: { color: '#fff', fontSize: 22, fontWeight: 700 },
    statLabel: { color: '#668', fontSize: 12, marginTop: 2 },
    searchInput: { background: 'rgba(255,255,255,0.05)', border: 'none', borderBottom: '1px solid rgba(255,255,255,0.06)', color: '#ccc', padding: '12px 16px', fontSize: 13, outline: 'none', width: '100%', boxSizing: 'border-box' },
    userList: { overflowY: 'auto', flex: 1 },
    loadingText: { color: '#445', padding: '24px', textAlign: 'center', fontSize: 13 },
    userRow: { display: 'block', width: '100%', padding: '14px 16px', background: 'transparent', border: 'none', borderBottom: '1px solid rgba(255,255,255,0.04)', cursor: 'pointer', textAlign: 'left', transition: 'background .1s' },
    userRowActive: { background: 'rgba(79,209,255,0.08)' },
    userRowTop: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
    userRowName: { color: '#ddd', fontWeight: 600, fontSize: 14 },
    userRowId: { color: '#4fd1ff', fontSize: 11, letterSpacing: 1, marginBottom: 2 },
    userRowEmail: { color: '#556', fontSize: 12 },
    userRowCollege: { color: '#445', fontSize: 11, marginTop: 2 },
    statusBadge: { fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 20, letterSpacing: 0.5 },
    statusBadgeLg: { fontSize: 12, fontWeight: 700, padding: '5px 14px', borderRadius: 20, letterSpacing: 1, alignSelf: 'flex-start' },
    badgePending: { background: 'rgba(255,200,50,0.15)', color: '#ffc832' },
    badgeApproved: { background: 'rgba(50,220,100,0.15)', color: '#32dc64' },
    badgeRejected: { background: 'rgba(255,80,80,0.15)', color: '#ff5050' },
    detail: { flex: 1, overflowY: 'auto', padding: 28 },
    detailEmpty: { height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' },
    detailCard: { maxWidth: 780, margin: '0 auto' },
    detailHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24, paddingBottom: 20, borderBottom: '1px solid rgba(255,255,255,0.07)' },
    detailName: { color: '#fff', fontSize: 24, fontWeight: 700, margin: 0 },
    detailId: { color: '#4fd1ff', fontSize: 13, letterSpacing: 2, marginTop: 4 },
    infoGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 28 },
    infoItem: { background: 'rgba(255,255,255,0.04)', borderRadius: 10, padding: '12px 16px' },
    infoLabel: { color: '#556', fontSize: 11, marginBottom: 4 },
    infoValue: { color: '#ddd', fontSize: 14, fontWeight: 500 },
    screenshotSection: { marginBottom: 24 },
    screenshotTitle: { color: '#fff', fontSize: 16, fontWeight: 600, marginBottom: 14 },
    screenshotWrapper: { display: 'flex', flexDirection: 'column', gap: 10 },
    screenshotImg: { maxWidth: '100%', maxHeight: 420, objectFit: 'contain', borderRadius: 12, border: '1px solid rgba(255,255,255,0.1)', background: '#0a0f24' },
    screenshotLink: { color: '#4fd1ff', fontSize: 13 },
    screenshotMissing: { background: 'rgba(255,80,80,0.08)', border: '1px dashed rgba(255,80,80,0.3)', borderRadius: 10, padding: '24px', textAlign: 'center', color: '#ff6b6b', fontSize: 14 },
    noteSection: { marginBottom: 20 },
    noteLabel: { color: '#668', fontSize: 13, display: 'block', marginBottom: 8 },
    noteTextarea: { width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, color: '#ccc', padding: '12px 14px', fontSize: 13, resize: 'vertical', outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit' },
    actionRow: { display: 'flex', gap: 14, marginBottom: 28 },
    actionBtn: { flex: 1, padding: '14px 20px', borderRadius: 12, border: 'none', fontSize: 15, fontWeight: 700, cursor: 'pointer', transition: 'opacity .15s' },
    approveBtn: { background: 'linear-gradient(135deg,#00c853,#1de9b6)', color: '#000' },
    rejectBtn: { background: 'linear-gradient(135deg,#ff1744,#f50057)', color: '#fff' },
    actionBtnDisabled: { opacity: 0.35, cursor: 'not-allowed' },
    toggleSection: { background: 'rgba(79,209,255,0.04)', border: '1px solid rgba(79,209,255,0.15)', borderRadius: 14, padding: 22 },
    toggleHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, marginBottom: 14 },
    toggleTitle: { color: '#fff', fontSize: 15, fontWeight: 700, marginBottom: 6 },
    toggleSubtitle: { color: '#668', fontSize: 12, lineHeight: 1.5 },
    toggleSwitch: { flexShrink: 0, width: 54, height: 28, borderRadius: 14, border: 'none', cursor: 'pointer', position: 'relative', transition: 'background .2s', padding: 0 },
    toggleSwitchOn: { background: 'linear-gradient(135deg,#00c853,#1de9b6)' },
    toggleSwitchOff: { background: 'rgba(255,255,255,0.12)' },
    toggleKnob: { position: 'absolute', top: 3, width: 22, height: 22, borderRadius: '50%', background: '#fff', transition: 'transform .2s', boxShadow: '0 1px 4px rgba(0,0,0,0.4)' },
    toggleStatus: { fontSize: 13, fontWeight: 600, padding: '10px 14px', borderRadius: 8, textAlign: 'center' },
    toggleStatusOn: { background: 'rgba(50,220,100,0.1)', color: '#32dc64' },
    toggleStatusOff: { background: 'rgba(255,200,50,0.08)', color: '#ffc832' },

    // Events tab styles
    filterSelect: { background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)', color: '#ccc', borderRadius: 10, padding: '10px 14px', fontSize: 13, outline: 'none', cursor: 'pointer' },
    teamCard: { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 12, padding: '16px 18px' },
    teamCardHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12, flexWrap: 'wrap', gap: 8 },
    teamName: { color: '#fff', fontWeight: 700, fontSize: 16, marginRight: 10 },
    collegeBadge: { background: 'rgba(124,58,237,0.15)', color: '#a78bfa', padding: '3px 10px', borderRadius: 20, fontSize: 11, fontWeight: 600 },
    teamMeta: { color: '#556', fontSize: 12 },
    participantsRow: { display: 'flex', flexWrap: 'wrap', gap: 8 },
    participantChipAdmin: { display: 'flex', alignItems: 'center', gap: 6, padding: '6px 12px', borderRadius: 8, border: '1px solid rgba(79,209,255,0.25)', background: 'rgba(79,209,255,0.07)', color: '#4fd1ff', cursor: 'pointer', fontSize: 12, transition: 'all .15s' },
    captainChip: { borderColor: 'rgba(255,215,0,0.3)', background: 'rgba(255,215,0,0.08)', color: '#ffd700' },
    captainBadge: { background: 'rgba(255,215,0,0.15)', color: '#ffd700', padding: '2px 10px', borderRadius: 20, fontSize: 11, fontWeight: 700, display: 'inline-block', marginTop: 4 },

    // Modal
    modalOverlay: { position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: 16 },
    modalCard: { background: '#0d1530', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 18, padding: 28, maxWidth: 460, width: '100%' },
    modalHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 },
    modalId: { color: '#4fd1ff', fontSize: 13, fontWeight: 700, letterSpacing: 1 },
    modalName: { color: '#fff', fontSize: 22, fontWeight: 700, marginTop: 4 },
    modalClose: { background: 'rgba(255,255,255,0.08)', border: 'none', color: '#ccc', borderRadius: 8, width: 32, height: 32, cursor: 'pointer', fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'center' },
};
