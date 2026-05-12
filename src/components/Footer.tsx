'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Footer() {
  const pathname = usePathname();

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    if (pathname === '/') {
      e.preventDefault();
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      <footer>
        <div className="footer-brand">
          {/* eOzka Full Logo */}
          <img
            className="footer-svg-logo"
            src="/assets/eOzka-essentials/eOzka_Logo_Package_V1/SVG/eozka-technology-holding-company-logo.svg"
            alt="eOzka Operational Holding Company Full Logo"
            width={180}
            height={45}
          />
          <p className="footer-desc">
            An operational holding company engaged in the development, management, and provision of technology solutions, 
            software infrastructure, digital platforms, consulting services, and community‑driven programs.
          </p>
        </div>
        <div className="footer-cols-mobile">
          <div className="footer-col">
            <h4>Ecosystem</h4>
            <ul>
              <li>
                <Link href="/#story" onClick={(e) => handleLinkClick(e, 'story')}>
                  Our story
                </Link>
              </li>
              <li>
                <Link href="/#products" onClick={(e) => handleLinkClick(e, 'products')}>
                  Products
                </Link>
              </li>
              <li>
                <Link href="/#team" onClick={(e) => handleLinkClick(e, 'team')}>
                  Team
                </Link>
              </li>
              <li>
                <Link href="/ventures/moce">
                  MOCE subsidiary
                </Link>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Connect</h4>
            <ul>
              <li>
                <a href="https://github.com/eOzkull" target="_blank" rel="noopener noreferrer">
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com/weareeozka"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com/company/eozka"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a href="https://x.com/weareeozka" target="_blank" rel="noopener noreferrer">
                  X / Twitter
                </a>
              </li>
              <li>
                <a href="mailto:eozka.hq@gmail.com">Email</a>
              </li>
            </ul>
          </div>
        </div>
      </footer>

      <div className="footer-bottom">
        <span className="footer-copy">© 2026 eOzka. All rights reserved.</span>
        <div className="footer-status">
          <span className="status-dot"></span>
          <span>All systems operational</span>
        </div>
      </div>
    </>
  );
}
