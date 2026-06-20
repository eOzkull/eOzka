'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface MenuItem {
  name: string;
  price: number;
  prepTime: string;
  qtyLeft: number;
}

export default function NolinClient() {
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderStage, setOrderStage] = useState<
    'pending' | 'confirmed' | 'preparing' | 'ready' | 'collected'
  >('pending');
  const [eta, setEta] = useState(12);
  const [queuePos, setQueuePos] = useState(3);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Simulate preparation countdown when order is placed
  useEffect(() => {
    if (!orderPlaced) return;

    let timer: NodeJS.Timeout;

    const progressStages = async () => {
      // Pending -> Confirmed (1.5s)
      await new Promise((resolve) => {
        timer = setTimeout(resolve, 1500);
      });
      setOrderStage('confirmed');

      // Confirmed -> Preparing (2.5s)
      await new Promise((resolve) => {
        timer = setTimeout(resolve, 2500);
      });
      setOrderStage('preparing');
      setQueuePos(2);

      // Preparing -> Ready (4s)
      await new Promise((resolve) => {
        timer = setTimeout(resolve, 4000);
      });
      setOrderStage('ready');
      setQueuePos(0);
      setEta(0);
    };

    progressStages();

    return () => clearTimeout(timer);
  }, [orderPlaced]);

  const canteenItems: MenuItem[] = [
    { name: 'Masala Dosa', price: 70, prepTime: '6 min', qtyLeft: 12 },
    { name: 'Veg Thali', price: 95, prepTime: '9 min', qtyLeft: 4 },
    { name: 'Cold Coffee', price: 60, prepTime: '2 min', qtyLeft: 24 },
  ];

  const totalPrice = canteenItems.reduce((acc, item) => acc + item.price, 0);

  return (
    <main
      className="subpage-wrapper"
      style={{
        minHeight: '100vh',
        background: '#09090b',
        color: '#f4f4f5',
        paddingBottom: '120px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background radial gradient glow representing Nolin brand orange */}
      <div
        style={{
          position: 'absolute',
          top: '-200px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '80%',
          height: '600px',
          background: 'radial-gradient(ellipse at 50% 10%, rgba(255,106,0,0.12), transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <section
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '120px 24px 40px 24px',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '24px' }}>
          <Link
            href="/"
            className="theme-btn"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              textDecoration: 'none',
              fontSize: '11px',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              border: '1px solid rgba(255,255,255,0.08)',
              padding: '8px 16px',
              borderRadius: '8px',
              color: '#a1a1aa',
            }}
          >
            ← Back to Main Studio
          </Link>
          <a
            href="https://nolin.in"
            target="_blank"
            rel="noopener noreferrer"
            className="theme-btn"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              textDecoration: 'none',
              fontSize: '11px',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              border: '1px solid rgba(255,106,0,0.3)',
              background: 'rgba(255,106,0,0.08)',
              padding: '8px 16px',
              borderRadius: '8px',
              color: '#ff6a00',
              fontWeight: 'bold',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255,106,0,0.15)';
              e.currentTarget.style.borderColor = '#ff6a00';
              e.currentTarget.style.boxShadow = '0 0 16px rgba(255,106,0,0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255,106,0,0.08)';
              e.currentTarget.style.borderColor = 'rgba(255,106,0,0.3)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            Visit Website ↗
          </a>
        </div>
        <div
          style={{
            display: 'inline-block',
            padding: '6px 12px',
            background: 'rgba(255,106,0,0.06)',
            border: '1px solid rgba(255,106,0,0.15)',
            borderRadius: '100px',
            fontSize: '11px',
            fontFamily: 'var(--ff-mono)',
            color: '#ff6a00',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
          }}
        >
          🏫 Campus pilot active
        </div>

        <h1
          style={{
            fontFamily: 'var(--serif)',
            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
            marginTop: '20px',
            lineHeight: '1.1',
            color: '#ffffff',
          }}
        >
          Nolin.in — Campus.
          <br />
          Commerce.{' '}
          <em
            style={{
              fontStyle: 'italic',
              color: '#ff6a00',
              textShadow: '0 0 20px rgba(255,106,0,0.25)',
            }}
          >
            Reimagined.
          </em>
        </h1>
        <p
          style={{
            marginTop: '24px',
            maxWidth: '700px',
            fontSize: '1.15rem',
            color: '#a1a1aa',
            lineHeight: '1.7',
          }}
        >
          Skip the queue. Own your time. Order from your campus canteen, see live preparation
          telemetry, pay with UPI, and pick up securely with unique handoff codes.
        </p>
      </section>

      {/* Main Grid: Info Cards on Left, Phone Simulator on Right */}
      <section
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 24px 60px 24px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '40px',
          position: 'relative',
          zIndex: 1,
          border: 'none',
        }}
      >
        {/* Left Side: Product Details */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          <div
            style={{
              background: 'rgba(255, 255, 255, 0.01)',
              border: '1px solid rgba(255,255,255,0.05)',
              padding: '32px',
              borderRadius: '16px',
            }}
          >
            <h3
              style={{
                fontSize: '20px',
                color: '#ffffff',
                fontWeight: '600',
                marginBottom: '12px',
              }}
            >
              Smart Canteen Ordering
            </h3>
            <p style={{ fontSize: '14.5px', color: '#a1a1aa', lineHeight: '1.6' }}>
              Order directly from your seat or between classes. Browse canteen menus featuring
              real-time availability, item pricing, and kitchen workloads before you commit.
            </p>
          </div>

          <div
            style={{
              background: 'rgba(255, 255, 255, 0.01)',
              border: '1px solid rgba(255,255,255,0.05)',
              padding: '32px',
              borderRadius: '16px',
            }}
          >
            <h3
              style={{
                fontSize: '20px',
                color: '#ffffff',
                fontWeight: '600',
                marginBottom: '12px',
              }}
            >
              Live ETA & Queue Ingestion
            </h3>
            <p style={{ fontSize: '14.5px', color: '#a1a1aa', lineHeight: '1.6' }}>
              We calculate wait times using current kitchen queue depth, average prep speed, and
              individual item cooking times, so you know exactly when to walk down.
            </p>
          </div>

          <div
            style={{
              background: 'rgba(255, 255, 255, 0.01)',
              border: '1px solid rgba(255,255,255,0.05)',
              padding: '32px',
              borderRadius: '16px',
            }}
          >
            <h3
              style={{
                fontSize: '20px',
                color: '#ffffff',
                fontWeight: '600',
                marginBottom: '12px',
              }}
            >
              Handoff Codes & UPI Integration
            </h3>
            <p style={{ fontSize: '14.5px', color: '#a1a1aa', lineHeight: '1.6' }}>
              Complete instant payments via UPI apps. Once your meal is plated, you receive a
              secure, unique 4-digit pickup code to display at the counter. No paper tickets. No
              queue.
            </p>
          </div>
        </div>

        {/* Right Side: Interactive Phone Simulator */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
          <div
            style={{
              width: '100%',
              maxWidth: '360px',
              background: '#0c0c0e',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '36px',
              padding: '16px',
              boxShadow: '0 20px 50px rgba(0,0,0,0.6)',
            }}
          >
            <div
              style={{
                background: '#060607',
                borderRadius: '24px',
                padding: '20px',
                minHeight: '440px',
                fontFamily: 'var(--ff-mono)',
                fontSize: '11px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              {/* Header */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  color: '#71717a',
                  borderBottom: '1px solid rgba(255,255,255,0.05)',
                  paddingBottom: '10px',
                }}
              >
                <span>North Block · Canteen</span>
                <span
                  style={{
                    color: '#22c55e',
                    background: 'rgba(34,197,94,0.08)',
                    padding: '2px 6px',
                    borderRadius: '4px',
                    fontSize: '9px',
                    fontWeight: 'bold',
                  }}
                >
                  ● Open
                </span>
              </div>

              {/* Order Status or Placer */}
              {!orderPlaced ? (
                <div>
                  <div
                    style={{
                      fontSize: '9px',
                      color: '#71717a',
                      margin: '16px 0 8px 0',
                      textTransform: 'uppercase',
                    }}
                  >
                    Select Items
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {canteenItems.map((item, idx) => (
                      <div
                        key={idx}
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          background: 'rgba(255,255,255,0.02)',
                          border: '1px solid rgba(255,255,255,0.05)',
                          padding: '10px',
                          borderRadius: '10px',
                        }}
                      >
                        <div>
                          <strong style={{ color: '#ffffff', fontSize: '12px' }}>
                            {item.name}
                          </strong>
                          <div style={{ color: '#71717a', fontSize: '9px', marginTop: '2px' }}>
                            Prep: {item.prepTime} • Qty: {item.qtyLeft} left
                          </div>
                        </div>
                        <span style={{ color: '#ff6a00', fontWeight: 'bold' }}>₹{item.price}</span>
                      </div>
                    ))}
                  </div>

                  <div
                    style={{
                      borderTop: '1px solid rgba(255,255,255,0.05)',
                      marginTop: '20px',
                      paddingTop: '12px',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        fontSize: '13px',
                        color: '#ffffff',
                        fontWeight: 'bold',
                        marginBottom: '12px',
                      }}
                    >
                      <span>Cart Total</span>
                      <span>₹{totalPrice}</span>
                    </div>
                    <button
                      onClick={() => {
                        setOrderPlaced(true);
                        setOrderStage('pending');
                      }}
                      style={{
                        width: '100%',
                        padding: '12px',
                        background: 'linear-gradient(135deg, #ff8a00, #ff6a00)',
                        color: '#ffffff',
                        border: 'none',
                        borderRadius: '12px',
                        fontWeight: 'bold',
                        fontSize: '12px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        cursor: 'pointer',
                        boxShadow: '0 6px 20px rgba(255,106,0,0.3)',
                      }}
                    >
                      Place Order & Pay UPI
                    </button>
                  </div>
                </div>
              ) : (
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px',
                    flex: 1,
                    justifyContent: 'space-between',
                    height: '100%',
                    marginTop: '16px',
                  }}
                >
                  {/* Status Strip */}
                  <div
                    style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}
                  >
                    <div
                      style={{
                        background: 'rgba(255,255,255,0.02)',
                        border: '1px solid rgba(255,255,255,0.05)',
                        padding: '8px',
                        borderRadius: '8px',
                        textAlign: 'center',
                      }}
                    >
                      <div
                        style={{ color: '#71717a', fontSize: '8px', textTransform: 'uppercase' }}
                      >
                        ETA
                      </div>
                      <strong
                        style={{
                          fontSize: '13px',
                          color: '#ff6a00',
                          display: 'block',
                          marginTop: '2px',
                        }}
                      >
                        {eta} min
                      </strong>
                    </div>
                    <div
                      style={{
                        background: 'rgba(255,255,255,0.02)',
                        border: '1px solid rgba(255,255,255,0.05)',
                        padding: '8px',
                        borderRadius: '8px',
                        textAlign: 'center',
                      }}
                    >
                      <div
                        style={{ color: '#71717a', fontSize: '8px', textTransform: 'uppercase' }}
                      >
                        Queue
                      </div>
                      <strong
                        style={{
                          fontSize: '13px',
                          color: '#ffffff',
                          display: 'block',
                          marginTop: '2px',
                        }}
                      >
                        #{queuePos}
                      </strong>
                    </div>
                    <div
                      style={{
                        background: 'rgba(255,255,255,0.02)',
                        border: '1px solid rgba(255,255,255,0.05)',
                        padding: '8px',
                        borderRadius: '8px',
                        textAlign: 'center',
                      }}
                    >
                      <div
                        style={{ color: '#71717a', fontSize: '8px', textTransform: 'uppercase' }}
                      >
                        Ready
                      </div>
                      <strong
                        style={{
                          fontSize: '13px',
                          color: '#ffffff',
                          display: 'block',
                          marginTop: '2px',
                        }}
                      >
                        Soon
                      </strong>
                    </div>
                  </div>

                  {/* Progress Line */}
                  <div style={{ margin: '12px 0' }}>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        color: '#71717a',
                        fontSize: '9px',
                        marginBottom: '6px',
                      }}
                    >
                      <span>Progress</span>
                      <span
                        style={{ color: '#ff6a00', textTransform: 'uppercase', fontWeight: 'bold' }}
                      >
                        {orderStage}
                      </span>
                    </div>
                    <div
                      style={{
                        height: '4px',
                        background: 'rgba(255,255,255,0.05)',
                        width: '100%',
                        borderRadius: '2px',
                        overflow: 'hidden',
                      }}
                    >
                      <div
                        style={{
                          height: '100%',
                          background: 'linear-gradient(90deg, #ff8a00, #ff6a00)',
                          width:
                            orderStage === 'pending'
                              ? '15%'
                              : orderStage === 'confirmed'
                                ? '40%'
                                : orderStage === 'preparing'
                                  ? '70%'
                                  : '100%',
                          transition: 'width 0.5s ease',
                        }}
                      />
                    </div>
                  </div>

                  {/* Code Block */}
                  <div
                    style={{
                      background: 'linear-gradient(135deg, rgba(255,106,0,0.08), transparent)',
                      border: '1px solid rgba(255,106,0,0.15)',
                      padding: '16px',
                      borderRadius: '12px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <div>
                      <div
                        style={{ color: '#71717a', fontSize: '8px', textTransform: 'uppercase' }}
                      >
                        Pickup Code
                      </div>
                      <strong
                        style={{
                          fontSize: '20px',
                          color: '#ffffff',
                          letterSpacing: '2px',
                          display: 'block',
                          marginTop: '4px',
                        }}
                      >
                        8429
                      </strong>
                    </div>
                    <div
                      style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '8px',
                        background: '#ff6a00',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#ffffff',
                      }}
                    >
                      🔑
                    </div>
                  </div>

                  {/* Reset Button */}
                  <button
                    onClick={() => setOrderPlaced(false)}
                    style={{
                      width: '100%',
                      padding: '10px',
                      background: 'transparent',
                      color: '#71717a',
                      border: '1px solid rgba(255,255,255,0.08)',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      marginTop: 'auto',
                    }}
                  >
                    Reset Demo
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Dev Notes & Meet the Team Sections */}
      <section
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '60px 24px',
          borderTop: '1px solid rgba(255,255,255,0.06)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '60px',
          alignItems: 'start',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <div>
          <h2
            style={{
              fontSize: '2rem',
              marginBottom: '24px',
              fontFamily: 'var(--serif)',
              color: '#ffffff',
            }}
          >
            Developer Notes & Architecture
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div
              style={{
                display: 'flex',
                gap: '12px',
                background: 'rgba(255,255,255,0.01)',
                border: '1px solid rgba(255,255,255,0.08)',
                padding: '16px 20px',
                borderRadius: '8px',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--ff-mono)',
                  color: '#ff6a00',
                  fontSize: '14px',
                  fontWeight: 'bold',
                }}
              >
                [01]
              </span>
              <p style={{ margin: 0, fontSize: '14px', color: '#a1a1aa', lineHeight: '1.6' }}>
                Integrated secure QR-code generation and verification logic for canteen counter
                handoff validations.
              </p>
            </div>
            <div
              style={{
                display: 'flex',
                gap: '12px',
                background: 'rgba(255,255,255,0.01)',
                border: '1px solid rgba(255,255,255,0.08)',
                padding: '16px 20px',
                borderRadius: '8px',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--ff-mono)',
                  color: '#ff6a00',
                  fontSize: '14px',
                  fontWeight: 'bold',
                }}
              >
                [02]
              </span>
              <p style={{ margin: 0, fontSize: '14px', color: '#a1a1aa', lineHeight: '1.6' }}>
                UPI deep-linking integration supports instant payments across all registered mobile
                UPI application handlers.
              </p>
            </div>
            <div
              style={{
                display: 'flex',
                gap: '12px',
                background: 'rgba(255,255,255,0.01)',
                border: '1px solid rgba(255,255,255,0.08)',
                padding: '16px 20px',
                borderRadius: '8px',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--ff-mono)',
                  color: '#ff6a00',
                  fontSize: '14px',
                  fontWeight: 'bold',
                }}
              >
                [03]
              </span>
              <p style={{ margin: 0, fontSize: '14px', color: '#a1a1aa', lineHeight: '1.6' }}>
                WebSocket listeners provide real-time canteen status updates and queue telemetry
                ingestion.
              </p>
            </div>
          </div>
        </div>
        <div>
          <h2
            style={{
              fontSize: '2rem',
              marginBottom: '24px',
              fontFamily: 'var(--serif)',
              color: '#ffffff',
            }}
          >
            Meet the Team
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div
              style={{
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.08)',
                padding: '20px',
                borderRadius: '12px',
                borderLeft: '3px solid #ff6a00',
              }}
            >
              <span
                style={{
                  fontSize: '11px',
                  fontFamily: 'var(--ff-mono)',
                  color: '#ff6a00',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  display: 'block',
                  marginBottom: '6px',
                }}
              >
                Initiative Spearheaded By
              </span>
              <h4 style={{ margin: 0, fontSize: '18px', color: '#ffffff', fontWeight: 'bold' }}>
                Divyam Bharadwaj
              </h4>
              <span
                style={{ fontSize: '13px', color: '#a1a1aa', display: 'block', marginTop: '2px' }}
              >
                Product Lead & Project Director
              </span>
            </div>

            <div
              style={{
                background: 'rgba(255,255,255,0.01)',
                border: '1px solid rgba(255,255,255,0.05)',
                padding: '16px 20px',
                borderRadius: '8px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div>
                <h4 style={{ margin: 0, fontSize: '14px', color: '#ffffff', fontWeight: 'bold' }}>
                  Harsh Dev Jha
                </h4>
                <span style={{ fontSize: '11px', color: '#71717a' }}>Core Infrastructure</span>
              </div>
              <a
                href="https://github.com/inkesk-dozing"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: '#ff6a00',
                  fontSize: '11px',
                  textDecoration: 'none',
                  fontFamily: 'var(--ff-mono)',
                  border: '1px solid rgba(255,106,0,0.2)',
                  padding: '4px 10px',
                  borderRadius: '4px',
                }}
              >
                GitHub ↗
              </a>
            </div>

            <div
              style={{
                background: 'rgba(255,255,255,0.01)',
                border: '1px solid rgba(255,255,255,0.05)',
                padding: '16px 20px',
                borderRadius: '8px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div>
                <h4 style={{ margin: 0, fontSize: '14px', color: '#ffffff', fontWeight: 'bold' }}>
                  Kushagra Bharadwaj
                </h4>
                <span style={{ fontSize: '11px', color: '#71717a' }}>Frontend Integration</span>
              </div>
              <a
                href="https://github.com/Kush05Bhardwaj"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: '#ff6a00',
                  fontSize: '11px',
                  textDecoration: 'none',
                  fontFamily: 'var(--ff-mono)',
                  border: '1px solid rgba(255,106,0,0.2)',
                  padding: '4px 10px',
                  borderRadius: '4px',
                }}
              >
                GitHub ↗
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
