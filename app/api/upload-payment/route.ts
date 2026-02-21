import { NextRequest, NextResponse } from 'next/server';
import { saveScreenshot } from '@/lib/db';

export async function POST(req: NextRequest) {
    try {
        const { base64, email } = await req.json();

        if (!base64 || !email) {
            return NextResponse.json({ error: 'Image data and email required' }, { status: 400 });
        }

        // Parse base64: "data:image/png;base64,iVBOR..."
        const matches = base64.match(/^data:image\/(\w+);base64,(.+)$/);
        if (!matches) {
            return NextResponse.json({ error: 'Invalid image format' }, { status: 400 });
        }

        const ext = matches[1];                    // png, jpg, jpeg, webp
        const mimeType = `image/${ext}`;
        const buffer = Buffer.from(matches[2], 'base64');

        const sanitizedEmail = email.replace(/[^a-z0-9]/gi, '_').toLowerCase();
        const filename = `payment_${sanitizedEmail}_${Date.now()}.${ext}`;

        // Save image binary to MongoDB — returns the MongoDB _id string
        const screenshotId = await saveScreenshot(email, filename, mimeType, buffer);

        return NextResponse.json({ filename: screenshotId });
    } catch (err) {
        console.error('Upload error:', err);
        return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
    }
}
