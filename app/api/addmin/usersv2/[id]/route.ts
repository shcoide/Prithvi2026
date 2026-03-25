import { NextRequest, NextResponse } from 'next/server';
import { getUserV2ByRegistrationId } from '@/lib/db';
import { verifyAdminCookie, unauthorizedResponse } from '../../adminAuth';

export async function GET(
    req: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    if (!verifyAdminCookie(req)) return unauthorizedResponse();

    const { id } = await context.params;   // ✅ MUST await here

    const user = await getUserV2ByRegistrationId(id);

    if (!user) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ user });
}