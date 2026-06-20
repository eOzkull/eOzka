import type { Metadata } from 'next';
import RequestMeetingClient from './RequestMeetingClient';

export const metadata: Metadata = {
  title: 'Request A Meeting | eOzka Integration Handshake',
  description:
    'Initiate a secure integration handshake to schedule a dedicated technical briefing and system architecture review with the eOzka engineering team.',
  alternates: {
    canonical: '/request-meeting',
  },
  openGraph: {
    type: 'website',
    url: 'https://eozka.com/request-meeting',
    title: 'Request A Meeting | eOzka Integration Handshake',
    description:
      'Initiate a secure integration handshake to schedule a dedicated technical briefing and system architecture review with the eOzka engineering team.',
    images: [
      {
        url: '/assets/eOzka-essentials/eOzka_Logo_Package_V1/PNG/eozka-venture-studio-logo.png',
        width: 1200,
        height: 630,
        alt: 'eOzka Request a Meeting platform logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Request A Meeting | eOzka Integration Handshake',
    description:
      'Initiate a secure integration handshake to schedule a dedicated technical briefing and system architecture review with the eOzka engineering team.',
    images: ['/assets/eOzka-essentials/eOzka_Logo_Package_V1/PNG/eozka-venture-studio-logo.png'],
  },
};

export default function RequestMeetingPage() {
  return <RequestMeetingClient />;
}
