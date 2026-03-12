'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '../components/AuthContext';
import { EVENTS } from '@/lib/eventsConfig';

interface Participant {
    registrationId: string;
    name: string;
    college: string;
    gender: string;
}

interface TeamRegistration {
    _id: string;
    eventId: string;
    eventName: string;
    teamName: string;
    college: string;
    registeredBy: string;
    registeredAt: string;
    participantIds: string[];
    isCaptain?: boolean;
}

export default function EventRegisterForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { user, loading: authLoading } = useAuth();

    const [selectedEventId, setSelectedEventId] = useState(searchParams.get('eventId') || '');
    const [teamName, setTeamName] = useState('');
    const [selectedParticipants, setSelectedParticipants] = useState<string[]>([]);
    const [collegeParticipants, setCollegeParticipants] = useState<Participant[]>([]);
    const [college, setCollege] = useState('');
    const [existingTeams, setExistingTeams] = useState<TeamRegistration[]>([]);
    const [myRegistrations, setMyRegistrations] = useState<TeamRegistration[]>([]);
    const [loadingParticipants, setLoadingParticipants] = useState(false);
    const [loadingTeams, setLoadingTeams] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [editingRegId, setEditingRegId] = useState<string | null>(null);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        if (!authLoading && !user) {
            const eventId = searchParams.get('eventId');
            router.push(`/login${eventId ? `?next=/event-register?eventId=${eventId}` : ''}`);
        }
    }, [user, authLoading, router, searchParams]);

    const loadCollegeParticipants = useCallback(async (eventId: string) => {
        if (!user || !eventId) return;
        setLoadingParticipants(true);
        try {
            const res = await fetch(`/api/participants/by-college?eventId=${eventId}`);
            if (!res.ok) return;
            const data = await res.json();
            setCollege(data.college);
            setCollegeParticipants(data.participants || []);
            setSelectedParticipants([user.registrationId]);
        } finally { setLoadingParticipants(false); }
    }, [user]);

    const loadTeamData = useCallback(async (eventId: string) => {
        if (!user || !eventId) return;
        setLoadingTeams(true);
        try {
            const [teamsRes, myRes] = await Promise.all([
                fetch(`/api/event-register/${eventId}?myCollege=true`),
                fetch('/api/my-registrations'),
            ]);
            if (teamsRes.ok) { const d = await teamsRes.json(); setExistingTeams(d.registrations || []); }
            if (myRes.ok) { const d = await myRes.json(); setMyRegistrations(d.registrations || []); }
        } finally { setLoadingTeams(false); }
    }, [user]);

    useEffect(() => { if (selectedEventId) loadCollegeParticipants(selectedEventId); }, [loadCollegeParticipants, selectedEventId]);
    useEffect(() => { if (selectedEventId && !editingRegId) loadTeamData(selectedEventId); }, [selectedEventId, loadTeamData, editingRegId]);

    function toggleParticipant(id: string) {
        if (id === user?.registrationId) return;
        setSelectedParticipants((prev) => prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]);
    }

    const selectedEvent = EVENTS.find((e) => e.id === selectedEventId);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError(''); setSuccess('');
        if (!selectedEventId) { setError('Please select an event.'); return; }

        const isIndividual = selectedEvent?.maxTeamSize === 1;
        const finalTeamName = isIndividual ? user!.name : teamName;

        if (!finalTeamName.trim()) { setError('Please enter a team name.'); return; }
        if (selectedParticipants.length === 0) { setError('Please select at least one participant.'); return; }

        setSubmitting(true);
        try {
            const method = editingRegId ? 'PUT' : 'POST';
            const body = editingRegId
                ? { registrationId: editingRegId, eventId: selectedEventId, teamName: finalTeamName, participantIds: selectedParticipants }
                : { eventId: selectedEventId, teamName: finalTeamName, participantIds: selectedParticipants };

            const res = await fetch('/api/event-register', {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error);
            setSuccess(editingRegId ? `🎉 Registration updated successfully!` : `🎉 Team "${finalTeamName}" registered successfully for ${selectedEvent?.name}!`);

            if (!editingRegId) {
                setTeamName('');
                setSelectedParticipants([user!.registrationId]);
            } else {
                setEditingRegId(null);
            }

            loadTeamData(selectedEventId);
            const myRes = await fetch('/api/my-registrations');
            if (myRes.ok) { const d = await myRes.json(); setMyRegistrations(d.registrations || []); }
        } catch (err: unknown) {
            setError((err as Error).message || (editingRegId ? 'Update failed' : 'Registration failed'));
        } finally { setSubmitting(false); }
    }

    function handleEdit(reg: TeamRegistration) {
        setEditingRegId(String(reg._id));
        setSelectedEventId(reg.eventId);
        setTeamName(reg.teamName);
        setSelectedParticipants(reg.participantIds);
        window.scrollTo({ top: 300, behavior: 'smooth' });
        setError(''); setSuccess('');
    }

    const alreadyRegistered = myRegistrations.find((r) => r.eventId === selectedEventId);

    if (authLoading) return <div style={{ minHeight: '100vh', background: '#050a19', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>Loading…</div>;
    if (!user) return null;

    return (
        <div style={s.page}>
            <div style={s.container}>
                <div style={s.header}>
                    <div style={s.headerIcon}>🏆</div>
                    <h1 style={s.title}>Register for an Event</h1>
                    <p style={s.subtitle}>
                        Logged in as <strong style={{ color: '#4fd1ff' }}>{user.name}</strong> ({user.registrationId})
                    </p>
                </div>

                {myRegistrations.length > 0 && (
                    <div style={s.myRegsSection}>
                        <h3 style={s.sectionTitle}>📋 Your Event Registrations</h3>
                        <div style={s.myRegsList}>
                            {myRegistrations.map((r) => (
                                <div key={String(r._id)} style={s.myRegCard}>
                                    <div style={{ flex: 1 }}>
                                        <div style={s.myRegEvent}>{r.eventName}</div>
                                        <div style={s.myRegTeam}>Team: <strong>{r.teamName}</strong></div>
                                        {r.isCaptain
                                            ? <span style={s.captainBadge}>👑 You registered this team</span>
                                            : <span style={s.memberBadge}>➕ Added by {r.registeredBy}</span>}
                                    </div>
                                    {r.isCaptain && (
                                        <button type="button" onClick={() => handleEdit(r)} style={{ ...s.editBtn, cursor: 'pointer' }}>
                                            ✏️ Edit
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <form onSubmit={handleSubmit} style={s.form}>
                    <div style={s.formGroup}>
                        <label style={s.label}>1. Selected Event</label>
                        <input
                            type="text"
                            value={selectedEvent ? `${selectedEvent.category}: ${selectedEvent.name} (${selectedEvent.date})` : 'Loading event...'}
                            readOnly
                            style={{ ...s.input, opacity: 0.7, cursor: 'not-allowed', fontWeight: 'bold' }}
                        />
                        {selectedEvent && (
                            <p style={s.hint}>Team size: {selectedEvent.minTeamSize}–{selectedEvent.maxTeamSize} | Max {selectedEvent.maxTeamsPerCollege} team(s) per college. To change events, visit the Events page.</p>
                        )}
                    </div>

                    {alreadyRegistered && !editingRegId && (
                        <div style={s.warningBox}>
                            ⚠️ You are already in team <strong>"{alreadyRegistered.teamName}"</strong> for this event.
                            {!alreadyRegistered.isCaptain && <> (Added by {alreadyRegistered.registeredBy})</>}
                        </div>
                    )}

                    {editingRegId && (
                        <div style={s.warningBox}>
                            ✏️ <strong>Editing team "{alreadyRegistered?.teamName}"</strong>. Submit to save changes.
                            <button type="button" onClick={() => setEditingRegId(null)} style={{ float: 'right', background: 'transparent', border: 'none', color: '#ff6b6b', cursor: 'pointer', fontWeight: 'bold' }}>Cancel</button>
                        </div>
                    )}

                    {!(selectedEvent?.maxTeamSize === 1) && (
                        <div style={s.formGroup}>
                            <label style={s.label}>2. Team Name</label>
                            <input type="text" placeholder="Enter your team name" value={teamName} onChange={(e) => setTeamName(e.target.value)} style={s.input} required={selectedEvent?.maxTeamSize !== 1} />
                        </div>
                    )}

                    <div style={s.formGroup}>
                        <label style={s.label}>{selectedEvent?.maxTeamSize === 1 ? '2.' : '3.'} Your College</label>
                        <input type="text" value={college || 'Loading…'} readOnly style={{ ...s.input, opacity: 0.7, cursor: 'not-allowed' }} />
                        <p style={s.hint}>Auto-filled from your profile.{selectedEvent?.maxTeamSize !== 1 && ' Select team members from your college below.'}</p>
                    </div>

                    {!(selectedEvent?.maxTeamSize === 1) && (
                        <div style={s.formGroup}>
                            <label style={s.label}>4. Select Participants from {college || 'Your College'}</label>
                            <div style={s.dropdownContainer}>
                                <select
                                    className="custom-participant-select"
                                    onChange={(e) => {
                                        if (e.target.value) {
                                            toggleParticipant(e.target.value);
                                            e.target.value = ""; // Reset after selection
                                        }
                                    }}
                                    style={s.input}
                                    defaultValue=""
                                >
                                    <option value="" disabled>➕ Click to add a participant from your college...</option>
                                    {collegeParticipants.map(p => {
                                        const isSelected = selectedParticipants.includes(p.registrationId);
                                        const isSelf = p.registrationId === user.registrationId;
                                        if (isSelected || isSelf) return null; // Hide already selected members from the dropdown
                                        return (
                                            <option key={p.registrationId} value={p.registrationId}>
                                                {p.name} ({p.registrationId}) - {p.gender}
                                            </option>
                                        );
                                    })}
                                </select>

                                <div style={s.participantList}>
                                    {selectedParticipants.map(pid => {
                                        const p = collegeParticipants.find(c => c.registrationId === pid);
                                        if (!p) return null;
                                        const isSelf = p.registrationId === user.registrationId;

                                        return (
                                            <div key={p.registrationId} style={s.selectedMemberCard}>
                                                <div>
                                                    <div style={s.chipName}>{p.name} {isSelf && <span style={s.selfLabel}>You</span>}</div>
                                                    <div style={s.chipId}>{p.registrationId}</div>
                                                </div>
                                                {!isSelf && (
                                                    <button type="button" onClick={() => toggleParticipant(p.registrationId)} style={s.removeBtn}>
                                                        ❌ Remove
                                                    </button>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                            <p style={s.selectedCount}>{selectedParticipants.length} participant{selectedParticipants.length !== 1 ? 's' : ''} selected</p>
                        </div>
                    )}

                    {error && <div style={s.errorBox}>{error}</div>}
                    {success && <div style={s.successBox}>{success}</div>}

                    <button type="submit" style={{ ...s.submitBtn, ...(submitting || (!!alreadyRegistered && !editingRegId) ? { opacity: 0.5, cursor: 'not-allowed' } : {}) }} disabled={submitting || (!!alreadyRegistered && !editingRegId)}>
                        {submitting ? (editingRegId ? 'Updating…' : 'Registering…') : (editingRegId ? '💾 Update Registration' : alreadyRegistered ? 'Already Registered' : '✅ Submit Registration')}
                    </button>
                </form>

                {selectedEventId && (
                    <div style={s.teamsSection}>
                        <h3 style={s.sectionTitle}>🏫 Teams from {college || 'Your College'} — {selectedEvent?.name}</h3>
                        {loadingTeams ? <div style={s.loadingText}>Loading…</div> : existingTeams.length === 0 ? (
                            <p style={s.noTeams}>No teams from your college registered yet for this event.</p>
                        ) : (
                            <div style={s.teamsList}>
                                {existingTeams.map((team) => (
                                    <div key={String(team._id)} style={s.teamCard}>
                                        <div style={s.teamName}>{team.teamName}</div>
                                        <div style={s.teamMeta}>Captain: {team.registeredBy}</div>
                                        <div style={s.teamMembers}>Members: {team.participantIds.join(', ')}</div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

const s: Record<string, React.CSSProperties> = {
    page: { minHeight: '100vh', background: '#050a19', padding: '40px 16px', fontFamily: 'system-ui, sans-serif' },
    container: { maxWidth: 760, margin: '0 auto' },
    header: { textAlign: 'center', marginBottom: 40 },
    headerIcon: { fontSize: 56, marginBottom: 12 },
    title: { color: '#fff', fontSize: 32, fontWeight: 800, margin: '0 0 8px' },
    subtitle: { color: '#668', fontSize: 15, margin: 0 },
    myRegsSection: { background: 'rgba(79,209,255,0.05)', border: '1px solid rgba(79,209,255,0.15)', borderRadius: 14, padding: 20, marginBottom: 28 },
    sectionTitle: { color: '#fff', fontSize: 17, fontWeight: 700, margin: '0 0 14px' },
    myRegsList: { display: 'flex', flexDirection: 'column', gap: 10 },
    myRegCard: { background: 'rgba(255,255,255,0.04)', borderRadius: 10, padding: '12px 16px', display: 'flex', flexDirection: 'row', alignItems: 'center' },
    myRegEvent: { color: '#4fd1ff', fontWeight: 700, fontSize: 14, marginBottom: 4 },
    myRegTeam: { color: '#ccc', fontSize: 13, marginBottom: 6 },
    editBtn: { background: 'rgba(255,255,255,0.1)', border: 'none', color: '#fff', padding: '6px 12px', borderRadius: 8, fontSize: 12, fontWeight: 600, transition: 'all .15s' },
    captainBadge: { background: 'rgba(255,215,0,0.15)', color: '#ffd700', padding: '2px 10px', borderRadius: 20, fontSize: 11, fontWeight: 700 },
    memberBadge: { background: 'rgba(79,209,255,0.12)', color: '#4fd1ff', padding: '2px 10px', borderRadius: 20, fontSize: 11, fontWeight: 700 },
    form: { background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 18, padding: 32, marginBottom: 32 },
    formGroup: { marginBottom: 24 },
    label: { display: 'block', color: '#aab', fontSize: 13, fontWeight: 700, marginBottom: 8, textTransform: 'uppercase', letterSpacing: 0.5 },
    input: { width: '100%', background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 10, color: '#fff', padding: '13px 16px', fontSize: 15, outline: 'none', boxSizing: 'border-box' },
    hint: { color: '#556', fontSize: 12, marginTop: 6 },
    loadingText: { color: '#445', textAlign: 'center', padding: 20 },
    participantList: { display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 10 },
    participantChip: { display: 'flex', alignItems: 'center', gap: 6, padding: '8px 14px', borderRadius: 10, border: '1px solid', cursor: 'pointer', fontSize: 13, transition: 'all .15s', background: 'transparent' },
    chipSelected: { borderColor: '#4fd1ff', background: 'rgba(79,209,255,0.15)', color: '#4fd1ff' },
    chipUnselected: { borderColor: 'rgba(255,255,255,0.12)', color: '#888' },
    chipSelf: { borderColor: '#ffd700', background: 'rgba(255,215,0,0.1)', color: '#ffd700' },
    chipId: { fontWeight: 700, fontSize: 11, letterSpacing: 0.5 },
    chipName: { fontSize: 13 },
    chipGender: { fontSize: 12 },
    selfLabel: { background: '#ffd700', color: '#000', fontSize: 9, fontWeight: 800, padding: '1px 6px', borderRadius: 8, textTransform: 'uppercase' },
    selectedCount: { color: '#4fd1ff', fontSize: 13, fontWeight: 600, marginTop: 10 },
    warningBox: { background: 'rgba(255,200,50,0.08)', border: '1px solid rgba(255,200,50,0.25)', color: '#ffc832', borderRadius: 10, padding: '12px 16px', fontSize: 13, marginBottom: 20 },
    errorBox: { background: 'rgba(255,80,80,0.08)', border: '1px solid rgba(255,80,80,0.2)', color: '#ff6b6b', borderRadius: 10, padding: '12px 16px', fontSize: 13, marginBottom: 16 },
    successBox: { background: 'rgba(50,220,100,0.08)', border: '1px solid rgba(50,220,100,0.2)', color: '#32dc64', borderRadius: 10, padding: '12px 16px', fontSize: 13, marginBottom: 16 },
    submitBtn: { width: '100%', background: 'linear-gradient(135deg,#4fd1ff,#7c3aed)', color: '#fff', border: 'none', borderRadius: 12, padding: '16px', fontSize: 16, fontWeight: 700, cursor: 'pointer', marginTop: 8 },
    teamsSection: { background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 14, padding: 24 },
    noTeams: { color: '#445', fontSize: 14, textAlign: 'center', margin: 0 },
    teamsList: { display: 'flex', flexDirection: 'column', gap: 10 },
    teamCard: { background: 'rgba(255,255,255,0.04)', borderRadius: 10, padding: '14px 18px' },
    teamName: { color: '#fff', fontWeight: 700, fontSize: 16, marginBottom: 4 },
    teamMeta: { color: '#4fd1ff', fontSize: 12, marginBottom: 4 },
    teamMembers: { color: '#668', fontSize: 12 },
    dropdownContainer: { display: 'flex', flexDirection: 'column', gap: 12 },
    selectedMemberCard: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(79,209,255,0.08)', border: '1px solid rgba(79,209,255,0.2)', padding: '10px 16px', borderRadius: 10 },
    removeBtn: { background: 'rgba(255,100,100,0.15)', color: '#ff6b6b', border: '1px solid rgba(255,100,100,0.3)', borderRadius: 6, padding: '4px 10px', fontSize: 11, cursor: 'pointer', fontWeight: 700 },
};
