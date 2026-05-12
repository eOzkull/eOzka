import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Why We Chose Flutter for Health-Tech | eOzka Blog',
  description:
    'Analyzing the performance trade-offs of using cross-platform frameworks to process continuous biometric telemetry natively on mobile devices.',
  alternates: {
    canonical: '/blog/flutter-health-tech',
  },
  openGraph: {
    type: 'article',
    url: 'https://eozka.com/blog/flutter-health-tech',
    title: 'Why We Chose Flutter for Health-Tech | eOzka Blog',
    description:
      'Analyzing the performance trade-offs of using cross-platform frameworks to process continuous biometric telemetry natively on mobile devices.',
    publishedTime: '2026-05-02T00:00:00Z',
    authors: ['Pratham Sharma'],
    tags: ['Flutter', 'Health-Tech', 'Biometrics', 'Cross-Platform', 'Mobile Performance'],
    images: [
      {
        url: '/assets/eOzka-essentials/eOzka_Logo_Package_V1/PNG/eozka-venture-studio-logo.png',
        width: 1200,
        height: 630,
        alt: 'Flutter Health-Tech Blog Header Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Why We Chose Flutter for Health-Tech | eOzka Blog',
    description:
      'Analyzing the performance trade-offs of using cross-platform frameworks to process continuous biometric telemetry natively on mobile devices.',
    images: ['/assets/eOzka-essentials/eOzka_Logo_Package_V1/PNG/eozka-venture-studio-logo.png'],
  },
};

export default function FlutterHealthBlog() {
  return (
    <main
      style={{
        padding: '160px 5% 100px',
        minHeight: '80vh',
        maxWidth: '850px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 2,
      }}
    >
      {/* Blog Schema JSON-LD Graph */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'BlogPosting',
                '@id': 'https://eozka.com/blog/flutter-health-tech/#post',
                'url': 'https://eozka.com/blog/flutter-health-tech/',
                'headline': 'Why We Chose Flutter for Health-Tech',
                'description':
                  'Analyzing the performance trade-offs of using cross-platform frameworks to process continuous biometric telemetry natively on mobile devices.',
                'image': 'https://eozka.com/assets/eOzka-essentials/eOzka_Logo_Package_V1/PNG/eozka-venture-studio-logo.png',
                'keywords': 'Flutter, Health-Tech, Biometrics, Cross-Platform, Mobile Performance',
                'datePublished': '2026-05-02T00:00:00Z',
                'dateModified': '2026-05-02T00:00:00Z',
                'author': {
                  '@type': 'Person',
                  'name': 'Pratham Sharma',
                },
                'publisher': {
                  '@type': 'Organization',
                  'name': 'eOzka',
                  'logo': {
                    '@type': 'ImageObject',
                    'url': 'https://eozka.com/assets/eOzka-essentials/eOzka_Logo_Package_V1/PNG/eozka-venture-studio-logo.png',
                  },
                },
                'mainEntityOfPage': {
                  '@type': 'WebPage',
                  '@id': 'https://eozka.com/blog/flutter-health-tech/',
                },
              },
              {
                '@type': 'BreadcrumbList',
                '@id': 'https://eozka.com/blog/flutter-health-tech/#breadcrumb',
                'itemListElement': [
                  {
                    '@type': 'ListItem',
                    'position': 1,
                    'name': 'Home',
                    'item': 'https://eozka.com/',
                  },
                  {
                    '@type': 'ListItem',
                    'position': 2,
                    'name': 'Blog',
                    'item': 'https://eozka.com/blog',
                  },
                  {
                    '@type': 'ListItem',
                    'position': 3,
                    'name': 'Why We Chose Flutter for Health-Tech',
                    'item': 'https://eozka.com/blog/flutter-health-tech',
                  },
                ],
              },
            ],
          }),
        }}
      />

      <div style={{ marginBottom: '2rem' }}>
        <Link
          href="/blog"
          style={{
            color: 'var(--accent)',
            textDecoration: 'none',
            fontFamily: "'DM Mono', monospace",
            fontSize: '0.9rem',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          ← Back to Blog list
        </Link>
      </div>

      <div className="section-label" style={{ marginBottom: '1rem' }}>
        Case Study — Cross-Platform Performance
      </div>
      <h1
        style={{
          fontSize: 'clamp(2rem, 5vw, 3.5rem)',
          fontFamily: "'DM Serif Display', serif",
          lineHeight: 1.1,
          marginBottom: '1.5rem',
          color: '#fff',
        }}
      >
        Why We Chose Flutter for Health-Tech
      </h1>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '20px',
          fontSize: '0.9rem',
          opacity: 0.6,
          fontFamily: "'DM Mono', monospace",
          paddingBottom: '2rem',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          marginBottom: '2.5rem',
        }}
      >
        <span>By Pratham Sharma</span>
        <span>•</span>
        <span>May 2, 2026</span>
        <span>•</span>
        <span>5 Min Read</span>
      </div>

      {/* ARTICLE CONTENT */}
      <article
        style={{
          lineHeight: '1.8',
          fontSize: '1.1rem',
          color: 'rgba(255, 255, 255, 0.85)',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.8rem',
        }}
      >
        <p>
          In health-tech, software reliability isn't just a design choice—it's a critical operational threshold.
          When developing mobile systems that interface with continuous biometric hardware (like Bluetooth BLE heart rate monitors,
          pulse oximeters, and smart rings), the engine must maintain uninterrupted pipelines. Real-time telemetry signals
          require constant background data acquisition, decoding, stream ingestion, and chart rendering.
        </p>

        <p>
          At <strong>eOzka</strong>, we had to choose between three leading options for our healthcare product lines:
          building fully native apps twice (Swift/iOS + Kotlin/Android), utilizing React Native, or leveraging Flutter.
          After putting all three through exhaustive profiling, we chose <strong>Flutter and Dart</strong>. Here are the
          reasons behind our decision.
        </p>

        <h2
          style={{
            color: '#fff',
            fontFamily: "'DM Serif Display', serif",
            fontSize: '1.8rem',
            marginTop: '2rem',
          }}
        >
          1. Eliminating the JavaScript Bridge Bottleneck
        </h2>
        <p>
          When reading biometric sensors, devices send batches of packets up to 100 times per second. In standard cross-platform
          frameworks like React Native, each data point must be converted into JSON, serialized, pushed over a structural "JS Bridge",
          deserialized, and executed in the JS runtime. At scale, this bridge gets choked, resulting in frames dropping, UI lag,
          and battery drain.
        </p>
        <p>
          Flutter bypasses this bottleneck. Dart compiles directly into native <strong>AOT (Ahead-of-Time)</strong> machine code.
          Flutter doesn’t rely on a bridge or standard OEM widgets; instead, it renders every single pixel itself via its
          native-compiled Impeller graphic runtime, allowing us to push 100Hz biometric signals onto screens at a flawless 60fps.
        </p>

        <h2
          style={{
            color: '#fff',
            fontFamily: "'DM Serif Display', serif",
            fontSize: '1.8rem',
            marginTop: '2rem',
          }}
        >
          2. Garbage Collection (GC) Benchmarking
        </h2>
        <p>
          High-frequency streams allocate and release thousands of short-lived objects. If a mobile language’s Garbage Collection (GC)
          strategy is inefficient, it causes periodic visual micro-stuttering (GC pauses) during rendering. Dart’s generational garbage
          collector is highly optimized for short-lived allocation pipelines. It operates on a fast young generation zone, collecting objects
          in milliseconds without pausing the main isolate's rendering frame.
        </p>

        <p>Here is our internal GC latency benchmark comparison across options when processing 10,000 telemetry messages:</p>

        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            marginTop: '1rem',
            marginBottom: '1rem',
            fontSize: '0.95rem',
          }}
        >
          <thead>
            <tr style={{ borderBottom: '2px solid rgba(255,255,255,0.2)', textAlign: 'left' }}>
              <th style={{ padding: '12px' }}>Platform Architecture</th>
              <th style={{ padding: '12px' }}>Avg. GC Pause Duration</th>
              <th style={{ padding: '12px' }}>Dropped Frames (Per Min)</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
              <td style={{ padding: '12px', fontWeight: 'bold' }}>Native (Swift / Kotlin)</td>
              <td style={{ padding: '12px' }}>0.4ms</td>
              <td style={{ padding: '12px' }}>&lt; 1</td>
            </tr>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
              <td style={{ padding: '12px', fontWeight: 'bold', color: 'var(--accent)' }}>Flutter / Dart (AOT)</td>
              <td style={{ padding: '12px', color: 'var(--accent)' }}>1.2ms</td>
              <td style={{ padding: '12px', color: 'var(--accent)' }}>1.4</td>
            </tr>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
              <td style={{ padding: '12px', fontWeight: 'bold' }}>React Native (Hermes Engine)</td>
              <td style={{ padding: '12px' }}>6.8ms</td>
              <td style={{ padding: '12px' }}>8.2</td>
            </tr>
          </tbody>
        </table>

        <h2
          style={{
            color: '#fff',
            fontFamily: "'DM Serif Display', serif",
            fontSize: '1.8rem',
            marginTop: '2rem',
          }}
        >
          3. Dynamic Platform Channels for Native BLE Handles
        </h2>
        <p>
          While Flutter draws its own UI, it still needs native iOS CoreBluetooth and Android BluetoothAdapter channels to access
          hardware chips. Flutter achieves this through <strong>MethodChannels</strong> and <strong>EventChannels</strong>.
          We designed a thread-safe platform channel that passes byte arrays straight into Dart memory as raw buffers, entirely bypassing
          expensive serialization steps.
        </p>

        <h2
          style={{
            color: '#fff',
            fontFamily: "'DM Serif Display', serif",
            fontSize: '1.8rem',
            marginTop: '2rem',
          }}
        >
          4. Summary Findings
        </h2>
        <p>
          By implementing Flutter, we halved our development cost, maintained a singular secure codebase, and achieved
          near-native metrics (under 1.5 dropped frames/min) across all operating systems. For high-frequency, telemetry-driven
          health products, Flutter stands out as a highly viable, enterprise-grade engineering choice.
        </p>
      </article>
    </main>
  );
}
