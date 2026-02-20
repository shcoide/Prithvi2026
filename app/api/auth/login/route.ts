import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { getUserByRegistrationId } from '@/lib/db';
import { signToken } from '@/lib/auth';

export async function POST(req: NextRequest) {
    try {
        const { registrationId, password } = await req.json();

        if (!registrationId || !password) {
            return NextResponse.json({ error: 'Registration ID and password required' }, { status: 400 });
        }

        const user = getUserByRegistrationId(registrationId.trim().toUpperCase());
        if (!user) {
            return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
        }

        const passwordMatch = await bcrypt.compare(password, user.passwordHash);
        if (!passwordMatch) {
            return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
        }

        const token = signToken({
            registrationId: user.registrationId,
            email: user.email,
            name: user.name,
        });

        const response = NextResponse.json({
            message: 'Login successful',
            user: {
                registrationId: user.registrationId,
                name: user.name,
                email: user.email,
            },
        });

        response.cookies.set('prithvi_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 7 * 24 * 60 * 60,
            path: '/',
        });

        return response;
    } catch (err) {
        console.error('Login error:', err);
        return NextResponse.json({ error: 'Login failed' }, { status: 500 });
    }
}
