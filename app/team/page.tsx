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
    managerGroups: [
        {
            category: 'Manager - Events/PR',
            members: [
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
                {
                    id: 5,
                    name: 'Yash Gupta',
                    role: 'Manager Event 2026 · PRITHVI',
                    email: 'yashgupta980452@gmail.com',
                    linkedin: 'https://www.linkedin.com/in/yash-kumar-gupta-b02a3919a',
                    image: '/assets/images/teams/t5.jpeg',
                },
                {
                    id: 6,
                    name: 'Ankit Dutta',
                    role: 'Manager Event 2026 · PRITHVI',
                    email: 'ankitduttaiitkgp@gmail.com',
                    linkedin: 'https://www.linkedin.com/in/ankit-dutta-97a9aa23a/',
                    image: '/assets/images/teams/t6.jpeg',
                },
            ],
        },
        {
            category: 'Manager - Logistics',
            members: [
                {
                    id: 7,
                    name: 'Arnab Chatterjee',
                    role: 'Manager Logistics 2026 · PRITHVI',
                    email: 'chatterjeearnab734@gmail.com',
                    linkedin: '',
                    image: '/assets/images/teams/t7.jpeg',
                },
                {
                    id: 8,
                    name: 'Shuvam Kumar',
                    role: 'Manager Logistics 2026 · PRITHVI',
                    email: 'iushubhamkumar@gmail.com',
                    linkedin: '',
                    image: '/assets/images/teams/t8.jpeg',
                },
                {
                    id: 9,
                    name: 'Ayush Garg',
                    role: 'Manager Logistics 2026 · PRITHVI',
                    email: 'gargayush.2412@gmail.com',
                    linkedin: '',
                    image: '/assets/images/teams/t9.jpeg',
                },
            ],
        },
        {
            category: 'Manager - Design',
            members: [
                {
                    id: 10,
                    name: 'Abir Goswami',
                    role: 'Manager Design 2026 · PRITHVI',
                    email: 'abirgoswamiprl@gmail.com',
                    linkedin: '',
                    image: '/assets/images/teams/t10.jpeg',
                },
                {
                    id: 11,
                    name: 'Anuraj Patel',
                    role: 'Manager Design 2026 · PRITHVI',
                    email: 'Anuraj.ap9753@gmail.com',
                    linkedin: '',
                    image: '/assets/images/teams/t11.png',
                },
            ],
        },
        {
            category: 'Manager - Web',
            members: [
                {
                    id: 12,
                    name: 'Shivam',
                    role: 'Manager Web 2026 · PRITHVI',
                    email: 'shivamshibu2003@gmail.com',
                    linkedin: '',
                    image: '/assets/images/teams/t12.jpeg',
                },
            ],
        },
    ],
};

export default function TeamPage() {
    // Shrunk width & height to 18 to align cleanly with the text
    const LinkedInIcon = () => (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="#0A66C2" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.23 0H1.77C.8 0 0 .77 0 1.72v20.56C0 23.23.8 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.2 0 22.23 0zM7.12 20.45H3.56V9h3.56v11.45zM5.34 7.43c-1.14 0-2.06-.92-2.06-2.06 0-1.14.92-2.06 2.06-2.06s2.06.92 2.06 2.06c0 1.14-.92 2.06-2.06 2.06zm15.11 13.02h-3.56v-5.56c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.95v5.65h-3.56V9h3.42v1.56h.05c.48-.9 1.63-1.85 3.38-1.85 3.61 0 4.28 2.38 4.28 5.47v6.27z"/>
        </svg>
    );

    return (
        <>
            <section className="page-header" style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <h1>Our Team</h1>
                <p>The people behind Prithvi 2026</p>
            </section>

            {/* LEADERS */}
            <section className="team-leaders" style={{ marginBottom: '4rem' }}>
                {teamData.leaders.map((leader) => (
                    <div key={leader.id} className="leader-block" style={{ textAlign: 'center', marginBottom: '2rem' }}>
                        <h2 style={{ marginBottom: '1rem' }}>{leader.position}</h2>
                        
                        <div className="team-card" style={{ display: 'inline-block' }}>
                            {leader.image ? (
                                <Image
                                    src={leader.image}
                                    alt={leader.name}
                                    width={130}
                                    height={130}
                                    style={{ borderRadius: '50%', objectFit: 'cover' }}
                                />
                            ) : (
                                <div style={{ width: 130, height: 130, borderRadius: '50%', backgroundColor: '#e2e8f0', margin: '0 auto' }} />
                            )}
                            <h3 style={{ marginTop: '1rem', marginBottom: '0.2rem' }}>{leader.name}</h3>
                            <p className="role" style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>{leader.role}</p>
                            
                            {/* Flexbox container for logo and email */}
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                                {/* Link wrapped around icon, defaults to '#' if empty */}
                                <a 
                                    href={leader.linkedin || '#'} 
                                    target={leader.linkedin ? "_blank" : "_self"} 
                                    rel="noopener noreferrer" 
                                    style={{ display: 'flex', opacity: leader.linkedin ? 1 : 0.6 }}
                                >
                                    <LinkedInIcon />
                                </a>
                                <p style={{ fontSize: '0.9rem', margin: 0 }}>{leader.email}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </section>

            {/* MANAGERS BY CATEGORY */}
            <section className="team-section">
                {teamData.managerGroups.map((group, index) => (
                    <div key={index} style={{ marginBottom: '3rem', textAlign: 'center' }}>
                        
                        <h2 style={{ borderBottom: '2px solid #ccc', display: 'inline-block', paddingBottom: '0.5rem', marginBottom: '1.5rem' }}>
                            {group.category}
                        </h2>
                        
                        <div className="team-grid">
                            {group.members.map((member) => (
                                <div key={member.id} className="team-card">
                                    {member.image ? (
                                        <Image
                                            src={member.image}
                                            alt={member.name}
                                            width={130}
                                            height={130}
                                            style={{ borderRadius: '50%', objectFit: 'cover' }}
                                        />
                                    ) : (
                                        <div style={{ width: 130, height: 130, borderRadius: '50%', backgroundColor: '#e2e8f0', margin: '0 auto' }} />
                                    )}
                                    <h3 style={{ marginTop: '1rem', marginBottom: '0.2rem' }}>{member.name}</h3>
                                    <p className="role" style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>{member.role}</p>
                                    
                                    {/* Flexbox container for logo and email */}
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                                        {/* Link wrapped around icon, defaults to '#' if empty */}
                                        <a 
                                            href={member.linkedin || '#'} 
                                            target={member.linkedin ? "_blank" : "_self"} 
                                            rel="noopener noreferrer" 
                                            style={{ display: 'flex', opacity: member.linkedin ? 1 : 0.6 }}
                                        >
                                            <LinkedInIcon />
                                        </a>
                                        <p style={{ fontSize: '0.9rem', margin: 0 }}>{member.email}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </section>
        </>
    );
}