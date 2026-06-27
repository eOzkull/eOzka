'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { useAudio } from '@/contexts/AudioContext';

export default function Footer() {
  const pathname = usePathname();
  const { playHoverWhoosh, stopHoverWhoosh } = useAudio();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    if (pathname === '/') {
      e.preventDefault();
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus('submitting');
    setErrorMessage('');
    playHoverWhoosh();

    const startTime = Date.now();

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      const elapsedTime = Date.now() - startTime;
      const minDuration = 1600; // soft delay for audio effect sync
      if (elapsedTime < minDuration) {
        await new Promise((resolve) => setTimeout(resolve, minDuration - elapsedTime));
      }

      stopHoverWhoosh();

      if (res.ok && data.success) {
        setStatus('success');
        setEmail('');
      } else {
        setStatus('error');
        setErrorMessage(data.error || 'Subscription failed. Please try again.');
      }
    } catch {
      const elapsedTime = Date.now() - startTime;
      const minDuration = 1600;
      if (elapsedTime < minDuration) {
        await new Promise((resolve) => setTimeout(resolve, minDuration - elapsedTime));
      }
      stopHoverWhoosh();
      setStatus('error');
      setErrorMessage('Network error. Please check connection.');
    }
  };

  return (
    <>
      <footer>
        <div className="footer-brand">
          {/* eOzka Full Logo */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="footer-svg-logo"
            src="/assets/eOzka-essentials/eOzka_Logo_Package_V1/SVG/eozka-technology-holding-company-logo.svg"
            alt="eOzka Operational Holding Company Full Logo"
            width={180}
            height={45}
          />
          <p className="footer-desc">
            An operational holding company engaged in the development, management, and provision of
            technology solutions, software infrastructure, digital platforms, consulting services,
            and community‑driven programs.
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
                <Link href="/#showcase" onClick={(e) => handleLinkClick(e, 'showcase')}>
                  Showcase
                </Link>
              </li>
              <li>
                <Link href="/#team" onClick={(e) => handleLinkClick(e, 'team')}>
                  Team
                </Link>
              </li>
              <li>
                <Link href="/request-meeting">Request a meeting</Link>
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

        {/* Newsletter Signup Column */}
        <div className="footer-col footer-newsletter">
          <h4>Newsletter</h4>
          <p
            className="footer-newsletter-desc"
            style={{ fontSize: '13px', color: '#999', margin: '8px 0 16px 0', lineHeight: '1.5' }}
          >
            Subscribe for technical updates, security disclosures, and project launches from our
            company.
          </p>
          {status === 'success' ? (
            <div
              style={{
                color: 'var(--accent)',
                fontSize: '13px',
                fontFamily: "'DM Mono', monospace",
                border: '1px solid var(--accent-dim)',
                padding: '12px',
                background: 'rgba(212, 201, 168, 0.05)',
                borderRadius: '4px',
              }}
            >
              ✓ Registered. Telemetry active.
            </div>
          ) : (
            <form
              onSubmit={handleSubscribe}
              className="newsletter-form"
              style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}
            >
              <div style={{ display: 'flex', gap: '6px' }}>
                <input
                  type="email"
                  placeholder="your-email@domain.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={status === 'submitting'}
                  required
                  style={{
                    flex: 1,
                    background: '#141414',
                    border: '1px solid #2a2a2a',
                    padding: '8px 12px',
                    color: '#f0eeea',
                    fontSize: '13px',
                    outline: 'none',
                    borderRadius: '4px',
                  }}
                  className="newsletter-input"
                />
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  style={{
                    background: '#f0eeea',
                    color: '#0c0c0c',
                    border: 'none',
                    padding: '8px 16px',
                    fontSize: '12px',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    borderRadius: '4px',
                    opacity: status === 'submitting' ? 0.7 : 1,
                  }}
                >
                  {status === 'submitting' ? '...' : 'Sub'}
                </button>
              </div>
              {status === 'error' && (
                <div
                  style={{ color: '#fca5a5', fontSize: '11px', fontFamily: "'DM Mono', monospace" }}
                >
                  ⚠️ {errorMessage}
                </div>
              )}
            </form>
          )}
        </div>
      </footer>

      <div className="footer-bottom">
        <span className="footer-copy">
          © {new Date().getFullYear()} eOzka. Source code released under the Apache 2.0 License.
        </span>
        <div className="footer-status">
          <span className="status-dot"></span>
          <span>System telemetry online // All nodes operational</span>
        </div>
      </div>
    </>
  );
}
