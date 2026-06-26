'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import {
  ArrowUpRight,
  BrainCircuit,
  PanelsTopLeft,
  Settings2,
  ShieldAlert,
  Workflow,
  type LucideIcon,
} from 'lucide-react';

type ProductStatus = 'Live' | 'In Progress';

interface ProductCard {
  name: string;
  slug: string;
  status: ProductStatus;
  statusClass: 'tag-live' | 'tag-research';
  icon: LucideIcon;
  tagLine: string;
  description: string;
  highlights: string[];
  github?: string;
  note: string;
  previewImage?: string;
  previewVideo?: string;
}

const products: ProductCard[] = [
  {
    name: 'AIris-Security',
    slug: '/products/airis-security',
    status: 'Live',
    statusClass: 'tag-live',
    icon: ShieldAlert,
    tagLine: 'AI vulnerability scanner for web applications',
    description:
      'Detects, classifies, and prioritizes security flaws before they ship. Built for fast triage and practical protection.',
    highlights: ['AI-assisted detection', 'Fast triage', 'Deployment ready'],
    github: 'https://github.com/Kush05Bhardwaj/AIris-Security_AI-Powered-Vulnerability-Scanner',
    note: 'Security-first product with the strongest discoverability value.',
    previewVideo: '/assets/Products-Showcase/Alris-Security/Airis-V2-Demo.mp4',
  },
  {
    name: 'Paradigm-Shift',
    slug: '/products/paradigm-shift',
    status: 'Live',
    statusClass: 'tag-live',
    icon: Workflow,
    tagLine: 'Unified HRMS for modern organizations',
    description:
      'Real-time platform for people, performance, and operational workflows across growing teams.',
    highlights: ['HR workflows', 'Live dashboards', 'Process control'],
    github: 'https://github.com/MRINALPRAKASHFSD/MINI_PROJECT_PARADIGM_SHIFT',
    note: 'Clean enterprise positioning with immediate product clarity.',
    previewImage: '/assets/Products-Showcase/Paradigm/paradigm-screenshot-1.jpg',
  },
  {
    name: 'Entab-D',
    slug: '/products/entab-d',
    status: 'Live',
    statusClass: 'tag-live',
    icon: PanelsTopLeft,
    tagLine: 'Chrome tab organizer for heavy workflows',
    description:
      'Automatically organizes browser tabs by domain and title so large research sessions stay manageable.',
    highlights: ['Auto grouping', 'One-click cleanup', 'Zero config'],
    github: 'https://github.com/eOzkull/entab-D',
    note: 'Fast utility product with a clear everyday pain point.',
    previewImage: '/assets/Products-Showcase/Entab-D/entab-screenshot-1.jpg',
  },
  {
    name: 'MindSpace',
    slug: '/products/mindspace',
    status: 'Live',
    statusClass: 'tag-live',
    icon: BrainCircuit,
    tagLine: 'Empathetic AI mental wellness companion',
    description:
      'Personalized mood tracking and supportive guidance designed to feel human instead of robotic.',
    highlights: ['Mood tracking', 'Secure support', 'Personalized guidance'],
    github: 'https://github.com/eOzkull/MindSpace',
    note: 'One of the best candidates for a richer visual showcase.',
    previewImage: '/assets/Products-Showcase/Mindspace/mindspace-screenshot-1.png',
  },
  {
    name: 'Management-Systems',
    slug: '/products/management-systems',
    status: 'In Progress',
    statusClass: 'tag-research',
    icon: Settings2,
    tagLine: 'Enterprise Operations & Compliance Platform',
    description:
      'High-performance administration modules custom-built to unify workflows, compliance metrics, and financial reporting across decentralized subsidiaries.',
    highlights: ['Multi-node governance', 'Audit trail automation', 'Subsidiary reporting'],
    github: 'https://github.com/eOzkull',
    note: 'Active governance pipeline designed for holding company infrastructure.',
  },
];

function ProductPreview({
  icon: Icon,
  status,
  note,
  previewImage,
  previewVideo,
}: Pick<ProductCard, 'icon' | 'status' | 'note' | 'previewImage' | 'previewVideo'>) {
  const hasMedia = !!(previewImage || previewVideo);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = React.useRef<HTMLVideoElement>(null);

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().catch(err => console.log("Play interrupted:", err));
      setIsPlaying(true);
    }
  };

  return (
    <div className="product-preview-shell">
      <div className="product-preview-glow" />
      <div
        className="product-preview-window"
        style={hasMedia ? { padding: '0', display: 'flex', flexDirection: 'column', height: '100%', gap: '0' } : undefined}
      >
        <div
          className="product-preview-topbar"
          style={hasMedia ? { padding: '12px 14px 8px 14px', borderBottom: '1px solid var(--border)' } : undefined}
        >
          <span />
          <span />
          <span />
        </div>
        
        {hasMedia ? (
          <div 
            onClick={previewVideo ? togglePlay : undefined}
            style={{ 
              flex: 1, 
              position: 'relative', 
              overflow: 'hidden', 
              aspectRatio: '16/10', 
              width: '100%', 
              height: 'auto', 
              background: '#050505', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              cursor: previewVideo ? 'pointer' : 'default'
            }}
          >
            {previewVideo ? (
              <>
                <video
                  ref={videoRef}
                  src={previewVideo}
                  playsInline
                  loop
                  style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                />
                {!isPlaying && (
                  <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.4)', pointerEvents: 'none' }}>
                    <div style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      background: 'var(--accent)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 0 15px var(--accent-glow)'
                    }}>
                      <div style={{
                        width: 0,
                        height: 0,
                        borderTop: '5px solid transparent',
                        borderBottom: '5px solid transparent',
                        borderLeft: '8px solid var(--black)',
                        marginLeft: '3px'
                      }} />
                    </div>
                  </div>
                )}
              </>
            ) : (
              <img
                src={previewImage}
                alt={note}
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
            )}
            {/* Overlay bar */}
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                background: 'rgba(5, 5, 5, 0.75)',
                backdropFilter: 'blur(8px)',
                borderTop: '1px solid var(--border)',
                padding: '8px 12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontSize: '9.5px',
                fontFamily: 'var(--font-mono)',
                zIndex: 10,
              }}
            >
              <span style={{ color: 'var(--accent)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Icon size={12} /> {status}
              </span>
              <strong style={{ color: 'var(--white-dim)', fontWeight: 'normal' }}>{note}</strong>
            </div>
          </div>
        ) : (
          <div className="product-preview-body">
            <div className="product-preview-icon-wrap">
              <Icon size={28} strokeWidth={1.75} />
            </div>
            <div className="product-preview-lines">
              <div />
              <div />
              <div />
            </div>
            <div className="product-preview-footer">
              <span>{status}</span>
              <strong>{note}</strong>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ProductsClient() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main
      className="subpage-wrapper products-page"
      style={{ minHeight: '100vh', background: 'var(--black)', color: 'var(--white)' }}
    >
      <section
        className="products-hero"
        style={{ padding: '160px 24px 40px 24px', maxWidth: '1250px', margin: '0 auto' }}
      >
        <div className="section-label">Showcase — Actual Products</div>
        <h1
          className="section-headline"
          style={{ marginTop: '16px', fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', lineHeight: '1.05' }}
        >
          Products built on the website.
          <br />
          <em style={{ fontStyle: 'italic', fontFamily: 'var(--serif)' }}>
            No filler, no detours.
          </em>
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
          Five product areas are currently shown here. The grid is spaced out to allow clean
          structural comparison, highlights, and direct source code access.
        </p>
      </section>

      <section
        className="products-grids-section"
        style={{
          maxWidth: '1250px',
          margin: '0 auto',
          padding: '0 24px 100px 24px',
          border: 'none',
        }}
      >
        <div className="products-grid products-grid-reworked">
          {products.map((product, idx) => {
            const Icon = product.icon;
            return (
              <article key={product.slug} className="product-card product-grid-card">
                <div className="product-card-top">
                  <span className="product-num">0{idx + 1}</span>
                  <span className={`product-tag ${product.statusClass}`}>{product.status}</span>
                </div>

                <div className="product-grid-header">
                  <div>
                    <h2 className="product-name">{product.name}</h2>
                    <p className="product-grid-tagline">{product.tagLine}</p>
                  </div>
                </div>

                <ProductPreview
                  icon={Icon}
                  status={product.status}
                  note={product.note}
                  previewImage={product.previewImage}
                  previewVideo={product.previewVideo}
                />

                <p className="product-grid-desc">{product.description}</p>

                <div className="product-grid-highlights">
                  {product.highlights.map((highlight) => (
                    <span key={highlight} className="product-highlight-pill">
                      {highlight}
                    </span>
                  ))}
                </div>

                <div className="product-links product-grid-actions">
                  <Link href={product.slug} className="product-link product-link-primary">
                    Learn More <ArrowUpRight size={14} />
                  </Link>
                  {product.github && (
                    <a
                      href={product.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="product-link-dim"
                    >
                      View on GitHub
                    </a>
                  )}
                </div>
              </article>
            );
          })}
        </div>

        <div style={{ marginTop: '80px', textAlign: 'center' }}>
          <Link
            href="/"
            className="theme-btn"
            style={{ padding: '16px 32px', display: 'inline-block', textDecoration: 'none' }}
          >
            ← Back to Main Page
          </Link>
        </div>
      </section>
    </main>
  );
}
