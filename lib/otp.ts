// In-memory OTP store (resets on server restart — fine for dev/single-instance)
// For multi-instance production, use Redis or a DB table.

interface OTPEntry {
    otp: string;
    expiresAt: number; // epoch ms
}

const store = new Map<string, OTPEntry>();

export function setOTP(email: string, otp: string): void {
    store.set(email.toLowerCase(), {
        otp,
        expiresAt: Date.now() + 10 * 60 * 1000, // 10 minutes
    });
}

export function verifyOTP(email: string, otp: string): boolean {
    const entry = store.get(email.toLowerCase());
    if (!entry) return false;
    if (Date.now() > entry.expiresAt) {
        store.delete(email.toLowerCase());
        return false;
    }
    if (entry.otp !== otp) return false;
    store.delete(email.toLowerCase()); // single-use
    return true;
}

export function generateOTP(): string {
    return String(Math.floor(100000 + Math.random() * 900000)); // 6-digit
}
