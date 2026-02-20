import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Login',
    description: 'Login to your Prithvi 2026 account with your Registration ID.',
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
