import { NextRequest, NextResponse } from 'next/server';
import { getScreenshotById } from '@/lib/db';
import { verifyAdminCookie, unauthorizedResponse } from '../adminAuth';

/**
 * Admin-only route to stream a payment screenshot from MongoDB.
 * Usage: /api/addmin/screenshot?id=<mongoDbObjectId>
 */
export async function GET(req: NextRequest) {
    if (!verifyAdminCookie(req)) return unauthorizedResponse();

    const id = req.nextUrl.searchParams.get('id');
    if (!id) {
        return NextResponse.json({ error: 'id query param required' }, { status: 400 });
    }

    try {
        const screenshot = await getScreenshotById(id);
        if (!screenshot) {
            return NextResponse.json({ error: 'Screenshot not found' }, { status: 404 });
        }

        return new NextResponse(new Uint8Array(screenshot.data as unknown as Buffer), {
            headers: {
                'Content-Type': screenshot.mimeType,
                'Content-Disposition': `inline; filename="${screenshot.filename}"`,
                'Cache-Control': 'no-store',
            },
        });
    } catch (err) {
        console.error('Screenshot fetch error:', err);
        return NextResponse.json({ error: 'Failed to retrieve screenshot' }, { status: 500 });
    }
}
