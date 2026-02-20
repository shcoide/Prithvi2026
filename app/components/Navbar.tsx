'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from './AuthContext';

const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/events', label: 'Events' },
    { href: '/gallery', label: 'Gallery' },
    { href: '/team', label: 'Team' },
    { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const pathname = usePathname();
    const router = useRouter();
    const { user, loading, logout } = useAuth();
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown on outside click
    useEffect(() => {
        function handleClick(e: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setDropdownOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClick);
        return () => document.removeEventListener('mousedown', handleClick);
    }, []);

    async function handleLogout() {
        await logout();
        setDropdownOpen(false);
        router.push('/');
    }

    return (
        <nav className="navbar">
            <div className="logo-left">
                <Link href="/">
                    <Image src="/assets/images/logos/logo5.png" alt="Prithvi Logo" width={48} height={48} />
                </Link>
            </div>

            <button
                className="hamburger"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Toggle menu"
            >
                {menuOpen ? '✕' : '☰'}
            </button>

            <div className={`nav-links ${menuOpen ? 'active' : ''}`}>
                {navLinks.map((link) => (
                    <Link
                        key={link.href}
                        href={link.href}
                        className={pathname === link.href ? 'active-link' : ''}
                        onClick={() => setMenuOpen(false)}
                    >
                        {link.label}
                    </Link>
                ))}
                {!user && (
                    <Link href="/register" onClick={() => setMenuOpen(false)}>
                        <button className="navbtn">Register</button>
                    </Link>
                )}
            </div>

            <div className="nav-right-group">
                <div className="logo-right">
                    <Link href="/">
                        <Image src="/assets/images/logos/logo4.jpeg" alt="ESSC Logo" width={48} height={48} />
                    </Link>
                </div>

                {/* AUTH ICON */}
                {!loading && (
                    <div className="auth-icon-wrapper" ref={dropdownRef}>
                        {user ? (
                            <>
                                <button
                                    className="user-avatar-btn"
                                    onClick={() => setDropdownOpen(!dropdownOpen)}
                                    title={user.name}
                                >
                                    {user.name.charAt(0).toUpperCase()}
                                </button>
                                {dropdownOpen && (
                                    <div className="user-dropdown">
                                        <div className="user-dropdown-header">
                                            <div className="user-avatar-lg">{user.name.charAt(0).toUpperCase()}</div>
                                            <div>
                                                <div className="user-dropdown-name">{user.name}</div>
                                                <div className="user-dropdown-id">{user.registrationId}</div>
                                                <div className="user-dropdown-email">{user.email}</div>
                                            </div>
                                        </div>
                                        <div className="user-dropdown-divider" />
                                        <button className="user-dropdown-logout" onClick={handleLogout}>
                                            🚪 Sign Out
                                        </button>
                                    </div>
                                )}
                            </>
                        ) : (
                            <Link href="/login" className="login-icon-btn" title="Login">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                    <circle cx="12" cy="7" r="4" />
                                </svg>
                            </Link>
                        )}
                    </div>
                )}
            </div>
        </nav>
    );
}
