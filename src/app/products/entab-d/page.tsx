import ProductLanding from '@/components/ProductLanding';
import { PanelsTopLeft } from 'lucide-react';

export const metadata = {
  title: 'Entab-D | eOzka - Chrome Tab Organizer',
  description: 'Entab-D is a Chrome extension that groups tabs by domain and title to keep heavy browsing sessions organized.',
};

export default function EntabDPage() {
  return (
    <ProductLanding
      productName="Entab-D"
      tagline="Chrome tab organization for high-volume browsing"
      status="Live"
      statusColor="live"
      problemStatement="Tab sprawl slows work down. Research sessions, build sessions, and long browser workflows need a cleaner way to stay organized without constant manual cleanup."
      marketSize="Power-user utility"
      marketOpportunity="Entab-D keeps browser sessions tidy by grouping tabs by domain and title, making chaotic multitasking easier to manage without learning a new workflow."
      metrics={[
        { label: 'Platform', value: 'Chrome' },
        { label: 'Focus', value: 'Tabs' },
        { label: 'Setup', value: 'Zero config' },
        { label: 'State', value: 'Live' },
      ]}
      features={[
        { title: 'Auto grouping', description: 'Collect tabs by domain in one pass.', icon: '•' },
        { title: 'Fast cleanup', description: 'Reduce clutter without losing context.', icon: '•' },
        { title: 'Minimal setup', description: 'Keep the extension lightweight and easy to use.', icon: '•' },
      ]}
      caseStudies={[
        {
          title: 'Heavy research workflow',
          description: 'A multi-tab research session was reorganized with far less manual sorting.',
          result: 'Improved focus and reduced the time spent hunting for the right tab.',
        },
      ]}
      githubLink="https://github.com/eOzkull/entab-D"
      websiteLink="https://github.com/eOzkull"
    >
      <div style={{ display: 'grid', gap: '14px', width: '100%', fontFamily: 'var(--font-sans)' }}>
        {/* Browser Frame */}
        <div style={{ background: '#0a0a0a', border: '1px solid var(--border)', borderRadius: '12px', overflow: 'hidden' }}>
          {/* Top Address Bar */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#141414', padding: '8px 16px', borderBottom: '1px solid var(--border)', fontSize: '11px' }}>
            <span style={{ color: '#ff5f56' }}>●</span>
            <span style={{ color: '#ffbd2e' }}>●</span>
            <span style={{ color: '#27c93f' }}>●</span>
            <div style={{ flex: 1, background: '#1e1e1e', borderRadius: '4px', padding: '2px 8px', color: 'var(--white-dimmer)', fontSize: '10px', textAlign: 'center', fontFamily: 'var(--font-mono)' }}>
              research-pipeline://active-workspace
            </div>
          </div>
          {/* Tab Content Display */}
          <div style={{ padding: '20px', display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            <div style={{ border: '1px solid #2a4a2a', background: 'rgba(10,24,10,0.4)', color: '#6aba6a', padding: '6px 12px', borderRadius: '6px', fontSize: '11px', display: 'flex', alignItems: 'center', gap: '6px', fontFamily: 'var(--font-mono)' }}>
              📁 GitHub Nodes (3)
            </div>
            <div style={{ border: '1px solid #3a3020', background: 'rgba(20,16,10,0.4)', color: '#9a8050', padding: '6px 12px', borderRadius: '6px', fontSize: '11px', display: 'flex', alignItems: 'center', gap: '6px', fontFamily: 'var(--font-mono)' }}>
              📁 Research Docs (5)
            </div>
            <div style={{ border: '1px solid #2a3a3a', background: 'rgba(10,20,20,0.4)', color: '#6a9a9a', padding: '6px 12px', borderRadius: '6px', fontSize: '11px', display: 'flex', alignItems: 'center', gap: '6px', fontFamily: 'var(--font-mono)' }}>
              📁 Staging Logs (2)
            </div>
          </div>
        </div>
      </div>
    </ProductLanding>
  );
}
