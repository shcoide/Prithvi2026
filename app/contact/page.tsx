import type { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
    title: 'Contact',
    description: 'Get in touch with the Prithvi 2026 team. Contact logistics, PR, and find us on the map at IIT Kharagpur.',
};

const contactData = {
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
    mapEmbedUrl:
        'https://www.google.com/maps?q=IIT%20Kharagpur%20Main%20Building&output=embed',
};

export default function ContactPage() {
    return (
        <>
            <section className="page-header">
                <h1>Contact Us</h1>
                <p>Meet the team behind Prithvi 2026</p>
            </section>

            <section className="contact-team">
                {contactData.team.map((person) => (
                    <div key={person.id} className="contact-card">
                        <Image
                            src={person.image}
                            alt={person.name}
                            width={120}
                            height={120}
                            style={{ borderRadius: '50%', objectFit: 'cover' }}
                        />
                        <h3>{person.role}</h3>
                        <p className="position">{person.name}</p>
                        <p>📞 {person.phone}</p>
                        {person.email && <p>✉️ {person.email}</p>}
                    </div>
                ))}
            </section>

            <section className="map-section">
                <h2>Reach Us</h2>
                <div className="map-container">
                    <iframe
                        src={contactData.mapEmbedUrl}
                        allowFullScreen
                        loading="lazy"
                        title="IIT Kharagpur Map"
                    />
                </div>
            </section>
        </>
    );
}
