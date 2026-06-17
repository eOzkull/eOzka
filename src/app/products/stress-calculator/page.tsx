import ProductLanding from '@/components/ProductLanding';
import { Calculator } from 'lucide-react';

export const metadata = {
  title: 'Stress-Calculator | eOzka - Flutter Stress Assessment App',
  description: 'Stress-Calculator is a Flutter app that assesses stress risk from biometric data like heart rate and blood pressure.',
};

export default function StressCalculatorPage() {
  return (
    <ProductLanding
      productName="Stress-Calculator"
      tagline="Flutter stress assessment from biometric inputs"
      status="Live"
      statusColor="live"
      problemStatement="People need a lightweight way to understand stress risk from biometric signals without reading a wall of medical language. The app should be fast, simple, and practical on mobile."
      marketSize="Mobile health utility"
      marketOpportunity="Stress-Calculator transforms heart rate and blood pressure into an actionable, easy-to-read stress view so users can make better daily decisions without friction."
      metrics={[
        { label: 'Platform', value: 'Flutter' },
        { label: 'Inputs', value: 'Biometric' },
        { label: 'Focus', value: 'Stress risk' },
        { label: 'State', value: 'Live' },
      ]}
      features={[
        { title: 'Fast assessment', description: 'Turn biometric values into a readable result in seconds.', icon: '•' },
        { title: 'Mobile-first UX', description: 'Designed to stay simple on smaller screens.', icon: '•' },
        { title: 'Actionable output', description: 'Keep the result easy to understand at a glance.', icon: '•' },
      ]}
      caseStudies={[
        {
          title: 'Personal wellness check',
          description: 'Used as a quick stress reference during everyday health monitoring.',
          result: 'Reduced guesswork and improved user confidence in daily self-assessment.',
        },
      ]}
      githubLink="https://github.com/eOzkull/stress-calculator"
      websiteLink="https://github.com/eOzkull/Stress-Calculator/releases"
    >
      <div style={{ display: 'grid', gap: '14px', width: '100%', fontFamily: 'var(--font-mono)' }}>
        {/* Device Frame Top */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', border: '1px solid var(--border)', borderRadius: '12px', background: 'rgba(255,255,255,0.03)' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--accent)', fontSize: '12px' }}>
            <Calculator size={16} /> Biometric Input Node
          </span>
          <span style={{ fontSize: '10px', color: 'var(--white-dimmer)' }}>Telemetry active</span>
        </div>
        
        {/* Biometric logs display */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', padding: '16px', border: '1px solid var(--border)', borderRadius: '12px', background: 'rgba(0,0,0,0.25)', fontSize: '11px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: 'var(--white-dim)' }}>Heart Rate:</span>
            <span style={{ color: 'var(--accent)', fontWeight: 'bold' }}>72 BPM</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: 'var(--white-dim)' }}>Blood Pressure:</span>
            <span style={{ color: 'var(--accent)', fontWeight: 'bold' }}>120/80 mmHg</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--border)', paddingTop: '10px', marginTop: '4px' }}>
            <span style={{ color: 'var(--white-dim)' }}>Stress Risk Index:</span>
            <span style={{ color: '#10b981', fontWeight: 'bold', border: '1px solid #10b981', padding: '2px 8px', borderRadius: '999px', background: 'rgba(16,185,129,0.05)' }}>
              LOW RISK
            </span>
          </div>
        </div>
      </div>
    </ProductLanding>
  );
}
