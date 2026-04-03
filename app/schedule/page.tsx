'use client';

import { useState } from 'react';

export default function SchedulePage() {
    const [day, setDay] = useState<1 | 2>(1);

    const scheduleImages: Record<1 | 2, string> = {
        1: '/assets/images/schedule/SCHEDULE_Day1.jpeg',
        2: '/assets/images/schedule/SCHEDULE_Day2.jpeg',
    };

    return (
        <div style={sc.page}>

            {/* Header */}
            <div style={sc.header}>
                <h1 style={sc.title}>📅 Schedule</h1>
                <div style={sc.tabs}>
                    <button
                        style={{ ...sc.tab, ...(day === 1 ? sc.tabActive : sc.tabInactive) }}
                        onClick={() => setDay(1)}
                    >
                        Day 1
                    </button>
                    <button
                        style={{ ...sc.tab, ...(day === 2 ? sc.tabActive : sc.tabInactive) }}
                        onClick={() => setDay(2)}
                    >
                        Day 2
                    </button>
                    <div style={{ ...sc.tab, ...sc.tabDisabled }}>
                        Day 3 <span style={sc.soon}>soon</span>
                    </div>
                </div>
            </div>

            {/* Schedule Image */}
            <div style={sc.imgWrapper}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    key={day}
                    src={scheduleImages[day]}
                    alt={`Schedule Day ${day}`}
                    style={sc.img}
                />
            </div>

            {/* Download — only Day 1 has a PDF */}
            {day === 1 && (
                <a
                    href="/assets/images/schedule/SCHEDULE_Day1.pdf"
                    download="Prithvi2026_Schedule_Day1.pdf"
                    style={sc.downloadBtn}
                >
                    ⬇️ Download Day 1 PDF
                </a>
            )}

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
        border: 'none',
        cursor: 'pointer',
        transition: 'all 0.2s',
        background: 'transparent',
    },
    tabActive: {
        background: 'linear-gradient(135deg, rgba(79,209,255,0.15), rgba(124,58,237,0.2))',
        border: '1px solid rgba(79,209,255,0.35)',
        color: '#4fd1ff',
    },
    tabInactive: {
        color: '#889',
        background: 'transparent',
    },
    tabDisabled: {
        padding: '7px 20px',
        borderRadius: 10,
        fontSize: 13,
        fontWeight: 600,
        userSelect: 'none',
        display: 'flex',
        alignItems: 'center',
        gap: 4,
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
        lineHeight: 0,
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
