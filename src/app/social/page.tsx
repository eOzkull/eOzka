import type { Metadata } from 'next';
import SocialClient from './SocialClient';

export const metadata: Metadata = {
  title: 'Connect with eOzka | Official Social Channels',
  description:
    'Connect with the eOzka operational holding ecosystem on GitHub, LinkedIn, Instagram, and X. Join us in building software that extends human capability.',
  alternates: {
    canonical: '/social',
  },
  openGraph: {
    type: 'profile',
    url: 'https://eozka.com/social',
    title: 'Connect with eOzka | Official Social Channels',
    description:
      'Connect with the eOzka operational holding ecosystem on GitHub, LinkedIn, Instagram, and X.',
    images: [
      {
        url: '/assets/eOzka-essentials/eOzka_Logo_Package_V1/PNG/eozka-venture-studio-logo.png',
        width: 1200,
        height: 630,
        alt: 'eOzka Official Social Channels Card',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Connect with eOzka | Official Social Channels',
    description:
      'Connect with the eOzka operational holding ecosystem on GitHub, LinkedIn, Instagram, and X. Join us in building software that extends human capability.',
    creator: '@weareeozka',
    site: '@weareeozka',
    images: ['/assets/eOzka-essentials/eOzka_Logo_Package_V1/PNG/eozka-venture-studio-logo.png'],
  },
};

export default function SocialPage() {
  return (
    <>
      {/* Server-side Breadcrumb JSON-LD for Search Engines */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'BreadcrumbList',
                '@id': 'https://eozka.com/social/#breadcrumb',
                'itemListElement': [
                  {
                    '@type': 'ListItem',
                    'position': 1,
                    'name': 'Home',
                    'item': 'https://eozka.com/',
                  },
                  {
                    '@type': 'ListItem',
                    'position': 2,
                    'name': 'Social',
                    'item': 'https://eozka.com/social',
                  },
                ],
              },
            ],
          }),
        }}
      />
      <SocialClient />
    </>
  );
}
