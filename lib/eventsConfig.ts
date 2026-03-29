export interface EventConfig {
    id: string;
    name: string;
    category: string;
    date: string;
    description: string;
    maxTeamsPerCollege: number;
    minTeamSize: number;
    maxTeamSize: number;
    ruleBookUrl: string;
    imageUrl: string;
    registrationClosed?: boolean;
    externalRegistrationUrl?: string;
}

export const EVENTS: EventConfig[] = [
    {
        id: 'geoinsight',
        name: 'GEOINSIGHT',
        category: 'Competition',
        date: 'To be announced',
        description: 'Compete in our premier Earth Science competition and showcase your insightful knowledge.',
        maxTeamsPerCollege: 9999, // No cap per college
        minTeamSize: 1,
        maxTeamSize: 4,
        ruleBookUrl: '/assets/eventsRules/GEOINSIGHT.pdf',
        imageUrl: '/assets/eventImages/GEOINSIGHT.jpg',
        registrationClosed: true,
    },
    {
        id: 'geopixels',
        name: 'GEOPIXELS',
        category: 'Competition',
        date: 'To be announced',
        description: 'A creative geological event. Click on the image above to read the comprehensive rulebook.',
        maxTeamsPerCollege: 9999, // Unlimited personal registrations per college
        minTeamSize: 1,
        maxTeamSize: 1, // Individual event
        ruleBookUrl: '/assets/eventsRules/GEOPIXELS.pdf',
        imageUrl: '/assets/eventImages/GEOPIXELS.jpg',
        registrationClosed: true,
    },
    {
        id: 'litholaugh',
        name: 'LITHOLAUGH',
        category: 'Competition',
        date: 'To be announced',
        description: 'A humorous geological meme event celebrating field struggles and academic survival through creativity and wit.',
        maxTeamsPerCollege: 9999, // Unlimited personal registrations per college
        minTeamSize: 1,
        maxTeamSize: 1, // Individual event
        ruleBookUrl: '/assets/eventsRules/LITHOLAUGH.pdf',
        imageUrl: '/assets/eventImages/LITHOLAUGH.jpg',
        registrationClosed: true,
    },
    {
        id: 'grab-a-fault',
        name: 'GRAB-A-FAULT',
        category: 'Competition',
        date: 'To be announced',
        description: 'Unleash your inner orator and make your voice heard in our flagship debate competition.',
        maxTeamsPerCollege: 1, // 1 team per college
        minTeamSize: 3,
        maxTeamSize: 5, // 3-5 members per team
        ruleBookUrl: '/assets/eventsRules/GRAB-A-FAULT.pdf',
        imageUrl: '/assets/eventImages/GRAB-A-FAULT.png',
        registrationClosed: true,
    },
    {
        id: 'geosciencexhackathon',
        name: 'GEOSCIENCExHACKATHON',
        category: 'Hackathon',
        date: 'To be announced',
        description: 'Build self-supervised models to automate 3D seismic fault detection. Access real datasets and GPU cloud infrastructure. In partnership with Rezlytix',
        maxTeamsPerCollege: 9999, // No cap per college
        minTeamSize: 1,
        maxTeamSize: 3, // 1-3 members per team
        ruleBookUrl: '/assets/eventsRules/GEOSCIENCExHACKATHON.pdf',
        imageUrl: '/assets/eventImages/GEOSCIENCExHACKATHON.jpeg',
        registrationClosed: true,
    },
    {
        id: 'stratax',
        name: 'STRATAX',
        category: 'Competition',
        date: 'To be announced',
        description: 'An exciting challenge testing your stratigraphic knowledge and analytical skills. Click on register to go on UNSTOP and register there.',
        maxTeamsPerCollege: 9999,
        minTeamSize: 1,
        maxTeamSize: 1,
        ruleBookUrl: '/assets/eventsRules/STRATAX.pdf',
        imageUrl: '/assets/eventImages/STRATAX.jpg',
        registrationClosed: true,
        externalRegistrationUrl: 'https://unstop.com/o/cRsWE3V?lb=qmqpJ9rz&utm_medium=Share&utm_source=competitions&utm_campaign',
    },
    {
        id: 'mantlemind',
        name: 'MANTLE MIND',
        category: 'Competition',
        date: 'To be announced',
        description: 'A thrilling two-round geoscience showdown. Battle through unconventional questions and logical challenges in the Prelims to claim your spot in the Finals.',
        maxTeamsPerCollege: 2, // 2 team cap per college
        minTeamSize: 1,
        maxTeamSize: 4, // 1-4 members per team
        ruleBookUrl: '/assets/eventsRules/MANTLEMIND.pdf',
        imageUrl: '/assets/eventImages/MANTLEMIND.jpeg',
        registrationClosed: true,
    },
    {
        id: 'geoforensics',
        name: 'GEOFORENSICS',
        category: 'Competition',
        date: 'To be announced',
        description: 'Every mineral, rock, and fossil holds a story, a secret, and a unique fingerprint. Join us for Geoforensics and learn to crack the cases hidden in stone.',
        maxTeamsPerCollege: 2, // 2 team cap per college
        minTeamSize: 1,
        maxTeamSize: 4, // 1-4 members per team
        ruleBookUrl: '/assets/eventsRules/GEOFORENSICS.pdf',
        imageUrl: '/assets/eventImages/GEOFORENSICS.jpeg',
        registrationClosed: true,
    },
    {
        id: 'strataseek',
        name: 'STRATA SEEK',
        category: 'Competition',
        date: 'To be announced',
        description: 'Not all who wander are lost... Some of us are just looking for the next clue. The Hunt Is On. Join us for the adventure...',
        maxTeamsPerCollege: 1, // 1 team cap per college
        minTeamSize: 1,
        maxTeamSize: 5, // 1-5 members per team
        ruleBookUrl: '/assets/eventsRules/STRATASEEK.pdf',
        imageUrl: '/assets/eventImages/STRATASEEK.jpeg',
        registrationClosed: true,
    },
];

export function getEventById(id: string): EventConfig | undefined {
    return EVENTS.find((e) => e.id === id);
}
