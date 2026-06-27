import type { Metadata } from 'next';
import NolinClient from './NolinClient';

export const metadata: Metadata = {
  title: 'Nolin | Campus Commerce Reimagined',
  description:
    'Skip the queue. Own your time. Order from your campus canteen, see live ETA calculation, track preparation status, and collect food with secure pickup codes.',
  alternates: {
    canonical: '/ventures/nolin',
  },
};

export default function NolinPage() {
  return <NolinClient />;
}
