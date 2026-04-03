'use client';

export default function SchedulePage() {
    return (
        <div style={sc.page}>

            {/* Header */}
            <div style={sc.header}>
                <h1 style={sc.title}>📅 Schedule</h1>
                <div style={sc.tabs}>
                    <div style={{ ...sc.tab, ...sc.tabActive }}>Day 1</div>
                    <div style={{ ...sc.tab, ...sc.tabDisabled }}>Day 2 <span style={sc.soon}>soon</span></div>
                    <div style={{ ...sc.tab, ...sc.tabDisabled }}>Day 3 <span style={sc.soon}>soon</span></div>
                </div>
            </div>

            {/* Schedule Image */}
            <div style={sc.imgWrapper}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src="/assets/images/schedule/SCHEDULE_Day1.jpeg"
                    alt="Schedule Day 1"
                    style={sc.img}
                />
            </div>

            {/* Download */}
            <a
                href="/assets/images/schedule/SCHEDULE_Day1.pdf"
                download="Prithvi2026_Schedule_Day1.pdf"
                style={sc.downloadBtn}
            >
                ⬇️ Download PDF
            </a>

        </div>
    );
}

const sc: Record<string, React.CSSProperties> = {
    page: {
        minHeight: '100vh',
        background: '#050a19',
        color: '#ccd',
        fontFamily: 'system-ui, sans-serif',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '28px 12px 60px',
        boxSizing: 'border-box',
        gap: 18,
    },
    header: {
        width: '100%',
        maxWidth: 720,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 14,
    },
    title: {
        color: '#fff',
        fontSize: 'clamp(20px, 4vw, 32px)',
        fontWeight: 800,
        margin: 0,
        background: 'linear-gradient(135deg, #4fd1ff, #7c3aed)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
    },
    tabs: {
        display: 'flex',
        gap: 6,
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: 14,
        padding: 5,
    },
    tab: {
        padding: '7px 20px',
        borderRadius: 10,
        fontSize: 13,
        fontWeight: 600,
        userSelect: 'none',
        display: 'flex',
        alignItems: 'center',
        gap: 4,
    },
    tabActive: {
        background: 'linear-gradient(135deg, rgba(79,209,255,0.15), rgba(124,58,237,0.2))',
        border: '1px solid rgba(79,209,255,0.35)',
        color: '#4fd1ff',
        cursor: 'default',
    },
    tabDisabled: {
        color: '#445',
        cursor: 'not-allowed',
    },
    soon: {
        fontSize: 9,
        background: 'rgba(255,255,255,0.06)',
        borderRadius: 6,
        padding: '1px 5px',
        color: '#556',
    },
    imgWrapper: {
        width: '100%',
        maxWidth: 720,
        borderRadius: 16,
        overflow: 'hidden',
        border: '1px solid rgba(255,255,255,0.1)',
        boxShadow: '0 8px 40px rgba(0,0,0,0.5)',
        background: '#fff',
        lineHeight: 0, // removes bottom gap under img
    },
    img: {
        width: '100%',
        height: 'auto',
        display: 'block',
        objectFit: 'contain',
    },
    downloadBtn: {
        background: 'rgba(79,209,255,0.08)',
        border: '1px solid rgba(79,209,255,0.25)',
        color: '#4fd1ff',
        borderRadius: 12,
        padding: '10px 24px',
        fontSize: 13,
        fontWeight: 600,
        textDecoration: 'none',
    },
};
