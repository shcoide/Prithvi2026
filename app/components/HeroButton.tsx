'use client';

import Link from 'next/link';
import { useAuth } from './AuthContext';

export default function HeroButton() {
    const { user, loading } = useAuth();

    if (loading) return null;

    if (user) {
        return (
            <Link href="/profile">
                <button className="btn">My Profile →</button>
            </Link>
        );
    }

    return (
        <Link href="/login">
            <button className="btn">Login</button>
        </Link>
    );
}
