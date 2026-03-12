import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import { getUserByRegistrationId, getAllUsers } from '@/lib/db';

export async function GET(req: NextRequest) {
    try {
        const token = req.cookies.get('prithvi_token')?.value;
        if (!token) return NextResponse.json({ error: 'Login required' }, { status: 401 });
        const payload = verifyToken(token);
        if (!payload) return NextResponse.json({ error: 'Invalid session' }, { status: 401 });

        const user = await getUserByRegistrationId(payload.registrationId);
        if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });

        const eventId = req.nextUrl.searchParams.get('eventId');

        // Return all participants from same college
        const all = await getAllUsers();
        let sameCollegeUsers = all.filter((u) => u.adminVerified && u.college.toLowerCase() === user.college.toLowerCase());

        // If eventId is provided, filter out those already registered for this specific event
        if (eventId) {
            const { getRegistrationsByEvent } = await import('@/lib/db');
            const eventRegs = await getRegistrationsByEvent(eventId);
            // Collect all participant IDs that are already in ANY team for THIS event
            const alreadyRegisteredIds = new Set(eventRegs.flatMap(r => r.participantIds));

            sameCollegeUsers = sameCollegeUsers.filter(u => !alreadyRegisteredIds.has(u.registrationId));
        }

        const sameCollege = sameCollegeUsers.map((u) => ({
            registrationId: u.registrationId,
            name: u.name,
            college: u.college,
            gender: u.gender,
        }));

        return NextResponse.json({
            college: user.college,
            participants: sameCollege,
        });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: 'Failed' }, { status: 500 });
    }
}
