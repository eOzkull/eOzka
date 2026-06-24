import type { Metadata } from 'next';
import ProductLanding from '@/components/ProductLanding';
import { Workflow } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Paradigm-Shift | eOzka - HRMS Platform',
  description:
    'Paradigm-Shift is an enterprise-grade, real-time HRMS platform designed to unify employee profiles, performance review loops, and workflows.',
  alternates: {
    canonical: '/products/paradigm-shift',
  },
  openGraph: {
    type: 'website',
    url: 'https://eozka.com/products/paradigm-shift',
    title: 'Paradigm-Shift | eOzka - HRMS Platform',
    description:
      'Paradigm-Shift is an enterprise-grade, real-time HRMS platform designed to unify employee profiles, performance review loops, and workflows.',
    images: [
      {
        url: '/assets/eOzka-essentials/eOzka_Logo_Package_V1/PNG/eozka-venture-studio-logo.png',
        width: 1200,
        height: 630,
        alt: 'Paradigm-Shift HRMS Platform Showcase',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Paradigm-Shift | eOzka - HRMS Platform',
    description:
      'Paradigm-Shift is an enterprise-grade, real-time HRMS platform designed to unify employee profiles, performance review loops, and workflows.',
    creator: '@weareeozka',
    site: '@weareeozka',
    images: ['/assets/eOzka-essentials/eOzka_Logo_Package_V1/PNG/eozka-venture-studio-logo.png'],
  },
};

export default function ParadigmShiftPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'BreadcrumbList',
                '@id': 'https://eozka.com/products/paradigm-shift/#breadcrumb',
                itemListElement: [
                  {
                    '@type': 'ListItem',
                    position: 1,
                    name: 'Home',
                    item: 'https://eozka.com/',
                  },
                  {
                    '@type': 'ListItem',
                    position: 2,
                    name: 'Products',
                    item: 'https://eozka.com/products',
                  },
                  {
                    '@type': 'ListItem',
                    position: 3,
                    name: 'Paradigm-Shift',
                    item: 'https://eozka.com/products/paradigm-shift',
                  },
                ],
              },
            ],
          }),
        }}
      />
      <ProductLanding
        productName="Paradigm-Shift"
        tagline="Real-time HRMS for people, performance, and process"
        status="Live"
        statusColor="live"
        problemStatement="Growing organizations need a better way to manage people, performance, and internal process flows without stitching together disconnected tools. HR teams need clarity, not just another dashboard."
        marketSize="Enterprise operations need"
        marketOpportunity="Paradigm-Shift brings the pieces together in one workflow-centric system so teams can move faster and stay coordinated across hiring, tracking, and reporting."
        metrics={[
          { label: 'Core Focus', value: 'HRMS' },
          { label: 'Workflow State', value: 'Real-time' },
          { label: 'Audience', value: 'Modern teams' },
          { label: 'Readiness', value: 'Live' },
        ]}
        features={[
          {
            title: 'People operations',
            description: 'Manage teams, roles, and internal movement cleanly.',
            icon: '•',
          },
          {
            title: 'Performance tracking',
            description: 'Keep progress and review loops visible in one system.',
            icon: '•',
          },
          {
            title: 'Operational workflows',
            description: 'Reduce handoff friction across the company.',
            icon: '•',
          },
        ]}
        caseStudies={[
          {
            title: 'Unified HR flow',
            description:
              'Used as a central workflow layer to reduce fragmentation across people operations.',
            result: 'Clearer coordination and fewer manual follow-ups for routine HR tasks.',
          },
        ]}
        githubLink="https://github.com/MRINALPRAKASHFSD/MINI_PROJECT_PARADIGM_SHIFT"
        websiteLink="https://mini-project-paradigm-shift-5y6i.vercel.app/"
        galleryImages={[
          { url: '/assets/Products-Showcase/Paradigm/paradigm-screenshot-1.jpg', caption: 'HRMS Operations Console - Recruitment Pipeline' },
          { url: '/assets/Products-Showcase/Paradigm/paradigm-screenshot-2.jpg', caption: 'Employee Directory & Real-time Profile Status' },
          { url: '/assets/Products-Showcase/Paradigm/paradigm-screenshot-3.jpg', caption: 'Compliance Reviews & Performance Audit Logs' }
        ]}
      >
        <div
          style={{ display: 'grid', gap: '14px', width: '100%', fontFamily: 'var(--font-sans)' }}
        >
          {/* Board Header */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '14px 16px',
              border: '1px solid var(--border)',
              borderRadius: '12px',
              background: 'rgba(255,255,255,0.03)',
            }}
          >
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                color: 'var(--accent)',
                fontSize: '13px',
                fontWeight: 'bold',
              }}
            >
              <Workflow size={16} /> HR Operations Console
            </span>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '10px',
                color: 'var(--white-dimmer)',
              }}
            >
              8 pipeline segments active
            </span>
          </div>

          {/* Simulated Workflow Columns */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
            {/* Column 1 */}
            <div
              style={{
                background: 'rgba(0,0,0,0.2)',
                border: '1px solid var(--border)',
                borderRadius: '8px',
                padding: '10px',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
              }}
            >
              <span
                style={{
                  fontSize: '9px',
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--accent-dim)',
                  textTransform: 'uppercase',
                }}
              >
                Hiring
              </span>
              <div
                style={{
                  padding: '8px',
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid var(--border)',
                  borderRadius: '6px',
                  fontSize: '11px',
                }}
              >
                <div style={{ fontWeight: 'bold', color: 'var(--white)' }}>SDE II Candidate</div>
                <span style={{ fontSize: '9px', color: 'var(--white-dim)' }}>Technical stage</span>
              </div>
              <div
                style={{
                  padding: '8px',
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid var(--border)',
                  borderRadius: '6px',
                  fontSize: '11px',
                }}
              >
                <div style={{ fontWeight: 'bold', color: 'var(--white)' }}>CGO Lead</div>
                <span style={{ fontSize: '9px', color: 'var(--white-dim)' }}>Screening</span>
              </div>
            </div>

            {/* Column 2 */}
            <div
              style={{
                background: 'rgba(0,0,0,0.2)',
                border: '1px solid var(--border)',
                borderRadius: '8px',
                padding: '10px',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
              }}
            >
              <span
                style={{
                  fontSize: '9px',
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--accent-dim)',
                  textTransform: 'uppercase',
                }}
              >
                Onboarding
              </span>
              <div
                style={{
                  padding: '8px',
                  background: 'rgba(212,201,168,0.06)',
                  border: '1px solid var(--accent-dim)',
                  borderRadius: '6px',
                  fontSize: '11px',
                }}
              >
                <div style={{ fontWeight: 'bold', color: 'var(--white)' }}>Legal Review</div>
                <span style={{ fontSize: '9px', color: 'var(--accent)' }}>90% verified</span>
              </div>
            </div>

            {/* Column 3 */}
            <div
              style={{
                background: 'rgba(0,0,0,0.2)',
                border: '1px solid var(--border)',
                borderRadius: '8px',
                padding: '10px',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
              }}
            >
              <span
                style={{
                  fontSize: '9px',
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--accent-dim)',
                  textTransform: 'uppercase',
                }}
              >
                Compliance
              </span>
              <div
                style={{
                  padding: '8px',
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid var(--border)',
                  borderRadius: '6px',
                  fontSize: '11px',
                }}
              >
                <div style={{ fontWeight: 'bold', color: 'var(--white)' }}>Security Audit</div>
                <span style={{ fontSize: '9px', color: '#10b981' }}>✓ Completed</span>
              </div>
            </div>
          </div>
        </div>
      </ProductLanding>
    </>
  );
}
