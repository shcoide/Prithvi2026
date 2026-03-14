import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import { getRegistrationsByEvent, getRegistrationsByEventAndCollege, getUserByRegistrationId } from '@/lib/db';

export async function GET(req: NextRequest, { params }: { params: Promise<{ eventId: string }> }) {
    try {
        const token = req.cookies.get('prithvi_token')?.value;
        if (!token) return NextResponse.json({ error: 'Login required' }, { status: 401 });
        const payload = verifyToken(token);
        if (!payload) return NextResponse.json({ error: 'Invalid session' }, { status: 401 });

        const { eventId } = await params;
        const myCollege = req.nextUrl.searchParams.get('myCollege');

        let registrations;
        if (myCollege === 'true') {
            const user = await getUserByRegistrationId(payload.registrationId);
            if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });
            registrations = await getRegistrationsByEventAndCollege(eventId, user.college);
        } else {
            registrations = await getRegistrationsByEvent(eventId);
        }

        return NextResponse.json({ registrations });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 });
    }
}
