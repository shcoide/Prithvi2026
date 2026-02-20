import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const UPLOAD_DIR = path.join(process.cwd(), 'data', 'uploads', 'payments');

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

        const ext = matches[1]; // png, jpg, jpeg, webp
        const data = matches[2];
        const buffer = Buffer.from(data, 'base64');

        // Filename: payment_<sanitized-email>_<timestamp>.<ext>
        const sanitizedEmail = email.replace(/[^a-z0-9]/gi, '_').toLowerCase();
        const timestamp = Date.now();
        const filename = `payment_${sanitizedEmail}_${timestamp}.${ext}`;
        const filePath = path.join(UPLOAD_DIR, filename);

        // Ensure directory exists
        fs.mkdirSync(UPLOAD_DIR, { recursive: true });
        fs.writeFileSync(filePath, buffer);

        return NextResponse.json({ filename, path: `/data/uploads/payments/${filename}` });
    } catch (err) {
        console.error('Upload error:', err);
        return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
    }
}
