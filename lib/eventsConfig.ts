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
    },
    {
        id: 'geoforensics',
        name: 'GEOFORENSICS',
        category: 'Competition',
        date: 'To be announced',
        description: 'A forensic geological event. Click on the image above to read the comprehensive rulebook.',
        maxTeamsPerCollege: 2, // Unlimited personal registrations per college
        minTeamSize: 1,
        maxTeamSize: 3, // Team event
        ruleBookUrl: '/assets/eventsRules/GEOFORENSICS.pdf',
        imageUrl: '/assets/eventImages/GEOFORENSICS.jpg',
    },
];

export function getEventById(id: string): EventConfig | undefined {
    return EVENTS.find((e) => e.id === id);
}
