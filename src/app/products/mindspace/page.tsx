import ProductLanding from '@/components/ProductLanding';
import MindSpaceVisual from '@/components/MindSpaceVisual';

export const metadata = {
  title: 'MindSpace | eOzka - AI Mental Health Platform',
  description: 'MindSpace provides personalized, empathetic AI-powered guidance for mental health. Secure, accessible, and user-trusted mental wellness at scale.',
};

export default function MindSpacePage() {
  return (
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
        { title: 'Mood telemetry', description: 'Track emotional patterns with clearer signals and calmer UX.', icon: '•' },
        { title: 'Empathetic AI', description: 'Keep responses warm without sounding robotic or generic.', icon: '•' },
        { title: 'Privacy-first support', description: 'Support users while keeping their data handled with care.', icon: '•' },
      ]}
      caseStudies={[
        {
          title: 'Campus Mental Wellness Program',
          description: 'A university implemented MindSpace for 5,000 students as a first-line mental health resource.',
          result: '+65% reduction in therapy waitlists, 78% user retention after 30 days.',
        },
        {
          title: 'Workplace Mental Health Initiative',
          description: 'Fortune 500 company deployed MindSpace as an employee wellness benefit.',
          result: '+42% improvement in employee self-reported mental health scores.',
        },
        {
          title: 'Rural Community Health Access',
          description: 'Remote community health center used MindSpace to extend mental health services.',
          result: '3,200+ users in underserved areas gained access to 24/7 mental health support.',
        },
      ]}
      githubLink="https://github.com/eOzkull/MindSpace"
      websiteLink="https://mindspace.eozka.com"
    >
      <MindSpaceVisual />
    </ProductLanding>
  );
}
