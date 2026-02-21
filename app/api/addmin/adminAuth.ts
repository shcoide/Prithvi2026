import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const ADMIN_SECRET = process.env.ADMIN_JWT_SECRET || 'prithvi-admin-secret-2026';

export function verifyAdminCookie(req: NextRequest): boolean {
    const token = req.cookies.get('prithvi_admin')?.value;
    if (!token) return false;
    try {
        const payload = jwt.verify(token, ADMIN_SECRET) as { role: string };
        return payload.role === 'admin';
    } catch {
        return false;
    }
}

export function unauthorizedResponse() {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
}
