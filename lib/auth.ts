import jwt from 'jsonwebtoken';
import { NextRequest } from "next/server";

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


export function checkUserSession(req: NextRequest) {
    const token = req.cookies.get("prithvi_token")?.value;

    if (!token) return null;

    const payload = verifyToken(token);
    if (!payload) return null;

    return payload.registrationId;

}
