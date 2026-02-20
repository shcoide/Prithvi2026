import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Events',
    description:
        'Explore the exciting lineup of competitions, workshops, lectures and exhibitions at Prithvi 2026 — IIT Kharagpur\'s premier Earth Science symposium.',
};

interface Event {
    id: number;
    title: string;
    description: string;
    category: string;
    date: string;
    comingSoon: boolean;
}

// Data is hard-coded here (same as /api/events) for fast server rendering
const events: Event[] = [
    {
        id: 1,
        title: 'GeoQuiz Championship',
        description:
            'Test your knowledge of Earth Sciences in this thrilling multi-round quiz competition. Teams of 2 will go head-to-head across geology, geophysics, oceanography, and atmospheric sciences. Expect rapid-fire rounds, visual challenges, and brain-bending puzzles that push the limits of your geoscience understanding.',
        category: 'Competition',
        date: 'April 3, 2026',
        comingSoon: true,
    },
    {
        id: 2,
        title: 'Rock & Mineral Identification',
        description:
            'Put your field geology skills to the test. Participants will be given a collection of specimens and must identify minerals, rock types, and geological origins. Only your bare eyes, a hand lens, and your knowledge stand between you and the podium.',
        category: 'Competition',
        date: 'April 3, 2026',
        comingSoon: true,
    },
    {
        id: 3,
        title: 'Seismic Data Interpretation Workshop',
        description:
            'A hands-on workshop where participants work with real seismic datasets to identify subsurface structures. Professionals from the industry will guide you through interpretation techniques used in oil & gas exploration. Perfect for students interested in applied geophysics.',
        category: 'Workshop',
        date: 'April 4, 2026',
        comingSoon: true,
    },
    {
        id: 4,
        title: 'Remote Sensing & GIS Challenge',
        description:
            'Analyze satellite imagery and apply GIS tools to solve real-world Earth Science problems. From mapping geological hazards to tracking land-use changes, participants will showcase their spatial analysis skills in a time-bound challenge.',
        category: 'Competition',
        date: 'April 4, 2026',
        comingSoon: true,
    },
    {
        id: 5,
        title: 'Research Paper Presentation',
        description:
            'Share your original research with peers and faculty judges at one of India\'s premier Earth Science forums. Papers across geology, geophysics, environmental science, and related fields are welcome. Top papers will be recognized with awards and publication opportunities.',
        category: 'Academic',
        date: 'April 5, 2026',
        comingSoon: true,
    },
    {
        id: 6,
        title: 'GeoArt & Visualization Contest',
        description:
            'Where science meets creativity. Submit your scientific illustrations, data visualizations, or artistic interpretations of Earth Science concepts. From cross-sections to planetary landscapes — let your imagination roam while staying scientifically grounded.',
        category: 'Creative',
        date: 'April 5, 2026',
        comingSoon: true,
    },
    {
        id: 7,
        title: 'Guest Lecture: Frontier Geosciences',
        description:
            'A keynote session featuring world-renowned researchers discussing cutting-edge developments in geosciences — from deep Earth imaging to climate modelling and space geology. An unmissable opportunity to hear from the best in the field.',
        category: 'Lecture',
        date: 'April 4, 2026',
        comingSoon: true,
    },
];

export default function EventsPage() {
    return (
        <>
            <section className="page-header">
                <h1>Events at Prithvi 2026</h1>
                <p>Competitions, workshops, lectures & more — 3 to 5 April 2026</p>
            </section>

            <section className="events-container coming-soon">
                {events.map((event, i) => (
                    <div key={event.id} className={`event-card ${i % 2 !== 0 ? 'reverse' : ''}`}>
                        <span className="event-category-badge">{event.category}</span>
                        <div className="event-text">
                            <h2>{event.title}</h2>
                            <div className="event-meta">
                                <span>📅 {event.date}</span>
                                <span>🏷️ {event.category}</span>
                            </div>
                            <p>{event.description}</p>
                        </div>
                    </div>
                ))}
            </section>
        </>
    );
}
