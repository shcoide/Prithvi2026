import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';

export async function GET(req: NextRequest) {
    try {
        const token = req.cookies.get('prithvi_token')?.value;
        if (!token) {
            return NextResponse.json({ user: null }, { status: 401 });
        }

        const payload = verifyToken(token);
        if (!payload) {
            return NextResponse.json({ user: null }, { status: 401 });
        }

        return NextResponse.json({
            user: {
                registrationId: payload.registrationId,
                email: payload.email,
                name: payload.name,
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
