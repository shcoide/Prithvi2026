'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '../components/AuthContext';

export default function LoginPage() {
    const router = useRouter();
    const { refresh } = useAuth();

    const [registrationId, setRegistrationId] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError('');
        if (!registrationId.trim() || !password) {
            setError('Please fill in all fields.');
            return;
        }
        setLoading(true);
        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ registrationId: registrationId.trim().toUpperCase(), password }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error);
            await refresh();
            router.push('/');
        } catch (e: unknown) {
            setError((e as Error).message || 'Login failed');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="register-hero">
            <div className="login-card">
                <div className="login-avatar-placeholder">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" strokeLinecap="round" strokeLinejoin="round" />
                        <circle cx="12" cy="7" r="4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>

                <h1 className="login-title">Welcome Back</h1>
                <p className="login-sub">Login with your Registration ID</p>

                <form onSubmit={handleSubmit} className="reg-form">
                    <div className="form-group">
                        <label>Registration ID</label>
                        <input
                            type="text"
                            placeholder="e.g. PRITHVI260001"
                            value={registrationId}
                            onChange={e => setRegistrationId(e.target.value.toUpperCase())}
                            className="form-input"
                            autoFocus
                        />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <div className="password-row">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Your password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                className="form-input"
                            />
                            <button type="button" className="eye-btn" onClick={() => setShowPassword(!showPassword)}>
                                {showPassword ? '🙈' : '👁️'}
                            </button>
                        </div>
                    </div>

                    {error && <div className="form-error">{error}</div>}

                    <button type="submit" className="btn submit-btn" disabled={loading}>
                        {loading ? (
                            <span className="btn-loading">
                                <span className="spinner-sm" /> Logging in…
                            </span>
                        ) : 'Login →'}
                    </button>

                    <p className="login-redirect">
                        Not registered yet? <Link href="/register">Register here</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}
