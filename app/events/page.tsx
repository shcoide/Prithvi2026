'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from '../components/AuthContext';
import { EVENTS } from '@/lib/eventsConfig';

export default function EventsPage() {
    const router = useRouter();
    const { user, loading } = useAuth();

    function handleRegister(eventId: string) {
        if (!user) {
            router.push(`/login?next=/event-register?eventId=${eventId}`);
        } else {
            router.push(`/event-register?eventId=${eventId}`);
        }
    }

    return (
        <>
            <section className="page-header">
                <h1>Events at Prithvi 2026</h1>
                <p>Competitions, workshops, lectures &amp; more — 3 to 5 April 2026</p>
            </section>

            <section className="events-container">
                {EVENTS.map((event, i) => (
                    <div key={event.id} className={`event-card ${i % 2 !== 0 ? 'reverse' : ''}`} style={{ display: 'flex', flexWrap: 'wrap', gap: '32px', alignItems: 'center' }}>
                        {/* Image linked to rules PDF */}
                        <div style={{ flex: '1 1 300px', cursor: 'pointer', textAlign: 'center' }}>
                            <a href={event.ruleBookUrl} target="_blank" rel="noopener noreferrer" title="Click to open rulebook">
                                {/* Using a standard img tag with styling, as Next/Image needs strict width/height sometimes */}
                                <img
                                    src={event.imageUrl}
                                    alt={`${event.name} Event`}
                                    style={{ width: '100%', maxWidth: '400px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', objectFit: 'cover' }}
                                />
                            </a>
                            <p style={{ marginTop: '10px', fontSize: '13px', color: '#889', fontStyle: 'italic' }}>
                                Click on image to know the rules
                            </p>
                        </div>

                        {/* Event Details */}
                        <div className="event-text" style={{ flex: '2 1 400px' }}>
                            <h2>{event.name}</h2>
                            <div className="event-meta">
                                <span style={{ background: 'rgba(79, 209, 255, 0.15)', border: '1px solid rgba(79, 209, 255, 0.4)', color: '#4fd1ff', padding: '4px 12px', borderRadius: '999px', fontSize: '12px', fontWeight: 700, letterSpacing: '1px' }}>{event.category}</span>
                                <span>📅 {event.date}</span>
                            </div>
                            <p>{event.description}</p>
                            {!loading && (
                                <button
                                    className="btn"
                                    style={{ marginTop: '24px', fontSize: '15px', padding: '12px 24px' }}
                                    onClick={() => handleRegister(event.id)}
                                >
                                    {user ? '📋 Register for Event' : '🔐 Login to Register'}
                                </button>
                            )}
                        </div>
                    </div>
                ))}

                <div style={{ textAlign: 'center', marginTop: '40px', marginBottom: '20px', padding: '10px' }}>
                    <h3 style={{ color: '#889', fontSize: '1.4rem', fontWeight: 500, fontStyle: 'italic', letterSpacing: '1px' }}>
                        More events coming soon...
                    </h3>
                </div>
            </section>
        </>
    );
}
