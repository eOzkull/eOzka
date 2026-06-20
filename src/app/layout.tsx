import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
import './style.css';
import './extras.css';
import { AudioProvider } from '@/contexts/AudioContext';
import CustomCursor from '@/components/CustomCursor';
import BackgroundParticles from '@/components/BackgroundParticles';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SentientHub from '@/components/SentientHub';
import ScrollProgressBar from '@/components/ScrollProgressBar';
import GoogleAnalytics from '@/components/GoogleAnalytics';

const GA_MEASUREMENT_ID = 'G-Q1YKM4J18W'; // Replace with your live Google Analytics Measurement ID

export const metadata: Metadata = {
  title: 'eOzka | Operational Holding Company',
  description:
    'eOzka is an operational holding company building software infrastructure, digital platforms, and technology solutions to support startups and enterprises.',
  metadataBase: new URL('https://eozka.com'),
  keywords: [
    'eOzka',
    'Operational Holding',
    'Operational Holding Company',
    'Multi-Sector Portfolio',
    'Technology Solutions',
    'Software Infrastructure',
    'Digital Platforms',
    'Technology Consulting',
    'Community Service',
    'Community-Driven Programs',
    'Social Impact',
    'Education Technology',
    'EdTech',
    'Open-Source Software',
    'Healthcare Innovation',
    'Agri-Tech Solutions',
    'Harsh Dev Jha',
    'Nolin',
    'AI Scanner',
    'Software Engineering',
  ],
  authors: [{ name: 'Harsh Dev Jha', url: 'https://eozka.com' }],
  creator: 'eOzka',
  publisher: 'eOzka',
  referrer: 'origin-when-cross-origin',
  verification: {
    google: 'google-site-verification-placeholder-hash', // Replace with live Google Search Console token
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: [
      {
        url: '/assets/eOzka-essentials/eOzka_Logo_Package_V1/SVG/eozka-venture-studio-logo.svg',
        type: 'image/svg+xml',
      },
      { url: '/favicon.png', type: 'image/png', sizes: '32x32' },
    ],
    shortcut: '/favicon.ico',
    apple: '/assets/eOzka-essentials/eOzka_Logo_Package_V1/PNG/eozka-venture-studio-logo.png',
  },
  openGraph: {
    type: 'website',
    url: 'https://eozka.com/',
    title: 'eOzka | Operational Holding Company',
    description:
      'eOzka is an operational holding company building software infrastructure, digital platforms, and technology solutions to support startups and enterprises.',
    siteName: 'eOzka',
    locale: 'en_US',
    images: [
      {
        url: '/assets/eOzka-essentials/eOzka_Logo_Package_V1/PNG/eozka-venture-studio-logo.png',
        width: 1200,
        height: 630,
        alt: 'eOzka Operational Holding Company Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'eOzka | Operational Holding Company',
    description:
      'eOzka is an operational holding company building software infrastructure, digital platforms, and technology solutions to support startups and enterprises.',
    creator: '@weareeozka',
    site: '@weareeozka',
    images: ['/assets/eOzka-essentials/eOzka_Logo_Package_V1/PNG/eozka-venture-studio-logo.png'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Google Analytics Global Site Tag (gtag.js) */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
            });
          `}
        </Script>

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Syne:wght@400;500;600;700;800&family=DM+Mono:wght@300;400&display=swap"
          rel="stylesheet"
        />
        {/* Schema.org Markup Graph for SEO Scaling */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@graph': [
                {
                  '@type': 'Corporation',
                  '@id': 'https://eozka.com/#organization',
                  name: 'eOzka',
                  legalName: 'eOzka Operational Holding Company',
                  url: 'https://eozka.com',
                  logo: {
                    '@type': 'ImageObject',
                    url: 'https://eozka.com/assets/eOzka-essentials/eOzka_Logo_Package_V1/PNG/eozka-venture-studio-logo.png',
                    width: '512',
                    height: '512',
                  },
                  description:
                    'eOzka is an operational holding company engaged in the development, management, and provision of technology solutions, software infrastructure, digital platforms, consulting services, and community-driven programs, with the objective of supporting individuals, startups, and enterprises across diverse sectors.',
                  foundingDate: '2026-04-25',
                  email: 'eozka.hq@gmail.com',
                  contactPoint: {
                    '@type': 'ContactPoint',
                    email: 'eozka.hq@gmail.com',
                    contactType: 'corporate communication',
                    availableLanguage: ['en'],
                  },
                  sameAs: [
                    'https://github.com/eOzkull',
                    'https://instagram.com/weareeozka',
                    'https://linkedin.com/company/eozka',
                    'https://x.com/weareeozka',
                  ],
                  founder: {
                    '@type': 'Person',
                    '@id': 'https://eozka.com/#person-harsh',
                    name: 'Harsh Dev Jha',
                    jobTitle: 'Founder & Chairperson',
                    image: 'https://github.com/inkesk-dozing.png',
                    url: 'https://eozka.com',
                    sameAs: [
                      'https://github.com/inkesk-dozing',
                      'https://linkedin.com/in/harsh-dev-jha-primus',
                    ],
                    worksFor: {
                      '@id': 'https://eozka.com/#organization',
                    },
                  },
                  member: [
                    { '@id': 'https://eozka.com/#person-harsh' },
                    { '@id': 'https://eozka.com/#person-mrinal' },
                    { '@id': 'https://eozka.com/#person-krishyangi' },
                    { '@id': 'https://eozka.com/#person-aman' },
                    { '@id': 'https://eozka.com/#person-pratham' },
                    { '@id': 'https://eozka.com/#person-aditya' },
                    { '@id': 'https://eozka.com/#person-mahin' },
                    { '@id': 'https://eozka.com/#person-kushagra' },
                    { '@id': 'https://eozka.com/#person-ishaan' },
                    { '@id': 'https://eozka.com/#person-saurabh' },
                    { '@id': 'https://eozka.com/#person-manas' },
                  ],
                  // subOrganization: [
                  //   {
                  //     '@type': 'Organization',
                  //     name: 'Nolin',
                  //     url: 'https://eozka.com/ventures/nolin',
                  //   },
                  // ],
                },
                {
                  '@type': 'WebSite',
                  '@id': 'https://eozka.com/#website',
                  url: 'https://eozka.com',
                  name: 'eOzka Operational Holding Company',
                  publisher: {
                    '@id': 'https://eozka.com/#organization',
                  },
                },
                {
                  '@type': 'BreadcrumbList',
                  itemListElement: [
                    {
                      '@type': 'ListItem',
                      position: 1,
                      name: 'Home',
                      item: 'https://eozka.com/',
                    },
                  ],
                },
                {
                  '@type': 'Person',
                  '@id': 'https://eozka.com/#person-mrinal',
                  name: 'Mrinal Prakash',
                  jobTitle: 'Co-Founder, Vice Chair & MD',
                  image: 'https://github.com/mrinalprakashfsd.png',
                  url: 'https://eozka.com',
                  sameAs: [
                    'https://github.com/mrinalprakashfsd',
                    'https://www.linkedin.com/in/mrinal-prakash-fullstackdeveloper/',
                  ],
                  worksFor: {
                    '@id': 'https://eozka.com/#organization',
                  },
                },
                {
                  '@type': 'Person',
                  '@id': 'https://eozka.com/#person-krishyangi',
                  name: 'Krishyangi Dixit',
                  jobTitle: 'Group CEO',
                  image: 'https://github.com/krishyangi-bit.png',
                  url: 'https://eozka.com',
                  sameAs: [
                    'https://github.com/krishyangi-bit',
                    'https://www.linkedin.com/in/krishyangi-dixit-9527ba388/',
                  ],
                  worksFor: {
                    '@id': 'https://eozka.com/#organization',
                  },
                },
                {
                  '@type': 'Person',
                  '@id': 'https://eozka.com/#person-aman',
                  name: 'Aman Chapadiya',
                  jobTitle: 'COO',
                  image: 'https://github.com/obscure-01.png',
                  url: 'https://eozka.com',
                  sameAs: [
                    'https://github.com/obscure-01',
                    'https://www.linkedin.com/in/amanchapadiya/',
                  ],
                  worksFor: {
                    '@id': 'https://eozka.com/#organization',
                  },
                },
                {
                  '@type': 'Person',
                  '@id': 'https://eozka.com/#person-pratham',
                  name: 'Pratham Sharma',
                  jobTitle: 'CTO',
                  image: 'https://github.com/Prarock83.png',
                  url: 'https://eozka.com',
                  sameAs: [
                    'https://github.com/Prarock83',
                    'https://www.linkedin.com/in/pratham-sharma-574844332/',
                  ],
                  worksFor: {
                    '@id': 'https://eozka.com/#organization',
                  },
                },
                {
                  '@type': 'Person',
                  '@id': 'https://eozka.com/#person-aditya',
                  name: 'Aditya Bhatia',
                  jobTitle: 'CGO',
                  image: 'https://github.com/AdiT0015.png',
                  url: 'https://eozka.com',
                  sameAs: [
                    'https://github.com/AdiT0015',
                    'https://www.linkedin.com/in/aditya-bhatia-244849252/',
                  ],
                  worksFor: {
                    '@id': 'https://eozka.com/#organization',
                  },
                },
                {
                  '@type': 'Person',
                  '@id': 'https://eozka.com/#person-mahin',
                  name: 'Mahin',
                  jobTitle: 'Designing Lead',
                  image: 'https://github.com/mahinmirzagit.png',
                  url: 'https://eozka.com',
                  sameAs: [
                    'https://github.com/mahinmirzagit',
                    'https://www.linkedin.com/in/mahin2006/',
                  ],
                  worksFor: {
                    '@id': 'https://eozka.com/#organization',
                  },
                },
                {
                  '@type': 'Person',
                  '@id': 'https://eozka.com/#person-kushagra',
                  name: 'Kushagra Bharadwaj',
                  jobTitle: 'Software Development Engineer',
                  image: 'https://github.com/Kush05Bhardwaj.png',
                  url: 'https://eozka.com',
                  sameAs: [
                    'https://github.com/Kush05Bhardwaj',
                    'https://www.linkedin.com/in/kush2012bhardwaj/',
                  ],
                  worksFor: {
                    '@id': 'https://eozka.com/#organization',
                  },
                },
                {
                  '@type': 'Person',
                  '@id': 'https://eozka.com/#person-ishaan',
                  name: 'Ishaan Parashar',
                  jobTitle: 'Software Development Engineer',
                  image: 'https://github.com/IshaanParashar2025.png',
                  url: 'https://eozka.com',
                  sameAs: [
                    'https://github.com/IshaanParashar2025',
                    'https://www.linkedin.com/in/ishaan-parashar-0b7379326/',
                  ],
                  worksFor: {
                    '@id': 'https://eozka.com/#organization',
                  },
                },
                {
                  '@type': 'Person',
                  '@id': 'https://eozka.com/#person-saurabh',
                  name: 'Saurabh Mudgal',
                  jobTitle: 'Software Development Engineer',
                  image: 'https://github.com/saurabh-mudgal-dev.png',
                  url: 'https://eozka.com',
                  sameAs: [
                    'https://github.com/saurabh-mudgal-dev',
                    'https://www.linkedin.com/in/saurabh-mudgal-443a3937b/',
                  ],
                  worksFor: {
                    '@id': 'https://eozka.com/#organization',
                  },
                },
                {
                  '@type': 'Person',
                  '@id': 'https://eozka.com/#person-manas',
                  name: 'Manas Bhasker',
                  jobTitle: 'Software Development Engineer',
                  image: 'https://github.com/stillnwater.png',
                  url: 'https://eozka.com',
                  sameAs: [
                    'https://github.com/stillnwater',
                    'https://www.linkedin.com/in/manas-bhasker/',
                  ],
                  worksFor: {
                    '@id': 'https://eozka.com/#organization',
                  },
                },
              ],
            }),
          }}
        />
      </head>
      <body>
        <AudioProvider>
          {/* Client-side Google Analytics pageview router event tracking */}
          <GoogleAnalytics gaId={GA_MEASUREMENT_ID} />

          {/* Custom cursor following pointer */}
          <CustomCursor />

          {/* Scroll progress loading bar */}
          <ScrollProgressBar />

          {/* Background network connections canvas */}
          <BackgroundParticles />

          {/* Persistent global header block */}
          <Navbar />

          {/* Page body children renders */}
          {children}

          {/* Dynamic systems status footer */}
          <Footer />

          {/* Floating Sentient Core hub widget */}
          <SentientHub />
        </AudioProvider>
      </body>
    </html>
  );
}
