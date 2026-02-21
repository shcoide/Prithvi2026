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
    adminVerified: boolean;   // ← new master-confirm toggle
    adminNote: string;
    paymentScreenshot: string;
    screenshotUrl: string | null;
    registeredAt: string;
}

type FilterStatus = 'all' | 'pending' | 'approved' | 'rejected';

// ── Root ──────────────────────────────────────────────────────────────────────

export default function AdminPage() {
    const [authed, setAuthed] = useState(false);
    const [password, setPassword] = useState('');
    const [loginErr, setLoginErr] = useState('');
    const [logging, setLogging] = useState(false);

    useEffect(() => {
        fetch('/api/addmin/users')
            .then((r) => { if (r.ok) setAuthed(true); })
            .catch(() => { });
    }, []);

    async function handleLogin(e: React.FormEvent) {
        e.preventDefault();
        setLoginErr('');
        setLogging(true);
        try {
            const res = await fetch('/api/addmin/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password }),
            });
            if (!res.ok) {
                const d = await res.json();
                setLoginErr(d.error || 'Invalid password');
                return;
            }
            setAuthed(true);
        } finally {
            setLogging(false);
        }
    }

    if (!authed) return <LoginScreen onLogin={handleLogin} password={password} setPassword={setPassword} error={loginErr} loading={logging} />;
    return <Dashboard onLogout={() => setAuthed(false)} />;
}

// ── Login Screen ──────────────────────────────────────────────────────────────

function LoginScreen({ onLogin, password, setPassword, error, loading }: {
    onLogin: (e: React.FormEvent) => void;
    password: string;
    setPassword: (v: string) => void;
    error: string;
    loading: boolean;
}) {
    return (
        <div style={s.loginBg}>
            <form onSubmit={onLogin} style={s.loginCard}>
                <div style={s.loginLogo}>🔐</div>
                <h1 style={s.loginTitle}>Admin Panel</h1>
                <p style={s.loginSub}>Prithvi 2026 · Internal Access Only</p>
                <input
                    type="password"
                    placeholder="Enter admin password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={s.loginInput}
                    required autoFocus
                />
                {error && <p style={s.loginError}>{error}</p>}
                <button type="submit" style={s.loginBtn} disabled={loading}>
                    {loading ? 'Verifying…' : 'Login →'}
                </button>
                <p style={s.loginHint}>This page is not linked anywhere. Do not share its URL.</p>
            </form>
        </div>
    );
}

// ── Dashboard ─────────────────────────────────────────────────────────────────

function Dashboard({ onLogout }: { onLogout: () => void }) {
    const [users, setUsers] = useState<AdminUser[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState<FilterStatus>('all');
    const [search, setSearch] = useState('');
    const [selected, setSelected] = useState<AdminUser | null>(null);
    const [note, setNote] = useState('');
    const [saving, setSaving] = useState(false);
    const [toggling, setToggling] = useState(false);
    const [toast, setToast] = useState('');

    const loadUsers = useCallback(async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/addmin/users');
            if (res.status === 401) { onLogout(); return; }
            const data = await res.json();
            setUsers(data.users || []);
        } finally {
            setLoading(false);
        }
    }, [onLogout]);

    useEffect(() => { loadUsers(); }, [loadUsers]);

    async function logout() {
        await fetch('/api/addmin/logout', { method: 'POST' });
        onLogout();
    }

    function showToast(msg: string) {
        setToast(msg);
        setTimeout(() => setToast(''), 3000);
    }

    // ── Approve / Reject ─────────────────────────────────────────────────────
    async function handleVerify(status: 'approved' | 'rejected') {
        if (!selected) return;
        setSaving(true);
        try {
            const res = await fetch('/api/addmin/verify', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    registrationId: selected.registrationId,
                    action: 'status',
                    status,
                    adminNote: note,
                }),
            });
            if (!res.ok) throw new Error('Failed');
            const updated = { ...selected, paymentStatus: status, adminNote: note };
            setSelected(updated);
            setUsers((prev) => prev.map((u) => u.registrationId === updated.registrationId ? updated : u));
            showToast(status === 'approved' ? '✅ Payment approved!' : '❌ Payment rejected!');
        } catch {
            showToast('Error updating status');
        } finally {
            setSaving(false);
        }
    }

    // ── Admin Verified Toggle ─────────────────────────────────────────────────
    async function handleAdminVerifiedToggle(newValue: boolean) {
        if (!selected) return;
        setToggling(true);
        try {
            const res = await fetch('/api/addmin/verify', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    registrationId: selected.registrationId,
                    action: 'toggle',
                    adminVerified: newValue,
                    adminNote: note,
                }),
            });
            if (!res.ok) throw new Error('Failed');
            const updated = { ...selected, adminVerified: newValue, adminNote: note };
            setSelected(updated);
            setUsers((prev) => prev.map((u) => u.registrationId === updated.registrationId ? updated : u));
            showToast(newValue ? '🔓 Marked as Admin Verified!' : '🔒 Admin verification removed');
        } catch {
            showToast('Error toggling admin verified');
        } finally {
            setToggling(false);
        }
    }

    // ── Filter + search ───────────────────────────────────────────────────────
    const displayed = users.filter((u) => {
        if (filter !== 'all' && u.paymentStatus !== filter) return false;
        if (search) {
            const q = search.toLowerCase();
            return (
                u.name.toLowerCase().includes(q) ||
                u.email.toLowerCase().includes(q) ||
                u.registrationId.toLowerCase().includes(q) ||
                u.college.toLowerCase().includes(q)
            );
        }
        return true;
    });

    const counts = {
        all: users.length,
        pending: users.filter((u) => u.paymentStatus === 'pending').length,
        approved: users.filter((u) => u.paymentStatus === 'approved').length,
        rejected: users.filter((u) => u.paymentStatus === 'rejected').length,
    };
    const verifiedCount = users.filter((u) => u.adminVerified).length;

    return (
        <div style={s.dashBg}>
            {/* HEADER */}
            <header style={s.header}>
                <div style={s.headerLeft}>
                    <span style={s.headerLogo}>🌍</span>
                    <div>
                        <div style={s.headerTitle}>Prithvi 2026 — Admin Panel</div>
                        <div style={s.headerSub}>Payment Screenshot Review</div>
                    </div>
                </div>
                <div style={s.headerRight}>
                    <div style={s.verifiedPill}>
                        🔓 {verifiedCount} / {users.length} Admin Verified
                    </div>
                    <button onClick={logout} style={s.logoutBtn}>Logout</button>
                </div>
            </header>

            <div style={s.dashLayout}>
                {/* SIDEBAR */}
                <aside style={s.sidebar}>
                    <div style={s.statsGrid}>
                        {(['all', 'pending', 'approved', 'rejected'] as FilterStatus[]).map((st) => (
                            <button
                                key={st}
                                onClick={() => setFilter(st)}
                                style={{ ...s.statCard, ...(filter === st ? s.statCardActive : {}) }}
                            >
                                <div style={s.statNum}>{counts[st]}</div>
                                <div style={s.statLabel}>
                                    {st === 'all' ? '📋 Total' : st === 'pending' ? '⏳ Pending' :
                                        st === 'approved' ? '✅ Approved' : '❌ Rejected'}
                                </div>
                            </button>
                        ))}
                    </div>

                    <input
                        placeholder="Search name / email / ID / college…"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        style={s.searchInput}
                    />

                    <div style={s.userList}>
                        {loading ? <div style={s.loadingText}>Loading…</div> :
                            displayed.length === 0 ? <div style={s.loadingText}>No results</div> :
                                displayed.map((u) => (
                                    <button
                                        key={u.registrationId}
                                        onClick={() => { setSelected(u); setNote(u.adminNote || ''); }}
                                        style={{ ...s.userRow, ...(selected?.registrationId === u.registrationId ? s.userRowActive : {}) }}
                                    >
                                        <div style={s.userRowTop}>
                                            <span style={s.userRowName}>{u.name}</span>
                                            <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
                                                {u.adminVerified && (
                                                    <span style={s.verifiedDot} title="Admin Verified">🔓</span>
                                                )}
                                                <span style={{
                                                    ...s.statusBadge,
                                                    ...(u.paymentStatus === 'approved' ? s.badgeApproved :
                                                        u.paymentStatus === 'rejected' ? s.badgeRejected : s.badgePending),
                                                }}>
                                                    {u.paymentStatus}
                                                </span>
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

                {/* DETAIL PANEL */}
                <main style={s.detail}>
                    {!selected ? (
                        <div style={s.detailEmpty}>
                            <div style={{ fontSize: 64 }}>📋</div>
                            <p style={{ color: '#555', marginTop: 16 }}>Select a registrant to review their payment</p>
                        </div>
                    ) : (
                        <div style={s.detailCard}>
                            {/* Header row */}
                            <div style={s.detailHeader}>
                                <div>
                                    <h2 style={s.detailName}>{selected.name}</h2>
                                    <div style={s.detailId}>{selected.registrationId}</div>
                                </div>
                                <span style={{
                                    ...s.statusBadgeLg,
                                    ...(selected.paymentStatus === 'approved' ? s.badgeApproved :
                                        selected.paymentStatus === 'rejected' ? s.badgeRejected : s.badgePending),
                                }}>
                                    {selected.paymentStatus.toUpperCase()}
                                </span>
                            </div>

                            {/* Info grid */}
                            <div style={s.infoGrid}>
                                {[
                                    ['📧 Email', selected.email],
                                    ['📞 Phone', selected.phone],
                                    ['🏫 College', selected.college],
                                    ['⚧  Gender', selected.gender],
                                    ['📅 Registered', new Date(selected.registeredAt).toLocaleString('en-IN')],
                                    ['✉️ Email verified', selected.emailVerified ? '✅ Yes' : '❌ No'],
                                ].map(([label, value]) => (
                                    <div key={label} style={s.infoItem}>
                                        <div style={s.infoLabel}>{label}</div>
                                        <div style={s.infoValue}>{value}</div>
                                    </div>
                                ))}
                            </div>

                            {/* Screenshot */}
                            <div style={s.screenshotSection}>
                                <h3 style={s.screenshotTitle}>💳 Payment Screenshot</h3>
                                {selected.screenshotUrl ? (
                                    <div style={s.screenshotWrapper}>
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img src={selected.screenshotUrl} alt="Payment screenshot" style={s.screenshotImg} />
                                        <a href={selected.screenshotUrl} target="_blank" rel="noreferrer" style={s.screenshotLink}>
                                            Open full image ↗
                                        </a>
                                    </div>
                                ) : (
                                    <div style={s.screenshotMissing}>No screenshot uploaded</div>
                                )}
                            </div>

                            {/* Admin note */}
                            <div style={s.noteSection}>
                                <label style={s.noteLabel}>Admin Note (optional)</label>
                                <textarea
                                    value={note}
                                    onChange={(e) => setNote(e.target.value)}
                                    placeholder="e.g. Amount mismatch, ref ID confirmed, etc."
                                    style={s.noteTextarea}
                                    rows={3}
                                />
                            </div>

                            {/* Approve / Reject buttons */}
                            <div style={s.actionRow}>
                                <button
                                    onClick={() => handleVerify('approved')}
                                    disabled={saving || selected.paymentStatus === 'approved'}
                                    style={{
                                        ...s.actionBtn, ...s.approveBtn,
                                        ...(selected.paymentStatus === 'approved' ? s.actionBtnDisabled : {}),
                                    }}
                                >
                                    {saving ? '…' : '✅ Approve'}
                                </button>
                                <button
                                    onClick={() => handleVerify('rejected')}
                                    disabled={saving || selected.paymentStatus === 'rejected'}
                                    style={{
                                        ...s.actionBtn, ...s.rejectBtn,
                                        ...(selected.paymentStatus === 'rejected' ? s.actionBtnDisabled : {}),
                                    }}
                                >
                                    {saving ? '…' : '❌ Reject'}
                                </button>
                            </div>

                            {/* ── Admin Verified Toggle ──────────────────────────────────────── */}
                            <div style={s.toggleSection}>
                                <div style={s.toggleHeader}>
                                    <div>
                                        <div style={s.toggleTitle}>🔓 Admin Payment Verification</div>
                                        <div style={s.toggleSubtitle}>
                                            Manually confirm the payment is genuine after full review.
                                            This status is stored in the database and is <strong>not visible to the registrant</strong>.
                                        </div>
                                    </div>
                                    {/* Toggle switch */}
                                    <button
                                        onClick={() => handleAdminVerifiedToggle(!selected.adminVerified)}
                                        disabled={toggling}
                                        style={{
                                            ...s.toggleSwitch,
                                            ...(selected.adminVerified ? s.toggleSwitchOn : s.toggleSwitchOff),
                                        }}
                                        title={selected.adminVerified ? 'Click to remove verification' : 'Click to mark as verified'}
                                    >
                                        <div style={{
                                            ...s.toggleKnob,
                                            transform: selected.adminVerified ? 'translateX(26px)' : 'translateX(2px)',
                                        }} />
                                    </button>
                                </div>

                                {/* Status label */}
                                <div style={{
                                    ...s.toggleStatus,
                                    ...(selected.adminVerified ? s.toggleStatusOn : s.toggleStatusOff),
                                }}>
                                    {toggling
                                        ? 'Saving…'
                                        : selected.adminVerified
                                            ? '✅ Payment verified by admin — saved to database'
                                            : '⏳ Not yet verified by admin'}
                                </div>
                            </div>
                        </div>
                    )}
                </main>
            </div>

            {/* TOAST */}
            {toast && <div style={s.toast}>{toast}</div>}
        </div>
    );
}

// ── Styles ────────────────────────────────────────────────────────────────────

const s: Record<string, React.CSSProperties> = {
    /* Login */
    loginBg: { minHeight: '100vh', background: '#050a19', display: 'flex', alignItems: 'center', justifyContent: 'center' },
    loginCard: { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 20, padding: '48px 40px', width: '100%', maxWidth: 420, display: 'flex', flexDirection: 'column', gap: 16, textAlign: 'center' },
    loginLogo: { fontSize: 48, marginBottom: 8 },
    loginTitle: { color: '#fff', fontSize: 26, fontWeight: 700, margin: 0 },
    loginSub: { color: '#667', fontSize: 14, margin: 0 },
    loginInput: { background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 10, color: '#fff', padding: '14px 16px', fontSize: 15, outline: 'none', textAlign: 'center', letterSpacing: 4 },
    loginError: { color: '#ff6b6b', fontSize: 13, margin: 0 },
    loginBtn: { background: 'linear-gradient(135deg,#4fd1ff,#7c3aed)', color: '#fff', border: 'none', borderRadius: 10, padding: '14px 20px', fontSize: 15, fontWeight: 700, cursor: 'pointer' },
    loginHint: { color: '#444', fontSize: 12, margin: 0 },

    /* Dashboard */
    dashBg: { minHeight: '100vh', background: '#050a19', fontFamily: 'system-ui, sans-serif', color: '#ccc' },
    header: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 28px', borderBottom: '1px solid rgba(255,255,255,0.08)', background: 'rgba(0,0,0,0.4)', position: 'sticky', top: 0, zIndex: 100 },
    headerLeft: { display: 'flex', alignItems: 'center', gap: 14 },
    headerRight: { display: 'flex', alignItems: 'center', gap: 14 },
    headerLogo: { fontSize: 32 },
    headerTitle: { color: '#fff', fontWeight: 700, fontSize: 18 },
    headerSub: { color: '#556', fontSize: 12 },
    verifiedPill: { background: 'rgba(50,220,100,0.12)', border: '1px solid rgba(50,220,100,0.3)', color: '#32dc64', borderRadius: 20, padding: '6px 14px', fontSize: 12, fontWeight: 600 },
    logoutBtn: { background: 'rgba(255,100,100,0.15)', border: '1px solid rgba(255,100,100,0.3)', color: '#ff6b6b', borderRadius: 8, padding: '8px 18px', cursor: 'pointer', fontSize: 13 },

    dashLayout: { display: 'flex', height: 'calc(100vh - 65px)' },

    /* Sidebar */
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
    verifiedDot: { fontSize: 12 },

    /* Badges */
    statusBadge: { fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 20, letterSpacing: 0.5 },
    statusBadgeLg: { fontSize: 12, fontWeight: 700, padding: '5px 14px', borderRadius: 20, letterSpacing: 1, alignSelf: 'flex-start' },
    badgePending: { background: 'rgba(255,200,50,0.15)', color: '#ffc832' },
    badgeApproved: { background: 'rgba(50,220,100,0.15)', color: '#32dc64' },
    badgeRejected: { background: 'rgba(255,80,80,0.15)', color: '#ff5050' },

    /* Detail panel */
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

    /* Admin Verified Toggle */
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

    /* Toast */
    toast: { position: 'fixed', bottom: 28, left: '50%', transform: 'translateX(-50%)', background: '#181f38', border: '1px solid rgba(255,255,255,0.15)', color: '#fff', padding: '12px 28px', borderRadius: 12, fontSize: 14, fontWeight: 600, zIndex: 9999, pointerEvents: 'none' },
};
