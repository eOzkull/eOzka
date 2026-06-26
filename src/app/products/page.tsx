import type { Metadata } from 'next';
import ProductsClient from './ProductsClient';

export const metadata: Metadata = {
  title: 'Showcase Products & Pipeline | eOzka',
  description:
    'Explore the software products, enterprise administration platforms, and technology solutions built by the eOzka engineering team.',
  alternates: {
    canonical: '/products',
  },
  openGraph: {
    type: 'website',
    url: 'https://eozka.com/products',
    title: 'Showcase Products & Pipeline | eOzka',
    description:
      'Explore the software products, enterprise administration platforms, and technology solutions built by the eOzka engineering team.',
    images: [
      {
        url: '/assets/eOzka-essentials/eOzka_Logo_Package_V1/PNG/eozka-venture-studio-logo.png',
        width: 1200,
        height: 630,
        alt: 'eOzka Product Pipeline Cover',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Showcase Products & Pipeline | eOzka',
    description:
      'Explore the software products, enterprise administration platforms, and technology solutions built by the eOzka engineering team.',
    creator: '@weareeozka',
    site: '@weareeozka',
    images: ['/assets/eOzka-essentials/eOzka_Logo_Package_V1/PNG/eozka-venture-studio-logo.png'],
  },
};

export default function ProductsPage() {
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
                '@id': 'https://eozka.com/products/#breadcrumb',
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
                ],
              },
            ],
          }),
        }}
      />
      <ProductsClient />
    </>
  );
}
