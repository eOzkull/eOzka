'use client';

import { useEffect } from 'react';

export default function SocialClient() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // ── REVEAL ON SCROLL IntersectionObserver ──
    const reveals = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const delay = entry.target.getAttribute('data-delay') || '0';
            setTimeout(() => {
              entry.target.classList.add('visible');
            }, +delay + 80);
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );

    reveals.forEach((el, i) => {
      el.setAttribute('data-delay', String((i % 4) * 80));
      revealObserver.observe(el);
    });

    return () => {
      revealObserver.disconnect();
    };
  }, []);

  return (
    <main
      style={{
        padding: '150px 5%',
        minHeight: '80vh',
        maxWidth: '1200px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 2,
      }}
    >
      {/* Profile Page Schema JSON-LD for rich SEO snippets */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ProfilePage',
            '@id': 'https://eozka.com/social/#profile',
            'url': 'https://eozka.com/social/',
            'name': 'eOzka Official Social Channels',
            'description':
              'Connect with the eOzka venture ecosystem on GitHub, LinkedIn, Instagram, and X.',
            'mainEntity': {
              '@type': 'Organization',
              'name': 'eOzka',
              'url': 'https://eozka.com',
              'sameAs': [
                'https://github.com/eOzkull',
                'https://linkedin.com/company/eozka',
                'https://instagram.com/weareeozka',
                'https://x.com/weareeozka',
              ],
            },
          }),
        }}
      />

      <div className="section-label" style={{ textAlign: 'center' }}>
        — Connect
      </div>
      <h1
        className="section-headline reveal"
        style={{
          fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
          lineHeight: 1.1,
          marginBottom: '4rem',
          textAlign: 'center',
        }}
      >
        Join the
        <br />
        <em>ecosystem.</em>
      </h1>

      <div className="social-grid reveal">
        <a
          href="https://github.com/eOzkull"
          target="_blank"
          rel="noopener noreferrer"
          className="social-link-card"
        >
          <div>
            <div className="social-name">GitHub</div>
            <div className="social-handle">@eOzkull</div>
          </div>
          <span>→</span>
        </a>

        <a
          href="https://linkedin.com/company/eozka"
          target="_blank"
          rel="noopener noreferrer"
          className="social-link-card"
        >
          <div>
            <div className="social-name">LinkedIn</div>
            <div className="social-handle">company/eozka</div>
          </div>
          <span>→</span>
        </a>

        <a
          href="https://instagram.com/weareeozka"
          target="_blank"
          rel="noopener noreferrer"
          className="social-link-card"
        >
          <div>
            <div className="social-name">Instagram</div>
            <div className="social-handle">@weareeozka</div>
          </div>
          <span>→</span>
        </a>

        <a
          href="https://x.com/weareeozka"
          target="_blank"
          rel="noopener noreferrer"
          className="social-link-card"
        >
          <div>
            <div className="social-name">X (Twitter)</div>
            <div className="social-handle">@weareeozka</div>
          </div>
          <span>→</span>
        </a>
      </div>
    </main>
  );
}
