'use client';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
    const router = useRouter();
    return (
        <div className="register-hero">
            <div className="reg-success-card" style={{ textAlign: 'center' }}>
                <div className="reg-success-icon">🔒</div>
                <h1 className="reg-success-title">Registrations Closed</h1>
                <p className="reg-success-sub" style={{ maxWidth: '420px', margin: '0 auto 28px' }}>
                    All participants for <strong>Prithvi 2026</strong> have already been registered.
                    If you received your Registration ID and password via email, please log in to register for events.
                </p>
                <div className="reg-success-actions">
                    <button className="btn" onClick={() => router.push('/login')}>Login to Register for Events</button>
                    <button className="btn btn-outline" onClick={() => router.push('/')}>Go to Home</button>
                </div>
            </div>
        </div>
    );
}
