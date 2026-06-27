import type { Metadata } from 'next';
import BlogClient from './BlogClient';

export const metadata: Metadata = {
  title: 'Engineering Blog | Open-Source Tech & AI Security | eOzka',
  description:
    'Read engineering insights from eOzka. We write about building open-source AI vulnerability scanners, EdTech networks, and scaling a digital holding company.',
  alternates: {
    canonical: '/blog',
  },
  openGraph: {
    type: 'article',
    url: 'https://eozka.com/blog',
    title: 'Engineering Blog | Open-Source Tech & AI Security | eOzka',
    description:
      'Read engineering insights from eOzka. We write about building open-source AI vulnerability scanners, EdTech networks, and scaling a digital holding company.',
    images: [
      {
        url: '/assets/eOzka-essentials/eOzka_Logo_Package_V1/PNG/eozka-venture-studio-logo.png',
        width: 1200,
        height: 630,
        alt: 'eOzka Engineering Blog Cover Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Engineering Blog | Open-Source Tech & AI Security | eOzka',
    description:
      'Read engineering insights from eOzka. We write about building open-source AI vulnerability scanners, EdTech networks, and scaling a digital holding company.',
    creator: '@weareeozka',
    site: '@weareeozka',
    images: ['/assets/eOzka-essentials/eOzka_Logo_Package_V1/PNG/eozka-venture-studio-logo.png'],
  },
};

export default function BlogPage() {
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
                '@id': 'https://eozka.com/blog/#breadcrumb',
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
                    name: 'Blog',
                    item: 'https://eozka.com/blog',
                  },
                ],
              },
            ],
          }),
        }}
      />
      <BlogClient />
    </>
  );
}
