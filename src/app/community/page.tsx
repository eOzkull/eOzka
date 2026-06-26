import type { Metadata } from 'next';
import CommunityClient from './CommunityClient';

export const metadata: Metadata = {
  title: 'Campus Community & Ambassador Program | eOzka',
  description:
    "Empowering the next generation of developers and builders. Discover eOzka's Campus Ambassador Program, technical workshops, collaborative projects, and community achievements.",
  alternates: {
    canonical: '/community',
  },
  openGraph: {
    type: 'website',
    url: 'https://eozka.com/community',
    title: 'Campus Community & Ambassador Program | eOzka',
    description:
      "Empowering the next generation of developers and builders. Discover eOzka's Campus Ambassador Program, technical workshops, collaborative projects, and community achievements.",
    images: [
      {
        url: '/assets/eOzka-essentials/eOzka_Logo_Package_V1/PNG/eozka-venture-studio-logo.png',
        width: 1200,
        height: 630,
        alt: 'eOzka Community Program Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Campus Community & Ambassador Program | eOzka',
    description:
      "Empowering the next generation of developers and builders. Discover eOzka's Campus Ambassador Program, technical workshops, collaborative projects, and community achievements.",
    creator: '@weareeozka',
    site: '@weareeozka',
    images: ['/assets/eOzka-essentials/eOzka_Logo_Package_V1/PNG/eozka-venture-studio-logo.png'],
  },
};

export default function CommunityPage() {
  return (
    <>
      {/* Schema.org Breadcrumb markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'BreadcrumbList',
                '@id': 'https://eozka.com/community/#breadcrumb',
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
                    name: 'Community',
                    item: 'https://eozka.com/community',
                  },
                ],
              },
            ],
          }),
        }}
      />
      <CommunityClient />
    </>
  );
}
