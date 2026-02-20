import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { getUserByEmail, createUser, getNextRegistrationId } from '@/lib/db';
import { sendRegistrationConfirmationEmail } from '@/lib/email';
import { signToken } from '@/lib/auth';
import { appendRegistrationToSheet } from '@/lib/sheets';

export async function POST(req: NextRequest) {
    try {
        const { name, email, phone, password, emailVerified, paymentVerified, paymentScreenshot } = await req.json();

        // Basic validation
        if (!name || !email || !phone || !password) {
            return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
        }
        if (!emailVerified) {
            return NextResponse.json({ error: 'Email must be verified first' }, { status: 400 });
        }
        if (!paymentVerified) {
            return NextResponse.json({ error: 'Payment screenshot must be submitted' }, { status: 400 });
        }

        // Check duplicate
        const existing = getUserByEmail(email);
        if (existing) {
            return NextResponse.json({ error: 'Email already registered' }, { status: 409 });
        }

        // Hash password
        const passwordHash = await bcrypt.hash(password, 12);

        // Generate registration ID
        const registrationId = getNextRegistrationId();
        const registeredAt = new Date().toISOString();

        // Save user to local JSON DB (including screenshot filename)
        const user = {
            registrationId,
            name: name.trim(),
            email: email.toLowerCase(),
            phone: phone.trim(),
            passwordHash,
            emailVerified: true,
            paymentVerified: true,
            paymentScreenshot: paymentScreenshot || '',
            registeredAt,
        };
        createUser(user);

        // Save to Google Sheet (non-blocking)
        appendRegistrationToSheet({
            registrationId,
            name: name.trim(),
            email: email.toLowerCase(),
            phone: phone.trim(),
            paymentScreenshot: paymentScreenshot || '',
            registeredAt,
        }).catch((err) => console.error('Google Sheets write failed:', err));

        // Send confirmation email (non-blocking)
        sendRegistrationConfirmationEmail(email, name, registrationId, password)
            .catch((err) => console.error('Failed to send confirmation email:', err));

        // Issue JWT
        const token = signToken({ registrationId, email: email.toLowerCase(), name: name.trim() });

        const response = NextResponse.json({
            message: 'Registration successful',
            registrationId,
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
        console.error('Register error:', err);
        return NextResponse.json({ error: 'Registration failed. Please try again.' }, { status: 500 });
    }
}
