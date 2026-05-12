'use client';

import Link from 'next/link';

export default function NotFound() {
  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '0 24px',
        position: 'relative',
        zIndex: 2,
        background: 'var(--black)',
        color: 'var(--white)',
        textAlign: 'center',
        fontFamily: "'Syne', sans-serif",
      }}
    >
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes rotateOrbit {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
            @keyframes rotateOrbitMiddle {
              0% { transform: rotate(45deg); }
              100% { transform: rotate(405deg); }
            }
            @keyframes rotateOrbitOuter {
              0% { transform: rotate(-30deg); }
              100% { transform: rotate(330deg); }
            }
            @keyframes cardFloat {
              0% { transform: translateY(0px); }
              50% { transform: translateY(-8px); }
              100% { transform: translateY(0px); }
            }
          `,
        }}
      />
      <div
        style={{
          maxWidth: '540px',
          border: '1px solid var(--border)',
          borderRadius: '16px',
          padding: '48px 32px',
          background: 'var(--off-black)',
          boxShadow: '0 20px 80px var(--error-shadow), inset 0 0 16px var(--accent-glow)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          position: 'relative',
          animation: 'cardFloat 6s ease-in-out infinite',
        }}
      >
        {/* Sleek Orbit/Ecosystem Moving Animation */}
        <div
          style={{
            position: 'relative',
            width: '140px',
            height: '140px',
            margin: '0 auto 36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Central Core Hub */}
          <div
            style={{
              width: '14px',
              height: '14px',
              background: 'var(--accent)',
              borderRadius: '50%',
              boxShadow: '0 0 20px var(--accent)',
              zIndex: 3,
            }}
          />

          {/* Orbit 1 (Inner - Fast) */}
          <div
            style={{
              position: 'absolute',
              width: '64px',
              height: '64px',
              border: '1px dashed var(--orbit-ring-1)',
              borderRadius: '50%',
              animation: 'rotateOrbit 8s linear infinite',
            }}
          >
            {/* Inner Satellite */}
            <div
              style={{
                position: 'absolute',
                top: '-4px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '8px',
                height: '8px',
                background: 'var(--white)',
                borderRadius: '50%',
                boxShadow: '0 0 8px var(--white)',
              }}
            />
          </div>

          {/* Orbit 2 (Middle - Tilted & Medium speed) */}
          <div
            style={{
              position: 'absolute',
              width: '100px',
              height: '100px',
              border: '1px dashed var(--orbit-ring-2)',
              borderRadius: '50%',
              transform: 'rotate(45deg)',
              animation: 'rotateOrbitMiddle 12s linear infinite',
            }}
          >
            {/* Middle Satellite */}
            <div
              style={{
                position: 'absolute',
                top: '-5px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '10px',
                height: '10px',
                background: 'var(--accent)',
                borderRadius: '50%',
                boxShadow: '0 0 10px var(--accent)',
              }}
            />
          </div>

          {/* Orbit 3 (Outer - Tilted & Slow counter-rotating) */}
          <div
            style={{
              position: 'absolute',
              width: '136px',
              height: '136px',
              border: '1px dashed var(--orbit-ring-3)',
              borderRadius: '50%',
              transform: 'rotate(-30deg)',
              animation: 'rotateOrbitOuter 16s linear infinite reverse',
            }}
          >
            {/* Outer Satellite */}
            <div
              style={{
                position: 'absolute',
                top: '-3px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '6px',
                height: '6px',
                background: 'var(--white-dim)',
                borderRadius: '50%',
              }}
            />
          </div>
        </div>

        <h1
          style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: '24px',
            fontWeight: 600,
            color: 'var(--white)',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '16px',
          }}
        >
          <span>404</span>
          <span style={{ width: '1px', height: '24px', background: 'var(--border-mid)' }}></span>
          <span style={{ fontSize: '15px', fontWeight: 400, color: 'var(--white-dim)' }}>This page could not be found.</span>
        </h1>
        
        <p
          style={{
            fontSize: '14px',
            color: 'var(--white-dimmer)',
            lineHeight: '1.6',
            marginBottom: '36px',
            fontWeight: 400,
          }}
        >
          The requested resource is missing or has been moved within the eOzka venture holding ecosystem.
        </p>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            width: '100%',
          }}
        >
          <Link
            href="/"
            className="btn-primary"
            style={{
              padding: '14px 28px',
              textDecoration: 'none',
              textAlign: 'center',
              cursor: 'pointer',
              display: 'block',
            }}
          >
            <span>Return to Core Hub</span>
          </Link>
          
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '24px',
              marginTop: '16px',
              fontFamily: "'DM Mono', monospace",
              fontSize: '11px',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
            }}
          >
            <Link
              href="/blog"
              style={{
                color: 'var(--white-dim)',
                textDecoration: 'none',
                transition: 'color 0.3s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--white-dim)')}
            >
              Read Blog
            </Link>
            <span style={{ color: 'var(--border-mid)' }}>|</span>
            <Link
              href="/members"
              style={{
                color: 'var(--white-dim)',
                textDecoration: 'none',
                transition: 'color 0.3s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--white-dim)')}
            >
              Our Team
            </Link>
            <span style={{ color: 'var(--border-mid)' }}>|</span>
            <Link
              href="/social"
              style={{
                color: 'var(--white-dim)',
                textDecoration: 'none',
                transition: 'color 0.3s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--white-dim)')}
            >
              Connect
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
