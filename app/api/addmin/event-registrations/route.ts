import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminCookie, unauthorizedResponse } from '../adminAuth';
import { getAllEventRegistrations, getUsersByIds } from '@/lib/db';

export async function GET(req: NextRequest) {
    try {
        if (!verifyAdminCookie(req)) return unauthorizedResponse();

        const registrations = await getAllEventRegistrations();

        const allIds = [...new Set(registrations.flatMap((r) => r.participantIds))];
        const users = await getUsersByIds(allIds);
        const userMap = Object.fromEntries(users.map((u) => [u.registrationId, u]));

        const enriched = registrations.map((r) => ({
            _id: r._id,
            eventId: r.eventId,
            eventName: r.eventName,
            teamName: r.teamName,
            college: r.college,
            registeredBy: r.registeredBy,
            registeredAt: r.registeredAt,
            participants: r.participantIds.map((id) => ({
                registrationId: id,
                name: userMap[id]?.name || 'Unknown',
                email: userMap[id]?.email || '',
                phone: userMap[id]?.phone || '',
                college: userMap[id]?.college || '',
                gender: userMap[id]?.gender || '',
                isCaptain: id === r.registeredBy,
            })),
        }));

        return NextResponse.json({ registrations: enriched });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: 'Failed' }, { status: 500 });
    }
}
