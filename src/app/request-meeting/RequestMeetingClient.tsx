'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import '@/app/moce.css'; // Reuses the unified form and console UI styles

export default function RequestMeetingClient() {
  const [form, setForm] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    discord: '',
    serviceNeeded: 'Template Customization & Frontend Tuning',
    timeline: '2-4 weeks',
    budget: 'Flexible',
    meetingWindow: 'Afternoon (UTC)',
    description: '',
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
          serviceNeeded: 'Template Customization & Frontend Tuning',
          timeline: '2-4 weeks',
          budget: 'Flexible',
          meetingWindow: 'Afternoon (UTC)',
          description: '',
        });
      } else {
        setStatus('error');
        setErrorMsg(data.error || 'Failed to submit request.');
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
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Premium Multi-Glow Background */}
      <div
        style={{
          position: 'absolute',
          top: '-150px',
          right: '10%',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(212,201,168,0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '-150px',
          left: '10%',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(168,85,247,0.03) 0%, transparent 70%)',
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
            ← Back to Main Page
          </Link>
        </div>

        <div className="section-label">Get in Touch</div>
        <h1
          className="section-headline"
          style={{ marginTop: '16px', fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', lineHeight: '1.1' }}
        >
          Let&apos;s start a <em>conversation.</em>
        </h1>
        <p
          className="team-intro"
          style={{
            marginTop: '24px',
            maxWidth: '700px',
            fontSize: '1.05rem',
            color: 'var(--white-dim)',
            lineHeight: '1.6',
          }}
        >
          Connect with the eOzka engineering team to discuss your project, explore custom template
          customizations, or coordinate a technical architecture review.
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
          {/* Left Column: How We Collaborate */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <div className="protocol-container" style={{ borderRadius: '16px', padding: '32px' }}>
              <h3
                style={{
                  fontSize: '13px',
                  color: 'var(--accent)',
                  fontWeight: 'bold',
                  marginBottom: '24px',
                  fontFamily: "'DM Mono', monospace",
                  letterSpacing: '0.05em',
                }}
              >
                {'// AREAS OF ALIGNMENT'}
              </h3>
              <p
                style={{
                  fontSize: '14.5px',
                  color: 'var(--white-dim)',
                  lineHeight: '1.7',
                  marginBottom: '24px',
                }}
              >
                We provide dedicated technical support and systems engineering to integrate,
                optimize, and secure eOzka templates and custom systems.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <div style={{ borderLeft: '2px solid var(--accent)', paddingLeft: '16px' }}>
                  <h4
                    style={{
                      fontSize: '15px',
                      fontWeight: '600',
                      color: 'var(--white)',
                      marginBottom: '6px',
                    }}
                  >
                    Frontend & Layout Tuning
                  </h4>
                  <p
                    style={{
                      fontSize: '13px',
                      color: 'var(--white-dim)',
                      margin: 0,
                      lineHeight: '1.5',
                    }}
                  >
                    Fine-tune layout styling, clean client-side routes, optimize Next.js assets, and
                    design smooth micro-animations.
                  </p>
                </div>
                <div style={{ borderLeft: '2px solid var(--accent)', paddingLeft: '16px' }}>
                  <h4
                    style={{
                      fontSize: '15px',
                      fontWeight: '600',
                      color: 'var(--white)',
                      marginBottom: '6px',
                    }}
                  >
                    Security & Source Code Auditing
                  </h4>
                  <p
                    style={{
                      fontSize: '13px',
                      color: 'var(--white-dim)',
                      margin: 0,
                      lineHeight: '1.5',
                    }}
                  >
                    Identify vulnerabilities early, secure input routing, set up zero-trust
                    architectures, and run pre-ship validation checks.
                  </p>
                </div>
                <div style={{ borderLeft: '2px solid var(--accent)', paddingLeft: '16px' }}>
                  <h4
                    style={{
                      fontSize: '15px',
                      fontWeight: '600',
                      color: 'var(--white)',
                      marginBottom: '6px',
                    }}
                  >
                    Bespoke Enterprise Systems
                  </h4>
                  <p
                    style={{
                      fontSize: '13px',
                      color: 'var(--white-dim)',
                      margin: 0,
                      lineHeight: '1.5',
                    }}
                  >
                    Build custom portal pages, secure administrative dashboards, automated webhooks,
                    and relational data layers.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Form Panel */}
          <div
            className="meetup-container"
            style={{
              borderRadius: '16px',
              padding: '40px',
              background: 'rgba(255, 255, 255, 0.015)',
              border: '1px solid var(--border)',
            }}
          >
            <div className="meetup-header-console" style={{ marginBottom: '32px' }}>
              <div className="console-indicator">
                <span
                  className="indicator-dot blinking"
                  style={{ background: 'var(--accent)', boxShadow: '0 0 12px var(--accent)' }}
                ></span>
                <span
                  className="console-title"
                  style={{
                    color: 'var(--accent)',
                    fontFamily: "'DM Mono', monospace",
                    fontSize: '12px',
                    fontWeight: 'bold',
                    letterSpacing: '0.05em',
                  }}
                >
                  CONSULTATION REQUEST
                </span>
              </div>
              <p
                style={{
                  margin: '8px 0 0 0',
                  fontSize: '14px',
                  color: 'var(--white-dim)',
                  lineHeight: '1.5',
                }}
              >
                Please share a few details about your project, and we will get back to you to
                schedule a consultation.
              </p>
            </div>

            {status === 'success' ? (
              <div
                className="meetup-success-box console-box"
                style={{
                  background: 'rgba(16, 185, 129, 0.05)',
                  border: '1px solid rgba(16, 185, 129, 0.2)',
                  padding: '32px',
                  borderRadius: '12px',
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
                      padding: '8px',
                      color: '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
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
                        fontSize: '15px',
                        fontFamily: "'Syne', sans-serif",
                      }}
                    >
                      Request Received
                    </h4>
                    <p
                      style={{
                        margin: '6px 0 0 0',
                        fontSize: '14px',
                        color: 'var(--white-dim)',
                        lineHeight: '1.5',
                      }}
                    >
                      Thank you for reaching out. Your request has been received. Our team will
                      review your project details and contact you shortly to schedule a
                      consultation.
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  className="btn-submit"
                  onClick={() => setStatus('idle')}
                  style={{ marginTop: '16px' }}
                >
                  Submit Another Request
                </button>
              </div>
            ) : status === 'error' ? (
              <div
                className="meetup-error-box console-box"
                style={{
                  background: 'rgba(239, 68, 68, 0.05)',
                  border: '1px solid rgba(239, 68, 68, 0.2)',
                  padding: '32px',
                  borderRadius: '12px',
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
                      padding: '8px',
                      color: '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
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
                        fontSize: '15px',
                        fontFamily: "'Syne', sans-serif",
                      }}
                    >
                      Submission Failed
                    </h4>
                    <p
                      style={{
                        margin: '6px 0 0 0',
                        fontSize: '14px',
                        color: 'var(--white-dim)',
                        lineHeight: '1.5',
                      }}
                    >
                      {errorMsg ||
                        'We encountered an error while submitting your request. Please try again or email us directly.'}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  className="btn-submit"
                  onClick={() => setStatus('idle')}
                  style={{
                    marginTop: '16px',
                    background: 'transparent',
                    border: '1px solid rgba(239, 68, 68, 0.4)',
                    color: '#fca5a5',
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
                      htmlFor="meetup-name"
                      style={{
                        fontSize: '12px',
                        fontWeight: '600',
                        color: 'var(--white-dim)',
                        fontFamily: "'Syne', sans-serif",
                        letterSpacing: '0.02em',
                      }}
                    >
                      Full Name <span style={{ color: '#ef4444', marginLeft: '2px' }}>*</span>
                    </label>
                    <input
                      id="meetup-name"
                      type="text"
                      className="form-input console-input"
                      placeholder="e.g. Alex Rivera"
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
                      htmlFor="meetup-company"
                      style={{
                        fontSize: '12px',
                        fontWeight: '600',
                        color: 'var(--white-dim)',
                        fontFamily: "'Syne', sans-serif",
                        letterSpacing: '0.02em',
                      }}
                    >
                      Company / Organization{' '}
                      <span style={{ color: '#ef4444', marginLeft: '2px' }}>*</span>
                    </label>
                    <input
                      id="meetup-company"
                      type="text"
                      className="form-input console-input"
                      placeholder="e.g. Acme Corp"
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
                      htmlFor="meetup-email"
                      style={{
                        fontSize: '12px',
                        fontWeight: '600',
                        color: 'var(--white-dim)',
                        fontFamily: "'Syne', sans-serif",
                        letterSpacing: '0.02em',
                      }}
                    >
                      Email Address <span style={{ color: '#ef4444', marginLeft: '2px' }}>*</span>
                    </label>
                    <input
                      id="meetup-email"
                      type="email"
                      className="form-input console-input"
                      placeholder="alex@domain.com"
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
                      htmlFor="meetup-phone"
                      style={{
                        fontSize: '12px',
                        fontWeight: '600',
                        color: 'var(--white-dim)',
                        fontFamily: "'Syne', sans-serif",
                        letterSpacing: '0.02em',
                      }}
                    >
                      Phone Number <span style={{ color: '#ef4444', marginLeft: '2px' }}>*</span>
                    </label>
                    <input
                      id="meetup-phone"
                      type="text"
                      className="form-input console-input"
                      placeholder="+1 (555) 019-2834"
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
                      htmlFor="meetup-service"
                      style={{
                        fontSize: '12px',
                        fontWeight: '600',
                        color: 'var(--white-dim)',
                        fontFamily: "'Syne', sans-serif",
                        letterSpacing: '0.02em',
                      }}
                    >
                      How can we help?{' '}
                      <span style={{ color: '#ef4444', marginLeft: '2px' }}>*</span>
                    </label>
                    <select
                      id="meetup-service"
                      className="form-input console-input"
                      value={form.serviceNeeded}
                      onChange={(e) => setForm({ ...form, serviceNeeded: e.target.value })}
                      disabled={status === 'submitting'}
                      required
                      style={{ width: '100%', outline: 'none' }}
                    >
                      <option value="Template Customization & Frontend Tuning">
                        Template Customization & Frontend Tuning
                      </option>
                      <option value="Full-Scale Software Development">
                        Full-Scale Software Development
                      </option>
                      <option value="Security Audit & Threat Modeling">
                        Security Audit & Threat Modeling
                      </option>
                      <option value="General Technical Consulting">
                        General Technical Consulting
                      </option>
                    </select>
                  </div>
                  <div
                    className="form-group"
                    style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}
                  >
                    <label
                      htmlFor="meetup-timeline"
                      style={{
                        fontSize: '12px',
                        fontWeight: '600',
                        color: 'var(--white-dim)',
                        fontFamily: "'Syne', sans-serif",
                        letterSpacing: '0.02em',
                      }}
                    >
                      Preferred Timeline{' '}
                      <span style={{ color: '#ef4444', marginLeft: '2px' }}>*</span>
                    </label>
                    <select
                      id="meetup-timeline"
                      className="form-input console-input"
                      value={form.timeline}
                      onChange={(e) => setForm({ ...form, timeline: e.target.value })}
                      disabled={status === 'submitting'}
                      required
                      style={{ width: '100%', outline: 'none' }}
                    >
                      <option value="Urgent (< 2 weeks)">Urgent (&lt; 2 weeks)</option>
                      <option value="Standard (2-4 weeks)">Standard (2-4 weeks)</option>
                      <option value="Mid-term (1-2 months)">Mid-term (1-2 months)</option>
                      <option value="Flexible / Ongoing">Flexible / Ongoing</option>
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
                      htmlFor="meetup-budget"
                      style={{
                        fontSize: '12px',
                        fontWeight: '600',
                        color: 'var(--white-dim)',
                        fontFamily: "'Syne', sans-serif",
                        letterSpacing: '0.02em',
                      }}
                    >
                      Estimated Budget (Optional)
                    </label>
                    <select
                      id="meetup-budget"
                      className="form-input console-input"
                      value={form.budget}
                      onChange={(e) => setForm({ ...form, budget: e.target.value })}
                      disabled={status === 'submitting'}
                      style={{ width: '100%', outline: 'none' }}
                    >
                      <option value="Flexible">Flexible</option>
                      <option value="Under $5k">Under $5k</option>
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
                      htmlFor="meetup-window"
                      style={{
                        fontSize: '12px',
                        fontWeight: '600',
                        color: 'var(--white-dim)',
                        fontFamily: "'Syne', sans-serif",
                        letterSpacing: '0.02em',
                      }}
                    >
                      Preferred Meeting Time{' '}
                      <span style={{ color: '#ef4444', marginLeft: '2px' }}>*</span>
                    </label>
                    <select
                      id="meetup-window"
                      className="form-input console-input"
                      value={form.meetingWindow}
                      onChange={(e) => setForm({ ...form, meetingWindow: e.target.value })}
                      disabled={status === 'submitting'}
                      required
                      style={{ width: '100%', outline: 'none' }}
                    >
                      <option value="Morning (UTC)">Morning (UTC)</option>
                      <option value="Afternoon (UTC)">Afternoon (UTC)</option>
                      <option value="Evening (UTC)">Evening (UTC)</option>
                      <option value="Anytime / Flexible">Anytime / Flexible</option>
                    </select>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px' }}>
                  <div
                    className="form-group"
                    style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}
                  >
                    <label
                      htmlFor="meetup-discord"
                      style={{
                        fontSize: '12px',
                        fontWeight: '600',
                        color: 'var(--white-dim)',
                        fontFamily: "'Syne', sans-serif",
                        letterSpacing: '0.02em',
                      }}
                    >
                      Discord or Telegram Username (Optional)
                    </label>
                    <input
                      id="meetup-discord"
                      type="text"
                      className="form-input console-input"
                      placeholder="e.g. @username"
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
                    htmlFor="meetup-desc"
                    style={{
                      fontSize: '12px',
                      fontWeight: '600',
                      color: 'var(--white-dim)',
                      fontFamily: "'Syne', sans-serif",
                      letterSpacing: '0.02em',
                    }}
                  >
                    Tell us about your project{' '}
                    <span style={{ color: '#ef4444', marginLeft: '2px' }}>*</span>
                  </label>
                  <textarea
                    id="meetup-desc"
                    className="form-input console-input"
                    placeholder="Describe your project goals, timeline requirements, or the specific engineering challenges you'd like to address..."
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
                  className="btn-submit"
                  disabled={status === 'submitting'}
                  style={{
                    marginTop: '12px',
                    opacity: status === 'submitting' ? 0.7 : 1,
                  }}
                >
                  {status === 'submitting' ? 'Sending Request...' : 'Submit Request'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
