import { NextRequest, NextResponse } from 'next/server';
import { updateUserV2Fields } from '@/lib/db';
import { verifyAdminCookie, unauthorizedResponse } from '../../adminAuth';

export async function POST(req: NextRequest) {
    if (!verifyAdminCookie(req)) return unauthorizedResponse();

    const body = await req.json();

    const { registrationId, PA, DinnerTaken, Certificate, hall_alloted } = body;

    const ok = await updateUserV2Fields(registrationId, {
        PA,
        DinnerTaken,
        Certificate,
        hall_alloted,
    });

    if (!ok) {
        return NextResponse.json({ error: 'Update failed' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
}