import { NextRequest, NextResponse } from 'next/server';
import { generateOTP, setOTP } from '@/lib/otp';
import { sendOTPEmail } from '@/lib/email';
import { getUserByEmail } from '@/lib/db';

export async function POST(req: NextRequest) {
    try {
        const { email } = await req.json();

        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return NextResponse.json({ error: 'Valid email required' }, { status: 400 });
        }

        // Check if already registered
        const existing = await getUserByEmail(email);
        if (existing) {
            return NextResponse.json({ error: 'This email is already registered' }, { status: 409 });
        }

        const otp = generateOTP();
        setOTP(email, otp);
        await sendOTPEmail(email, otp);

        return NextResponse.json({ message: 'OTP sent successfully' });
    } catch (err) {
        console.error('Send OTP error:', err);
        return NextResponse.json({ error: 'Failed to send OTP. Check email config.' }, { status: 500 });
    }
}
