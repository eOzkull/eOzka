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
    'eOzka is an operational holding company engaged in the development, management, and provision of technology solutions, software infrastructure, digital platforms, consulting services, and community-driven programs, with the objective of supporting individuals, startups, and enterprises across diverse sectors.',
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
    'MOCE',
    'AI Scanner',
    'Software Engineering'
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
      'eOzka is an operational holding company engaged in the development, management, and provision of technology solutions, software infrastructure, digital platforms, consulting services, and community-driven programs, with the objective of supporting individuals, startups, and enterprises across diverse sectors.',
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
      'eOzka is an operational holding company engaged in the development, management, and provision of technology solutions, software infrastructure, digital platforms, consulting services, and community-driven programs, with the objective of supporting individuals, startups, and enterprises across diverse sectors.',
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
                    'url': 'https://eozka.com/assets/eOzka-essentials/eOzka_Logo_Package_V1/PNG/eozka-venture-studio-logo.png',
                    'width': '512',
                    'height': '512'
                  },
                  description: 'eOzka is an operational holding company engaged in the development, management, and provision of technology solutions, software infrastructure, digital platforms, consulting services, and community-driven programs, with the objective of supporting individuals, startups, and enterprises across diverse sectors.',
                  foundingDate: '2026-04-25',
                  email: 'eozka.hq@gmail.com',
                  contactPoint: {
                    '@type': 'ContactPoint',
                    'email': 'eozka.hq@gmail.com',
                    'contactType': 'corporate communication',
                    'availableLanguage': ['en']
                  },
                  sameAs: [
                    'https://github.com/eOzkull',
                    'https://instagram.com/weareeozka',
                    'https://linkedin.com/company/eozka',
                    'https://x.com/weareeozka',
                  ],
                  founder: {
                    '@type': 'Person',
                    name: 'Harsh Dev Jha',
                    jobTitle: 'Founder & Chairperson',
                    url: 'https://eozka.com',
                    sameAs: [
                      'https://github.com/inkesk-dozing',
                      'https://linkedin.com/in/harsh-dev-jha-primus'
                    ]
                  },
                  subOrganization: [
                    {
                      '@type': 'Organization',
                      name: 'MOCE',
                      url: 'https://eozka.com/ventures/moce',
                    }
                  ]
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
