import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || 'prithvi2026-fallback-secret';

export interface JWTPayload {
    registrationId: string;
    email: string;
    name: string;
}

export function signToken(payload: JWTPayload): string {
    return jwt.sign(payload, SECRET, { expiresIn: '7d' });
}

export function verifyToken(token: string): JWTPayload | null {
    try {
        return jwt.verify(token, SECRET) as JWTPayload;
    } catch {
        return null;
    }
}
