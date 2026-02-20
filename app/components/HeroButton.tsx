'use client';

import Link from 'next/link';
import { useAuth } from './AuthContext';

export default function HeroButton() {
    const { user, loading } = useAuth();

    if (loading) return null;

    if (user) {
        return (
            <Link href="/events">
                <button className="btn">Event Registration →</button>
            </Link>
        );
    }

    return (
        <Link href="/register">
            <button className="btn">Register Now</button>
        </Link>
    );
}
