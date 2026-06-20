import type { Metadata } from 'next';
import ProductLanding from '@/components/ProductLanding';

export const metadata: Metadata = {
  title: 'Entab-D | eOzka - Chrome Tab Organizer',
  description:
    'Entab-D is a lightweight Chrome extension that automatically groups tabs by domain and title to organize heavy development and research sessions.',
  alternates: {
    canonical: '/products/entab-d',
  },
  openGraph: {
    type: 'website',
    url: 'https://eozka.com/products/entab-d',
    title: 'Entab-D | eOzka - Chrome Tab Organizer',
    description:
      'Entab-D is a lightweight Chrome extension that automatically groups tabs by domain and title to organize heavy development and research sessions.',
    images: [
      {
        url: '/assets/eOzka-essentials/eOzka_Logo_Package_V1/PNG/eozka-venture-studio-logo.png',
        width: 1200,
        height: 630,
        alt: 'Entab-D Chrome Extension Showcase',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Entab-D | eOzka - Chrome Tab Organizer',
    description:
      'Entab-D is a lightweight Chrome extension that automatically groups tabs by domain and title to organize heavy development and research sessions.',
    creator: '@weareeozka',
    site: '@weareeozka',
    images: ['/assets/eOzka-essentials/eOzka_Logo_Package_V1/PNG/eozka-venture-studio-logo.png'],
  },
};

export default function EntabDPage() {
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
                '@id': 'https://eozka.com/products/entab-d/#breadcrumb',
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
                    name: 'Entab-D',
                    item: 'https://eozka.com/products/entab-d',
                  },
                ],
              },
            ],
          }),
        }}
      />
      <ProductLanding
        productName="Entab-D"
        tagline="Chrome tab organization for high-volume browsing"
        status="Live"
        statusColor="live"
        problemStatement="Tab sprawl slows work down. Research sessions, build sessions, and long browser workflows need a cleaner way to stay organized without constant manual cleanup."
        marketSize="Power-user utility"
        marketOpportunity="Entab-D keeps browser sessions tidy by grouping tabs by domain and title, making chaotic multitasking easier to manage without learning a new workflow."
        metrics={[
          { label: 'Platform', value: 'Chrome' },
          { label: 'Focus', value: 'Tabs' },
          { label: 'Setup', value: 'Zero config' },
          { label: 'State', value: 'Live' },
        ]}
        features={[
          { title: 'Auto grouping', description: 'Collect tabs by domain in one pass.', icon: '•' },
          {
            title: 'Fast cleanup',
            description: 'Reduce clutter without losing context.',
            icon: '•',
          },
          {
            title: 'Minimal setup',
            description: 'Keep the extension lightweight and easy to use.',
            icon: '•',
          },
        ]}
        caseStudies={[
          {
            title: 'Heavy research workflow',
            description:
              'A multi-tab research session was reorganized with far less manual sorting.',
            result: 'Improved focus and reduced the time spent hunting for the right tab.',
          },
        ]}
        githubLink="https://github.com/eOzkull/entab-D"
        websiteLink="https://github.com/eOzkull"
      >
        <div
          style={{ display: 'grid', gap: '14px', width: '100%', fontFamily: 'var(--font-sans)' }}
        >
          {/* Browser Frame */}
          <div
            style={{
              background: '#0a0a0a',
              border: '1px solid var(--border)',
              borderRadius: '12px',
              overflow: 'hidden',
            }}
          >
            {/* Top Address Bar */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: '#141414',
                padding: '8px 16px',
                borderBottom: '1px solid var(--border)',
                fontSize: '11px',
              }}
            >
              <span style={{ color: '#ff5f56' }}>●</span>
              <span style={{ color: '#ffbd2e' }}>●</span>
              <span style={{ color: '#27c93f' }}>●</span>
              <div
                style={{
                  flex: 1,
                  background: '#1e1e1e',
                  borderRadius: '4px',
                  padding: '2px 8px',
                  color: 'var(--white-dimmer)',
                  fontSize: '10px',
                  textAlign: 'center',
                  fontFamily: 'var(--font-mono)',
                }}
              >
                research-pipeline://active-workspace
              </div>
            </div>
            {/* Tab Content Display */}
            <div style={{ padding: '20px', display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              <div
                style={{
                  border: '1px solid #2a4a2a',
                  background: 'rgba(10,24,10,0.4)',
                  color: '#6aba6a',
                  padding: '6px 12px',
                  borderRadius: '6px',
                  fontSize: '11px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontFamily: 'var(--font-mono)',
                }}
              >
                📁 GitHub Nodes (3)
              </div>
              <div
                style={{
                  border: '1px solid #3a3020',
                  background: 'rgba(20,16,10,0.4)',
                  color: '#9a8050',
                  padding: '6px 12px',
                  borderRadius: '6px',
                  fontSize: '11px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontFamily: 'var(--font-mono)',
                }}
              >
                📁 Research Docs (5)
              </div>
              <div
                style={{
                  border: '1px solid #2a3a3a',
                  background: 'rgba(10,20,20,0.4)',
                  color: '#6a9a9a',
                  padding: '6px 12px',
                  borderRadius: '6px',
                  fontSize: '11px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontFamily: 'var(--font-mono)',
                }}
              >
                📁 Staging Logs (2)
              </div>
            </div>
          </div>
        </div>
      </ProductLanding>
    </>
  );
}
