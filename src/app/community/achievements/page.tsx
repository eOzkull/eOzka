import type { Metadata } from 'next';
import AchievementsClient from './AchievementsClient';

export const metadata: Metadata = {
  title: 'Community Impact & Achievements | eOzka',
  description:
    "Explore the real-world open-source achievements, biometrics telemetry audits, and software adoptions coordinated by eOzka's student developer network.",
  alternates: {
    canonical: '/community/achievements',
  },
  openGraph: {
    type: 'website',
    url: 'https://eozka.com/community/achievements',
    title: 'Community Impact & Achievements | eOzka',
    description:
      "Explore the real-world open-source achievements, biometrics telemetry audits, and software adoptions coordinated by eOzka's student developer network.",
    images: [
      {
        url: '/assets/eOzka-essentials/eOzka_Logo_Package_V1/PNG/eozka-venture-studio-logo.png',
        width: 1200,
        height: 630,
        alt: 'eOzka Community Achievements platform logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Community Impact & Achievements | eOzka',
    description:
      "Explore the real-world open-source achievements, biometrics telemetry audits, and software adoptions coordinated by eOzka's student developer network.",
    images: ['/assets/eOzka-essentials/eOzka_Logo_Package_V1/PNG/eozka-venture-studio-logo.png'],
  },
};

export default function AchievementsPage() {
  return <AchievementsClient />;
}
