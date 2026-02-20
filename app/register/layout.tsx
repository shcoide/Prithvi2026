import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Register',
    description: 'Register for Prithvi 2026 — India\'s largest Earth Science Symposium at IIT Kharagpur.',
};

export default function RegisterLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
