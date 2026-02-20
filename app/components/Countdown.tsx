'use client';

import { useState, useEffect } from 'react';

const FEST_DATE = new Date('Apr 3, 2026 08:00:00').getTime();

export default function Countdown() {
    const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const update = () => {
            const diff = FEST_DATE - Date.now();
            if (diff <= 0) {
                setTime({ days: 0, hours: 0, minutes: 0, seconds: 0 });
                return;
            }
            setTime({
                days: Math.floor(diff / (1000 * 60 * 60 * 24)),
                hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
                seconds: Math.floor((diff % (1000 * 60)) / 1000),
            });
        };
        update();
        const id = setInterval(update, 1000);
        return () => clearInterval(id);
    }, []);

    const units = [
        { label: 'Days', value: time.days },
        { label: 'Hours', value: time.hours },
        { label: 'Minutes', value: time.minutes },
        { label: 'Seconds', value: time.seconds },
    ];

    if (!mounted) return null;

    return (
        <section className="countdown-section">
            <p className="countdown-eyebrow">⏳ Don&apos;t Miss Out</p>
            <h2>Fest Begins In</h2>
            <p className="countdown-date-label">3 April 2026 · IIT Kharagpur</p>
            <div className="countdown">
                {units.map((u, i) => (
                    <div key={u.label} className="countdown-block">
                        <div className="countdown-unit">
                            <div className="countdown-value">{String(u.value).padStart(2, '0')}</div>
                            <div className="countdown-label">{u.label}</div>
                        </div>
                        {i < units.length - 1 && <span className="countdown-sep">:</span>}
                    </div>
                ))}
            </div>
        </section>
    );
}
