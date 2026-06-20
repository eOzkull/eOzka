import type { Metadata } from 'next';
import ProductLanding from '@/components/ProductLanding';
import ManagementSystemsVisual from '@/components/ManagementSystemsVisual';

export const metadata: Metadata = {
  title: 'Management-Systems | eOzka - Enterprise Operations Platform',
  description:
    'Management-Systems is a high-performance operations platform providing custom security, compliance, and reporting tools for decentralized holdings.',
  alternates: {
    canonical: '/products/management-systems',
  },
  openGraph: {
    type: 'website',
    url: 'https://eozka.com/products/management-systems',
    title: 'Management-Systems | eOzka - Enterprise Operations Platform',
    description:
      'Management-Systems is a high-performance operations platform providing custom security, compliance, and reporting tools for decentralized holdings.',
    images: [
      {
        url: '/assets/eOzka-essentials/eOzka_Logo_Package_V1/PNG/eozka-venture-studio-logo.png',
        width: 1200,
        height: 630,
        alt: 'Management-Systems Platform Showcase',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Management-Systems | eOzka - Enterprise Operations Platform',
    description:
      'Management-Systems is a high-performance operations platform providing custom security, compliance, and reporting tools for decentralized holdings.',
    creator: '@weareeozka',
    site: '@weareeozka',
    images: ['/assets/eOzka-essentials/eOzka_Logo_Package_V1/PNG/eozka-venture-studio-logo.png'],
  },
};

export default function ManagementSystemsPage() {
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
                '@id': 'https://eozka.com/products/management-systems/#breadcrumb',
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
                    name: 'Management-Systems',
                    item: 'https://eozka.com/products/management-systems',
                  },
                ],
              },
            ],
          }),
        }}
      />
      <ProductLanding
        productName="Management-Systems"
        tagline="Enterprise Operations & Compliance Platform for Holding Companies"
        status="Pipeline"
        statusColor="research"
        problemStatement="Off-the-shelf operations platforms fail to support the custom security, compliance, and reporting pipelines required by holding company models. Decentralized networks need unified governance without sacrificing subsidiary autonomy."
        marketSize="$120B+ Market"
        marketOpportunity="High-performance administration modules custom-built to unify workflows and metrics across decentralized nodes. This is under active work, so the page now reflects its current in-progress state instead of pretending it is finished."
        metrics={[
          { label: 'Active Nodes', value: '4' },
          { label: 'Volume Audited', value: '$250K+' },
          { label: 'Compliance Rate', value: '99.8%' },
          { label: 'Status', value: 'Working' },
        ]}
        features={[
          {
            title: 'Governance view',
            description: 'Keep all subsidiary activity visible without flattening autonomy.',
            icon: '•',
          },
          {
            title: 'Audit layer',
            description: 'Track compliance and reporting needs with less manual overhead.',
            icon: '•',
          },
          {
            title: 'Operational modules',
            description: 'Build the system in pieces while the work is still evolving.',
            icon: '•',
          },
        ]}
        caseStudies={[
          {
            title: 'Multi-Sector Holding Company Consolidation',
            description:
              'A holding company with 4 subsidiaries across education, technology, and healthcare implemented Management-Systems.',
            result: '35% reduction in compliance overhead, unified reporting across all sectors.',
          },
          {
            title: 'Regulatory Audit Success',
            description:
              'Decentralized network passed comprehensive institutional audit using Management-Systems audit trails.',
            result: 'Zero compliance violations, complete audit trail for all 250K+ transactions.',
          },
          {
            title: 'Cross-Sector Financial Reporting',
            description:
              'Complex holding structure with diverse accounting standards unified reporting.',
            result: 'Consolidated financial reports generated in <2 hours (previously 2-3 days).',
          },
        ]}
        githubLink="https://github.com/eOzkull"
        integrationLink="https://eozka.com"
      >
        <ManagementSystemsVisual />
      </ProductLanding>
    </>
  );
}
