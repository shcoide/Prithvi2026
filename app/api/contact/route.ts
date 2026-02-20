import { NextResponse } from 'next/server';

export const contactData = {
    team: [
        {
            id: 1,
            name: 'Roysouvik',
            role: 'Logistics',
            phone: '+91 8513955455',
            email: 'roysouvik.geology@gmail.com',
            image: '/assets/images/contact/c1.png',
        },
        {
            id: 2,
            name: 'Rahul Barman',
            role: 'Public Relations',
            phone: '+91 7099622821',
            email: null,
            image: '/assets/images/contact/c2.png',
        },
        {
            id: 3,
            name: 'Shruti Bhattacharya',
            role: 'Public Relations',
            phone: '+91 8327315079',
            email: null,
            image: '/assets/images/contact/c3.png',
        },
    ],
    generalEmail: 'prithvi.gg.iitkgp@gmail.com',
    mapEmbedUrl:
        'https://www.google.com/maps?q=IIT%20Kharagpur%20Main%20Building&output=embed',
};

export async function GET() {
    return NextResponse.json(contactData);
}
