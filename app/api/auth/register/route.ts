import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { getUserByEmail, createUser, getNextRegistrationId } from '@/lib/db';
import { sendRegistrationConfirmationEmail } from '@/lib/email';
import { signToken } from '@/lib/auth';
import { appendRegistrationToSheet } from '@/lib/sheets';

export async function POST(req: NextRequest) {
    try {
        const {
            name, email, phone, college, gender,
            password, emailVerified, paymentVerified, paymentScreenshot,
        } = await req.json();

        // Validation
        if (!name || !email || !phone || !college || !gender || !password) {
            return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
        }
        if (!emailVerified) {
            return NextResponse.json({ error: 'Email must be verified first' }, { status: 400 });
        }
        if (!paymentVerified) {
            return NextResponse.json({ error: 'Payment screenshot must be submitted' }, { status: 400 });
        }

        // Check duplicate
        const existing = await getUserByEmail(email);
        if (existing) {
            return NextResponse.json({ error: 'Email already registered' }, { status: 409 });
        }

        const passwordHash = await bcrypt.hash(password, 12);
        const registrationId = await getNextRegistrationId();
        const registeredAt = new Date().toISOString();

        await createUser({
            registrationId,
            name: name.trim(),
            email: email.toLowerCase(),
            phone: phone.trim(),
            college: college.trim(),
            gender,
            passwordHash,
            emailVerified: true,
            paymentVerified: true,
            paymentScreenshot: paymentScreenshot || '',  // MongoDB _id of screenshot
            paymentStatus: 'pending',
            adminVerified: false,
            adminNote: '',
            registeredAt,
        } as never);

        // Save to Google Sheet (non-blocking)
        appendRegistrationToSheet({
            registrationId,
            name: name.trim(),
            email: email.toLowerCase(),
            phone: phone.trim(),
            college: college.trim(),
            gender,
            paymentScreenshot: paymentScreenshot || '',
            registeredAt,
        }).catch((err) => console.error('Google Sheets write failed:', err));

        // Send confirmation email (non-blocking)
        sendRegistrationConfirmationEmail(email, name, registrationId, password)
            .catch((err) => console.error('Failed to send confirmation email:', err));

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
