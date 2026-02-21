import { NextRequest, NextResponse } from 'next/server';
import { updatePaymentStatus, setAdminVerified } from '@/lib/db';
import { verifyAdminCookie, unauthorizedResponse } from '../adminAuth';

/**
 * POST /api/addmin/verify
 *
 * Two actions in one route, distinguished by `action` field:
 *
 * 1. action: "status"  — set paymentStatus to 'approved' | 'rejected'
 *    body: { registrationId, action: "status", status: "approved"|"rejected", adminNote? }
 *
 * 2. action: "toggle"  — flip the adminVerified boolean
 *    body: { registrationId, action: "toggle", adminVerified: true|false, adminNote? }
 */
export async function POST(req: NextRequest) {
    if (!verifyAdminCookie(req)) return unauthorizedResponse();

    try {
        const body = await req.json();
        const { registrationId, action, adminNote } = body;

        if (!registrationId || !action) {
            return NextResponse.json(
                { error: 'registrationId and action are required' },
                { status: 400 }
            );
        }

        // ── Action: set paymentStatus ──────────────────────────────────────────
        if (action === 'status') {
            const { status } = body;
            if (!['approved', 'rejected'].includes(status)) {
                return NextResponse.json(
                    { error: 'status must be "approved" or "rejected"' },
                    { status: 400 }
                );
            }
            const updated = updatePaymentStatus(registrationId, status, adminNote);
            if (!updated) return NextResponse.json({ error: 'User not found' }, { status: 404 });
            return NextResponse.json({ ok: true, registrationId, action, status });
        }

        // ── Action: toggle adminVerified ───────────────────────────────────────
        if (action === 'toggle') {
            const { adminVerified } = body;
            if (typeof adminVerified !== 'boolean') {
                return NextResponse.json(
                    { error: 'adminVerified must be a boolean' },
                    { status: 400 }
                );
            }
            const updated = setAdminVerified(registrationId, adminVerified, adminNote);
            if (!updated) return NextResponse.json({ error: 'User not found' }, { status: 404 });
            return NextResponse.json({ ok: true, registrationId, action, adminVerified });
        }

        return NextResponse.json({ error: 'Unknown action' }, { status: 400 });
    } catch {
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}
