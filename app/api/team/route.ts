import { NextResponse } from 'next/server';

export const teamData = {
    leaders: [
        {
            id: 1,
            name: 'Sanjana Voonna',
            role: 'President 2026 · PRITHVI',
            position: 'President',
            email: 'voonna.sanjana2003@gmail.com',
            linkedin: 'https://www.linkedin.com/in/sanjana-voonna-413692261',
            image: '/assets/images/teams/t1.png',
        },
        {
            id: 2,
            name: 'Subhankar Barman',
            role: 'Vice President 2026 · PRITHVI',
            position: 'Vice President',
            email: 'subhankarbarman38@gmail.com',
            linkedin: 'https://www.linkedin.com/in/subhankar-barman2003',
            image: '/assets/images/teams/t2.png',
        },
    ],
    managers: [
        {
            id: 3,
            name: 'Dishari Chakraborty',
            role: 'Manager PR 2026 · PRITHVI',
            email: 'disharichak2021@gmail.com',
            linkedin: 'https://www.linkedin.com/in/dishari-chakraborty2002',
            image: '/assets/images/teams/t3.png',
        },
        {
            id: 4,
            name: 'Siddharth Satish Karjini',
            role: 'Manager Event 2026 · PRITHVI',
            email: 'siddharthkarjini027@gmail.com',
            linkedin: 'https://www.linkedin.com/in/siddharth-satish-karjini-55b161210',
            image: '/assets/images/teams/t4.png',
        },
    ],
};

export async function GET() {
    return NextResponse.json(teamData);
}
