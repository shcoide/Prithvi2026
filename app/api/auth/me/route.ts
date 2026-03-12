import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import { getUserByRegistrationId } from '@/lib/db';

export async function GET(req: NextRequest) {
    try {
        const token = req.cookies.get('prithvi_token')?.value;
        if (!token) {
            return NextResponse.json({ user: null }, { status: 401 });
        }

        const payload = verifyToken(token);
        if (!payload || !payload.registrationId) {
            return NextResponse.json({ user: null }, { status: 401 });
        }

        const user = await getUserByRegistrationId(payload.registrationId);
        if (!user || (!user.adminVerified)) {
            const response = NextResponse.json({ user: null, error: 'Pending admin approval' }, { status: 401 });
            response.cookies.set('prithvi_token', '', { maxAge: 0, path: '/' });
            return response;
        }

        return NextResponse.json({
            user: {
                registrationId: user.registrationId,
                email: user.email,
                name: user.name,
            },
        });
    } catch {
        return NextResponse.json({ user: null }, { status: 401 });
    }
}

export async function DELETE() {
    const response = NextResponse.json({ message: 'Logged out' });
    response.cookies.set('prithvi_token', '', { maxAge: 0, path: '/' });
    return response;
}
