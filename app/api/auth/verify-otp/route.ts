import { NextRequest, NextResponse } from 'next/server';
import { verifyOTP } from '@/lib/otp';

export async function POST(req: NextRequest) {
    try {
        const { email, otp } = await req.json();

        if (!email || !otp) {
            return NextResponse.json({ error: 'Email and OTP required' }, { status: 400 });
        }

        const valid = verifyOTP(email, otp.trim());
        if (!valid) {
            return NextResponse.json({ error: 'Invalid or expired OTP' }, { status: 400 });
        }

        return NextResponse.json({ message: 'Email verified successfully' });
    } catch (err) {
        console.error('Verify OTP error:', err);
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}
