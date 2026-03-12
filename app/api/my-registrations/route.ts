import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import { getRegistrationsByParticipant } from '@/lib/db';

export async function GET(req: NextRequest) {
    try {
        const token = req.cookies.get('prithvi_token')?.value;
        if (!token) return NextResponse.json({ error: 'Login required' }, { status: 401 });
        const payload = verifyToken(token);
        if (!payload) return NextResponse.json({ error: 'Invalid session' }, { status: 401 });

        const registrations = await getRegistrationsByParticipant(payload.registrationId);

        // Tag each registration with whether user is captain or was added by someone else
        const enriched = registrations.map((r) => ({
            ...r,
            isCaptain: r.registeredBy === payload.registrationId,
        }));

        return NextResponse.json({ registrations: enriched });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: 'Failed' }, { status: 500 });
    }
}
