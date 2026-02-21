import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'prithvi-admin-2026';
const ADMIN_SECRET = process.env.ADMIN_JWT_SECRET || 'prithvi-admin-secret-2026';

export async function POST(req: NextRequest) {
    try {
        const { password } = await req.json();

        if (!password || password !== ADMIN_PASSWORD) {
            // Fake 1-second delay to slow down brute force
            await new Promise((r) => setTimeout(r, 1000));
            return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
        }

        const token = jwt.sign({ role: 'admin' }, ADMIN_SECRET, { expiresIn: '8h' });

        const res = NextResponse.json({ ok: true });
        res.cookies.set('prithvi_admin', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 8 * 60 * 60,
            path: '/',
        });
        return res;
    } catch {
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}
