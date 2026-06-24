import type { Metadata } from 'next';
import ProductLanding from '@/components/ProductLanding';
import { ShieldAlert } from 'lucide-react';

export const metadata: Metadata = {
  title: 'AIris Security | eOzka - AI Vulnerability Scanner',
  description:
    'AIris Security is an AI-powered vulnerability scanner for web applications. Detect issues early, triage faster, and keep deployments safer.',
  alternates: {
    canonical: '/products/airis-security',
  },
  openGraph: {
    type: 'website',
    url: 'https://eozka.com/products/airis-security',
    title: 'AIris Security | eOzka - AI Vulnerability Scanner',
    description:
      'AIris Security is an AI-powered vulnerability scanner for web applications. Detect issues early, triage faster, and keep deployments safer.',
    images: [
      {
        url: '/assets/eOzka-essentials/eOzka_Logo_Package_V1/PNG/eozka-venture-studio-logo.png',
        width: 1200,
        height: 630,
        alt: 'AIris Security Product Showcase',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AIris Security | eOzka - AI Vulnerability Scanner',
    description:
      'AIris Security is an AI-powered vulnerability scanner for web applications. Detect issues early, triage faster, and keep deployments safer.',
    creator: '@weareeozka',
    site: '@weareeozka',
    images: ['/assets/eOzka-essentials/eOzka_Logo_Package_V1/PNG/eozka-venture-studio-logo.png'],
  },
};

export default function AirisSecurityPage() {
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
                '@id': 'https://eozka.com/products/airis-security/#breadcrumb',
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
                    name: 'AIris Security',
                    item: 'https://eozka.com/products/airis-security',
                  },
                ],
              },
            ],
          }),
        }}
      />
      <ProductLanding
        productName="AIris Security"
        tagline="AI-powered vulnerability scanning for modern web applications"
        status="Live"
        statusColor="live"
        problemStatement="Security review often happens too late, after features are shipped and technical debt has already spread across the stack. Teams need a faster way to surface exploitable patterns, prioritize findings, and move from scanning to action."
        marketSize="$Billion-scale demand"
        marketOpportunity="AIris Security helps teams detect and classify security flaws early so they can move faster without losing visibility. It is designed to reduce triage time, improve security hygiene, and make every release easier to trust."
        metrics={[
          { label: 'Scanner Focus', value: 'Web Apps' },
          { label: 'Signal Priority', value: 'High' },
          { label: 'Triage Speed', value: 'Fast' },
          { label: 'Deployment State', value: 'Live' },
        ]}
        features={[
          {
            title: 'AI-assisted findings',
            description: 'Surface likely issues before they become release blockers.',
            icon: '•',
          },
          {
            title: 'Risk-based triage',
            description: 'Prioritize what matters so teams can act with less noise.',
            icon: '•',
          },
          {
            title: 'Release-aware workflow',
            description: 'Keep scanning aligned with real delivery cadence.',
            icon: '•',
          },
        ]}
        caseStudies={[
          {
            title: 'Release review support',
            description:
              'A team used AIris Security to review repeated app deployments before production handoff.',
            result: 'Reduced manual triage time and improved finding consistency across releases.',
          },
        ]}
        githubLink="https://github.com/Kush05Bhardwaj/AIris-Security_AI-Powered-Vulnerability-Scanner"
        websiteLink="https://airis-security1.vercel.app/"
        demoVideo="/assets/Products-Showcase/Alris-Security/Airis-V2-Demo.mp4"

      >
        <div
          style={{ display: 'grid', gap: '14px', width: '100%', fontFamily: 'var(--font-mono)' }}
        >
          {/* Terminal Header */}
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
                fontSize: '12px',
              }}
            >
              <ShieldAlert size={16} /> Scanning Engine v1.0.4
            </span>
            <span
              style={{
                fontSize: '10px',
                color: '#10b981',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              <span
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  background: '#10b981',
                  display: 'inline-block',
                }}
              />{' '}
              Engine Active
            </span>
          </div>

          {/* Scanning telemetry logs */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              padding: '16px',
              border: '1px solid var(--border)',
              borderRadius: '12px',
              background: 'rgba(0,0,0,0.25)',
              fontSize: '11px',
              lineHeight: '1.4',
            }}
          >
            <div style={{ color: 'var(--white-dim)' }}>
              [LOG] Core checks: 48/48 vulnerability modules loaded.
            </div>
            <div style={{ color: '#10b981' }}>
              [OK] CORS headers and session cookie configurations.
            </div>
            <div style={{ color: '#ef4444' }}>
              [FAIL] SQL injection detected in /api/v1/auth/ledger.ts
            </div>
            <div style={{ color: '#f59e0b' }}>
              [WARN] Low entropy secret found in staging profile configs.
            </div>
            <div style={{ color: '#10b981' }}>
              [OK] Check complete. 1 Critical flaw, 1 Warning reported.
            </div>
          </div>

          {/* Mini stats badges */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '10px',
              textAlign: 'center',
              fontSize: '10px',
            }}
          >
            <div
              style={{
                padding: '8px',
                border: '1px solid var(--border)',
                borderRadius: '8px',
                background: 'rgba(255,255,255,0.02)',
              }}
            >
              <div style={{ color: 'var(--white-dimmer)' }}>F1 Accuracy</div>
              <strong style={{ color: 'var(--white)', fontSize: '12px' }}>94.2%</strong>
            </div>
            <div
              style={{
                padding: '8px',
                border: '1px solid var(--border)',
                borderRadius: '8px',
                background: 'rgba(255,255,255,0.02)',
              }}
            >
              <div style={{ color: 'var(--white-dimmer)' }}>Scan Speed</div>
              <strong style={{ color: 'var(--white)', fontSize: '12px' }}>&lt;3.8ms</strong>
            </div>
            <div
              style={{
                padding: '8px',
                border: '1px solid var(--border)',
                borderRadius: '8px',
                background: 'rgba(255,255,255,0.02)',
              }}
            >
              <div style={{ color: 'var(--white-dimmer)' }}>False Pos.</div>
              <strong style={{ color: 'var(--white)', fontSize: '12px' }}>0.04%</strong>
            </div>
          </div>
        </div>
      </ProductLanding>
    </>
  );
}
