'use client';

import Link from 'next/link';
import { ReactNode, useState, useEffect } from 'react';
import { Play, Image, Terminal, ChevronLeft, ChevronRight, X } from 'lucide-react';

interface GalleryItem {
  url: string;
  caption?: string;
}

interface ProductLandingProps {
  productName: string;
  tagline: string;
  status: 'Live' | 'Pipeline' | 'Research';
  statusColor: 'live' | 'pipeline' | 'research';
  problemStatement: string;
  marketSize: string;
  marketOpportunity: string;
  metrics: { label: string; value: string }[];
  features: { title: string; description: string; icon?: string }[];
  caseStudies: { title: string; description: string; result: string }[];
  githubLink?: string;
  integrationLink?: string;
  websiteLink?: string;
  children?: ReactNode;
  galleryImages?: GalleryItem[];
  demoVideo?: string;
}

export default function ProductLanding({
  productName,
  tagline,
  status,
  statusColor,
  problemStatement,
  marketSize,
  marketOpportunity,
  metrics,
  features,
  caseStudies,
  githubLink,
  integrationLink,
  websiteLink,
  children,
  galleryImages,
  demoVideo,
}: ProductLandingProps) {
  const [activeTab, setActiveTab] = useState<'simulation' | 'video' | 'screenshots'>(() => {
    if (children) return 'simulation';
    if (demoVideo) return 'video';
    return 'screenshots';
  });

  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [lightboxOpen, setLightboxOpen] = useState<boolean>(false);
  const [lightboxIndex, setLightboxIndex] = useState<number>(0);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isZoomed, setIsZoomed] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    setIsMobile(window.innerWidth < 900);
    const handleResize = () => setIsMobile(window.innerWidth < 900);
    window.addEventListener('resize', handleResize, { passive: true });
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const nextSlide = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (galleryImages && galleryImages.length > 0) {
      setCurrentSlide((prev) => (prev + 1) % galleryImages.length);
    }
  };

  const prevSlide = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (galleryImages && galleryImages.length > 0) {
      setCurrentSlide((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
    }
  };

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setIsZoomed(false);
  };

  const nextLightboxImage = () => {
    if (galleryImages && galleryImages.length > 0) {
      setLightboxIndex((prev) => (prev + 1) % galleryImages.length);
      setIsZoomed(false);
    }
  };

  const prevLightboxImage = () => {
    if (galleryImages && galleryImages.length > 0) {
      setLightboxIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
      setIsZoomed(false);
    }
  };

  useEffect(() => {
    if (!lightboxOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeLightbox();
      } else if (e.key === 'ArrowRight') {
        nextLightboxImage();
      } else if (e.key === 'ArrowLeft') {
        prevLightboxImage();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [lightboxOpen, lightboxIndex]);
  const statusStyles: Record<string, { border: string; color: string; bg: string }> = {
    live: { border: '#2a4a2a', color: '#6aba6a', bg: 'rgba(10, 24, 10, 0.4)' },
    pipeline: { border: '#3a3020', color: '#9a8050', bg: 'rgba(20, 16, 10, 0.4)' },
    research: { border: '#3a2a3a', color: '#9a7a8a', bg: 'rgba(20, 10, 20, 0.4)' },
  };

  const style = statusStyles[statusColor];

  return (
    <main
      className="subpage-wrapper"
      style={{
        minHeight: '100vh',
        background: 'var(--black)',
        color: 'var(--white)',
        paddingTop: '120px',
      }}
    >
      {/* Hero Section */}
      <section
        className="product-landing-hero"
        style={{ padding: '60px 24px 40px 24px', maxWidth: '1200px', margin: '0 auto' }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            marginBottom: '20px',
            flexWrap: 'wrap',
          }}
        >
          <h1
            className="section-headline"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', lineHeight: '1.1', margin: 0 }}
          >
            {productName}
          </h1>
          <span
            className="product-tag"
            style={{
              border: `1px solid ${style.border}`,
              color: style.color,
              background: style.bg,
              padding: '4px 12px',
              fontSize: '11px',
              textTransform: 'uppercase',
              fontFamily: 'var(--font-mono)',
              whiteSpace: 'nowrap',
            }}
          >
            {status}
          </span>
        </div>

        <p
          className="product-tagline"
          style={{
            fontSize: '1.15rem',
            color: 'var(--accent)',
            marginBottom: '28px',
            maxWidth: '760px',
            lineHeight: 1.7,
          }}
        >
          {tagline}
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'minmax(0, 1.15fr) minmax(320px, 0.85fr)',
            gap: '24px',
            alignItems: 'stretch',
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '16px',
              padding: '24px',
              border: '1px solid var(--border)',
              background: 'linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))',
              borderRadius: '12px',
            }}
          >
            {metrics.map((metric, idx) => (
              <div
                key={idx}
                style={{ display: 'flex', flexDirection: 'column', gap: '8px', padding: '14px 0' }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '11px',
                    color: 'var(--accent-dim)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                  }}
                >
                  {metric.label}
                </span>
                <span style={{ fontSize: '24px', fontWeight: 700, color: 'var(--white)' }}>
                  {metric.value}
                </span>
              </div>
            ))}
          </div>

          <div
            className="showcase-mockup-frame"
            style={{
              border: '1px solid var(--border)',
              borderRadius: '12px',
              background:
                'radial-gradient(circle at top, rgba(212, 201, 168, 0.14), transparent 55%), var(--off-black)',
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              height: '600px',
              position: 'relative',
            }}
          >
            {/* Tab Switcher */}
            {(children || demoVideo || (galleryImages && galleryImages.length > 0)) && (
              <div
                style={{
                  display: 'flex',
                  gap: '8px',
                  borderBottom: '1px solid var(--border)',
                  paddingBottom: '12px',
                  marginBottom: '16px',
                  overflowX: 'auto',
                }}
              >
                {children && (
                  <button
                    onClick={() => setActiveTab('simulation')}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '6px 12px',
                      borderRadius: '20px',
                      border: '1px solid',
                      borderColor: activeTab === 'simulation' ? 'var(--accent)' : 'transparent',
                      background: activeTab === 'simulation' ? 'rgba(212, 201, 168, 0.1)' : 'transparent',
                      color: activeTab === 'simulation' ? 'var(--white)' : 'var(--white-dimmer)',
                      fontSize: '11px',
                      fontFamily: 'var(--font-mono)',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <Terminal size={12} /> Interactive Demo
                  </button>
                )}
                {demoVideo && (
                  <button
                    onClick={() => setActiveTab('video')}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '6px 12px',
                      borderRadius: '20px',
                      border: '1px solid',
                      borderColor: activeTab === 'video' ? 'var(--accent)' : 'transparent',
                      background: activeTab === 'video' ? 'rgba(212, 201, 168, 0.1)' : 'transparent',
                      color: activeTab === 'video' ? 'var(--white)' : 'var(--white-dimmer)',
                      fontSize: '11px',
                      fontFamily: 'var(--font-mono)',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <Play size={12} /> Video Walkthrough
                  </button>
                )}
                {galleryImages && galleryImages.length > 0 && (
                  <button
                    onClick={() => setActiveTab('screenshots')}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '6px 12px',
                      borderRadius: '20px',
                      border: '1px solid',
                      borderColor: activeTab === 'screenshots' ? 'var(--accent)' : 'transparent',
                      background: activeTab === 'screenshots' ? 'rgba(212, 201, 168, 0.1)' : 'transparent',
                      color: activeTab === 'screenshots' ? 'var(--white)' : 'var(--white-dimmer)',
                      fontSize: '11px',
                      fontFamily: 'var(--font-mono)',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <Image size={12} /> Screenshots
                  </button>
                )}
              </div>
            )}

            {/* Tab Contents */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              {activeTab === 'simulation' && children}

              {activeTab === 'video' && demoVideo && (
                <div 
                  style={{ 
                    flex: 1, 
                    display: 'flex', 
                    flexDirection: 'column',
                    position: 'relative', 
                    overflow: 'hidden', 
                    borderRadius: '12px', 
                    border: '1px solid var(--border)', 
                    background: 'var(--black)',
                    minHeight: '260px',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
                  }}
                >
                  {/* Browser Header Bar */}
                  <div 
                    style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '8px', 
                      background: 'var(--off-black)', 
                      padding: '10px 16px', 
                      borderBottom: '1px solid var(--border)',
                      height: '38px',
                    }}
                  >
                    <div style={{ display: 'flex', gap: '6px' }}>
                      <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ff5f56' }} />
                      <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ffbd2e' }} />
                      <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#27c93f' }} />
                    </div>
                    <div 
                      style={{ 
                        flex: 1, 
                        margin: '0 24px', 
                        background: 'var(--black)', 
                        border: '1px solid var(--border)', 
                        borderRadius: '6px', 
                        padding: '3px 12px', 
                        fontSize: '10px', 
                        color: 'var(--white-dim)', 
                        fontFamily: 'var(--font-mono)',
                        textAlign: 'center',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                      }}
                    >
                      eozka.dev/{productName.toLowerCase().replace(' ', '-')}/video-tour
                    </div>
                  </div>

                  {/* Video Container with premium background */}
                  <div 
                    style={{ 
                      flex: 1, 
                      position: 'relative', 
                      overflow: 'hidden', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center', 
                      padding: '24px',
                      background: 'radial-gradient(circle at center, var(--accent-glow) 0%, transparent 80%), repeating-radial-gradient(circle, rgba(255,255,255,0.01) 0px, rgba(255,255,255,0.01) 1px, transparent 1px, transparent 20px)',
                      backgroundSize: '20px 20px',
                    }}
                  >
                    <video
                      src={demoVideo}
                      controls
                      playsInline
                      style={{ 
                        maxWidth: '100%', 
                        maxHeight: '480px', 
                        objectFit: 'contain',
                        borderRadius: '6px',
                        boxShadow: '0 12px 40px rgba(0, 0, 0, 0.4), 0 0 0 1px var(--border)'
                      }}
                    />
                  </div>
                </div>
              )}

              {activeTab === 'screenshots' && galleryImages && galleryImages.length > 0 && (
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
                  {/* Browser Mockup Window */}
                  <div 
                    style={{ 
                      flex: 1, 
                      display: 'flex', 
                      flexDirection: 'column',
                      position: 'relative', 
                      overflow: 'hidden', 
                      borderRadius: '12px', 
                      border: '1px solid var(--border)', 
                      background: 'var(--black)',
                      minHeight: '260px',
                      boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
                    }}
                  >
                    {/* Browser Header Bar */}
                    <div 
                      style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '8px', 
                        background: 'var(--off-black)', 
                        padding: '10px 16px', 
                        borderBottom: '1px solid var(--border)',
                        height: '38px',
                      }}
                    >
                      {/* Windows/Mac style window controls */}
                      <div style={{ display: 'flex', gap: '6px' }}>
                        <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ff5f56' }} />
                        <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ffbd2e' }} />
                        <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#27c93f' }} />
                      </div>
                      
                      {/* Address Bar */}
                      <div 
                        style={{ 
                          flex: 1, 
                          margin: '0 24px', 
                          background: 'var(--black)', 
                          border: '1px solid var(--border)', 
                          borderRadius: '6px', 
                          padding: '3px 12px', 
                          fontSize: '10px', 
                          color: 'var(--white-dim)', 
                          fontFamily: 'var(--font-mono)',
                          textAlign: 'center',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap'
                        }}
                      >
                        eozka.dev/{productName.toLowerCase().replace(' ', '-')}/dashboard
                      </div>
                    </div>

                    {/* Screenshot Container with premium background */}
                    <div 
                      style={{ 
                        flex: 1, 
                        position: 'relative', 
                        overflow: 'hidden', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        padding: '24px',
                        background: 'radial-gradient(circle at center, var(--accent-glow) 0%, transparent 80%), repeating-radial-gradient(circle, rgba(255,255,255,0.01) 0px, rgba(255,255,255,0.01) 1px, transparent 1px, transparent 20px)',
                        backgroundSize: '20px 20px',
                      }}
                    >
                      <img
                        src={galleryImages[currentSlide].url}
                        alt={galleryImages[currentSlide].caption || 'Screenshot'}
                        onClick={() => openLightbox(currentSlide)}
                        style={{ 
                          maxWidth: '100%', 
                          maxHeight: '480px', 
                          objectFit: 'contain', 
                          borderRadius: '6px',
                          boxShadow: '0 12px 40px rgba(0, 0, 0, 0.4), 0 0 0 1px var(--border)',
                          transition: 'opacity 0.3s ease',
                          cursor: 'zoom-in'
                        }}
                      />
                      {galleryImages.length > 1 && (
                        <>
                          <button
                            onClick={prevSlide}
                            style={{
                              position: 'absolute',
                              left: '12px',
                              background: 'var(--off-black)',
                              border: '1px solid var(--border)',
                              color: 'var(--white)',
                              width: '32px',
                              height: '32px',
                              borderRadius: '50%',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              cursor: 'pointer',
                              zIndex: 2,
                              boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                              transition: 'all 0.2s',
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.borderColor = 'var(--accent)';
                              e.currentTarget.style.color = 'var(--accent)';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.borderColor = 'var(--border)';
                              e.currentTarget.style.color = 'var(--white)';
                            }}
                          >
                            <ChevronLeft size={18} />
                          </button>
                          <button
                            onClick={nextSlide}
                            style={{
                              position: 'absolute',
                              right: '12px',
                              background: 'var(--off-black)',
                              border: '1px solid var(--border)',
                              color: 'var(--white)',
                              width: '32px',
                              height: '32px',
                              borderRadius: '50%',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              cursor: 'pointer',
                              zIndex: 2,
                              boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                              transition: 'all 0.2s',
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.borderColor = 'var(--accent)';
                              e.currentTarget.style.color = 'var(--accent)';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.borderColor = 'var(--border)';
                              e.currentTarget.style.color = 'var(--white)';
                            }}
                          >
                            <ChevronRight size={18} />
                          </button>
                        </>
                      )}
                    </div>
                  </div>

                  {galleryImages[currentSlide].caption && (
                    <div
                      style={{
                        marginTop: '8px',
                        fontSize: '11px',
                        color: 'var(--white-dim)',
                        textAlign: 'center',
                        fontFamily: 'var(--font-mono)',
                      }}
                    >
                      {galleryImages[currentSlide].caption}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Problem & Opportunity */}
      <section
        className="product-section"
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '60px 24px',
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
          gap: isMobile ? '30px' : '60px',
          alignItems: 'start',
        }}
      >
        <div>
          <h2 style={{ fontSize: '2rem', marginBottom: '16px', fontFamily: 'var(--serif)' }}>
            The Problem
          </h2>
          <p style={{ fontSize: '1.1rem', color: 'var(--white-dim)', lineHeight: '1.8' }}>
            {problemStatement}
          </p>
        </div>

        <div
          style={{
            background: 'var(--surface)',
            padding: '32px',
            borderRadius: '8px',
            border: '1px solid var(--border)',
          }}
        >
          <h3
            style={{
              fontSize: '1.1rem',
              marginBottom: '8px',
              textTransform: 'uppercase',
              fontFamily: 'var(--font-mono)',
              color: 'var(--accent)',
            }}
          >
            Market Opportunity
          </h3>
          <div
            style={{
              fontSize: '28px',
              fontWeight: 'bold',
              color: 'var(--white)',
              marginBottom: '16px',
            }}
          >
            {marketSize}
          </div>
          <p style={{ fontSize: '1rem', color: 'var(--white-dim)', lineHeight: '1.6' }}>
            {marketOpportunity}
          </p>
        </div>
      </section>

      {/* Features/Capabilities */}
      {features.length > 0 && (
        <section
          className="product-features"
          style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 24px' }}
        >
          <h2
            style={{
              fontSize: '2rem',
              marginBottom: '40px',
              fontFamily: 'var(--serif)',
              textAlign: 'center',
            }}
          >
            Key Features & Capabilities
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '32px',
            }}
          >
            {features.map((feature, idx) => (
              <div
                key={idx}
                style={{
                  background: 'var(--off-black)',
                  padding: '32px',
                  border: '1px solid var(--border)',
                  borderRadius: '8px',
                }}
              >
                {feature.icon && (
                  <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>{feature.icon}</div>
                )}
                <h3 style={{ fontSize: '1.2rem', marginBottom: '12px', fontWeight: 'bold' }}>
                  {feature.title}
                </h3>
                <p style={{ fontSize: '0.95rem', color: 'var(--white-dim)', lineHeight: '1.6' }}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Case Studies */}
      {caseStudies.length > 0 && (
        <section
          className="product-casestudies"
          style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 24px' }}
        >
          <h2
            style={{
              fontSize: '2rem',
              marginBottom: '40px',
              fontFamily: 'var(--serif)',
              textAlign: 'center',
            }}
          >
            Real-World Impact
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '32px',
            }}
          >
            {caseStudies.map((study, idx) => (
              <div
                key={idx}
                style={{
                  background: 'var(--off-black)',
                  padding: '32px',
                  border: '1px dashed var(--accent-dim)',
                  borderRadius: '8px',
                }}
              >
                <h3
                  style={{
                    fontSize: '1.1rem',
                    marginBottom: '12px',
                    color: 'var(--accent)',
                    fontWeight: 'bold',
                  }}
                >
                  {study.title}
                </h3>
                <p
                  style={{
                    fontSize: '0.95rem',
                    color: 'var(--white-dim)',
                    lineHeight: '1.6',
                    marginBottom: '16px',
                  }}
                >
                  {study.description}
                </p>
                <div style={{ paddingTop: '16px', borderTop: '1px solid var(--border)' }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '10px',
                      color: 'var(--accent-dim)',
                      textTransform: 'uppercase',
                    }}
                  >
                    Result
                  </span>
                  <p
                    style={{
                      fontSize: '1rem',
                      color: 'var(--accent)',
                      fontWeight: 'bold',
                      marginTop: '4px',
                    }}
                  >
                    {study.result}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section
        className="product-cta"
        style={{ maxWidth: '1200px', margin: '0 auto', padding: '80px 24px', textAlign: 'center' }}
      >
        <h2 style={{ fontSize: '2rem', marginBottom: '24px', fontFamily: 'var(--serif)' }}>
          Ready to Get Started?
        </h2>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
          {githubLink && (
            <a
              href={githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="theme-btn"
              style={{
                padding: '14px 28px',
                textDecoration: 'none',
                borderRadius: '4px',
                fontSize: '14px',
                fontWeight: 'bold',
                textTransform: 'uppercase',
              }}
            >
              View on GitHub →
            </a>
          )}
          {integrationLink && (
            <a
              href={integrationLink}
              target="_blank"
              rel="noopener noreferrer"
              className="theme-btn"
              style={{
                padding: '14px 28px',
                textDecoration: 'none',
                borderRadius: '4px',
                fontSize: '14px',
                fontWeight: 'bold',
                textTransform: 'uppercase',
              }}
            >
              Request Integration →
            </a>
          )}
          {websiteLink && (
            <a
              href={websiteLink}
              target="_blank"
              rel="noopener noreferrer"
              className="theme-btn"
              style={{
                padding: '14px 28px',
                textDecoration: 'none',
                borderRadius: '4px',
                fontSize: '14px',
                fontWeight: 'bold',
                textTransform: 'uppercase',
              }}
            >
              Visit Website →
            </a>
          )}
        </div>
      </section>

      {/* Dev Notes & Meet the Team Sections */}
      {(() => {
        const productData: Record<
          string,
          {
            devNotes: string[];
            team: { name: string; role: string; github?: string }[];
          }
        > = {
          'AIris Security': {
            devNotes: [
              'Implemented custom AST parsing engine to scan JavaScript/TypeScript node hierarchies directly without using external SaaS endpoints.',
              'Regex checks are optimized with compiled DFA matchers for lightning-fast latency of <3.8ms per file.',
              'Bundle optimized using Webpack compilation exclusions to ensure a lightweight client-side bundle profile.',
            ],
            team: [
              {
                name: 'Kushagra Bharadwaj',
                role: 'Lead Developer',
                github: 'https://github.com/Kush05Bhardwaj',
              },
              {
                name: 'Harsh Dev Jha',
                role: 'Contributing Developer / Founder',
                github: 'https://github.com/inkesk-dozing',
              },
              {
                name: 'Pratham Sharma',
                role: 'Contributing Developer / CTO',
                github: 'https://github.com/Prarock83',
              },
            ],
          },
          'Paradigm-Shift': {
            devNotes: [
              'Built a real-time data sync pipeline utilizing Server-Sent Events (SSE) to update employee records without layout shifts.',
              'Schema validations are centralized via structured TypeScript interfaces, enforcing type safety on all input/output vectors.',
              'Database credentials and session secrets are encrypted and kept strictly in server-side configuration environments.',
            ],
            team: [
              {
                name: 'Mrinal Prakash',
                role: 'Lead Developer / Co-Founder',
                github: 'https://github.com/mrinalprakashfsd',
              },
              {
                name: 'Ishaan Parashar',
                role: 'Contributing SDE',
                github: 'https://github.com/IshaanParashar2025',
              },
            ],
          },
          'Entab-D': {
            devNotes: [
              'Designed Chrome Extension Manifest V3 integration with a persistent background service worker.',
              'Constructed domain clustering algorithms to group and categorize tab stacks dynamically in under 2ms.',
              'Synchronized clean state memory across active windows using the Chrome extension storage sync API.',
            ],
            team: [
              {
                name: 'Saurabh Mudgal',
                role: 'Lead Developer',
                github: 'https://github.com/saurabh-mudgal-dev',
              },
              {
                name: 'Manas Bhasker',
                role: 'Contributing SDE',
                github: 'https://github.com/stillnwater',
              },
            ],
          },
          MindSpace: {
            devNotes: [
              'Integrated a local neural inference model utilizing ONNX Runtime Web for browser-native execution.',
              'Created a client-side vector search database inside IndexedDB to retrieve context queries without cloud latencies.',
              'Engineered Whisper-level whisper voice synthesis using Web Audio API buffers.',
            ],
            team: [
              {
                name: 'Ishaan Parashar',
                role: 'Lead Developer',
                github: 'https://github.com/IshaanParashar2025',
              },
              {
                name: 'Kushagra Bharadwaj',
                role: 'Contributing SDE',
                github: 'https://github.com/Kush05Bhardwaj',
              },
            ],
          },
          'Management-Systems': {
            devNotes: [
              'Built custom admin dashboards with granular, role-based access control (RBAC) to isolate sensitive telemetry.',
              'Enforced double-validation loops checking payload schemas at both network edge and local service boundaries.',
              'Configured automated system alerts pushing real-time connection handshakes straight to Discord logs.',
            ],
            team: [
              {
                name: 'Manas Bhasker',
                role: 'Lead Developer',
                github: 'https://github.com/stillnwater',
              },
              {
                name: 'Saurabh Mudgal',
                role: 'Contributing SDE',
                github: 'https://github.com/saurabh-mudgal-dev',
              },
            ],
          },
        };

        const lookupName = productName === 'AIris-Security' ? 'AIris Security' : productName;
        const currentData = productData[lookupName] || { devNotes: [], team: [] };

        if (currentData.devNotes.length === 0) return null;

        return (
          <section
            className="product-section"
            style={{
              maxWidth: '1200px',
              margin: '0 auto',
              padding: '60px 24px',
              borderTop: '1px solid var(--border)',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '60px',
              alignItems: 'start',
            }}
          >
            <div>
              <h2 style={{ fontSize: '2rem', marginBottom: '24px', fontFamily: 'var(--serif)' }}>
                Developer Notes & Architecture
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {currentData.devNotes.map((note, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: 'flex',
                      gap: '12px',
                      background: 'rgba(255, 255, 255, 0.01)',
                      border: '1px solid var(--border)',
                      padding: '16px 20px',
                      borderRadius: '8px',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        color: 'var(--accent)',
                        fontSize: '14px',
                        fontWeight: 'bold',
                      }}
                    >
                      [0{idx + 1}]
                    </span>
                    <p
                      style={{
                        margin: 0,
                        fontSize: '14px',
                        color: 'var(--white-dim)',
                        lineHeight: '1.6',
                      }}
                    >
                      {note}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h2 style={{ fontSize: '2rem', marginBottom: '24px', fontFamily: 'var(--serif)' }}>
                Meet the Team
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {currentData.team.map((member, idx) => (
                  <div
                    key={idx}
                    style={{
                      background: 'var(--surface)',
                      border: '1px solid var(--border)',
                      padding: '16px 20px',
                      borderRadius: '8px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <div>
                      <h4
                        style={{
                          margin: 0,
                          fontSize: '15px',
                          color: '#ffffff',
                          fontWeight: 'bold',
                        }}
                      >
                        {member.name}
                      </h4>
                      <span style={{ fontSize: '12px', color: 'var(--white-dimmer)' }}>
                        {member.role}
                      </span>
                    </div>
                    {member.github && (
                      <a
                        href={member.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          color: 'var(--accent)',
                          fontSize: '11px',
                          textDecoration: 'none',
                          fontFamily: 'var(--font-mono)',
                          textTransform: 'uppercase',
                          border: '1px solid var(--border)',
                          padding: '4px 10px',
                          borderRadius: '4px',
                        }}
                      >
                        GitHub ↗
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
        );
      })()}

      {/* Gallery Section */}
      {galleryImages && galleryImages.length > 0 && (
        <section
          className="product-gallery"
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '60px 24px',
            borderTop: '1px solid var(--border)',
          }}
        >
          <h2
            style={{
              fontSize: '2rem',
              marginBottom: '40px',
              fontFamily: 'var(--serif)',
              textAlign: 'center',
            }}
          >
            Interface & Dashboard Showcase
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '24px',
            }}
          >
            {galleryImages.map((image, idx) => (
              <div
                key={idx}
                onClick={() => openLightbox(idx)}
                style={{
                  background: 'var(--off-black)',
                  border: '1px solid var(--border)',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  transition: 'transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease',
                  position: 'relative',
                  aspectRatio: '16/10',
                  display: 'flex',
                  flexDirection: 'column',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.borderColor = 'var(--accent)';
                  e.currentTarget.style.boxShadow = '0 8px 30px rgba(212, 201, 168, 0.08)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = 'var(--border)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{ flex: 1, position: 'relative', overflow: 'hidden', background: '#080808' }}>
                  <img
                    src={image.url}
                    alt={image.caption || 'Interface Screenshot'}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                      transition: 'transform 0.5s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'scale(1.03)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1)';
                    }}
                  />
                </div>
                {image.caption && (
                  <div
                    style={{
                      padding: '12px 16px',
                      borderTop: '1px solid var(--border)',
                      background: 'rgba(255, 255, 255, 0.01)',
                      fontSize: '12px',
                      color: 'var(--white-dim)',
                      fontFamily: 'var(--font-mono)',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {image.caption}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Lightbox Modal */}
      {lightboxOpen && galleryImages && galleryImages.length > 0 && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(5, 5, 5, 0.92)',
            backdropFilter: 'blur(10px)',
            zIndex: 9999,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
          }}
          onClick={closeLightbox}
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            style={{
              position: 'absolute',
              top: '24px',
              right: '24px',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid var(--border)',
              color: 'var(--white)',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              zIndex: 10000,
              transition: 'background 0.2s',
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
          >
            <X size={20} />
          </button>

          {/* Navigation Controls */}
          {galleryImages.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  prevLightboxImage();
                }}
                style={{
                  position: 'absolute',
                  left: '24px',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid var(--border)',
                  color: 'var(--white)',
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  zIndex: 10000,
                  transition: 'background 0.2s',
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  nextLightboxImage();
                }}
                style={{
                  position: 'absolute',
                  right: '24px',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid var(--border)',
                  color: 'var(--white)',
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  zIndex: 10000,
                  transition: 'background 0.2s',
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
              >
                <ChevronRight size={24} />
              </button>
            </>
          )}

          {/* Main Image Container */}
          <div
            style={{
              position: 'relative',
              maxWidth: isZoomed ? '96vw' : '85vw',
              maxHeight: isZoomed ? '90vh' : '75vh',
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: isZoomed ? 'auto' : 'hidden',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={galleryImages[lightboxIndex].url}
              alt={galleryImages[lightboxIndex].caption || 'Screenshot'}
              style={{
                maxWidth: isZoomed ? 'none' : '100%',
                maxHeight: isZoomed ? 'none' : '100%',
                objectFit: 'contain',
                borderRadius: '8px',
                boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
                cursor: isZoomed ? 'zoom-out' : 'zoom-in',
                transition: isZoomed ? 'none' : 'transform 0.3s ease',
              }}
              onClick={() => setIsZoomed(!isZoomed)}
            />
          </div>

          {/* Caption & Counter */}
          <div
            style={{
              marginTop: '24px',
              textAlign: 'center',
              fontFamily: 'var(--font-mono)',
              zIndex: 10000,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {galleryImages[lightboxIndex].caption && (
              <p style={{ color: 'var(--white)', fontSize: '15px', margin: '0 0 8px 0', fontWeight: 'bold' }}>
                {galleryImages[lightboxIndex].caption}
              </p>
            )}
            <p style={{ color: 'var(--accent)', fontSize: '12px', margin: 0 }}>
              {lightboxIndex + 1} of {galleryImages.length}
            </p>
          </div>
        </div>
      )}

      {/* Back Link */}
      <section
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '40px 24px',
          textAlign: 'center',
          borderTop: '1px solid var(--border)',
        }}
      >
        <Link
          href="/products"
          className="theme-btn"
          style={{
            padding: '14px 28px',
            display: 'inline-block',
            textDecoration: 'none',
            fontSize: '14px',
          }}
        >
          ← Back to All Products
        </Link>
      </section>
    </main>
  );
}
