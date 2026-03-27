import { NextRequest, NextResponse } from 'next/server';
import { getAllUsersV2 } from '@/lib/db';
import { getSignedDownloadUrl } from '@/lib/storage';
import { verifyAdminCookie, unauthorizedResponse } from '../adminAuth';

export async function GET(req: NextRequest) {
    if (!verifyAdminCookie(req)) return unauthorizedResponse();

    const users = await getAllUsersV2();

    const sanitized = await Promise.all(
        users.map(async (u) => ({
            registrationId: u.registrationId,
            name: u.name,
            email: u.email,
            phone: u.phone,
            college: u.college || '',
            gender: u.gender || '',
            emailVerified: u.emailVerified,
            paymentVerified: u.paymentVerified,
            paymentStatus: u.paymentStatus || 'pending',
            adminVerified: u.adminVerified ?? false,
            adminNote: u.adminNote || '',
            paymentScreenshot: u.paymentScreenshot,
            screenshotUrl: u.paymentScreenshot
                ? await getSignedDownloadUrl(u.paymentScreenshot)
                : null,
            registeredAt: u.registeredAt,

            // ✅ NEW FIELDS (UserV2)
            PA: u.PA ?? false,
            DinnerTaken: u.DinnerTaken ?? false,
            Certificate: u.Certificate ?? false,
            hall_alloted: u.hall_alloted || '',
        }))
    );

    return NextResponse.json({ users: sanitized });
}