import { NextResponse } from 'next/server';

const sponsors = Array.from({ length: 27 }, (_, i) => ({
    id: i + 1,
    image: `/assets/images/sponsors/s${i + 1}.png`,
    alt: `Sponsor ${i + 1}`,
}));

export async function GET() {
    return NextResponse.json(sponsors);
}
