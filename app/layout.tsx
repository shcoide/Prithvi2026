import type { Metadata } from 'next';
import './globals.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { AuthProvider } from './components/AuthContext';

export const metadata: Metadata = {
  title: {
    default: 'Prithvi 2026 | Annual Earth Science Symposium · IIT Kharagpur',
    template: '%s | Prithvi 2026',
  },
  description:
    'Prithvi is the annual symposium of the Department of Geology and Geophysics at IIT Kharagpur. Join us from 3–5 April 2026 for competitions, workshops, lectures and exhibitions.',
  keywords: ['Prithvi 2026', 'IIT Kharagpur', 'Earth Science', 'Geology', 'Geophysics', 'Symposium'],
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://prithvi.iitkgp.ac.in',
    siteName: 'Prithvi 2026',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
