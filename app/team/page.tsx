import type { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
    title: 'Team',
    description: 'Meet the dedicated team of students behind Prithvi 2026 — IIT Kharagpur.',
};

const teamData = {
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

export default function TeamPage() {
    return (
        <>
            <section className="page-header">
                <h1>Our Team</h1>
                <p>The people behind Prithvi 2026</p>
            </section>

            {/* LEADERS */}
            <section className="team-leaders">
                {teamData.leaders.map((leader) => (
                    <div key={leader.id} className="leader-block">
                        <h2>{leader.position}</h2>
                        <a
                            href={leader.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="team-card"
                        >
                            <Image
                                src={leader.image}
                                alt={leader.name}
                                width={130}
                                height={130}
                                style={{ borderRadius: '50%', objectFit: 'cover' }}
                            />
                            <h3>{leader.name}</h3>
                            <p className="role">{leader.role}</p>
                            <p>📧 {leader.email}</p>
                        </a>
                    </div>
                ))}
            </section>

            {/* MANAGERS */}
            <section className="team-section">
                <h2>Managers</h2>
                <div className="team-grid">
                    {teamData.managers.map((member) => (
                        <a
                            key={member.id}
                            href={member.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="team-card"
                        >
                            <Image
                                src={member.image}
                                alt={member.name}
                                width={130}
                                height={130}
                                style={{ borderRadius: '50%', objectFit: 'cover' }}
                            />
                            <h3>{member.name}</h3>
                            <p className="role">{member.role}</p>
                            <p>📧 {member.email}</p>
                        </a>
                    ))}
                </div>
            </section>
        </>
    );
}
