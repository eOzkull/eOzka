'use client';

import Link from 'next/link';
import { useEffect } from 'react';
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
  },
  {
    name: 'Management-Systems',
    slug: '/products/management-systems',
    status: 'In Progress',
    statusClass: 'tag-research',
    icon: Settings2,
    tagLine: 'Holding-company operations and compliance layer',
    description:
      'Internal governance and reporting system under active development. This is the working platform, not a finished public release.',
    highlights: ['Governance', 'Compliance', 'Internal reporting'],
    github: 'https://github.com/eOzkull',
    note: 'Marked clearly as under work so it does not read like a finished flagship.',
  },
];

function ProductPreview({ icon: Icon, status, note }: Pick<ProductCard, 'icon' | 'status' | 'note'>) {
  return (
    <div className="product-preview-shell">
      <div className="product-preview-glow" />
      <div className="product-preview-window">
        <div className="product-preview-topbar">
          <span />
          <span />
          <span />
        </div>
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
      </div>
    </div>
  );
}

export default function ProductsClient() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="subpage-wrapper products-page" style={{ minHeight: '100vh', background: 'var(--black)', color: 'var(--white)' }}>
      <section className="products-hero" style={{ padding: '160px 24px 40px 24px', maxWidth: '1250px', margin: '0 auto' }}>
        <div className="section-label">Showcase — Actual Products</div>
        <h1 className="section-headline" style={{ marginTop: '16px', fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', lineHeight: '1.05' }}>
          Products built on the website.
          <br />
          <em style={{ fontStyle: 'italic', fontFamily: 'var(--serif)' }}>No filler, no detours.</em>
        </h1>
        <p className="team-intro" style={{ marginTop: '24px', maxWidth: '760px', fontSize: '1.05rem', color: 'var(--white-dim)', lineHeight: '1.7' }}>
          Five product areas are currently shown here. The grid is spaced out to allow clean structural comparison, highlights, and direct source code access.
        </p>
      </section>

      <section className="products-grids-section" style={{ maxWidth: '1250px', margin: '0 auto', padding: '0 24px 100px 24px', border: 'none' }}>
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

                <ProductPreview icon={Icon} status={product.status} note={product.note} />

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
                    <a href={product.github} target="_blank" rel="noopener noreferrer" className="product-link-dim">
                      View on GitHub
                    </a>
                  )}
                </div>
              </article>
            );
          })}
        </div>

        <div style={{ marginTop: '80px', textAlign: 'center' }}>
          <Link href="/" className="theme-btn" style={{ padding: '16px 32px', display: 'inline-block', textDecoration: 'none' }}>
            ← Back to Main Studio
          </Link>
        </div>
      </section>
    </main>
  );
}
