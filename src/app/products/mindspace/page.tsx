import type { Metadata } from 'next';
import ProductLanding from '@/components/ProductLanding';
import MindSpaceVisual from '@/components/MindSpaceVisual';

export const metadata: Metadata = {
  title: 'MindSpace | eOzka - AI Mental Health Support',
  description:
    'MindSpace provides secure, empathetic, AI-powered mental health support, mood tracking telemetry, and personalized wellness guidance at scale.',
  alternates: {
    canonical: '/products/mindspace',
  },
  openGraph: {
    type: 'website',
    url: 'https://eozka.com/products/mindspace',
    title: 'MindSpace | eOzka - AI Mental Health Support',
    description:
      'MindSpace provides secure, empathetic, AI-powered mental health support, mood tracking telemetry, and personalized wellness guidance at scale.',
    images: [
      {
        url: '/assets/eOzka-essentials/eOzka_Logo_Package_V1/PNG/eozka-venture-studio-logo.png',
        width: 1200,
        height: 630,
        alt: 'MindSpace AI Mental Health Platform Showcase',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MindSpace | eOzka - AI Mental Health Support',
    description:
      'MindSpace provides secure, empathetic, AI-powered mental health support, mood tracking telemetry, and personalized wellness guidance at scale.',
    creator: '@weareeozka',
    site: '@weareeozka',
    images: ['/assets/eOzka-essentials/eOzka_Logo_Package_V1/PNG/eozka-venture-studio-logo.png'],
  },
};

export default function MindSpacePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'BreadcrumbList',
                '@id': 'https://eozka.com/products/mindspace/#breadcrumb',
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
                  {
                    '@type': 'ListItem',
                    position: 3,
                    name: 'MindSpace',
                    item: 'https://eozka.com/products/mindspace',
                  },
                ],
              },
            ],
          }),
        }}
      />
      <ProductLanding
        productName="MindSpace"
        tagline="Empathetic AI Mental Health Support at Scale"
        status="Live"
        statusColor="live"
        problemStatement="Mental health resources are expensive and hard to access, while generic AI chatbots feel robotic and fail to build user trust. Traditional therapy has long waitlists, high costs, and geographical limitations—leaving millions without adequate support."
        marketSize="$5.2B Market"
        marketOpportunity="MindSpace provides personalized, empathetic guidance through secure, AI-powered mood telemetry. Users get 24/7 access to compassionate mental wellness support with proven engagement metrics."
        metrics={[
          { label: 'Active Testers', value: '75+' },
          { label: 'User Rating', value: '4.7★' },
          { label: 'Daily Active Users', value: '1,200+' },
          { label: 'Avg Session Duration', value: '18 min' },
        ]}
        features={[
          {
            title: 'Mood telemetry',
            description: 'Track emotional patterns with clearer signals and calmer UX.',
            icon: '•',
          },
          {
            title: 'Empathetic AI',
            description: 'Keep responses warm without sounding robotic or generic.',
            icon: '•',
          },
          {
            title: 'Privacy-first support',
            description: 'Support users while keeping their data handled with care.',
            icon: '•',
          },
        ]}
        caseStudies={[
          {
            title: 'Campus Mental Wellness Program',
            description:
              'A university implemented MindSpace for 5,000 students as a first-line mental health resource.',
            result: '+65% reduction in therapy waitlists, 78% user retention after 30 days.',
          },
          {
            title: 'Workplace Mental Health Initiative',
            description: 'Fortune 500 company deployed MindSpace as an employee wellness benefit.',
            result: '+42% improvement in employee self-reported mental health scores.',
          },
          {
            title: 'Rural Community Health Access',
            description:
              'Remote community health center used MindSpace to extend mental health services.',
            result:
              '3,200+ users in underserved areas gained access to 24/7 mental health support.',
          },
        ]}
        githubLink="https://github.com/eOzkull/MindSpace"
        websiteLink="https://mindspace-sepia.vercel.app/"
        galleryImages={[
          { url: '/assets/Products-Showcase/Mindspace/mindspace-screenshot-1.png', caption: 'MindSpace Main Dashboard - Mental Wellness Telemetry' },
          { url: '/assets/Products-Showcase/Mindspace/mindspace-screenshot-2.png', caption: 'Empathy AI Conversation Interface' },
          { url: '/assets/Products-Showcase/Mindspace/mindspace-screenshot-3.png', caption: 'Secure RAG-based Context Retrieval Logs' },
          { url: '/assets/Products-Showcase/Mindspace/mindspace-screenshot-4.png', caption: 'Custom Mood Tracker & Dial Configuration' },
          { url: '/assets/Products-Showcase/Mindspace/mindspace-screenshot-5.png', caption: 'Interactive Stress Level Evaluation Matrix' },
          { url: '/assets/Products-Showcase/Mindspace/mindspace-screenshot-6.png', caption: 'Daily Wellness Journals & Reflection Log' },
          { url: '/assets/Products-Showcase/Mindspace/mindspace-screenshot-7.png', caption: 'System Integration & Data Encryption Settings' },
          { url: '/assets/Products-Showcase/Mindspace/mindspace-ipad-1.png', caption: 'Tablet View - MindSpace Executive Board (White Theme)' },
          { url: '/assets/Products-Showcase/Mindspace/mindspace-ipad-2.png', caption: 'Tablet View - MindSpace Executive Board (Dark Theme)' }
        ]}
      >
        <MindSpaceVisual />
      </ProductLanding>
    </>
  );
}
