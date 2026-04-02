'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { EVENTS } from '@/lib/eventsConfig';
import { Html5Qrcode } from 'html5-qrcode';

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
    // ✅ NEW
    PA: boolean;
    DinnerTaken: boolean;
    Certificate: boolean;
    hall_alloted: string;
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
type Tab = 'participants' | 'events' | 'scanner' | 'attendance';

// ── Feature Flags (set to true to enable) ────────────────────────────────────
const ENABLE_DINNER = false;      // Phase 2 — flip to true when ready
const ENABLE_CERTIFICATE = false; // Phase 3 — flip to true when ready

// ── Root ──────────────────────────────────────────────────────────────────────
export default function AdminPage() {
    const [authed, setAuthed] = useState(false);
    const [password, setPassword] = useState('');
    const [loginErr, setLoginErr] = useState('');
    const [logging, setLogging] = useState(false);

    useEffect(() => {
        fetch('/api/addmin/usersv2').then((r) => { if (r.ok) setAuthed(true); }).catch(() => { });
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
            <style>{`
                @media (max-width: 768px) {
                    .admin-header-right { display: none !important; }
                }
                @media (min-width: 769px) {
                    .admin-mobile-nav { display: none !important; }
                }
            `}</style>
            {/* ── Desktop Header ── */}
            <header style={s.header}>
                <div style={s.headerLeft}>
                    <span style={s.headerLogo}>🌍</span>
                    <div>
                        <div style={s.headerTitle}>Prithvi 2026 — Admin</div>
                        <div style={s.headerSub}>Internal Management</div>
                    </div>
                </div>
                <div style={s.headerRight} className="admin-header-right">
                    <button onClick={() => setTab('participants')} style={{ ...s.tabBtn, ...(tab === 'participants' ? s.tabBtnActive : {}) }}>👥 Participants</button>
                    <button onClick={() => setTab('scanner')} style={{ ...s.tabBtn, ...(tab === 'scanner' ? s.tabBtnActive : {}) }}>📷 Scanner</button>
                    <button onClick={() => setTab('events')} style={{ ...s.tabBtn, ...(tab === 'events' ? s.tabBtnActive : {}) }}>🏆 Events</button>
                    <button onClick={() => setTab('attendance')} style={{ ...s.tabBtn, ...(tab === 'attendance' ? s.tabBtnActive : {}) }}>📋 Attendance</button>
                    <button onClick={() => window.open('/api/addmin/export', '_blank')} style={s.exportBtn}>📊 Export</button>
                    <button onClick={logout} style={s.logoutBtn}>Logout</button>
                </div>
            </header>

            {/* ── Content ── */}
            <div style={{ paddingBottom: 72 }}>
                {tab === 'participants' && <ParticipantsDashboard onToast={showToast} onLogout={onLogout} />}
                {tab === 'events' && <EventsDashboard onToast={showToast} />}
                {tab === 'scanner' && <ScannerDashboard onToast={showToast} />}
                {tab === 'attendance' && <AttendanceDashboard onToast={showToast} />}
            </div>

            {/* ── Mobile Bottom Nav ── */}
            <nav style={s.mobileNav} className="admin-mobile-nav">
                <button onClick={() => setTab('participants')} style={{ ...s.mobileNavBtn, ...(tab === 'participants' ? s.mobileNavBtnActive : {}) }}>
                    <span style={{ fontSize: 22 }}>👥</span>
                    <span style={{ fontSize: 10, marginTop: 2 }}>Participants</span>
                </button>
                <button onClick={() => setTab('scanner')} style={{ ...s.mobileNavBtn, ...(tab === 'scanner' ? s.mobileNavBtnActive : {}) }}>
                    <span style={{ fontSize: 22 }}>📷</span>
                    <span style={{ fontSize: 10, marginTop: 2 }}>Scanner</span>
                </button>
                <button onClick={() => setTab('events')} style={{ ...s.mobileNavBtn, ...(tab === 'events' ? s.mobileNavBtnActive : {}) }}>
                    <span style={{ fontSize: 22 }}>🏆</span>
                    <span style={{ fontSize: 10, marginTop: 2 }}>Events</span>
                </button>
                <button onClick={() => setTab('attendance')} style={{ ...s.mobileNavBtn, ...(tab === 'attendance' ? s.mobileNavBtnActive : {}) }}>
                    <span style={{ fontSize: 22 }}>�</span>
                    <span style={{ fontSize: 10, marginTop: 2 }}>Attendance</span>
                </button>
                <button onClick={logout} style={{ ...s.mobileNavBtn, color: '#ff6b6b' }}>
                    <span style={{ fontSize: 22 }}>🚪</span>
                    <span style={{ fontSize: 10, marginTop: 2 }}>Logout</span>
                </button>
            </nav>

            {toast && <div style={s.toast}>{toast}</div>}
        </div>
    );
}

// ── Participants Dashboard (original functionality) ────────────────────────────
function ParticipantsDashboard({ onToast, onLogout }: { onToast: (m: string) => void; onLogout: () => void }) {
    const [users, setUsers] = useState<AdminUser[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [selected, setSelected] = useState<AdminUser | null>(null);
    const [filterPA, setFilterPA] = useState(false);
    const [filterDinner, setFilterDinner] = useState(false);
    const [filterCertificate, setFilterCertificate] = useState(false);
    const loadUsers = useCallback(async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/addmin/usersv2');
            if (res.status === 401) { onLogout(); return; }
            const data = await res.json();
            setUsers(data.users || []);
        } finally { setLoading(false); }
    }, [onLogout]);

    useEffect(() => { loadUsers(); }, [loadUsers]);

    const displayed = users.filter((u) => {
        if (filterPA && !u.PA) return false;
        if (filterDinner && !u.DinnerTaken) return false;
        if (filterCertificate && !u.Certificate) return false;

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
    return (
        <div style={s.dashLayout}>
            <aside style={s.sidebar}>
                <div style={{ padding: '12px 16px', color: '#4fd1ff', fontSize: 12, fontWeight: 600 }}>📋 {users.length} Registered</div>
                <input placeholder="Search…" value={search} onChange={(e) => setSearch(e.target.value)} style={s.searchInput} />
                <div style={{ padding: '10px 16px', display: 'flex', flexDirection: 'column', gap: 6 }}>
                    <label style={{ color: '#ccd', fontSize: 13 }}>
                        <input type="checkbox" checked={filterPA} onChange={(e) => setFilterPA(e.target.checked)} />
                        {' '}✅ PA (Present)
                    </label>
                    <label style={{ color: ENABLE_DINNER ? '#ccd' : '#445', fontSize: 13, cursor: ENABLE_DINNER ? 'pointer' : 'default' }}>
                        <input type="checkbox" checked={filterDinner} onChange={(e) => ENABLE_DINNER && setFilterDinner(e.target.checked)} disabled={!ENABLE_DINNER} />
                        {' '}🍽 Dinner {!ENABLE_DINNER && '(coming soon)'}
                    </label>
                    <label style={{ color: ENABLE_CERTIFICATE ? '#ccd' : '#445', fontSize: 13, cursor: ENABLE_CERTIFICATE ? 'pointer' : 'default' }}>
                        <input type="checkbox" checked={filterCertificate} onChange={(e) => ENABLE_CERTIFICATE && setFilterCertificate(e.target.checked)} disabled={!ENABLE_CERTIFICATE} />
                        {' '}📜 Certificate {!ENABLE_CERTIFICATE && '(coming soon)'}
                    </label>
                </div>
                <div style={s.userList}>
                    {loading ? <div style={s.loadingText}>Loading…</div> : displayed.length === 0 ? <div style={s.loadingText}>No results</div> :
                        displayed.map((u) => (
                            <button key={u.registrationId} onClick={() => setSelected(u)} style={{ ...s.userRow, ...(selected?.registrationId === u.registrationId ? s.userRowActive : {}) }}>
                                <div style={s.userRowTop}>
                                    <span style={s.userRowName}>{u.name}</span>
                                    <span style={{ fontSize: 11, color: u.PA ? '#32dc64' : '#556' }}>{u.PA ? '✅' : '○'}</span>
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
                        </div>
                        <div style={s.infoGrid}>
                            {[['📧 Email', selected.email], ['📞 Phone', selected.phone], ['🏫 College', selected.college],
                            ['⚧ Gender', selected.gender], ['📅 Registered', new Date(selected.registeredAt).toLocaleString('en-IN')],
                            ['✉️ Email Verified', selected.emailVerified ? '✅ Yes' : '❌ No'],
                            ['🏠 Hall Allotted', selected.hall_alloted || 'N/A'],
                            ['🎫 PA', selected.PA ? '✅ Present' : 'N/A'],
                            ['🍽 Dinner', selected.DinnerTaken ? '✅ Taken' : 'N/A'],
                            ['📜 Certificate', selected.Certificate ? '✅ Issued' : 'N/A'],
                            ].map(([label, value]) => (
                                <div key={label} style={s.infoItem}><div style={s.infoLabel}>{label}</div><div style={s.infoValue}>{value}</div></div>
                            ))}
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}

// ----Scanner Dashboard-----

function ScannerDashboard({ onToast }: { onToast: (m: string) => void }) {
    const [scannedId, setScannedId] = useState('');
    const [user, setUser] = useState<any>(null);
    const [PA, setPA] = useState(false);
    const [DinnerTaken, setDinnerTaken] = useState(false);
    const [Certificate, setCertificate] = useState(false);
    const [hall, setHall] = useState('');
    const [cameraOpen, setCameraOpen] = useState(true);
    // Double-confirm dialog state
    const [confirmField, setConfirmField] = useState<null | 'PA' | 'DinnerTaken' | 'Certificate'>(null);
    const [confirmValue, setConfirmValue] = useState(false);
    const scannerRef = useRef<Html5Qrcode | null>(null);
    const readerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!cameraOpen) return; // don't start if camera is closed
        let isMounted = true;
        if (!readerRef.current) return;

        // Reset any previous instance
        scannerRef.current = null;
        const html5QrCode = new Html5Qrcode(readerRef.current.id);
        scannerRef.current = html5QrCode;

        const startScanner = async () => {
            try {
                const devices = await Html5Qrcode.getCameras();
                const backCamera = devices.find(device =>
                    /back|rear|environment/i.test(device.label)
                );
                if (!isMounted) return;

                if (!devices || devices.length === 0) {
                    onToast("No camera found");
                    return;
                }
                const cameraId = backCamera ? backCamera.id : devices[0].id;

                if (!document.getElementById("reader")) return;
                console.log("Calling html5QrCode.start()");
                await html5QrCode.start(
                    cameraId,
                    {
                        fps: 20
                    },
                    (decodedText) => {
                        console.log("SCAN SUCCESS:", decodedText);
                        onScanSuccess(decodedText);
                    },
                    (err) => { }
                );
                console.log("Scanner started successfully");
            } catch (err: any) {
                console.error("Scanner error:", err);

                if (err?.name === "NotAllowedError") {
                    onToast("❌ Camera permission denied. Please allow camera access.");
                } else if (err?.name === "NotFoundError") {
                    onToast("❌ No camera found on this device.");
                } else {
                    onToast("❌ Camera error");
                }
            }
        };

        const timeout = setTimeout(startScanner, 800);

        return () => {
            clearTimeout(timeout);
            isMounted = false;
            const qr = scannerRef.current;
            if (!qr) return;

            try {
                if ((qr as any).isScanning) {
                    qr.stop().catch(() => { });
                }
            } catch { }

            try {
                qr.clear();
            } catch { }
        };
    }, [cameraOpen]);

    const onScanSuccess = async (decodedText: string) => {
        if (!decodedText) return;
        console.log(decodedText);
        // prevent duplicate scans
        if (scannedId === decodedText) return;

        setScannedId(decodedText);
        console.log("SCAN SUCCESS TRIGGERED:", decodedText);
        // pause scanner (DO NOT stop)
        if (scannerRef.current) {
            try {
                await scannerRef.current.pause();
            } catch { }
        }

        try {
            const res = await fetch(`/api/addmin/usersv2/${decodedText}`);

            if (!res.ok) {
                onToast("User not found");
                setScannedId('');
                if (scannerRef.current) {
                    try {
                        await scannerRef.current.resume();
                    } catch { }
                }
                return;
            }

            const data = await res.json();

            setUser(data.user);
            setPA(data.user.PA);
            setDinnerTaken(data.user.DinnerTaken);
            setCertificate(data.user.Certificate);
            setHall(data.user.hall_alloted || '');
            // Close camera after successful scan
            setCameraOpen(false);
            if (scannerRef.current) {
                try { await scannerRef.current.stop(); } catch { }
            }

        } catch (err) {
            console.error(err);
            onToast("Fetch error");
        }
    };

    async function handleSave() {
        const res = await fetch('/api/addmin/usersv2/update', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ registrationId: scannedId, PA, DinnerTaken, Certificate, hall_alloted: hall }),
        });
        if (!res.ok) { onToast('Update failed'); return; }
        onToast('✅ Updated successfully');
    }

    async function handleNext() {
        setUser(null); setScannedId('');
        setCameraOpen(true);
        // Scanner will auto-restart via useEffect re-run after readerRef remount
    }

    // Called when admin taps a checkbox — open confirm dialog instead of instant toggle
    function requestConfirm(field: 'PA' | 'DinnerTaken' | 'Certificate', newVal: boolean) {
        setConfirmField(field);
        setConfirmValue(newVal);
    }

    // Admin confirmed — apply the toggle and save immediately
    async function handleConfirmed() {
        if (!confirmField) return;
        const updates = { PA, DinnerTaken, Certificate };
        if (confirmField === 'PA') { setPA(confirmValue); updates.PA = confirmValue; }
        if (confirmField === 'DinnerTaken') { setDinnerTaken(confirmValue); updates.DinnerTaken = confirmValue; }
        if (confirmField === 'Certificate') { setCertificate(confirmValue); updates.Certificate = confirmValue; }
        setConfirmField(null);
        const res = await fetch('/api/addmin/usersv2/update', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ registrationId: scannedId, ...updates, hall_alloted: hall }),
        });
        if (!res.ok) onToast('Update failed');
        else onToast('✅ Saved!');
    }

    const STATUS_COLOR = user?.paymentStatus === 'approved' ? '#32dc64' : user?.paymentStatus === 'rejected' ? '#ff5050' : '#ffc832';
    const STATUS_BG = user?.paymentStatus === 'approved' ? 'rgba(50,220,100,0.15)' : user?.paymentStatus === 'rejected' ? 'rgba(255,80,80,0.15)' : 'rgba(255,200,50,0.15)';

    const confirmLabels: Record<string, string> = {
        PA: '✅ Mark as Present',
        DinnerTaken: '🍽 Mark Dinner Taken',
        Certificate: '📜 Issue Certificate',
    };
    return (
        <div style={{ minHeight: "calc(100vh - 65px)", background: "#050a19", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start", padding: "20px 16px 100px", gap: 16, boxSizing: "border-box" }}>

            {/* Camera Viewport — only shown when cameraOpen */}
            {cameraOpen && (
                <div style={{ width: "100%", maxWidth: 380, aspectRatio: "1", overflow: "hidden", borderRadius: 16, position: "relative", border: "2px solid rgba(79,209,255,0.3)" }}>
                    <div ref={readerRef} id="reader" style={{ width: "100%", height: "100%" }} />
                </div>
            )}
            {cameraOpen && !user && (
                <div style={{ color: '#667', fontSize: 13, textAlign: 'center' }}>📷 Point camera at participant QR code</div>
            )}

            {/* Double-Confirm Modal */}
            {confirmField && (
                <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 500, padding: 20 }}>
                    <div style={{ background: '#0d1530', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 20, padding: 28, width: '100%', maxWidth: 340, textAlign: 'center' }}>
                        <div style={{ fontSize: 40, marginBottom: 12 }}>{confirmValue ? '✅' : '❌'}</div>
                        <div style={{ color: '#fff', fontSize: 18, fontWeight: 700, marginBottom: 8 }}>Are you sure?</div>
                        <div style={{ color: '#889', fontSize: 14, marginBottom: 24 }}>
                            {confirmValue ? confirmLabels[confirmField] : `Remove: ${confirmLabels[confirmField]}`}
                            {' for '}<strong style={{ color: '#4fd1ff' }}>{user?.name}</strong>?
                        </div>
                        <div style={{ display: 'flex', gap: 12 }}>
                            <button onClick={() => setConfirmField(null)} style={{ flex: 1, padding: '12px', borderRadius: 10, border: '1px solid rgba(255,255,255,0.2)', background: 'transparent', color: '#ccc', fontSize: 14, cursor: 'pointer' }}>Cancel</button>
                            <button onClick={handleConfirmed} style={{ flex: 1, padding: '12px', borderRadius: 10, border: 'none', background: 'linear-gradient(135deg,#4fd1ff,#7c3aed)', color: '#fff', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>Confirm</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Scanned User Card */}
            {user && (
                <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 20, padding: "20px 16px", width: "100%", maxWidth: 380, display: "flex", flexDirection: "column", gap: 12, color: "#fff", boxSizing: "border-box" }}>

                    {/* Status Badge */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <h3 style={{ fontSize: 20, fontWeight: 700, margin: 0 }}>{user.name}</h3>
                            <p style={{ fontSize: 12, color: '#4fd1ff', margin: '4px 0 0', letterSpacing: 1 }}>{user.registrationId}</p>
                        </div>
                        <span style={{ background: STATUS_BG, color: STATUS_COLOR, padding: '4px 12px', borderRadius: 20, fontSize: 11, fontWeight: 700, letterSpacing: 1 }}>
                            {(user.paymentStatus || 'pending').toUpperCase()}
                        </span>
                    </div>

                    {/* Basic Info + Hall */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                        {[['📧', user.email], ['📞', user.phone], ['🏫', user.college], ['⚧', user.gender]].map(([icon, val]) => (
                            <div key={icon as string} style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 8, padding: '8px 10px', fontSize: 12, color: '#bbc' }}>
                                <span style={{ marginRight: 4 }}>{icon}</span>{val || '—'}
                            </div>
                        ))}
                    </div>
                    {/* Hall Allotted */}
                    <div style={{ background: 'rgba(79,209,255,0.08)', border: '1px solid rgba(79,209,255,0.2)', borderRadius: 10, padding: '10px 14px', fontSize: 14, color: '#4fd1ff', fontWeight: 600 }}>
                        🏠 Hall Allotted: <strong>{hall || 'Not assigned'}</strong>
                    </div>

                    {/* PA — always active */}
                    <label
                        onClick={() => requestConfirm('PA', !PA)}
                        style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 15, color: PA ? "#32dc64" : "#ccd", cursor: "pointer", background: PA ? "rgba(50,220,100,0.08)" : "rgba(255,255,255,0.04)", border: `1px solid ${PA ? "rgba(50,220,100,0.3)" : "rgba(255,255,255,0.1)"}`, borderRadius: 12, padding: "14px 16px", fontWeight: 600, transition: "all 0.2s" }}
                    >
                        <input type="checkbox" checked={PA} readOnly style={{ width: 18, height: 18, accentColor: "#32dc64", cursor: 'pointer' }} />
                        ✅ Present / Absent
                    </label>

                    {/* Dinner — controlled by ENABLE_DINNER */}
                    <label
                        onClick={() => ENABLE_DINNER && requestConfirm('DinnerTaken', !DinnerTaken)}
                        style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 15, color: ENABLE_DINNER ? (DinnerTaken ? "#ffc832" : "#ccd") : '#445', cursor: ENABLE_DINNER ? "pointer" : 'not-allowed', background: DinnerTaken ? "rgba(255,200,50,0.08)" : "rgba(255,255,255,0.03)", border: `1px solid ${DinnerTaken ? "rgba(255,200,50,0.3)" : "rgba(255,255,255,0.07)"}`, borderRadius: 12, padding: "14px 16px", fontWeight: 600, opacity: ENABLE_DINNER ? 1 : 0.5 }}
                    >
                        <input type="checkbox" checked={DinnerTaken} readOnly disabled={!ENABLE_DINNER} style={{ width: 18, height: 18, cursor: ENABLE_DINNER ? 'pointer' : 'not-allowed' }} />
                        🍽 Dinner Taken {!ENABLE_DINNER && <span style={{ fontSize: 11, color: '#556', marginLeft: 4 }}>(not active)</span>}
                    </label>

                    {/* Certificate — controlled by ENABLE_CERTIFICATE */}
                    <label
                        onClick={() => ENABLE_CERTIFICATE && requestConfirm('Certificate', !Certificate)}
                        style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 15, color: ENABLE_CERTIFICATE ? (Certificate ? "#a78bfa" : "#ccd") : '#445', cursor: ENABLE_CERTIFICATE ? "pointer" : 'not-allowed', background: Certificate ? "rgba(124,58,237,0.08)" : "rgba(255,255,255,0.03)", border: `1px solid ${Certificate ? "rgba(124,58,237,0.3)" : "rgba(255,255,255,0.07)"}`, borderRadius: 12, padding: "14px 16px", fontWeight: 600, opacity: ENABLE_CERTIFICATE ? 1 : 0.5 }}
                    >
                        <input type="checkbox" checked={Certificate} readOnly disabled={!ENABLE_CERTIFICATE} style={{ width: 18, height: 18, cursor: ENABLE_CERTIFICATE ? 'pointer' : 'not-allowed' }} />
                        📜 Certificate {!ENABLE_CERTIFICATE && <span style={{ fontSize: 11, color: '#556', marginLeft: 4 }}>(not active)</span>}
                    </label>

                    {/* Actions */}
                    <button onClick={handleNext} style={{ width: '100%', background: "rgba(255,255,255,0.08)", color: "#fff", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 10, padding: "13px 16px", fontSize: 14, fontWeight: 600, cursor: "pointer", marginTop: 4 }}>
                        📷 Scan Next Person
                    </button>
                </div>
            )}
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

    const allEventIds = Array.from(new Set([
        ...EVENTS.map(ev => ev.id),
        ...registrations.map(r => r.eventId)
    ]));

    const byEvent = allEventIds.map(ev => ({
        eventId: ev,
        eventName: filtered.find(r => r.eventId === ev)?.eventName || EVENTS.find(e => e.id === ev)?.name || ev,
        teams: filtered.filter(r => r.eventId === ev),
    })).filter(g => g.teams.length > 0);

    return (
        <div style={{ padding: 28, overflowY: 'auto', height: 'calc(100vh - 65px)' }}>
            <div style={{ display: 'flex', gap: 12, marginBottom: 24, flexWrap: 'wrap' }}>
                <select value={eventFilter} onChange={e => setEventFilter(e.target.value)} style={s.filterSelect}>
                    <option value="all">All Events</option>
                    {allEventIds.map(evId => {
                        const evt = EVENTS.find(e => e.id === evId);
                        const r = registrations.find(x => x.eventId === evId);
                        const name = evt?.name || r?.eventName || evId;
                        return <option key={evId} value={evId}>{name}</option>;
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

// ── Attendance Dashboard ──────────────────────────────────────────────────────
function AttendanceDashboard({ onToast }: { onToast: (m: string) => void }) {
    const [users, setUsers] = useState<AdminUser[]>([]);
    const [loading, setLoading] = useState(true);
    const [paFilter, setPaFilter] = useState<'all' | 'yes' | 'no'>('all');
    const [dinnerFilter, setDinnerFilter] = useState<'all' | 'yes' | 'no'>('all');
    const [certFilter, setCertFilter] = useState<'all' | 'yes' | 'no'>('all');
    const [search, setSearch] = useState('');

    useEffect(() => {
        fetch('/api/addmin/usersv2')
            .then(r => r.json())
            .then(d => setUsers(d.users || []))
            .catch(() => onToast('Failed to load'))
            .finally(() => setLoading(false));
    }, [onToast]);

    const filtered = users.filter(u => {
        if (paFilter === 'yes' && !u.PA) return false;
        if (paFilter === 'no' && u.PA) return false;
        if (dinnerFilter === 'yes' && !u.DinnerTaken) return false;
        if (dinnerFilter === 'no' && u.DinnerTaken) return false;
        if (certFilter === 'yes' && !u.Certificate) return false;
        if (certFilter === 'no' && u.Certificate) return false;
        if (search) {
            const q = search.toLowerCase();
            return u.name.toLowerCase().includes(q) || u.registrationId.toLowerCase().includes(q) || u.college.toLowerCase().includes(q);
        }
        return true;
    });

    const paCount = users.filter(u => u.PA).length;
    const dinnerCount = users.filter(u => u.DinnerTaken).length;
    const certCount = users.filter(u => u.Certificate).length;

    const fStyle: React.CSSProperties = { background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)', color: '#ccc', borderRadius: 10, padding: '10px 14px', fontSize: 13, outline: 'none', cursor: 'pointer' };

    return (
        <div style={{ padding: '20px 16px 100px', background: '#050a19', minHeight: 'calc(100vh - 65px)', color: '#ccc', fontFamily: 'system-ui,sans-serif', boxSizing: 'border-box' }}>

            {/* Summary Counts */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginBottom: 20 }}>
                {[
                    { label: '✅ Present', val: paCount, color: '#32dc64', bg: 'rgba(50,220,100,0.1)' },
                    { label: '🍽 Dinner', val: dinnerCount, color: '#ffc832', bg: 'rgba(255,200,50,0.1)', disabled: !ENABLE_DINNER },
                    { label: '📜 Certificate', val: certCount, color: '#a78bfa', bg: 'rgba(124,58,237,0.1)', disabled: !ENABLE_CERTIFICATE },
                ].map(({ label, val, color, bg, disabled }) => (
                    <div key={label} style={{ background: bg, borderRadius: 12, padding: '12px 8px', textAlign: 'center', opacity: disabled ? 0.4 : 1 }}>
                        <div style={{ color, fontSize: 22, fontWeight: 700 }}>{val}</div>
                        <div style={{ color: '#889', fontSize: 11, marginTop: 2 }}>{label}{disabled ? ' (soon)' : ''}</div>
                    </div>
                ))}
            </div>

            {/* Filters */}
            <div style={{ display: 'flex', gap: 8, marginBottom: 14, flexWrap: 'wrap' }}>
                <select value={paFilter} onChange={e => setPaFilter(e.target.value as any)} style={fStyle}>
                    <option value="all">✅ PA: All</option>
                    <option value="yes">Present only</option>
                    <option value="no">Absent only</option>
                </select>
                <select value={dinnerFilter} onChange={e => ENABLE_DINNER && setDinnerFilter(e.target.value as any)} disabled={!ENABLE_DINNER} style={{ ...fStyle, opacity: ENABLE_DINNER ? 1 : 0.4 }}>
                    <option value="all">🍽 Dinner: All</option>
                    <option value="yes">Taken only</option>
                    <option value="no">Not taken</option>
                </select>
                <select value={certFilter} onChange={e => ENABLE_CERTIFICATE && setCertFilter(e.target.value as any)} disabled={!ENABLE_CERTIFICATE} style={{ ...fStyle, opacity: ENABLE_CERTIFICATE ? 1 : 0.4 }}>
                    <option value="all">📜 Cert: All</option>
                    <option value="yes">Issued only</option>
                    <option value="no">Not issued</option>
                </select>
                <button onClick={() => window.open('/api/addmin/attendance-export', '_blank')} style={{ background: 'rgba(50,220,100,0.15)', border: '1px solid rgba(50,220,100,0.3)', color: '#32dc64', borderRadius: 10, padding: '10px 16px', cursor: 'pointer', fontSize: 13, fontWeight: 600 }}>
                    📊 Export Attendance
                </button>
            </div>

            <input placeholder="Search name / ID / college…" value={search} onChange={e => setSearch(e.target.value)} style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, color: '#ccc', padding: '10px 14px', fontSize: 13, outline: 'none', marginBottom: 14, boxSizing: 'border-box' }} />

            <div style={{ color: '#4fd1ff', fontSize: 12, marginBottom: 10 }}>{filtered.length} of {users.length} participants</div>

            {loading ? <div style={s.loadingText}>Loading…</div> : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {filtered.map(u => (
                        <div key={u.registrationId} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 12, padding: '12px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                            <div>
                                <div style={{ color: '#ddd', fontWeight: 600, fontSize: 14 }}>{u.name}</div>
                                <div style={{ color: '#4fd1ff', fontSize: 11, letterSpacing: 1 }}>{u.registrationId}</div>
                                <div style={{ color: '#556', fontSize: 11 }}>{u.college}</div>
                            </div>
                            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                                <span style={{ padding: '3px 10px', borderRadius: 20, fontSize: 11, fontWeight: 700, background: u.PA ? 'rgba(50,220,100,0.15)' : 'rgba(255,255,255,0.06)', color: u.PA ? '#32dc64' : '#556' }}>
                                    {u.PA ? '✅ Present' : 'Absent'}
                                </span>
                                <span style={{ padding: '3px 10px', borderRadius: 20, fontSize: 11, fontWeight: 700, background: ENABLE_DINNER && u.DinnerTaken ? 'rgba(255,200,50,0.15)' : 'rgba(255,255,255,0.06)', color: ENABLE_DINNER && u.DinnerTaken ? '#ffc832' : '#556', opacity: ENABLE_DINNER ? 1 : 0.4 }}>
                                    {u.DinnerTaken ? '🍽 Dinner' : 'No Dinner'}
                                </span>
                                <span style={{ padding: '3px 10px', borderRadius: 20, fontSize: 11, fontWeight: 700, background: ENABLE_CERTIFICATE && u.Certificate ? 'rgba(124,58,237,0.15)' : 'rgba(255,255,255,0.06)', color: ENABLE_CERTIFICATE && u.Certificate ? '#a78bfa' : '#556', opacity: ENABLE_CERTIFICATE ? 1 : 0.4 }}>
                                    {u.Certificate ? '📜 Cert' : 'No Cert'}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
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

    dashLayout: { display: 'flex', minHeight: 'calc(100vh - 65px)', flexDirection: 'row' },
    sidebar: { width: 360, minWidth: 280, maxWidth: '100%', borderRight: '1px solid rgba(255,255,255,0.08)', display: 'flex', flexDirection: 'column', overflow: 'hidden' },
    mobileNav: { display: 'flex', position: 'fixed', bottom: 0, left: 0, right: 0, background: 'rgba(5,10,25,0.97)', borderTop: '1px solid rgba(255,255,255,0.08)', zIndex: 200, padding: '6px 0 8px' },
    mobileNavBtn: { flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'transparent', border: 'none', color: '#667', cursor: 'pointer', padding: '4px 0', gap: 2, fontFamily: 'system-ui,sans-serif' },
    mobileNavBtnActive: { color: '#4fd1ff' },
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
