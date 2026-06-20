'use client';

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import '@/app/moce.css'; // Reuses the unified form, console, and grid styles

interface ReadyWebsite {
  id: string;
  name: string;
  tagline: string;
  description: string;
  tech: string;
  image: string;
  previewUrl: string;
}

const WEBSITES: ReadyWebsite[] = [
  {
    id: 'mindspace',
    name: 'MindSpace AI',
    tagline: 'AI Mental Wellness Companion',
    description:
      'A premium, empathetic mental health assistant. Features custom conversational loops, mood tracking trackers, and secure journal entries wrapped in a sleek glassmorphic container.',
    tech: 'Next.js 15, TypeScript, WebAudio API, LocalStorage',
    image: '/assets/images/mindspace_mockup.png',
    previewUrl: '/products/mindspace',
  },
  {
    id: 'airis-security',
    name: 'AIris Security',
    tagline: 'AppSec Telemetry Audit Portal',
    description:
      'A real-time vulnerability auditor and telemetry dashboard. Perfect for software security firms, showcasing sandbox audits, interactive charts, and live security logging.',
    tech: 'Next.js 15, FastAPI, Chart.js, TailwindCSS',
    image: '/assets/images/airis_mockup.png',
    previewUrl: '/products/airis-security',
  },
  {
    id: 'paradigm-shift',
    name: 'Paradigm-Shift',
    tagline: 'Enterprise HRMS & Compliance Layer',
    description:
      'A robust administrative dashboard built for holding structures and decentralized compliance. Features operations tracking, organization charts, and document validation.',
    tech: 'Next.js 15, PostgreSQL, Node.js, Vercel',
    image: '/assets/images/paradigm_mockup.png',
    previewUrl: '/products/paradigm-shift',
  },
];

export default function TemplatesClient() {
  const formRef = useRef<HTMLDivElement>(null);
  const [form, setForm] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    discord: '',
    serviceNeeded: 'Template Customization: MindSpace AI',
    timeline: '2-4 weeks',
    budget: 'Flexible',
    meetingWindow: 'Afternoon UTC',
    description: '',
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSelectTemplate = (templateName: string) => {
    setForm((prev) => ({
      ...prev,
      serviceNeeded: `Template Customization: ${templateName}`,
    }));

    // Smooth scroll to form
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMsg('');

    try {
      const res = await fetch('/api/meetup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setStatus('success');
        setForm({
          name: '',
          company: '',
          email: '',
          phone: '',
          discord: '',
          serviceNeeded: 'Template Customization: MindSpace AI',
          timeline: '2-4 weeks',
          budget: 'Flexible',
          meetingWindow: 'Afternoon UTC',
          description: '',
        });
      } else {
        setStatus('error');
        setErrorMsg(data.error || 'Failed to submit customization request.');
      }
    } catch (err) {
      console.error(err);
      setStatus('error');
      setErrorMsg('Network error. Please check your connection and try again.');
    }
  };

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
            'radial-gradient(ellipse at 50% 10%, rgba(212, 201, 168, 0.06), transparent 70%)',
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
            href="/"
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
            ← Back to Main Studio
          </Link>
        </div>

        <div className="section-label">Ready-To-Ship Blueprints</div>
        <h1
          className="section-headline"
          style={{ marginTop: '16px', fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', lineHeight: '1.05' }}
        >
          System <em>Templates.</em>
        </h1>
        <p
          className="team-intro"
          style={{
            marginTop: '24px',
            maxWidth: '760px',
            fontSize: '1.05rem',
            color: 'var(--white-dim)',
            lineHeight: '1.7',
          }}
        >
          Explore our catalog of high-performance websites engineered for rapid deployment. Pick a
          template to edit or request a tailored customization/entirely new layout below.
        </p>

        {/* 3-Column Websites Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '32px',
            marginTop: '64px',
          }}
        >
          {WEBSITES.map((site) => (
            <div
              key={site.id}
              className="about-block"
              style={{
                borderRadius: '16px',
                overflow: 'hidden',
                background: 'var(--off-black)',
                border: '1px solid var(--border)',
                display: 'flex',
                flexDirection: 'column',
                padding: '0',
              }}
            >
              {/* Image Container */}
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  height: '200px',
                  background: '#0e0e0e',
                  borderBottom: '1px solid var(--border)',
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={site.image}
                  alt={`${site.name} Preview Thumbnail`}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }}
                />
              </div>

              {/* Details Block */}
              <div
                style={{
                  padding: '28px',
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                }}
              >
                <div>
                  <h3
                    style={{
                      fontSize: '18px',
                      fontWeight: 'bold',
                      color: 'var(--white)',
                      margin: 0,
                    }}
                  >
                    {site.name}
                  </h3>
                  <span
                    style={{
                      fontSize: '11px',
                      fontFamily: "'DM Mono', monospace",
                      color: 'var(--accent)',
                      marginTop: '4px',
                      display: 'block',
                    }}
                  >
                    {site.tagline}
                  </span>
                </div>

                <p
                  style={{
                    fontSize: '13px',
                    color: 'var(--white-dim)',
                    lineHeight: '1.6',
                    margin: 0,
                    flex: 1,
                  }}
                >
                  {site.description}
                </p>

                <div
                  style={{
                    background: 'rgba(0,0,0,0.2)',
                    padding: '12px',
                    border: '1px solid var(--border-mid)',
                    borderRadius: '8px',
                  }}
                >
                  <span
                    style={{
                      fontSize: '9px',
                      fontFamily: "'DM Mono', monospace",
                      color: 'var(--white-dimmer)',
                      textTransform: 'uppercase',
                      display: 'block',
                    }}
                  >
                    Stack Profile:
                  </span>
                  <span
                    style={{
                      fontSize: '11px',
                      color: 'var(--white-dim)',
                      fontFamily: "'DM Mono', monospace",
                      marginTop: '2px',
                      display: 'block',
                    }}
                  >
                    {site.tech}
                  </span>
                </div>

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '12px',
                    marginTop: '12px',
                  }}
                >
                  <Link
                    href={site.previewUrl}
                    className="theme-btn"
                    style={{
                      textAlign: 'center',
                      fontSize: '11px',
                      padding: '10px 0',
                      border: '1px solid var(--border-mid)',
                      borderRadius: '8px',
                      color: 'var(--white-dim)',
                      textDecoration: 'none',
                    }}
                  >
                    Live Preview →
                  </Link>
                  <button
                    onClick={() => handleSelectTemplate(site.name)}
                    className="theme-btn"
                    style={{
                      fontSize: '11px',
                      padding: '10px 0',
                      background: 'var(--white)',
                      color: 'var(--black)',
                      border: 'none',
                      borderRadius: '8px',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                    }}
                  >
                    Customize This
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Customization Form Section */}
        <div
          ref={formRef}
          style={{
            marginTop: '80px',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '48px',
            alignItems: 'start',
          }}
        >
          {/* Info Block */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div className="protocol-container" style={{ borderRadius: '16px', padding: '32px' }}>
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
                {'// CUSTOMIZATION PROTOCOL'}
              </h3>
              <p
                style={{
                  fontSize: '14px',
                  color: 'var(--white-dim)',
                  lineHeight: '1.7',
                  marginBottom: '16px',
                }}
              >
                Do you need one of these ready-to-ship frameworks tailored to your specific logo,
                database requirements, or UI palette? Or perhaps you require a completely new
                platform built from first-principles?
              </p>
              <p
                style={{
                  fontSize: '14px',
                  color: 'var(--white-dim)',
                  lineHeight: '1.7',
                  margin: 0,
                }}
              >
                Fill in your specifications here. Our holding company operations division will
                review the requirement payload and contact you via secure communication nodes.
              </p>
            </div>
          </div>

          {/* Form console */}
          <div
            className="meetup-container"
            style={{
              borderRadius: '16px',
              padding: '40px',
              background: 'rgba(255, 255, 255, 0.01)',
              border: '1px solid var(--border)',
            }}
          >
            <div className="meetup-header-console" style={{ marginBottom: '32px' }}>
              <div className="console-indicator">
                <span
                  className="indicator-dot blinking"
                  style={{ background: '#d4c9a8', boxShadow: '0 0 12px #d4c9a8' }}
                ></span>
                <span
                  className="console-title"
                  style={{
                    color: '#d4c9a8',
                    fontFamily: "'DM Mono', monospace",
                    fontSize: '12px',
                    fontWeight: 'bold',
                    letterSpacing: '0.05em',
                  }}
                >
                  TEMPLATE SELECTION // BLUEPRINT ADJUSTER
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
                Coordinate user details and blueprint requirements for custom adaptations.
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
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
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
                      [SUCCESS] REQUEST DISPATCHED
                    </h4>
                    <p
                      style={{ margin: '4px 0 0 0', fontSize: '13.5px', color: 'var(--white-dim)' }}
                    >
                      Your customization specifications were cleanly compiled and sent. We will
                      connect with you soon.
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
                  Submit New Request
                </button>
              </div>
            ) : status === 'error' ? (
              <div
                className="meetup-error-box console-box"
                style={{
                  background: 'rgba(239, 68, 68, 0.05)',
                  border: '1px solid rgba(239, 68, 68, 0.2)',
                  padding: '24px',
                  borderRadius: '8px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div
                    className="error-icon-wrap"
                    style={{
                      background: '#ef4444',
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
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </div>
                  <div>
                    <h4
                      className="console-alert"
                      style={{
                        margin: 0,
                        color: '#ef4444',
                        fontWeight: 'bold',
                        fontSize: '14px',
                        fontFamily: "'DM Mono', monospace",
                      }}
                    >
                      [FAILED] DISPATCH EXCEPTION
                    </h4>
                    <p
                      style={{ margin: '4px 0 0 0', fontSize: '13.5px', color: 'var(--white-dim)' }}
                    >
                      {errorMsg || 'Failed to submit customization parameters.'}
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
                    border: '1px solid rgba(239, 68, 68, 0.4)',
                    background: 'transparent',
                    color: '#fca5a5',
                    borderRadius: '6px',
                    cursor: 'pointer',
                  }}
                >
                  Retry Request
                </button>
              </div>
            ) : (
              <form
                className="meetup-form console-form"
                onSubmit={handleSubmit}
                style={{ display: 'grid', gap: '20px' }}
              >
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
                      placeholder="Your Name"
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
                      htmlFor="company"
                      style={{
                        fontSize: '11px',
                        fontWeight: 'bold',
                        textTransform: 'uppercase',
                        color: 'var(--white-dim)',
                        fontFamily: "'DM Mono', monospace",
                        letterSpacing: '0.05em',
                      }}
                    >
                      Company / Affiliation{' '}
                      <span style={{ color: '#ef4444', marginLeft: '2px' }}>•</span>
                    </label>
                    <input
                      id="company"
                      type="text"
                      className="form-input console-input"
                      placeholder="Company Name"
                      value={form.company}
                      onChange={(e) => setForm({ ...form, company: e.target.value })}
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
                  }}
                >
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
                      Contact Email <span style={{ color: '#ef4444', marginLeft: '2px' }}>•</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      className="form-input console-input"
                      placeholder="name@domain.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
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
                </div>

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
                      htmlFor="service"
                      style={{
                        fontSize: '11px',
                        fontWeight: 'bold',
                        textTransform: 'uppercase',
                        color: 'var(--white-dim)',
                        fontFamily: "'DM Mono', monospace",
                        letterSpacing: '0.05em',
                      }}
                    >
                      Service Needed <span style={{ color: '#ef4444', marginLeft: '2px' }}>•</span>
                    </label>
                    <select
                      id="service"
                      className="form-input console-input"
                      value={form.serviceNeeded}
                      onChange={(e) => setForm({ ...form, serviceNeeded: e.target.value })}
                      disabled={status === 'submitting'}
                      required
                      style={{
                        width: '100%',
                        outline: 'none',
                        background: 'var(--black)',
                        color: 'var(--white)',
                        padding: '10px',
                        border: '1px solid var(--border)',
                      }}
                    >
                      <option value="Template Customization: MindSpace AI">
                        Template Customization: MindSpace AI
                      </option>
                      <option value="Template Customization: AIris Security">
                        Template Customization: AIris Security
                      </option>
                      <option value="Template Customization: Paradigm-Shift">
                        Template Customization: Paradigm-Shift
                      </option>
                      <option value="Make an entirely new website">
                        Make an entirely new website
                      </option>
                      <option value="Full Build">Full Build</option>
                    </select>
                  </div>
                  <div
                    className="form-group"
                    style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}
                  >
                    <label
                      htmlFor="timeline"
                      style={{
                        fontSize: '11px',
                        fontWeight: 'bold',
                        textTransform: 'uppercase',
                        color: 'var(--white-dim)',
                        fontFamily: "'DM Mono', monospace",
                        letterSpacing: '0.05em',
                      }}
                    >
                      Preferred Timeline{' '}
                      <span style={{ color: '#ef4444', marginLeft: '2px' }}>•</span>
                    </label>
                    <select
                      id="timeline"
                      className="form-input console-input"
                      value={form.timeline}
                      onChange={(e) => setForm({ ...form, timeline: e.target.value })}
                      disabled={status === 'submitting'}
                      required
                      style={{
                        width: '100%',
                        outline: 'none',
                        background: 'var(--black)',
                        color: 'var(--white)',
                        padding: '10px',
                        border: '1px solid var(--border)',
                      }}
                    >
                      <option value="< 2 weeks">&lt; 2 weeks</option>
                      <option value="2-4 weeks">2-4 weeks</option>
                      <option value="1-2 months">1-2 months</option>
                      <option value="Flexible">Flexible</option>
                    </select>
                  </div>
                </div>

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
                      htmlFor="budget"
                      style={{
                        fontSize: '11px',
                        fontWeight: 'bold',
                        textTransform: 'uppercase',
                        color: 'var(--white-dim)',
                        fontFamily: "'DM Mono', monospace",
                        letterSpacing: '0.05em',
                      }}
                    >
                      Budget Range (Optional)
                    </label>
                    <select
                      id="budget"
                      className="form-input console-input"
                      value={form.budget}
                      onChange={(e) => setForm({ ...form, budget: e.target.value })}
                      disabled={status === 'submitting'}
                      style={{
                        width: '100%',
                        outline: 'none',
                        background: 'var(--black)',
                        color: 'var(--white)',
                        padding: '10px',
                        border: '1px solid var(--border)',
                      }}
                    >
                      <option value="Flexible">Flexible</option>
                      <option value="< $5k">&lt; $5k</option>
                      <option value="$5k - $15k">$5k - $15k</option>
                      <option value="$15k - $30k">$15k - $30k</option>
                      <option value="$30k+">$30k+</option>
                    </select>
                  </div>
                  <div
                    className="form-group"
                    style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}
                  >
                    <label
                      htmlFor="window"
                      style={{
                        fontSize: '11px',
                        fontWeight: 'bold',
                        textTransform: 'uppercase',
                        color: 'var(--white-dim)',
                        fontFamily: "'DM Mono', monospace",
                        letterSpacing: '0.05em',
                      }}
                    >
                      Meeting Window <span style={{ color: '#ef4444', marginLeft: '2px' }}>•</span>
                    </label>
                    <select
                      id="window"
                      className="form-input console-input"
                      value={form.meetingWindow}
                      onChange={(e) => setForm({ ...form, meetingWindow: e.target.value })}
                      disabled={status === 'submitting'}
                      required
                      style={{
                        width: '100%',
                        outline: 'none',
                        background: 'var(--black)',
                        color: 'var(--white)',
                        padding: '10px',
                        border: '1px solid var(--border)',
                      }}
                    >
                      <option value="Morning UTC">Morning UTC</option>
                      <option value="Afternoon UTC">Afternoon UTC</option>
                      <option value="Evening UTC">Evening UTC</option>
                      <option value="Anytime">Anytime / Flexible</option>
                    </select>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px' }}>
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
                      Discord ID / Social ID (Optional)
                    </label>
                    <input
                      id="discord"
                      type="text"
                      className="form-input console-input"
                      placeholder="username or link"
                      value={form.discord}
                      onChange={(e) => setForm({ ...form, discord: e.target.value })}
                      disabled={status === 'submitting'}
                      style={{ width: '100%', outline: 'none' }}
                    />
                  </div>
                </div>

                <div
                  className="form-group"
                  style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}
                >
                  <label
                    htmlFor="desc"
                    style={{
                      fontSize: '11px',
                      fontWeight: 'bold',
                      textTransform: 'uppercase',
                      color: 'var(--white-dim)',
                      fontFamily: "'DM Mono', monospace",
                      letterSpacing: '0.05em',
                    }}
                  >
                    Customization Scope / Requirements{' '}
                    <span style={{ color: '#ef4444', marginLeft: '2px' }}>•</span>
                  </label>
                  <textarea
                    id="desc"
                    className="form-input console-input"
                    placeholder="Provide specific details about required layout edits, brand colors, database integration, or scope..."
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    disabled={status === 'submitting'}
                    required
                    rows={5}
                    style={{ width: '100%', outline: 'none', resize: 'vertical' }}
                  />
                </div>

                <button
                  type="submit"
                  className="theme-btn"
                  disabled={status === 'submitting'}
                  style={{
                    padding: '14px 28px',
                    background: 'var(--accent)',
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
                  {status === 'submitting'
                    ? 'TRANSMITTING CUSTOMIZATION PARAMETERS...'
                    : 'SUBMIT CUSTOMIZATION REQUEST'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
