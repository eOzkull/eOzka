import type { Metadata } from 'next';
import SocialClient from './SocialClient';

export const metadata: Metadata = {
  title: 'Connect with eOzka | Official Social Channels',
  description:
    'Connect with the eOzka venture ecosystem on GitHub, LinkedIn, Instagram, and X. Join us in building software that extends human capability.',
  alternates: {
    canonical: '/social',
  },
  openGraph: {
    type: 'profile',
    url: 'https://eozka.com/social',
    title: 'Connect with eOzka | Official Social Channels',
    description:
      'Connect with the eOzka venture ecosystem on GitHub, LinkedIn, Instagram, and X.',
  },
};

export default function SocialPage() {
  return <SocialClient />;
}
