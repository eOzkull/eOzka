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
  title: 'eOzka | Student-Founded Venture Studio & Technology Holding Company',
  description:
    'eOzka is a student-founded venture studio and technology holding company creating open-source software, healthcare innovations, and agri-tech solutions.',
  metadataBase: new URL('https://eozka.com'),
  keywords: [
    'eOzka',
    'Venture Studio',
    'Student Founded',
    'Technology Holding',
    'Open-Source Software',
    'Healthcare Innovation',
    'Agri-Tech Solutions',
    'Harsh Dev Jha',
    'MOCE',
    'AI Scanner',
    'Student Builders',
    'Student Startups'
  ],
  authors: [{ name: 'Harsh Dev Jha', url: 'https://eozka.com' }],
  creator: 'eOzka',
  publisher: 'eOzka',
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
        url: '/assets/eOzka-essentials/eOzka_Logo_Package_V1/SVG/eozka-student-founded-logo.svg',
        type: 'image/svg+xml',
      },
      { url: '/favicon/favicon.png', type: 'image/png', sizes: '32x32' },
    ],
    shortcut: '/favicon/favicon.ico',
    apple: '/assets/eOzka-essentials/eOzka_Logo_Package_V1/PNG/eozka-student-founded-logo.png',
  },
  openGraph: {
    type: 'website',
    url: 'https://eozka.com/',
    title: 'eOzka | Student-Founded Venture Studio & Technology Holding Company',
    description:
      'eOzka is a student-founded venture studio and technology holding company creating open-source software, healthcare innovations, and agri-tech solutions.',
    images: [
      {
        url: '/assets/eOzka-essentials/eOzka_Logo_Package_V1/PNG/eozka-student-founded-logo.png',
        width: 1200,
        height: 630,
        alt: 'eOzka Student Founded Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'eOzka | Student-Founded Venture Studio & Technology Holding Company',
    description:
      'eOzka is a student-founded venture studio and technology holding company creating open-source software, healthcare innovations, and agri-tech solutions.',
    images: ['/assets/eOzka-essentials/eOzka_Logo_Package_V1/PNG/eozka-student-founded-logo.png'],
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
                  '@type': 'Organization',
                  '@id': 'https://eozka.com/#organization',
                  name: 'eOzka',
                  url: 'https://eozka.com',
                  logo: 'https://eozka.com/assets/eOzka-essentials/eOzka_Logo_Package_V1/PNG/eozka-student-founded-logo.png',
                  sameAs: [
                    'https://github.com/eOzkull',
                    'https://instagram.com/weareeozka',
                    'https://linkedin.com/company/eozka',
                    'https://x.com/weareeozka',
                  ],
                  founder: {
                    '@type': 'Person',
                    name: 'Harsh Dev Jha',
                  },
                },
                {
                  '@type': 'WebSite',
                  '@id': 'https://eozka.com/#website',
                  url: 'https://eozka.com',
                  name: 'eOzka Venture Studio & Technology Holding Company',
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
