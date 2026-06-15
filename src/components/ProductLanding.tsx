'use client';

import Link from 'next/link';
import { ReactNode } from 'react';

interface ProductLandingProps {
  productName: string;
  tagline: string;
  status: 'Live' | 'Pipeline' | 'Research';
  statusColor: 'live' | 'pipeline' | 'research';
  problemStatement: string;
  marketSize: string;
  marketOpportunity: string;
  metrics: { label: string; value: string }[];
  features: { title: string; description: string; icon?: string }[];
  caseStudies: { title: string; description: string; result: string }[];
  githubLink?: string;
  integrationLink?: string;
  websiteLink?: string;
  children?: ReactNode;
}

export default function ProductLanding({
  productName,
  tagline,
  status,
  statusColor,
  problemStatement,
  marketSize,
  marketOpportunity,
  metrics,
  features,
  caseStudies,
  githubLink,
  integrationLink,
  websiteLink,
  children,
}: ProductLandingProps) {
  const statusStyles: Record<string, { border: string; color: string; bg: string }> = {
    live: { border: '#2a4a2a', color: '#6aba6a', bg: 'rgba(10, 24, 10, 0.4)' },
    pipeline: { border: '#3a3020', color: '#9a8050', bg: 'rgba(20, 16, 10, 0.4)' },
    research: { border: '#3a2a3a', color: '#9a7a8a', bg: 'rgba(20, 10, 20, 0.4)' },
  };

  const style = statusStyles[statusColor];

  return (
    <main className="subpage-wrapper" style={{ minHeight: '100vh', background: 'var(--black)', color: 'var(--white)', paddingTop: '120px' }}>
      {/* Hero Section */}
      <section className="product-landing-hero" style={{ padding: '60px 24px 40px 24px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px', flexWrap: 'wrap' }}>
          <h1 className="section-headline" style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', lineHeight: '1.1', margin: 0 }}>
            {productName}
          </h1>
          <span className="product-tag" style={{ border: `1px solid ${style.border}`, color: style.color, background: style.bg, padding: '4px 12px', fontSize: '11px', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', whiteSpace: 'nowrap' }}>
            {status}
          </span>
        </div>

        <p className="product-tagline" style={{ fontSize: '1.15rem', color: 'var(--accent)', marginBottom: '28px', maxWidth: '760px', lineHeight: 1.7 }}>
          {tagline}
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.15fr) minmax(320px, 0.85fr)', gap: '24px', alignItems: 'stretch' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px', padding: '24px', border: '1px solid var(--border)', background: 'linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))', borderRadius: '12px' }}>
            {metrics.map((metric, idx) => (
              <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '8px', padding: '14px 0' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--accent-dim)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  {metric.label}
                </span>
                <span style={{ fontSize: '24px', fontWeight: 700, color: 'var(--white)' }}>
                  {metric.value}
                </span>
              </div>
            ))}
          </div>

          <div style={{ border: '1px solid var(--border)', borderRadius: '12px', background: 'radial-gradient(circle at top, rgba(212, 201, 168, 0.14), transparent 55%), var(--off-black)', padding: '20px', display: 'flex', minHeight: '240px' }}>
            {children ?? (
              <div style={{ width: '100%', display: 'grid', gap: '12px' }}>
                <div style={{ height: '54px', borderRadius: '10px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }} />
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '12px', flex: 1 }}>
                  <div style={{ minHeight: '130px', borderRadius: '10px', background: 'rgba(255,255,255,0.03)', border: '1px dashed rgba(212, 201, 168, 0.22)' }} />
                  <div style={{ minHeight: '130px', borderRadius: '10px', background: 'rgba(255,255,255,0.03)', border: '1px dashed rgba(212, 201, 168, 0.22)' }} />
                </div>
                <div style={{ height: '28px', width: '72%', borderRadius: '999px', background: 'rgba(212, 201, 168, 0.12)' }} />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Problem & Opportunity */}
      <section className="product-section" style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 24px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'start' }}>
        <div>
          <h2 style={{ fontSize: '2rem', marginBottom: '16px', fontFamily: 'var(--serif)' }}>The Problem</h2>
          <p style={{ fontSize: '1.1rem', color: 'var(--white-dim)', lineHeight: '1.8' }}>
            {problemStatement}
          </p>
        </div>

        <div style={{ background: 'var(--surface)', padding: '32px', borderRadius: '8px', border: '1px solid var(--border)' }}>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '8px', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', color: 'var(--accent)' }}>
            Market Opportunity
          </h3>
          <div style={{ fontSize: '28px', fontWeight: 'bold', color: 'var(--white)', marginBottom: '16px' }}>
            {marketSize}
          </div>
          <p style={{ fontSize: '1rem', color: 'var(--white-dim)', lineHeight: '1.6' }}>
            {marketOpportunity}
          </p>
        </div>
      </section>

      {/* Features/Capabilities */}
      {features.length > 0 && (
        <section className="product-features" style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 24px' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '40px', fontFamily: 'var(--serif)', textAlign: 'center' }}>
            Key Features & Capabilities
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px' }}>
            {features.map((feature, idx) => (
              <div key={idx} style={{ background: 'var(--off-black)', padding: '32px', border: '1px solid var(--border)', borderRadius: '8px' }}>
                {feature.icon && (
                  <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>
                    {feature.icon}
                  </div>
                )}
                <h3 style={{ fontSize: '1.2rem', marginBottom: '12px', fontWeight: 'bold' }}>
                  {feature.title}
                </h3>
                <p style={{ fontSize: '0.95rem', color: 'var(--white-dim)', lineHeight: '1.6' }}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Case Studies */}
      {caseStudies.length > 0 && (
        <section className="product-casestudies" style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 24px' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '40px', fontFamily: 'var(--serif)', textAlign: 'center' }}>
            Real-World Impact
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
            {caseStudies.map((study, idx) => (
              <div key={idx} style={{ background: 'var(--off-black)', padding: '32px', border: '1px dashed var(--accent-dim)', borderRadius: '8px' }}>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '12px', color: 'var(--accent)', fontWeight: 'bold' }}>
                  {study.title}
                </h3>
                <p style={{ fontSize: '0.95rem', color: 'var(--white-dim)', lineHeight: '1.6', marginBottom: '16px' }}>
                  {study.description}
                </p>
                <div style={{ paddingTop: '16px', borderTop: '1px solid var(--border)' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--accent-dim)', textTransform: 'uppercase' }}>
                    Result
                  </span>
                  <p style={{ fontSize: '1rem', color: 'var(--accent)', fontWeight: 'bold', marginTop: '4px' }}>
                    {study.result}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="product-cta" style={{ maxWidth: '1200px', margin: '0 auto', padding: '80px 24px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '24px', fontFamily: 'var(--serif)' }}>
          Ready to Get Started?
        </h2>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
          {githubLink && (
            <a
              href={githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="theme-btn"
              style={{ padding: '14px 28px', textDecoration: 'none', borderRadius: '4px', fontSize: '14px', fontWeight: 'bold', textTransform: 'uppercase' }}
            >
              View on GitHub →
            </a>
          )}
          {integrationLink && (
            <a
              href={integrationLink}
              target="_blank"
              rel="noopener noreferrer"
              className="theme-btn"
              style={{ padding: '14px 28px', textDecoration: 'none', borderRadius: '4px', fontSize: '14px', fontWeight: 'bold', textTransform: 'uppercase' }}
            >
              Request Integration →
            </a>
          )}
          {websiteLink && (
            <a
              href={websiteLink}
              target="_blank"
              rel="noopener noreferrer"
              className="theme-btn"
              style={{ padding: '14px 28px', textDecoration: 'none', borderRadius: '4px', fontSize: '14px', fontWeight: 'bold', textTransform: 'uppercase' }}
            >
              Visit Website →
            </a>
          )}
        </div>
      </section>

      {/* Back Link */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 24px', textAlign: 'center', borderTop: '1px solid var(--border)' }}>
        <Link href="/products" className="theme-btn" style={{ padding: '14px 28px', display: 'inline-block', textDecoration: 'none', fontSize: '14px' }}>
          ← Back to All Products
        </Link>
      </section>
    </main>
  );
}
