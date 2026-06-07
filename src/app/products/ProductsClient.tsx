'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function ProductsClient() {
  useEffect(() => {
    // Scroll to top on load
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="subpage-wrapper" style={{ minHeight: '100vh', background: 'var(--black)', color: 'var(--white)' }}>
      {/* Hero Header */}
      <section className="products-hero" style={{ padding: '160px 24px 40px 24px', maxWidth: '1200px', margin: '0 auto' }}>
        <div className="section-label">Showcase — All Products</div>
        <h1 className="section-headline" style={{ marginTop: '16px', fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', lineHeight: '1.1' }}>
          Our Technical Pipeline &<br />
          <em style={{ fontStyle: 'italic', fontFamily: 'var(--serif)' }}>Future Ventures.</em>
        </h1>
        <p className="team-intro" style={{ marginTop: '24px', maxWidth: '700px', fontSize: '1.1rem', color: 'var(--sub-text)', lineHeight: '1.6' }}>
          Explore the projects, platforms, and research prototypes built by our engineering teams. We build to capture real-world opportunities across our core target sectors: Education, Technology, Health, and Agriculture.
        </p>
      </section>

      {/* Grid Container */}
      <section className="products-grids-section" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px 100px 24px', border: 'none' }}>
        <div className="products-grid" style={{ background: 'var(--border)', border: '1px solid var(--border)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '1px' }}>
          
          {/* MindSpace */}
          <div className="product-card" style={{ background: 'var(--off-black)', padding: '40px 32px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div className="product-card-top" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <span className="product-num" style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--white-dimmer)' }}>01</span>
              <span className="product-tag tag-live" style={{ border: '1px solid #2a4a2a', color: '#6aba6a', background: 'rgba(10, 24, 10, 0.4)', padding: '3px 10px', fontSize: '10px', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>Live</span>
            </div>
            <div className="product-name" style={{ fontFamily: 'var(--serif)', fontSize: '28px', color: 'var(--white)', letterSpacing: '-0.5px' }}>MindSpace</div>
            <div className="product-trust-row" style={{ display: 'flex', flexWrap: 'wrap', gap: '6px 10px', fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--accent)', textTransform: 'uppercase', borderBottom: '1px dashed rgba(212, 201, 168, 0.15)', paddingBottom: '12px' }}>
              <div className="product-trust-item">75+ Active Testers</div>
              <div className="product-trust-sep">•</div>
              <div className="product-trust-item">4.7★ User Rating</div>
            </div>
            <div className="product-details" style={{ display: 'flex', flexDirection: 'column', gap: '14px', flex: 1 }}>
              <div className="product-section" style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <span className="product-section-label" style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--accent-dim)', textTransform: 'uppercase' }}>Problem</span>
                <span className="product-section-text" style={{ fontSize: '13.5px', color: 'var(--white-dim)', lineHeight: '1.6' }}>
                  Mental health resources are expensive and hard to access, while generic AI chatbots feel robotic and fail to build user trust.
                </span>
              </div>
              <div className="product-section" style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <span className="product-section-label" style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--accent-dim)', textTransform: 'uppercase' }}>Opportunity & Market</span>
                <span className="product-section-text" style={{ fontSize: '13.5px', color: 'var(--white-dim)', lineHeight: '1.6' }}>
                  <strong className="product-market-opportunity" style={{ fontFamily: 'var(--font-sans)', color: 'var(--white)' }}>$5.2B Market</strong> — MindSpace provides personalized, empathetic guidance through secure, AI-powered mood telemetry.
                </span>
              </div>
            </div>
            <div className="product-links" style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
              <a href="https://github.com/eOzkull/MindSpace" target="_blank" rel="noopener noreferrer" className="product-link" style={{ fontSize: '11px', fontWeight: 'bold', color: 'var(--accent)', textDecoration: 'none', borderBottom: '1px solid var(--accent-dim)', paddingBottom: '2px', textTransform: 'uppercase' }}>
                View on GitHub →
              </a>
            </div>
          </div>

          {/* Management-Systems */}
          <div className="product-card" style={{ background: 'var(--off-black)', padding: '40px 32px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div className="product-card-top" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <span className="product-num" style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--white-dimmer)' }}>02</span>
              <span className="product-tag tag-live" style={{ border: '1px solid #2a4a2a', color: '#6aba6a', background: 'rgba(10, 24, 10, 0.4)', padding: '3px 10px', fontSize: '10px', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>Live</span>
            </div>
            <div className="product-name" style={{ fontFamily: 'var(--serif)', fontSize: '28px', color: 'var(--white)', letterSpacing: '-0.5px' }}>Management-Systems</div>
            <div className="product-trust-row" style={{ display: 'flex', flexWrap: 'wrap', gap: '6px 10px', fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--accent)', textTransform: 'uppercase', borderBottom: '1px dashed rgba(212, 201, 168, 0.15)', paddingBottom: '12px' }}>
              <div className="product-trust-item">4 Active Nodes</div>
              <div className="product-trust-sep">•</div>
              <div className="product-trust-item">$250K+ Volume Audited</div>
            </div>
            <div className="product-details" style={{ display: 'flex', flexDirection: 'column', gap: '14px', flex: 1 }}>
              <div className="product-section" style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <span className="product-section-label" style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--accent-dim)', textTransform: 'uppercase' }}>Problem</span>
                <span className="product-section-text" style={{ fontSize: '13.5px', color: 'var(--white-dim)', lineHeight: '1.6' }}>
                  Off-the-shelf operations platforms fail to support the custom security, compliance, and reporting pipelines required by holding company models.
                </span>
              </div>
              <div className="product-section" style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <span className="product-section-label" style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--accent-dim)', textTransform: 'uppercase' }}>Opportunity & Market</span>
                <span className="product-section-text" style={{ fontSize: '13.5px', color: 'var(--white-dim)', lineHeight: '1.6' }}>
                  <strong className="product-market-opportunity" style={{ fontFamily: 'var(--font-sans)', color: 'var(--white)' }}>$120B+ Market</strong> — High-performance administration modules custom-built to unify workflows and metrics across decentralized nodes.
                </span>
              </div>
            </div>
            <div className="product-links" style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
              <a href="https://github.com/eOzkull" target="_blank" rel="noopener noreferrer" className="product-link" style={{ fontSize: '11px', fontWeight: 'bold', color: 'var(--accent)', textDecoration: 'none', borderBottom: '1px solid var(--accent-dim)', paddingBottom: '2px', textTransform: 'uppercase' }}>
                Request Integration →
              </a>
            </div>
          </div>

          {/* LearnNode (EdTech) */}
          <div className="product-card" style={{ background: 'var(--off-black)', padding: '40px 32px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div className="product-card-top" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <span className="product-num" style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--white-dimmer)' }}>03</span>
              <span className="product-tag tag-research" style={{ border: '1px solid #3a3020', color: '#9a8050', background: 'rgba(20, 16, 10, 0.4)', padding: '3px 10px', fontSize: '10px', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>Pipeline</span>
            </div>
            <div className="product-name" style={{ fontFamily: 'var(--serif)', fontSize: '28px', color: 'var(--white)', letterSpacing: '-0.5px' }}>LearnNode</div>
            <div className="product-trust-row" style={{ display: 'flex', flexWrap: 'wrap', gap: '6px 10px', fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--accent)', textTransform: 'uppercase', borderBottom: '1px dashed rgba(212, 201, 168, 0.15)', paddingBottom: '12px' }}>
              <div className="product-trust-item">40+ College Nodes</div>
              <div className="product-trust-sep">•</div>
              <div className="product-trust-item">3,000+ Docs Indexed</div>
            </div>
            <div className="product-details" style={{ display: 'flex', flexDirection: 'column', gap: '14px', flex: 1 }}>
              <div className="product-section" style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <span className="product-section-label" style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--accent-dim)', textTransform: 'uppercase' }}>Problem</span>
                <span className="product-section-text" style={{ fontSize: '13.5px', color: 'var(--white-dim)', lineHeight: '1.6' }}>
                  Academic environments rely on bloated, slow Learning Management Systems that restrict collaborative document sharing and open study hub integrations.
                </span>
              </div>
              <div className="product-section" style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <span className="product-section-label" style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--accent-dim)', textTransform: 'uppercase' }}>Opportunity & Market</span>
                <span className="product-section-text" style={{ fontSize: '13.5px', color: 'var(--white-dim)', lineHeight: '1.6' }}>
                  <strong className="product-market-opportunity" style={{ fontFamily: 'var(--font-sans)', color: 'var(--white)' }}>$120B+ Sector</strong> — LearnNode provides a decentralized, markdown-based study hub and knowledge repository for campus communities.
                </span>
              </div>
            </div>
            <div className="product-links" style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
              <a href="https://github.com/eOzkull" target="_blank" rel="noopener noreferrer" className="product-link" style={{ fontSize: '11px', fontWeight: 'bold', color: 'var(--accent)', textDecoration: 'none', borderBottom: '1px solid var(--accent-dim)', paddingBottom: '2px', textTransform: 'uppercase' }}>
                View on GitHub →
              </a>
            </div>
          </div>

          {/* CropInsight (AgriTech) */}
          <div className="product-card" style={{ background: 'var(--off-black)', padding: '40px 32px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div className="product-card-top" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <span className="product-num" style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--white-dimmer)' }}>04</span>
              <span className="product-tag tag-research" style={{ border: '1px solid #3a3020', color: '#9a8050', background: 'rgba(20, 16, 10, 0.4)', padding: '3px 10px', fontSize: '10px', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>Research</span>
            </div>
            <div className="product-name" style={{ fontFamily: 'var(--serif)', fontSize: '28px', color: 'var(--white)', letterSpacing: '-0.5px' }}>CropInsight</div>
            <div className="product-trust-row" style={{ display: 'flex', flexWrap: 'wrap', gap: '6px 10px', fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--accent)', textTransform: 'uppercase', borderBottom: '1px dashed rgba(212, 201, 168, 0.15)', paddingBottom: '12px' }}>
              <div className="product-trust-item">15+ Farm Deployments</div>
              <div className="product-trust-sep">•</div>
              <div className="product-trust-item">10K+ Telemetry Points</div>
            </div>
            <div className="product-details" style={{ display: 'flex', flexDirection: 'column', gap: '14px', flex: 1 }}>
              <div className="product-section" style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <span className="product-section-label" style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--accent-dim)', textTransform: 'uppercase' }}>Problem</span>
                <span className="product-section-text" style={{ fontSize: '13.5px', color: 'var(--white-dim)', lineHeight: '1.6' }}>
                  Small-scale and rural farms cannot afford standard automated soil telemetry hardware, locking them out of data-driven yield optimization.
                </span>
              </div>
              <div className="product-section" style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <span className="product-section-label" style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--accent-dim)', textTransform: 'uppercase' }}>Opportunity & Market</span>
                <span className="product-section-text" style={{ fontSize: '13.5px', color: 'var(--white-dim)', lineHeight: '1.6' }}>
                  <strong className="product-market-opportunity" style={{ fontFamily: 'var(--font-sans)', color: 'var(--white)' }}>$22B Market</strong> — CropInsight offers low-cost IoT firmware and sensor dashboards to track and analyze soil health metrics.
                </span>
              </div>
            </div>
            <div className="product-links" style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
              <a href="https://github.com/eOzkull" target="_blank" rel="noopener noreferrer" className="product-link" style={{ fontSize: '11px', fontWeight: 'bold', color: 'var(--accent)', textDecoration: 'none', borderBottom: '1px solid var(--accent-dim)', paddingBottom: '2px', textTransform: 'uppercase' }}>
                View on GitHub →
              </a>
            </div>
          </div>

        </div>

        {/* Back Link */}
        <div style={{ marginTop: '80px', textAlign: 'center' }}>
          <Link href="/" className="theme-btn" style={{ padding: '16px 32px', display: 'inline-block', textDecoration: 'none' }}>
            ← Back to Main Studio
          </Link>
        </div>
      </section>
    </main>
  );
}
