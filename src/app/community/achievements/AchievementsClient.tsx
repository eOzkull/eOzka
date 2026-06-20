'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function AchievementsClient() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const timelineEvents = [
    {
      date: 'Q2 2026',
      title: 'AIris Security AST Audits',
      subtitle: 'Codebase Security & Vulnerability Audits',
      desc: 'eOzka student ambassadors organized and executed local auditing cohorts in multiple university tech hubs. Over 15 applications were triaged, demonstrating how localized signature-based AST scans detect CORS and SQL injection vulnerabilities without relying on cloud-based processing.',
      metric: '15+ Codebases Audited',
    },
    {
      date: 'Q2 2026',
      title: 'MOCE Decoupled Templates Integration',
      subtitle: 'Developer Toolkit Distribution',
      desc: 'Released verified boilerplate skeletons for high-performance SaaS applications and local webhook endpoints. Enabled student teams to spin up secured Next.js apps with pre-configured ESLint and pre-commit security gates.',
      metric: '3 Blueprints Deployed',
    },
    {
      date: 'Q1 2026',
      title: 'Entab-D Campus Deployment',
      subtitle: 'Knowledge Worker Productivity Trials',
      desc: 'Ambassadors coordinated campus install sprints, setting up over 100+ active users with our Chrome extension. The study verified that automatic tab grouping reduces active RAM usage by up to 34% on student Chromebooks and prevents context fragmentation.',
      metric: '100+ Active Installs',
    },
    {
      date: 'Q4 2025',
      title: 'Nolin.in Canteen Pilot Launch',
      subtitle: 'Campus Commerce Platform Trial',
      desc: 'Initiated the first campus food-ordering tests. Using live queue calculations and pickup codes, the campus pilot successfully proved a 40% reduction in student wait times during peak class intervals.',
      metric: '40% Wait Reduction',
    },
    {
      date: 'Q3 2025',
      title: 'eOzka Student Alliance Inception',
      subtitle: 'Foundation of Student Chapters',
      desc: "Formally launched eOzka's campus reach programs across regional technology hubs, onboarding the first cohort of student representatives to act as localized engineering liaisons.",
      metric: '15 Ambassadors Inducted',
    },
  ];

  return (
    <main
      className="subpage-wrapper"
      style={{
        minHeight: '100vh',
        background: 'var(--black)',
        color: 'var(--white)',
        paddingBottom: '100px',
      }}
    >
      {/* Hero Header */}
      <section
        className="achievements-hero"
        style={{ padding: '160px 24px 60px 24px', maxWidth: '1200px', margin: '0 auto' }}
      >
        <Link
          href="/community"
          className="theme-btn"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            textDecoration: 'none',
            fontSize: '11px',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            marginBottom: '24px',
          }}
        >
          ← Back to Alliance Portal
        </Link>
        <div className="section-label">Alliance — Milestones</div>
        <h1
          className="section-headline"
          style={{ marginTop: '16px', fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', lineHeight: '1.1' }}
        >
          Impact, Achievements
          <br />
          <em style={{ fontStyle: 'italic', fontFamily: 'var(--serif)' }}>
            & Sentient Groundings.
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
          A ledger of what has happened. We track our community&apos;s work from local workshop
          sessions to active ecosystem adoptions, building verifiable engineering solutions rather
          than passive credentials.
        </p>
      </section>

      {/* Visual Image Grid with Placeholders */}
      <section
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 24px 60px 24px',
          border: 'none',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '24px',
          }}
        >
          <div
            style={{
              border: '1px solid var(--border)',
              background: 'rgba(255, 255, 255, 0.02)',
              padding: '20px',
              borderRadius: '12px',
            }}
          >
            <div
              style={{
                height: '200px',
                background: 'rgba(0,0,0,0.4)',
                border: '1px dashed rgba(212, 201, 168, 0.2)',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--accent)',
                fontSize: '11px',
                fontFamily: 'var(--font-mono)',
              }}
            >
              [IMG_NODE_01: AIris SecOps Workshop]
            </div>
            <h4 style={{ marginTop: '16px', fontSize: '15px', color: 'var(--white)' }}>
              AST Signature Workshops
            </h4>
            <p
              style={{
                marginTop: '6px',
                fontSize: '13px',
                color: 'var(--white-dim)',
                lineHeight: '1.5',
              }}
            >
              Teaching static analysis and local triage procedures to student builders.
            </p>
          </div>

          <div
            style={{
              border: '1px solid var(--border)',
              background: 'rgba(255, 255, 255, 0.02)',
              padding: '20px',
              borderRadius: '12px',
            }}
          >
            <div
              style={{
                height: '200px',
                background: 'rgba(0,0,0,0.4)',
                border: '1px dashed rgba(212, 201, 168, 0.2)',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--accent)',
                fontSize: '11px',
                fontFamily: 'var(--font-mono)',
              }}
            >
              [IMG_NODE_02: Entab-D Install Session]
            </div>
            <h4 style={{ marginTop: '16px', fontSize: '15px', color: 'var(--white)' }}>
              Entab-D Active Deployment
            </h4>
            <p
              style={{
                marginTop: '6px',
                fontSize: '13px',
                color: 'var(--white-dim)',
                lineHeight: '1.5',
              }}
            >
              On-boarding users to browser tab compilers to prevent window fragmentation.
            </p>
          </div>

          <div
            style={{
              border: '1px solid var(--border)',
              background: 'rgba(255, 255, 255, 0.02)',
              padding: '20px',
              borderRadius: '12px',
            }}
          >
            <div
              style={{
                height: '200px',
                background: 'rgba(0,0,0,0.4)',
                border: '1px dashed rgba(212, 201, 168, 0.2)',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--accent)',
                fontSize: '11px',
                fontFamily: 'var(--font-mono)',
              }}
            >
              [IMG_NODE_03: Nolin Canteen Deployment]
            </div>
            <h4 style={{ marginTop: '16px', fontSize: '15px', color: 'var(--white)' }}>
              Nolin Campus Commerce Pilot
            </h4>
            <p
              style={{
                marginTop: '6px',
                fontSize: '13px',
                color: 'var(--white-dim)',
                lineHeight: '1.5',
              }}
            >
              Live queue monitoring and secure pickup code integration in North Block.
            </p>
          </div>
        </div>
      </section>

      {/* Recorded Talks Section */}
      <section
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 24px 60px 24px',
          border: 'none',
        }}
      >
        <h2
          style={{
            fontFamily: 'var(--serif)',
            fontSize: '28px',
            fontWeight: '400',
            color: 'var(--white)',
            marginBottom: '8px',
          }}
        >
          Recorded Talks & Technical Briefings
        </h2>
        <p
          style={{
            fontSize: '14.5px',
            color: 'var(--sub-text)',
            marginBottom: '32px',
            lineHeight: '1.6',
          }}
        >
          Briefings, conference presentations, and technical walk-throughs delivered by eOzka
          engineers and student leads.
        </p>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '28px',
          }}
        >
          {/* Talk card 1 */}
          <div
            style={{
              border: '1px solid var(--border)',
              background: 'rgba(255, 255, 255, 0.02)',
              padding: '28px',
              borderRadius: '16px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '16px',
                }}
              >
                <span
                  style={{
                    fontSize: '10px',
                    fontFamily: 'var(--ff-mono)',
                    color: 'var(--accent)',
                    letterSpacing: '0.1em',
                  }}
                >
                  [ VIDEO BRIEFING // 22 MIN ]
                </span>
                <span style={{ fontSize: '11px', color: 'var(--sub-text)' }}>May 24, 2026</span>
              </div>
              <h3
                style={{
                  fontSize: '20px',
                  color: 'var(--white)',
                  fontWeight: 'bold',
                  marginBottom: '8px',
                }}
              >
                AST Signature Profiling: Localized AppSec
              </h3>
              <p
                style={{
                  fontSize: '14px',
                  color: 'var(--white-dim)',
                  lineHeight: '1.6',
                  marginBottom: '20px',
                }}
              >
                A deep dive into abstract syntax tree traversal and signature checkers inside AIris
                Security, explaining how to run zero-cloud vulnerability scanning in CI pipelines.
              </p>
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderTop: '1px solid rgba(255,255,255,0.06)',
                paddingTop: '16px',
              }}
            >
              <span
                style={{ fontSize: '12px', color: 'var(--accent)', fontFamily: 'var(--ff-mono)' }}
              >
                Mahin & Kushagra B.
              </span>
              <a
                href="#"
                className="theme-btn"
                style={{
                  padding: '8px 16px',
                  fontSize: '11px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  textDecoration: 'none',
                  background: 'rgba(255,255,255,0.05)',
                  borderRadius: '4px',
                }}
              >
                Play Briefing ⏵
              </a>
            </div>
          </div>

          {/* Talk card 2 */}
          <div
            style={{
              border: '1px solid var(--border)',
              background: 'rgba(255, 255, 255, 0.02)',
              padding: '28px',
              borderRadius: '16px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '16px',
                }}
              >
                <span
                  style={{
                    fontSize: '10px',
                    fontFamily: 'var(--ff-mono)',
                    color: 'var(--accent)',
                    letterSpacing: '0.1em',
                  }}
                >
                  [ DECK & TALK // 18 MIN ]
                </span>
                <span style={{ fontSize: '11px', color: 'var(--sub-text)' }}>March 12, 2026</span>
              </div>
              <h3
                style={{
                  fontSize: '20px',
                  color: 'var(--white)',
                  fontWeight: 'bold',
                  marginBottom: '8px',
                }}
              >
                Memory Optimization in Chromium Extensions
              </h3>
              <p
                style={{
                  fontSize: '14px',
                  color: 'var(--white-dim)',
                  lineHeight: '1.6',
                  marginBottom: '20px',
                }}
              >
                How Entab-D implements background page lifecycle checks and DOM clustering rules to
                reclaim unused Chromebook memory, verified via student performance trials.
              </p>
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderTop: '1px solid rgba(255,255,255,0.06)',
                paddingTop: '16px',
              }}
            >
              <span
                style={{ fontSize: '12px', color: 'var(--accent)', fontFamily: 'var(--ff-mono)' }}
              >
                Ishaan Parashar
              </span>
              <a
                href="#"
                className="theme-btn"
                style={{
                  padding: '8px 16px',
                  fontSize: '11px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  textDecoration: 'none',
                  background: 'rgba(255,255,255,0.05)',
                  borderRadius: '4px',
                }}
              >
                Access Slides & Talk ⏵
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Scroll-To Section */}
      <section
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 24px 60px 24px',
          border: 'none',
        }}
      >
        <h2
          style={{
            fontFamily: 'var(--serif)',
            fontSize: '28px',
            fontWeight: '400',
            color: 'var(--white)',
            marginBottom: '32px',
          }}
        >
          Chronological Ledger
        </h2>
        <div
          style={{
            borderLeft: '1px solid var(--border)',
            paddingLeft: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '40px',
          }}
        >
          {timelineEvents.map((event, idx) => (
            <div key={idx} style={{ position: 'relative' }}>
              {/* Bullet Node */}
              <span
                style={{
                  position: 'absolute',
                  left: '-29.5px',
                  top: '6px',
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  background: 'var(--accent)',
                  border: '2px solid var(--black)',
                }}
              />

              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: 'space-between',
                  alignItems: 'baseline',
                  gap: '8px',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--ff-mono)',
                    fontSize: '11px',
                    color: 'var(--accent)',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                  }}
                >
                  {event.date}
                </span>
                <span
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid var(--border)',
                    padding: '2px 8px',
                    borderRadius: '4px',
                    fontSize: '11px',
                    color: 'var(--white)',
                    fontFamily: 'var(--ff-mono)',
                  }}
                >
                  {event.metric}
                </span>
              </div>

              <h3
                style={{
                  marginTop: '8px',
                  fontSize: '20px',
                  color: 'var(--white)',
                  fontWeight: 'bold',
                }}
              >
                {event.title}
              </h3>
              <h4
                style={{
                  marginTop: '2px',
                  fontSize: '13px',
                  color: 'var(--accent)',
                  fontFamily: 'var(--ff-mono)',
                }}
              >
                {event.subtitle}
              </h4>
              <p
                style={{
                  marginTop: '12px',
                  fontSize: '14.5px',
                  color: 'var(--white-dim)',
                  lineHeight: '1.7',
                  maxWidth: '800px',
                }}
              >
                {event.desc}
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
