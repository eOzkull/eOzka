'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import '@/app/moce.css'; // Reuses the unified form and console styles

const ONBOARDING_PHASES = [
  {
    phase: 1,
    title: 'Handshake & Credentials',
    duration: 'Week 1-2',
    description:
      'Successful applicants enter the program gate. You receive access keys to the eOzka internal developer portal, set up communication protocols, and join private channels with core engineering leads.',
    milestones: ['Setup keys', 'Discord onboarding handshake', 'Initial cohort sync'],
  },
  {
    phase: 2,
    title: 'Advocacy & Outreach',
    duration: 'Week 3-6',
    description:
      'Organize tech meetups and student developer circles at your campus. Promote open-source performance standards and demonstrate our release blueprints to builders.',
    milestones: [
      'First campus hacking circle',
      '10+ developers onboarded',
      'Present eOzka blueprints',
    ],
  },
  {
    phase: 3,
    title: 'Open-Source Engineering',
    duration: 'Week 7-10',
    description:
      'Contribute actively to public repositories under eOzka. Build custom components, review pull requests, audit security configurations, and guide peer developer cohorts.',
    milestones: ['Merge 3+ code blueprints', 'AppSec validation audits', 'Peer reviews'],
  },
  {
    phase: 4,
    title: 'Fast-Track Evaluation',
    duration: 'Week 11-12',
    description:
      'Final program evaluation by the Technical Directorate. Outstanding ambassadors are fast-tracked for paid internships, operations roles, or partner enterprise placements.',
    milestones: ['Portfolio review', 'Certificate handshake', 'Internship placements'],
  },
];

export default function CAClient() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    discord: '',
    university: '',
    gradYear: '',
    github: '',
    portfolio: '',
    statement: '',
    projects: '',
    advocacy: '',
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [activePhase, setActivePhase] = useState(1);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMsg('');

    try {
      const res = await fetch('/api/ambassador', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setStatus('success');
        setForm({
          name: '',
          email: '',
          phone: '',
          discord: '',
          university: '',
          gradYear: '',
          github: '',
          portfolio: '',
          statement: '',
          projects: '',
          advocacy: '',
        });
      } else {
        setStatus('error');
        setErrorMsg(data.error || 'Failed to submit application.');
      }
    } catch (err) {
      console.error(err);
      setStatus('error');
      setErrorMsg('Network error. Please try again.');
    }
  };

  const selectedPhase =
    ONBOARDING_PHASES.find((p) => p.phase === activePhase) || ONBOARDING_PHASES[0];

  return (
    <main
      className="subpage-wrapper"
      style={{
        minHeight: '100vh',
        background: 'var(--black)',
        color: 'var(--white)',
        paddingTop: '120px',
        paddingBottom: '80px',
      }}
    >
      {/* Background Glow */}
      <div
        style={{
          position: 'absolute',
          top: '-200px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '80%',
          height: '600px',
          background:
            'radial-gradient(ellipse at 50% 10%, rgba(168, 85, 247, 0.06), transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <section
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 24px',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '24px' }}>
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
              border: '1px solid var(--border)',
              padding: '8px 16px',
              borderRadius: '8px',
              color: 'var(--white-dim)',
            }}
          >
            ← Back to Community
          </Link>
        </div>

        <div className="section-label">Cohort Admission</div>
        <h1
          className="section-headline"
          style={{ marginTop: '16px', fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', lineHeight: '1.1' }}
        >
          Campus Ambassador <em>Cohort.</em>
        </h1>
        <p
          className="team-intro"
          style={{
            marginTop: '24px',
            maxWidth: '750px',
            fontSize: '1.05rem',
            color: 'var(--white-dim)',
            lineHeight: '1.6',
          }}
        >
          Apply to join the select student engineering and advocacy division at eOzka. Lead
          developer groups, contribute directly to core open-source projects, and fast-track your
          engineering career.
        </p>

        {/* 2-Column Grid Layout */}
        <div
          className="meetup-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '48px',
            marginTop: '48px',
            alignItems: 'start',
          }}
        >
          {/* Left Column: Roles, Benefits & Timeline */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {/* Onboarding Timeline Stepper */}
            <div className="roles-container" style={{ borderRadius: '16px', padding: '32px' }}>
              <h3
                style={{
                  fontSize: '14px',
                  color: 'var(--accent)',
                  fontWeight: 'bold',
                  marginBottom: '24px',
                  fontFamily: "'DM Mono', monospace",
                  letterSpacing: '0.05em',
                }}
              >
                {'// COHORT ONBOARDING LIFECYCLE'}
              </h3>

              {/* Stepper Buttons */}
              <div
                style={{
                  display: 'flex',
                  gap: '12px',
                  marginBottom: '24px',
                  borderBottom: '1px solid var(--border)',
                  paddingBottom: '16px',
                  overflowX: 'auto',
                }}
              >
                {ONBOARDING_PHASES.map((p) => (
                  <button
                    key={p.phase}
                    onClick={() => setActivePhase(p.phase)}
                    style={{
                      background: activePhase === p.phase ? 'var(--accent)' : 'transparent',
                      color: activePhase === p.phase ? 'var(--black)' : 'var(--white-dim)',
                      border: '1px solid var(--border)',
                      padding: '8px 12px',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontSize: '11px',
                      fontFamily: "'DM Mono', monospace",
                      fontWeight: 'bold',
                      transition: 'all 0.3s ease',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    PHASE 0{p.phase}
                  </button>
                ))}
              </div>

              {/* Active Step Details */}
              <div style={{ minHeight: '180px' }}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '12px',
                  }}
                >
                  <span style={{ fontSize: '15px', fontWeight: 'bold', color: 'var(--white)' }}>
                    {selectedPhase.title}
                  </span>
                  <span
                    style={{
                      fontSize: '11px',
                      fontFamily: "'DM Mono', monospace",
                      color: 'var(--accent)',
                      border: '1px solid var(--border)',
                      padding: '2px 8px',
                      borderRadius: '4px',
                    }}
                  >
                    {selectedPhase.duration}
                  </span>
                </div>
                <p
                  style={{
                    fontSize: '13px',
                    color: 'var(--white-dim)',
                    lineHeight: '1.6',
                    marginBottom: '20px',
                  }}
                >
                  {selectedPhase.description}
                </p>
                <div>
                  <h4
                    style={{
                      fontSize: '11px',
                      fontFamily: "'DM Mono', monospace",
                      color: 'var(--white)',
                      textTransform: 'uppercase',
                      marginBottom: '8px',
                      letterSpacing: '0.05em',
                    }}
                  >
                    Milestones:
                  </h4>
                  <ul
                    style={{
                      paddingLeft: '18px',
                      margin: 0,
                      fontSize: '13px',
                      color: 'var(--white-dim)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '6px',
                    }}
                  >
                    {selectedPhase.milestones.map((m, idx) => (
                      <li key={idx} style={{ listStyleType: 'square' }}>
                        {m}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Benefits & Perks Grid */}
            <div className="perks-container" style={{ borderRadius: '16px', padding: '32px' }}>
              <h3
                style={{
                  fontSize: '14px',
                  color: 'var(--accent)',
                  fontWeight: 'bold',
                  marginBottom: '24px',
                  fontFamily: "'DM Mono', monospace",
                  letterSpacing: '0.05em',
                }}
              >
                {'// REWARDS & ALIGNMENT'}
              </h3>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '24px',
                }}
              >
                <div
                  style={{
                    background: 'rgba(255,255,255,0.01)',
                    padding: '20px',
                    borderRadius: '12px',
                    border: '1px solid rgba(255,255,255,0.02)',
                  }}
                >
                  <h4
                    style={{
                      fontSize: '14px',
                      fontWeight: 'bold',
                      color: 'var(--white)',
                      marginBottom: '8px',
                    }}
                  >
                    Direct Mentorship
                  </h4>
                  <p
                    style={{
                      fontSize: '12px',
                      color: 'var(--white-dim)',
                      margin: 0,
                      lineHeight: '1.5',
                    }}
                  >
                    Learn architecture design and deployment pipelines directly from eOzka systems
                    engineers.
                  </p>
                </div>

                <div
                  style={{
                    background: 'rgba(255,255,255,0.01)',
                    padding: '20px',
                    borderRadius: '12px',
                    border: '1px solid rgba(255,255,255,0.02)',
                  }}
                >
                  <h4
                    style={{
                      fontSize: '14px',
                      fontWeight: 'bold',
                      color: 'var(--white)',
                      marginBottom: '8px',
                    }}
                  >
                    Access to Blueprints
                  </h4>
                  <p
                    style={{
                      fontSize: '12px',
                      color: 'var(--white-dim)',
                      margin: 0,
                      lineHeight: '1.5',
                    }}
                  >
                    Get early access to core technology, private codebases, and experimental tools
                    before general release.
                  </p>
                </div>

                <div
                  style={{
                    background: 'rgba(255,255,255,0.01)',
                    padding: '20px',
                    borderRadius: '12px',
                    border: '1px solid rgba(255,255,255,0.02)',
                  }}
                >
                  <h4
                    style={{
                      fontSize: '14px',
                      fontWeight: 'bold',
                      color: 'var(--white)',
                      marginBottom: '8px',
                    }}
                  >
                    Budgets & Swag
                  </h4>
                  <p
                    style={{
                      fontSize: '12px',
                      color: 'var(--white-dim)',
                      margin: 0,
                      lineHeight: '1.5',
                    }}
                  >
                    Obtain financial grants, servers hosting, and custom swag packages to run events
                    at your campus.
                  </p>
                </div>

                <div
                  style={{
                    background: 'rgba(255,255,255,0.01)',
                    padding: '20px',
                    borderRadius: '12px',
                    border: '1px solid rgba(255,255,255,0.02)',
                  }}
                >
                  <h4
                    style={{
                      fontSize: '14px',
                      fontWeight: 'bold',
                      color: 'var(--white)',
                      marginBottom: '8px',
                    }}
                  >
                    Fast-Track Career
                  </h4>
                  <p
                    style={{
                      fontSize: '12px',
                      color: 'var(--white-dim)',
                      margin: 0,
                      lineHeight: '1.5',
                    }}
                  >
                    Excel in advocacy to earn recommendations and fast-track interviews for core
                    roles or partner firms.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Application Form Console */}
          <div
            className="meetup-container reveal"
            style={{ borderRadius: '16px', padding: '40px' }}
          >
            <div className="meetup-header-console" style={{ marginBottom: '32px' }}>
              <div className="console-indicator">
                <span
                  className="indicator-dot blinking"
                  style={{ background: '#a855f7', boxShadow: '0 0 12px #a855f7' }}
                ></span>
                <span
                  className="console-title"
                  style={{
                    color: '#a855f7',
                    fontFamily: "'DM Mono', monospace",
                    fontSize: '12px',
                    fontWeight: 'bold',
                    letterSpacing: '0.05em',
                  }}
                >
                  ADMISSION MODULE // COHORT HANDSHAKE GATEWAY
                </span>
              </div>
              <p
                style={{
                  margin: '8px 0 0 0',
                  fontSize: '13.5px',
                  color: 'var(--white-dim)',
                  lineHeight: '1.5',
                }}
              >
                Submit your technical background and statements to register for evaluation.
              </p>
            </div>

            {status === 'success' ? (
              <div
                className="meetup-success-box console-box"
                style={{
                  background: 'rgba(16, 185, 129, 0.05)',
                  border: '1px solid rgba(16, 185, 129, 0.2)',
                  padding: '24px',
                  borderRadius: '8px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div
                    className="success-icon-wrap"
                    style={{
                      background: '#10b981',
                      borderRadius: '50%',
                      padding: '6px',
                      color: '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      width="20"
                      height="20"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <div>
                    <h4
                      className="console-alert"
                      style={{
                        margin: 0,
                        color: '#10b981',
                        fontWeight: 'bold',
                        fontSize: '14px',
                        fontFamily: "'DM Mono', monospace",
                      }}
                    >
                      [SUCCESS] APPLICATION REGISTERED
                    </h4>
                    <p
                      style={{ margin: '4px 0 0 0', fontSize: '13.5px', color: 'var(--white-dim)' }}
                    >
                      Your application payload was cleanly transmitted to the eOzka operations logs.
                      We will get in touch soon.
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  className="theme-btn"
                  onClick={() => setStatus('idle')}
                  style={{
                    marginTop: '20px',
                    padding: '8px 16px',
                    border: '1px solid var(--border)',
                    background: 'transparent',
                    color: 'var(--white)',
                    borderRadius: '6px',
                    cursor: 'pointer',
                  }}
                >
                  Submit New Application
                </button>
              </div>
            ) : (
              <form
                className="meetup-form console-form"
                onSubmit={handleSubmit}
                style={{ display: 'grid', gap: '24px' }}
              >
                {/* Section 1: Contact */}
                <div>
                  <h3
                    style={{
                      fontSize: '13px',
                      color: 'var(--accent)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      borderBottom: '1px solid var(--border)',
                      paddingBottom: '8px',
                      marginBottom: '16px',
                      fontFamily: "'DM Mono', monospace",
                    }}
                  >
                    1. Profile Details
                  </h3>
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                      gap: '20px',
                    }}
                  >
                    <div
                      className="form-group"
                      style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}
                    >
                      <label
                        htmlFor="name"
                        style={{
                          fontSize: '11px',
                          fontWeight: 'bold',
                          textTransform: 'uppercase',
                          color: 'var(--white-dim)',
                          fontFamily: "'DM Mono', monospace",
                          letterSpacing: '0.05em',
                        }}
                      >
                        Full Name <span style={{ color: '#ef4444', marginLeft: '2px' }}>•</span>
                      </label>
                      <input
                        id="name"
                        type="text"
                        className="form-input console-input"
                        placeholder="Your Full Name"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        disabled={status === 'submitting'}
                        required
                        style={{ width: '100%', outline: 'none' }}
                      />
                    </div>
                    <div
                      className="form-group"
                      style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}
                    >
                      <label
                        htmlFor="email"
                        style={{
                          fontSize: '11px',
                          fontWeight: 'bold',
                          textTransform: 'uppercase',
                          color: 'var(--white-dim)',
                          fontFamily: "'DM Mono', monospace",
                          letterSpacing: '0.05em',
                        }}
                      >
                        Email Address <span style={{ color: '#ef4444', marginLeft: '2px' }}>•</span>
                      </label>
                      <input
                        id="email"
                        type="email"
                        className="form-input console-input"
                        placeholder="email@example.com"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        disabled={status === 'submitting'}
                        required
                        style={{ width: '100%', outline: 'none' }}
                      />
                    </div>
                  </div>

                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                      gap: '20px',
                      marginTop: '20px',
                    }}
                  >
                    <div
                      className="form-group"
                      style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}
                    >
                      <label
                        htmlFor="phone"
                        style={{
                          fontSize: '11px',
                          fontWeight: 'bold',
                          textTransform: 'uppercase',
                          color: 'var(--white-dim)',
                          fontFamily: "'DM Mono', monospace",
                          letterSpacing: '0.05em',
                        }}
                      >
                        Phone Number <span style={{ color: '#ef4444', marginLeft: '2px' }}>•</span>
                      </label>
                      <input
                        id="phone"
                        type="text"
                        className="form-input console-input"
                        placeholder="+1 (555) 000-0000"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        disabled={status === 'submitting'}
                        required
                        style={{ width: '100%', outline: 'none' }}
                      />
                    </div>
                    <div
                      className="form-group"
                      style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}
                    >
                      <label
                        htmlFor="discord"
                        style={{
                          fontSize: '11px',
                          fontWeight: 'bold',
                          textTransform: 'uppercase',
                          color: 'var(--white-dim)',
                          fontFamily: "'DM Mono', monospace",
                          letterSpacing: '0.05em',
                        }}
                      >
                        Social Media ID (Discord / Telegram / LinkedIn)
                      </label>
                      <input
                        id="discord"
                        type="text"
                        className="form-input console-input"
                        placeholder="username or @username"
                        value={form.discord}
                        onChange={(e) => setForm({ ...form, discord: e.target.value })}
                        disabled={status === 'submitting'}
                        style={{ width: '100%', outline: 'none' }}
                      />
                    </div>
                  </div>
                </div>

                {/* Section 2: Academic */}
                <div>
                  <h3
                    style={{
                      fontSize: '13px',
                      color: 'var(--accent)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      borderBottom: '1px solid var(--border)',
                      paddingBottom: '8px',
                      marginBottom: '16px',
                      fontFamily: "'DM Mono', monospace",
                    }}
                  >
                    2. Academic & Links
                  </h3>
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                      gap: '20px',
                    }}
                  >
                    <div
                      className="form-group"
                      style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}
                    >
                      <label
                        htmlFor="university"
                        style={{
                          fontSize: '11px',
                          fontWeight: 'bold',
                          textTransform: 'uppercase',
                          color: 'var(--white-dim)',
                          fontFamily: "'DM Mono', monospace",
                          letterSpacing: '0.05em',
                        }}
                      >
                        University / College{' '}
                        <span style={{ color: '#ef4444', marginLeft: '2px' }}>•</span>
                      </label>
                      <input
                        id="university"
                        type="text"
                        className="form-input console-input"
                        placeholder="University Name"
                        value={form.university}
                        onChange={(e) => setForm({ ...form, university: e.target.value })}
                        disabled={status === 'submitting'}
                        required
                        style={{ width: '100%', outline: 'none' }}
                      />
                    </div>
                    <div
                      className="form-group"
                      style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}
                    >
                      <label
                        htmlFor="gradYear"
                        style={{
                          fontSize: '11px',
                          fontWeight: 'bold',
                          textTransform: 'uppercase',
                          color: 'var(--white-dim)',
                          fontFamily: "'DM Mono', monospace",
                          letterSpacing: '0.05em',
                        }}
                      >
                        Graduation Year{' '}
                        <span style={{ color: '#ef4444', marginLeft: '2px' }}>•</span>
                      </label>
                      <input
                        id="gradYear"
                        type="text"
                        className="form-input console-input"
                        placeholder="e.g. 2027"
                        value={form.gradYear}
                        onChange={(e) => setForm({ ...form, gradYear: e.target.value })}
                        disabled={status === 'submitting'}
                        required
                        style={{ width: '100%', outline: 'none' }}
                      />
                    </div>
                  </div>

                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                      gap: '20px',
                      marginTop: '20px',
                    }}
                  >
                    <div
                      className="form-group"
                      style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}
                    >
                      <label
                        htmlFor="github"
                        style={{
                          fontSize: '11px',
                          fontWeight: 'bold',
                          textTransform: 'uppercase',
                          color: 'var(--white-dim)',
                          fontFamily: "'DM Mono', monospace",
                          letterSpacing: '0.05em',
                        }}
                      >
                        GitHub Profile Link{' '}
                        <span style={{ color: '#ef4444', marginLeft: '2px' }}>•</span>
                      </label>
                      <input
                        id="github"
                        type="url"
                        className="form-input console-input"
                        placeholder="https://github.com/username"
                        value={form.github}
                        onChange={(e) => setForm({ ...form, github: e.target.value })}
                        disabled={status === 'submitting'}
                        required
                        style={{ width: '100%', outline: 'none' }}
                      />
                    </div>
                    <div
                      className="form-group"
                      style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}
                    >
                      <label
                        htmlFor="portfolio"
                        style={{
                          fontSize: '11px',
                          fontWeight: 'bold',
                          textTransform: 'uppercase',
                          color: 'var(--white-dim)',
                          fontFamily: "'DM Mono', monospace",
                          letterSpacing: '0.05em',
                        }}
                      >
                        Portfolio / LinkedIn URL{' '}
                        <span style={{ color: '#ef4444', marginLeft: '2px' }}>•</span>
                      </label>
                      <input
                        id="portfolio"
                        type="url"
                        className="form-input console-input"
                        placeholder="https://linkedin.com/in/username"
                        value={form.portfolio}
                        onChange={(e) => setForm({ ...form, portfolio: e.target.value })}
                        disabled={status === 'submitting'}
                        required
                        style={{ width: '100%', outline: 'none' }}
                      />
                    </div>
                  </div>
                </div>

                {/* Section 3: Questionnaire */}
                <div>
                  <h3
                    style={{
                      fontSize: '13px',
                      color: 'var(--accent)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      borderBottom: '1px solid var(--border)',
                      paddingBottom: '8px',
                      marginBottom: '16px',
                      fontFamily: "'DM Mono', monospace",
                    }}
                  >
                    3. Questionnaire
                  </h3>

                  <div
                    className="form-group"
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '8px',
                      marginBottom: '20px',
                    }}
                  >
                    <label
                      htmlFor="statement"
                      style={{
                        fontSize: '11px',
                        fontWeight: 'bold',
                        textTransform: 'uppercase',
                        color: 'var(--white-dim)',
                        fontFamily: "'DM Mono', monospace",
                        letterSpacing: '0.05em',
                      }}
                    >
                      Why do you want to join the eOzka Campus Ambassador Cohort?{' '}
                      <span style={{ color: '#ef4444', marginLeft: '2px' }}>•</span>
                    </label>
                    <textarea
                      id="statement"
                      className="form-input console-input"
                      placeholder="Provide a statement of purpose outlining your motivation..."
                      value={form.statement}
                      onChange={(e) => setForm({ ...form, statement: e.target.value })}
                      disabled={status === 'submitting'}
                      required
                      rows={4}
                      style={{ width: '100%', outline: 'none', resize: 'vertical' }}
                    />
                  </div>

                  <div
                    className="form-group"
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '8px',
                      marginBottom: '20px',
                    }}
                  >
                    <label
                      htmlFor="projects"
                      style={{
                        fontSize: '11px',
                        fontWeight: 'bold',
                        textTransform: 'uppercase',
                        color: 'var(--white-dim)',
                        fontFamily: "'DM Mono', monospace",
                        letterSpacing: '0.05em',
                      }}
                    >
                      Detail a technical project you built recently (Stack, logic, complexity).{' '}
                      <span style={{ color: '#ef4444', marginLeft: '2px' }}>•</span>
                    </label>
                    <textarea
                      id="projects"
                      className="form-input console-input"
                      placeholder="Describe your architecture and logic..."
                      value={form.projects}
                      onChange={(e) => setForm({ ...form, projects: e.target.value })}
                      disabled={status === 'submitting'}
                      required
                      rows={4}
                      style={{ width: '100%', outline: 'none', resize: 'vertical' }}
                    />
                  </div>

                  <div
                    className="form-group"
                    style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}
                  >
                    <label
                      htmlFor="advocacy"
                      style={{
                        fontSize: '11px',
                        fontWeight: 'bold',
                        textTransform: 'uppercase',
                        color: 'var(--white-dim)',
                        fontFamily: "'DM Mono', monospace",
                        letterSpacing: '0.05em',
                      }}
                    >
                      How do you plan to lead developer communities and advocate open-source on
                      campus? <span style={{ color: '#ef4444', marginLeft: '2px' }}>•</span>
                    </label>
                    <textarea
                      id="advocacy"
                      className="form-input console-input"
                      placeholder="Describe your leadership or community experiences and outreach plans..."
                      value={form.advocacy}
                      onChange={(e) => setForm({ ...form, advocacy: e.target.value })}
                      disabled={status === 'submitting'}
                      required
                      rows={4}
                      style={{ width: '100%', outline: 'none', resize: 'vertical' }}
                    />
                  </div>
                </div>

                {status === 'error' && (
                  <div
                    style={{
                      color: '#fca5a5',
                      fontSize: '13px',
                      fontFamily: "'DM Mono', monospace",
                    }}
                  >
                    ⚠️ {errorMsg}
                  </div>
                )}

                <button
                  type="submit"
                  className="theme-btn"
                  disabled={status === 'submitting'}
                  style={{
                    padding: '14px 28px',
                    background: 'var(--white)',
                    color: 'var(--black)',
                    border: 'none',
                    borderRadius: '8px',
                    fontWeight: 'bold',
                    fontSize: '12px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    cursor: 'pointer',
                    opacity: status === 'submitting' ? 0.7 : 1,
                    marginTop: '12px',
                    transition: 'all 0.3s ease',
                  }}
                >
                  {status === 'submitting' ? 'TRANSMITTING APPLICATION...' : 'SUBMIT APPLICATION'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
