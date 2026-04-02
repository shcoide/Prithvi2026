import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminCookie, unauthorizedResponse } from '../adminAuth';
import { connectDB } from '@/lib/mongodb';
import mongoose from 'mongoose';

export async function POST(req: NextRequest) {
    if (!verifyAdminCookie(req)) return unauthorizedResponse();

    const { updates } = await req.json() as {
        updates: Array<{ registrationId: string; hall_alloted: string }>;
    };

    if (!Array.isArray(updates) || updates.length === 0) {
        return NextResponse.json({ error: 'No updates provided' }, { status: 400 });
    }

    await connectDB();

    const UserV2 = mongoose.models.UserV2 ||
        mongoose.model('UserV2', new mongoose.Schema({}, { strict: false }));

    const bulkOps = updates.map(({ registrationId, hall_alloted }) => ({
        updateOne: {
            filter: { registrationId },
            update: { $set: { hall_alloted } },
        },
    }));

    const result = await UserV2.bulkWrite(bulkOps);

    return NextResponse.json({
        matched: result.matchedCount,
        modified: result.modifiedCount,
        total: updates.length,
    });
}
