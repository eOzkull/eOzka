import type { Metadata } from 'next';
import MembersClient from './MembersClient';

export const metadata: Metadata = {
  title: 'Our Team & Members Directory | eOzka',
  description:
    'Meet the creative designers, documentation officers, and software engineers driving eOzka\'s strategic vision forward into production.',
  alternates: {
    canonical: '/members',
  },
  openGraph: {
    type: 'profile',
    url: 'https://eozka.com/members',
    title: 'Our Team & Members Directory | eOzka',
    description:
      'Meet the creative designers, documentation officers, and software engineers driving eOzka\'s strategic vision forward into production.',
    images: [
      {
        url: '/assets/eOzka-essentials/eOzka_Logo_Package_V1/PNG/eozka-venture-studio-logo.png',
        width: 1200,
        height: 630,
        alt: 'eOzka Team Directory Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Our Team & Members Directory | eOzka',
    description:
      "Meet the creative designers, documentation officers, and software engineers driving eOzka's strategic vision forward into production.",
    images: ['/assets/eOzka-essentials/eOzka_Logo_Package_V1/PNG/eozka-venture-studio-logo.png'],
  },
};

export default function MembersPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'CollectionPage',
                '@id': 'https://eozka.com/members/#webpage',
                url: 'https://eozka.com/members',
                name: 'Our Team & Members Directory | eOzka',
                description:
                  'Meet the creative designers, documentation officers, and software engineers driving eOzka\'s strategic vision forward into production.',
                isPartOf: {
                  '@id': 'https://eozka.com/#website',
                },
                about: {
                  '@type': 'Organization',
                  name: 'eOzka',
                },
              },
              {
                '@type': 'BreadcrumbList',
                '@id': 'https://eozka.com/members/#breadcrumb',
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
                    name: 'Members',
                    item: 'https://eozka.com/members',
                  },
                ],
              },
            ],
          }),
        }}
      />
      <MembersClient />
    </>
  );
}
