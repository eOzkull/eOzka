import type { Metadata } from 'next';
import TemplatesClient from './TemplatesClient';

export const metadata: Metadata = {
  title: 'System Templates | eOzka Blueprints',
  description:
    'Pre-configured, robust templates engineered by eOzka to facilitate fast infrastructure adaptation and secure deployments.',
  alternates: {
    canonical: '/templates',
  },
  openGraph: {
    type: 'website',
    url: 'https://eozka.com/templates',
    title: 'System Templates | eOzka Blueprints',
    description:
      'Pre-configured, robust templates engineered by eOzka to facilitate fast infrastructure adaptation and secure deployments.',
    images: [
      {
        url: '/assets/eOzka-essentials/eOzka_Logo_Package_V1/PNG/eozka-venture-studio-logo.png',
        width: 1200,
        height: 630,
        alt: 'eOzka System Templates platform logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'System Templates | eOzka Blueprints',
    description:
      'Pre-configured, robust templates engineered by eOzka to facilitate fast infrastructure adaptation and secure deployments.',
    images: ['/assets/eOzka-essentials/eOzka_Logo_Package_V1/PNG/eozka-venture-studio-logo.png'],
  },
};

export default function TemplatesPage() {
  return <TemplatesClient />;
}
