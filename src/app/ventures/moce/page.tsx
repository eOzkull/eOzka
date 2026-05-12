import type { Metadata } from 'next';
import MoceClient from './MoceClient';

export const metadata: Metadata = {
  title: 'MOCE — Technical Subsidiary of eOzka',
  description:
    'MOCE is the technical subsidiary of eOzka, focused on engineering, AI augmentation, and sentient system building. Shipping premium logic and agentic solutions.',
  alternates: {
    canonical: '/ventures/moce',
  },
  openGraph: {
    type: 'profile',
    url: 'https://eozka.com/ventures/moce',
    title: 'MOCE — Technical Subsidiary of eOzka',
    description:
      'MOCE is the technical subsidiary of eOzka, focused on engineering, AI augmentation, and sentient system building.',
    images: [
      {
        url: '/assets/eOzka-essentials/eOzka_Logo_Package_V1/PNG/eozka-venture-studio-logo.png',
        width: 1200,
        height: 630,
        alt: 'MOCE Technical Subsidiary Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MOCE — Technical Subsidiary of eOzka',
    description:
      'MOCE is the technical subsidiary of eOzka, focused on engineering, AI augmentation, and sentient system building.',
    creator: '@weareeozka',
    site: '@weareeozka',
    images: ['/assets/eOzka-essentials/eOzka_Logo_Package_V1/PNG/eozka-venture-studio-logo.png'],
  },
};

export default function MocePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'WebPage',
                '@id': 'https://eozka.com/ventures/moce/#webpage',
                url: 'https://eozka.com/ventures/moce',
                name: 'MOCE — Technical Subsidiary of eOzka',
                description:
                  'MOCE is the technical subsidiary of eOzka, focused on engineering, AI augmentation, and sentient system building.',
                isPartOf: {
                  '@id': 'https://eozka.com/#website',
                },
                breadcrumb: {
                  '@id': 'https://eozka.com/ventures/moce/#breadcrumb',
                },
              },
              {
                '@type': 'BreadcrumbList',
                '@id': 'https://eozka.com/ventures/moce/#breadcrumb',
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
                    name: 'Ventures',
                    item: 'https://eozka.com/#ventures',
                  },
                  {
                    '@type': 'ListItem',
                    position: 3,
                    name: 'MOCE',
                    item: 'https://eozka.com/ventures/moce',
                  },
                ],
              },
            ],
          }),
        }}
      />
      <MoceClient />
    </>
  );
}
