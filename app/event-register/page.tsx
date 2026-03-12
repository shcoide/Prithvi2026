import { Suspense } from 'react';
import EventRegisterForm from './EventRegisterForm';

export default function EventRegisterPage() {
    return (
        <Suspense fallback={<div style={{ minHeight: '100vh', background: '#050a19', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>Loading…</div>}>
            <EventRegisterForm />
        </Suspense>
    );
}
