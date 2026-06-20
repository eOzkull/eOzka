'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function CommunityClient() {
  useEffect(() => {
    // Scroll to top on load
    window.scrollTo(0, 0);

    // Counter animation for stats
    const counters = document.querySelectorAll('.stat-num[data-target]');
    const counterObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            const targetAttr = el.getAttribute('data-target') || '0';
            const target = +targetAttr;
            const duration = 1200;
            const startTime = performance.now();
            function updateCounter(now: number) {
              const elapsed = now - startTime;
              const progress = Math.min(elapsed / duration, 1);
              const ease = 1 - Math.pow(1 - progress, 3);
              el.textContent = String(Math.round(ease * target)) + '+';
              if (progress < 1) requestAnimationFrame(updateCounter);
            }
            requestAnimationFrame(updateCounter);
            counterObs.unobserve(el);
          }
        });
      },
      { threshold: 0.5 }
    );
    counters.forEach((c) => counterObs.observe(c));

    return () => counterObs.disconnect();
  }, []);

  return (
    <main
      className="subpage-wrapper"
      style={{ minHeight: '100vh', background: 'var(--black)', color: 'var(--white)' }}
    >
      {/* Hero Section */}
      <section
        className="community-hero"
        style={{ padding: '160px 24px 60px 24px', maxWidth: '1200px', margin: '0 auto' }}
      >
        <div className="section-label">eOzka — Alliance & Reach</div>
        <h1
          className="section-headline"
          style={{ marginTop: '16px', fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', lineHeight: '1.1' }}
        >
          Empowering the Next
          <br />
          <em style={{ fontStyle: 'italic', fontFamily: 'var(--serif)' }}>
            Generation of Builders.
          </em>
        </h1>
        <p
          className="team-intro"
          style={{
            marginTop: '24px',
            maxWidth: '750px',
            fontSize: '1.1rem',
            color: 'var(--sub-text)',
            lineHeight: '1.7',
          }}
        >
          We believe the best way to shape the future of technology is by supporting those who are
          eager to build it. Through our student alliance and campus ambassador initiatives, we
          bridge the gap between academic theory and high-quality production code.
        </p>
      </section>

      {/* Stats Counter Section */}
      <section
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 24px 60px 24px',
          border: 'none',
        }}
      >
        <div
          className="stats-strip"
          style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}
        >
          <div className="stat-cell">
            <span className="stat-num" data-target="500" style={{ fontSize: '44px' }}>
              0+
            </span>
            <span className="stat-label">
              Active Members
              <span className="stat-sub">Across campus nodes</span>
            </span>
          </div>
          <div className="stat-cell">
            <span className="stat-num" data-target="50" style={{ fontSize: '44px' }}>
              0+
            </span>
            <span className="stat-label">
              Campus Ambassadors
              <span className="stat-sub">Student leaders in tech hubs</span>
            </span>
          </div>
          <div className="stat-cell">
            <span className="stat-num" data-target="12" style={{ fontSize: '44px' }}>
              0+
            </span>
            <span className="stat-label">
              Hosted Workshops
              <span className="stat-sub">Open-source & AppSec sessions</span>
            </span>
          </div>
          <div className="stat-cell">
            <span className="stat-num" data-target="1000" style={{ fontSize: '44px' }}>
              0+
            </span>
            <span className="stat-label">
              Student Contributions
              <span className="stat-sub">PRs, documentation, & reviews</span>
            </span>
          </div>
        </div>
      </section>

      {/* Program Details Section */}
      <section
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 24px 80px 24px',
          border: 'none',
        }}
      >
        <div
          className="about-grid"
          style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px' }}
        >
          {/* Card 1: Ambassador Initiative Application */}
          <div className="about-block" style={{ padding: '40px' }}>
            <h3
              style={{
                fontSize: '11px',
                fontFamily: 'var(--ff-mono)',
                color: 'var(--accent)',
                textTransform: 'uppercase',
                letterSpacing: '0.2em',
                marginBottom: '8px',
              }}
            >
              Ambassador Initiative
            </h3>
            <h2
              style={{
                fontSize: '28px',
                color: 'var(--white)',
                margin: '0 0 16px 0',
                fontWeight: 'bold',
                fontFamily: 'var(--font-sans)',
                lineHeight: '1.2',
              }}
            >
              SLOTS OPEN NOW — JOIN COHORT
            </h2>
            <p
              style={{
                fontSize: '14.5px',
                color: 'var(--white-dim)',
                lineHeight: '1.7',
                marginBottom: '20px',
              }}
            >
              The eOzka Student Ambassador Program is a selective group of developers, designers,
              and advocates who represent our technical standards in their universities.
            </p>

            <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.06)', paddingTop: '24px' }}>
              <Link
                href="/community/ca"
                className="theme-btn"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  textDecoration: 'none',
                  fontSize: '12px',
                  fontWeight: 'bold',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  background: 'var(--white)',
                  color: 'var(--black)',
                  padding: '12px 24px',
                  borderRadius: '6px',
                  transition: 'all 0.3s ease',
                }}
              >
                Join Ambassador Cohort →
              </Link>
            </div>
          </div>

          {/* Card 2: Impact & Achievements Link */}
          <div
            className="about-block"
            style={{
              padding: '40px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <h3>Impact & Achievements</h3>
              <h4
                style={{
                  fontSize: '20px',
                  color: 'var(--white)',
                  margin: '12px 0 16px 0',
                  fontFamily: 'var(--font-sans)',
                }}
              >
                Activating Real Open-Source.
              </h4>
              <p style={{ fontSize: '14.5px', color: 'var(--white-dim)', lineHeight: '1.7' }}>
                Our community is not about badges—it is about real production impact. From
                biometrics telemetry audits to campus productivity deployments, our student builders
                are actively shipping code.
              </p>
            </div>
            <div style={{ marginTop: '32px' }}>
              <Link
                href="/community/achievements"
                className="theme-btn"
                style={{
                  display: 'inline-block',
                  padding: '12px 24px',
                  textDecoration: 'none',
                  fontSize: '12px',
                  fontWeight: 'bold',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                }}
              >
                View Achievements Wiki →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 24px 100px 24px',
          border: 'none',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            background: 'rgba(255, 255, 255, 0.02)',
            border: '1px solid var(--border)',
            padding: '56px 32px',
          }}
        >
          <h2
            style={{
              fontFamily: 'var(--serif)',
              fontSize: '32px',
              color: 'var(--white)',
              fontWeight: '400',
              marginBottom: '16px',
            }}
          >
            Ready to lead your campus?
          </h2>
          <p
            style={{
              color: 'var(--white-dim)',
              maxWidth: '600px',
              margin: '0 auto 32px auto',
              fontSize: '15px',
            }}
          >
            Apply for our upcoming Student Ambassador Cohort or coordinate a developer workshop at
            your campus. Reach out to our operational team.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <Link
              href="/#contact"
              className="theme-btn"
              style={{
                padding: '14px 28px',
                border: '1px solid var(--accent)',
                color: 'var(--accent)',
                textDecoration: 'none',
                fontSize: '12px',
                fontWeight: 'bold',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
              }}
            >
              Submit Inquiry
            </Link>
            <Link
              href="/"
              className="theme-btn"
              style={{
                padding: '14px 28px',
                border: '1px solid var(--border-mid)',
                color: 'var(--white-dim)',
                textDecoration: 'none',
                fontSize: '12px',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
              }}
            >
              ← Return Home
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
