import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-section footer-section-left">
                    <h3>Follow Us</h3>
                    <div className="social-icons">
                        <a href="https://www.instagram.com/prithvi.iitkgp/" target="_blank" rel="noopener noreferrer">
                            <Image src="/assets/images/socials/instagram.png" alt="Instagram" width={34} height={34} />
                        </a>
                        <a href="https://www.linkedin.com/company/prithvi-iit-kgp/" target="_blank" rel="noopener noreferrer">
                            <Image src="/assets/images/socials/linkedin.png" alt="LinkedIn" width={34} height={34} />
                        </a>
                        <a href="https://m.facebook.com/prithvi.iitkgp/" target="_blank" rel="noopener noreferrer">
                            <Image src="/assets/images/socials/facebook.png" alt="Facebook" width={34} height={34} />
                        </a>
                    </div>
                </div>

                <div className="footer-section">
                    <h3>Quick Links</h3>
                    <div className="footer-links">
                        <Link href="/events">Events</Link>
                        <Link href="/gallery">Gallery</Link>
                        <Link href="/team">Team</Link>
                        <Link href="/contact">Contact</Link>
                    </div>
                </div>

                <div className="footer-section">
                    <h3>Contact</h3>
                    <p>✉️ prithvi.gg.iitkgp@gmail.com</p>
                    <p>📍 IIT Kharagpur, West Bengal</p>
                </div>
            </div>

            <div className="footer-bottom">
                © Prithvi 2026 · Department of Geology &amp; Geophysics, IIT Kharagpur
            </div>
        </footer>
    );
}
