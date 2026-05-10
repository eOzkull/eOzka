'use client';

import { useEffect } from 'react';
import Link from 'next/link';


export default function BlogClient() {
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
      {/* Structural JSON-LD for Blog Search Engines Indexing */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Blog',
            '@id': 'https://eozka.com/blog/#blog',
            url: 'https://eozka.com/blog/',
            name: 'eOzka Engineering Blog',
            description:
              'Insights from the eOzka engineering team on open-source AI scanners, health tech, and venture studio scaling.',
            publisher: {
              '@type': 'Organization',
              name: 'eOzka',
            },
            blogPost: [
              {
                '@type': 'BlogPosting',
                headline: 'Building an AI Vulnerability Scanner with Python and ML',
                datePublished: '2026-10-01',
                author: {
                  '@type': 'Person',
                  name: 'Kushagra Bharadwaj',
                },
              },
              {
                '@type': 'BlogPosting',
                headline: 'Why We Chose Flutter for Health-Tech',
                datePublished: '2026-09-01',
                author: {
                  '@type': 'Person',
                  name: 'Pratham Sharma',
                },
              },
            ],
          }),
        }}
      />

      <div className="section-label">— Engineering Blog </div>
      <h1
        className="section-headline reveal"
        style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', lineHeight: 1.1, marginBottom: '2rem' }}
      >
        Notes from
        <br />
        <em>the trenches.</em>
      </h1>
      <p className="products-intro reveal" style={{ maxWidth: '800px', marginBottom: '4rem' }}>
        Technical breakdowns, open-source challenges, and the realities of building an
        enterprise-grade venture studio from a college campus.
      </p>

      <div className="story-grid">
        <div
          className="story-body reveal"
          style={{ borderLeft: '2px solid var(--accent)', paddingLeft: '20px' }}
        >
          <h2 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>
            Building an AI Vulnerability Scanner with Python and ML
          </h2>
          <p style={{ opacity: 0.7, fontSize: '0.9rem', marginBottom: '15px' }}>
            By Kushagra Bharadwaj • October 2026
          </p>
          <p>
            A deep dive into how we integrated a hybrid Random Forest and NLP engine to classify XSS
            and SQL injections with 94% accuracy, without relying on third-party APIs.
          </p>
          <Link
            href="/blog/ai-vulnerability-scanner"
            style={{
              color: 'var(--accent)',
              textDecoration: 'none',
              fontWeight: 'bold',
              marginTop: '10px',
              display: 'inline-block',
            }}
          >
            Read Article →
          </Link>
        </div>

        <div
          className="story-body reveal"
          style={{ borderLeft: '2px solid var(--accent)', paddingLeft: '20px', marginTop: '30px' }}
        >
          <h2 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>
            Why We Chose Flutter for Health-Tech
          </h2>
          <p style={{ opacity: 0.7, fontSize: '0.9rem', marginBottom: '15px' }}>
            By Pratham Sharma • September 2026
          </p>
          <p>
            Analyzing the performance trade-offs of using cross-platform frameworks to process
            continuous biometric telemetry natively on mobile devices.
          </p>
          <Link
            href="/blog/flutter-health-tech"
            style={{
              color: 'var(--accent)',
              textDecoration: 'none',
              fontWeight: 'bold',
              marginTop: '10px',
              display: 'inline-block',
            }}
          >
            Read Article →
          </Link>
        </div>
      </div>
    </main>
  );
}

