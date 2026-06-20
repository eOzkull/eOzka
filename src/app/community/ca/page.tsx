import type { Metadata } from 'next';
import CAClient from './CAClient';

export const metadata: Metadata = {
  title: 'Apply | Campus Ambassador Program',
  description:
    'Apply for the eOzka Campus Ambassador Program cohort to advocate for open-source engineering standards at your university.',
  alternates: {
    canonical: '/community/ca',
  },
  openGraph: {
    type: 'website',
    url: 'https://eozka.com/community/ca',
    title: 'Apply | Campus Ambassador Program',
    description:
      'Apply for the eOzka Campus Ambassador Program cohort to advocate for open-source engineering standards at your university.',
    images: [
      {
        url: '/assets/eOzka-essentials/eOzka_Logo_Package_V1/PNG/eozka-venture-studio-logo.png',
        width: 1200,
        height: 630,
        alt: 'eOzka Campus Ambassador platform logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Apply | Campus Ambassador Program',
    description:
      'Apply for the eOzka Campus Ambassador Program cohort to advocate for open-source engineering standards at your university.',
    images: ['/assets/eOzka-essentials/eOzka_Logo_Package_V1/PNG/eozka-venture-studio-logo.png'],
  },
};

export default function CAPage() {
  return <CAClient />;
}
