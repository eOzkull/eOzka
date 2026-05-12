'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error for observability
    console.error('Unhandled UI Runtime Exception:', error);
  }, [error]);

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
      <div
        style={{
          maxWidth: '540px',
          border: '1px solid var(--border)',
          borderRadius: '16px',
          padding: '48px 32px',
          background: 'var(--off-black)',
          boxShadow: '0 20px 80px rgba(0, 0, 0, 0.8), inset 0 0 16px var(--accent-glow)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          position: 'relative',
        }}
      >
        <span
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: '12px',
            color: 'var(--accent)',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            display: 'block',
            marginBottom: '16px',
          }}
        >
          Signal Terminated — Runtime Exception
        </span>

        <h1
          style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: 'clamp(44px, 10vw, 64px)',
            fontWeight: 400,
            lineHeight: 1.1,
            color: 'var(--white)',
            marginBottom: '24px',
            letterSpacing: '-1.5px',
          }}
        >
          Something went <em style={{ fontStyle: 'italic', color: 'var(--accent)' }}>wrong</em>.
        </h1>

        <p
          style={{
            fontSize: '15px',
            color: 'var(--white-dim)',
            lineHeight: '1.7',
            marginBottom: '40px',
            fontWeight: 400,
          }}
        >
          A client-side runtime exception occurred during rendering. This is normally a temporary connection interruption.
        </p>

        {error.digest && (
          <div
            style={{
              background: 'rgba(0, 0, 0, 0.2)',
              border: '1px dashed var(--border)',
              borderRadius: '8px',
              padding: '12px',
              marginBottom: '32px',
              fontFamily: "'DM Mono', monospace",
              fontSize: '12px',
              color: 'var(--white-dimmer)',
            }}
          >
            Digest Hash: {error.digest}
          </div>
        )}

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            width: '100%',
          }}
        >
          <button
            onClick={() => reset()}
            className="btn-primary"
            style={{
              padding: '14px 28px',
              textAlign: 'center',
              cursor: 'pointer',
              display: 'block',
              width: '100%',
              background: 'var(--white)',
              color: 'var(--black)',
              border: 'none',
              fontFamily: "'Syne', sans-serif",
              fontWeight: 700,
              fontSize: '12px',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}
          >
            <span>Re-establish Connection</span>
          </button>

          <Link
            href="/"
            className="btn-secondary"
            style={{
              padding: '14px 28px',
              textDecoration: 'none',
              textAlign: 'center',
              cursor: 'pointer',
              display: 'block',
              width: '100%',
              fontSize: '12px',
              letterSpacing: '0.1em',
            }}
          >
            Return to Core Hub
          </Link>
        </div>
      </div>
    </main>
  );
}
