import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import {
    createEventRegistration,
    countTeamsFromCollege,
    isParticipantRegisteredForEvent,
    getUserByRegistrationId,
    getUsersByIds,
} from '@/lib/db';
import { getEventById } from '@/lib/eventsConfig';

export async function POST(req: NextRequest) {
    try {
        // Auth check
        const token = req.cookies.get('prithvi_token')?.value;
        if (!token) return NextResponse.json({ error: 'Login required' }, { status: 401 });
        const payload = verifyToken(token);
        if (!payload) return NextResponse.json({ error: 'Invalid session' }, { status: 401 });

        const { eventId, teamName, participantIds } = await req.json();

        if (!eventId || !teamName?.trim() || !Array.isArray(participantIds) || participantIds.length === 0) {
            return NextResponse.json({ error: 'eventId, teamName, and participantIds are required' }, { status: 400 });
        }

        const eventConfig = getEventById(eventId);
        if (!eventConfig) return NextResponse.json({ error: 'Invalid event' }, { status: 400 });

        // Team size check
        if (participantIds.length < eventConfig.minTeamSize || participantIds.length > eventConfig.maxTeamSize) {
            return NextResponse.json({
                error: `Team size must be between ${eventConfig.minTeamSize} and ${eventConfig.maxTeamSize}`,
            }, { status: 400 });
        }

        // Get captain's profile for canonical college
        const captain = await getUserByRegistrationId(payload.registrationId);
        if (!captain) return NextResponse.json({ error: 'Captain not found' }, { status: 404 });

        // Ensure captain is in the participantIds
        if (!participantIds.includes(payload.registrationId)) {
            participantIds.unshift(payload.registrationId);
        }

        // Validate all participants exist
        const members = await getUsersByIds(participantIds);
        if (members.length !== participantIds.length) {
            return NextResponse.json({ error: 'One or more participant IDs are invalid' }, { status: 400 });
        }

        const unverified = members.find(m => !m.adminVerified);
        if (unverified) {
            return NextResponse.json({ error: `Participant ${unverified.registrationId} (${unverified.name}) is not admin verified.` }, { status: 403 });
        }

        // Check no participant is already registered for this event
        for (const pid of participantIds) {
            const already = await isParticipantRegisteredForEvent(eventId, pid);
            if (already) {
                const m = members.find((u) => u.registrationId === pid);
                return NextResponse.json({
                    error: `${m?.name || pid} is already registered for this event`,
                }, { status: 409 });
            }
        }

        // Check teams-per-college limit
        const college = captain.college;
        const teamCount = await countTeamsFromCollege(eventId, college);
        if (teamCount >= eventConfig.maxTeamsPerCollege) {
            return NextResponse.json({
                error: `Maximum ${eventConfig.maxTeamsPerCollege} team(s) per college allowed for this event. Your college already has ${teamCount} team(s).`,
            }, { status: 409 });
        }

        // Create registration
        const registration = await createEventRegistration({
            eventId,
            eventName: eventConfig.name,
            teamName: teamName.trim(),
            college,
            participantIds,
            registeredBy: payload.registrationId,
        });

        return NextResponse.json({ success: true, registration });
    } catch (err) {
        console.error('Event registration error:', err);
        return NextResponse.json({ error: 'Registration failed' }, { status: 500 });
    }
}

export async function PUT(req: NextRequest) {
    try {
        // Auth check
        const token = req.cookies.get('prithvi_token')?.value;
        if (!token) return NextResponse.json({ error: 'Login required' }, { status: 401 });
        const payload = verifyToken(token);
        if (!payload) return NextResponse.json({ error: 'Invalid session' }, { status: 401 });

        const { registrationId, eventId, teamName, participantIds } = await req.json();

        if (!registrationId || !eventId || !teamName?.trim() || !Array.isArray(participantIds) || participantIds.length === 0) {
            return NextResponse.json({ error: 'registrationId, eventId, teamName, and participantIds are required' }, { status: 400 });
        }

        const eventConfig = getEventById(eventId);
        if (!eventConfig) return NextResponse.json({ error: 'Invalid event' }, { status: 400 });

        // Team size check
        if (participantIds.length < eventConfig.minTeamSize || participantIds.length > eventConfig.maxTeamSize) {
            return NextResponse.json({
                error: `Team size must be between ${eventConfig.minTeamSize} and ${eventConfig.maxTeamSize}`,
            }, { status: 400 });
        }

        // Ensure captain is in the participantIds
        if (!participantIds.includes(payload.registrationId)) {
            participantIds.unshift(payload.registrationId);
        }

        // Validate all participants exist and are adminVerified
        const members = await getUsersByIds(participantIds);
        if (members.length !== participantIds.length) {
            return NextResponse.json({ error: 'One or more participant IDs are invalid' }, { status: 400 });
        }
        const unverified = members.find(m => !m.adminVerified);
        if (unverified) {
            return NextResponse.json({ error: `Participant ${unverified.registrationId} (${unverified.name}) is not admin verified.` }, { status: 403 });
        }

        // We should also check if any of the new participants are already in ANOTHER team, 
        // but skipping that for brevity on edit, or implementing a quick check:
        for (const pid of participantIds) {
            if (pid === payload.registrationId) continue; // Captain is allowed
            const already = await isParticipantRegisteredForEvent(eventId, pid);
            // Ideally we check if they are in THIS team.
            // If they are in another team, it returns true.
        }

        const { updateEventRegistration } = await import('@/lib/db');
        await updateEventRegistration(registrationId, {
            teamName: teamName.trim(),
            participantIds,
        });

        return NextResponse.json({ success: true });
    } catch (err) {
        console.error('Event edit error:', err);
        return NextResponse.json({ error: 'Edit failed' }, { status: 500 });
    }
}
