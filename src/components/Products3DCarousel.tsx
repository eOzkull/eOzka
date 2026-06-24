'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useAudio } from '@/contexts/AudioContext';


const MobileClickToPlayVideo = ({ src, productName }: { src: string; productName: string }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);

    const handlePlay = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (!videoRef.current) return;
        if (isPlaying) {
            videoRef.current.pause();
            setIsPlaying(false);
        } else {
            videoRef.current.play().catch(err => console.log("Play failed:", err));
            setIsPlaying(true);
        }
    };

    return (
        <div 
            style={{ 
                position: 'relative', 
                width: '100%', 
                background: 'var(--black)', 
                borderRadius: '12px', 
                border: '1px solid var(--border)', 
                overflow: 'hidden', 
                display: 'flex', 
                flexDirection: 'column', 
                minHeight: '220px',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)'
            }}
        >
            {/* Browser Header Bar */}
            <div 
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '8px', 
                background: 'var(--off-black)', 
                padding: '8px 12px', 
                borderBottom: '1px solid var(--border)',
                height: '32px',
              }}
            >
              <div style={{ display: 'flex', gap: '4px' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#ff5f56' }} />
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#ffbd2e' }} />
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#27c93f' }} />
              </div>
              <div 
                style={{ 
                  flex: 1, 
                  margin: '0 12px', 
                  background: 'var(--black)', 
                  border: '1px solid var(--border)', 
                  borderRadius: '4px', 
                  padding: '2px 8px', 
                  fontSize: '8px', 
                  color: 'var(--white-dim)', 
                  fontFamily: 'var(--font-mono)',
                  textAlign: 'center',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                }}
              >
                eozka.dev/{productName.toLowerCase().replace(' ', '-')}/demo-video
              </div>
            </div>

            {/* Video Container with dots grid and glow */}
            <div 
              onClick={handlePlay}
              style={{ 
                flex: 1, 
                position: 'relative', 
                overflow: 'hidden', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                padding: '16px',
                background: 'radial-gradient(circle at center, var(--accent-glow) 0%, transparent 85%), repeating-radial-gradient(circle, rgba(212, 201, 168, 0.05) 0px, rgba(212, 201, 168, 0.05) 1px, transparent 1px, transparent 15px)',
                backgroundSize: '15px 15px',
                cursor: 'pointer'
              }}
            >
                <video 
                    ref={videoRef}
                    src={src}
                    playsInline
                    style={{ 
                        width: '100%', 
                        maxHeight: '160px', 
                        objectFit: 'contain',
                        borderRadius: '4px',
                        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4), 0 0 0 1px var(--border)'
                    }}
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                />
                {!isPlaying && (
                    <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.4)', pointerEvents: 'none' }}>
                        <div style={{
                            width: '44px',
                            height: '44px',
                            borderRadius: '50%',
                            background: 'var(--accent)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 0 15px var(--accent-glow)'
                        }}>
                            <div style={{
                                width: 0,
                                height: 0,
                                borderTop: '5px solid transparent',
                                borderBottom: '5px solid transparent',
                                borderLeft: '9px solid var(--black)',
                                marginLeft: '3px'
                            }} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};


const MobileShowcasePanel = ({ productName }: { productName: string }) => {
    const [activeTab, setActiveTab] = useState<'video' | 'screenshots'>(() => {
        if (productName === 'Alris-Security') return 'video';
        return 'screenshots';
    });
    const [screenshotIndex, setScreenshotIndex] = useState(0);
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [lightboxUrl, setLightboxUrl] = useState('');
    const [lightboxCaption, setLightboxCaption] = useState('');
    const [isZoomed, setIsZoomed] = useState(false);

    useEffect(() => {
        setIsZoomed(false);
    }, [screenshotIndex, activeTab, lightboxOpen]);

    useEffect(() => {
        if (productName === 'Alris-Security') {
            setActiveTab('video');
        } else {
            setActiveTab('screenshots');
        }
        setScreenshotIndex(0);
    }, [productName]);

    const getMediaData = () => {
        switch (productName) {
            case 'Alris-Security':
                return {
                    video: '/assets/Products-Showcase/Alris-Security/Airis-V2-Demo.mp4',
                    images: []
                };
            case 'Paradigm-Shift':
                return {
                    images: [
                        '/assets/Products-Showcase/Paradigm/paradigm-screenshot-1.jpg',
                        '/assets/Products-Showcase/Paradigm/paradigm-screenshot-2.jpg',
                        '/assets/Products-Showcase/Paradigm/paradigm-screenshot-3.jpg'
                    ]
                };
            case 'Entab-D':
                return {
                    images: [
                        '/assets/Products-Showcase/Entab-D/entab-screenshot-1.jpg',
                        '/assets/Products-Showcase/Entab-D/entab-screenshot-2.jpg'
                    ]
                };
            case 'MindSpace':
                return {
                    images: [
                        '/assets/Products-Showcase/Mindspace/mindspace-screenshot-1.png',
                        '/assets/Products-Showcase/Mindspace/mindspace-screenshot-2.png',
                        '/assets/Products-Showcase/Mindspace/mindspace-screenshot-3.png',
                        '/assets/Products-Showcase/Mindspace/mindspace-screenshot-4.png',
                        '/assets/Products-Showcase/Mindspace/mindspace-screenshot-5.png',
                        '/assets/Products-Showcase/Mindspace/mindspace-screenshot-6.png',
                        '/assets/Products-Showcase/Mindspace/mindspace-screenshot-7.png',
                        '/assets/Products-Showcase/Mindspace/mindspace-ipad-1.png',
                        '/assets/Products-Showcase/Mindspace/mindspace-ipad-2.png'
                    ]
                };
            default:
                return { images: [] };
        }
    };

    const media = getMediaData();
    const hasVideo = !!media.video;
    const hasImages = media.images && media.images.length > 0;

    return (
        <div 
            style={{ 
                width: '100%', 
                maxWidth: '480px',
                margin: '24px auto 0 auto', 
                border: '1px solid var(--border)', 
                borderRadius: '16px', 
                background: 'var(--off-black)', 
                backdropFilter: 'blur(10px)',
                padding: '16px',
                boxSizing: 'border-box',
                textAlign: 'left'
            }}
        >
            <div style={{ display: 'flex', gap: '6px', borderBottom: '1px solid var(--border)', paddingBottom: '10px', marginBottom: '14px', overflowX: 'auto' }}>
                {hasVideo && (
                    <button 
                        onClick={() => setActiveTab('video')}
                        style={{
                            padding: '6px 12px',
                            borderRadius: '16px',
                            border: '1px solid',
                            borderColor: activeTab === 'video' ? 'var(--accent)' : 'transparent',
                            background: activeTab === 'video' ? 'var(--accent-glow)' : 'transparent',
                            color: activeTab === 'video' ? 'var(--white)' : 'var(--white-dimmer)',
                            fontSize: '10px',
                            fontFamily: 'var(--font-mono)',
                            cursor: 'pointer'
                        }}
                    >
                        Video Tour
                    </button>
                )}
                {hasImages && (
                    <button 
                        onClick={() => setActiveTab('screenshots')}
                        style={{
                            padding: '6px 12px',
                            borderRadius: '16px',
                            border: '1px solid',
                            borderColor: activeTab === 'screenshots' ? 'var(--accent)' : 'transparent',
                            background: activeTab === 'screenshots' ? 'var(--accent-glow)' : 'transparent',
                            color: activeTab === 'screenshots' ? 'var(--white)' : 'var(--white-dimmer)',
                            fontSize: '10px',
                            fontFamily: 'var(--font-mono)',
                            cursor: 'pointer'
                        }}
                    >
                        Screenshots
                    </button>
                )}
            </div>

            <div>
                {activeTab === 'video' && media.video && (
                    <MobileClickToPlayVideo src={media.video} productName={productName} />
                )}

                {activeTab === 'screenshots' && hasImages && (
                    <div 
                        style={{ 
                            position: 'relative', 
                            width: '100%', 
                            background: 'var(--black)', 
                            borderRadius: '12px', 
                            border: '1px solid var(--border)', 
                            overflow: 'hidden', 
                            display: 'flex', 
                            flexDirection: 'column', 
                            minHeight: '220px',
                        }}
                    >
                        {/* Browser Header Bar */}
                        <div 
                          style={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: '8px', 
                            background: 'var(--off-black)', 
                            padding: '8px 12px', 
                            borderBottom: '1px solid var(--border)',
                            height: '32px',
                          }}
                        >
                          <div style={{ display: 'flex', gap: '4px' }}>
                            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#ff5f56' }} />
                            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#ffbd2e' }} />
                            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#27c93f' }} />
                          </div>
                          <div 
                            style={{ 
                              flex: 1, 
                              margin: '0 12px', 
                              background: 'var(--black)', 
                              border: '1px solid var(--border)', 
                              borderRadius: '4px', 
                              padding: '2px 8px', 
                              fontSize: '8px', 
                              color: 'var(--white-dim)', 
                              fontFamily: 'var(--font-mono)',
                              textAlign: 'center',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap'
                            }}
                          >
                            eozka.com/products/{productName.toLowerCase() === 'alris-security' ? 'airis-security' : productName.toLowerCase()}
                          </div>
                        </div>

                        {/* Screenshot Container with dots grid and glow */}
                        <div 
                          style={{ 
                            flex: 1, 
                            position: 'relative', 
                            overflow: 'hidden', 
                            display: 'flex', 
                            flexDirection: 'column',
                            alignItems: 'center', 
                            justifyContent: 'center', 
                            padding: '16px',
                            background: 'radial-gradient(circle at center, var(--accent-glow) 0%, transparent 85%), repeating-radial-gradient(circle, rgba(212, 201, 168, 0.05) 0px, rgba(212, 201, 168, 0.05) 1px, transparent 1px, transparent 15px)',
                            backgroundSize: '15px 15px',
                          }}
                        >
                            <img 
                                src={media.images[screenshotIndex]} 
                                alt={`${productName} Screenshot`}
                                style={{ 
                                    width: '100%', 
                                    maxHeight: '260px', 
                                    objectFit: 'contain',
                                    borderRadius: '4px',
                                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4), 0 0 0 1px var(--border)',
                                    cursor: 'zoom-in'
                                }}
                                onClick={() => {
                                    setLightboxUrl(media.images[screenshotIndex]);
                                    setLightboxCaption(`${productName} - Screenshot ${screenshotIndex + 1}`);
                                    setLightboxOpen(true);
                                }}
                            />
                            {media.images.length > 1 && (
                                <div style={{ display: 'flex', gap: '16px', marginTop: '10px', zIndex: 5 }}>
                                    <button 
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setScreenshotIndex(prev => (prev - 1 + media.images.length) % media.images.length);
                                        }}
                                        style={{ 
                                            background: 'var(--off-black)', 
                                            border: '1px solid var(--border)', 
                                            color: 'var(--white)', 
                                            padding: '4px 10px', 
                                            borderRadius: '6px', 
                                            cursor: 'pointer', 
                                            fontSize: '9px',
                                            fontFamily: 'var(--font-mono)'
                                        }}
                                    >
                                        Prev
                                    </button>
                                    <span style={{ fontSize: '9px', fontFamily: 'var(--font-mono)', alignSelf: 'center', color: 'var(--white-dim)' }}>
                                        {screenshotIndex + 1} / {media.images.length}
                                    </span>
                                    <button 
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setScreenshotIndex(prev => (prev + 1) % media.images.length);
                                        }}
                                        style={{ 
                                            background: 'var(--off-black)', 
                                            border: '1px solid var(--border)', 
                                            color: 'var(--white)', 
                                            padding: '4px 10px', 
                                            borderRadius: '6px', 
                                            cursor: 'pointer', 
                                            fontSize: '9px',
                                            fontFamily: 'var(--font-mono)'
                                        }}
                                    >
                                        Next
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>

            {/* Full-Screen Lightbox Modal for Mobile View */}
            {lightboxOpen && (
                <div
                    style={{
                        position: 'fixed',
                        inset: 0,
                        background: 'rgba(5, 5, 5, 0.97)',
                        backdropFilter: 'blur(12px)',
                        zIndex: 99999,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '16px',
                    }}
                    onClick={() => { setLightboxOpen(false); setIsZoomed(false); }}
                >
                    {/* Close Button */}
                    <button
                        onClick={() => { setLightboxOpen(false); setIsZoomed(false); }}
                        style={{
                            position: 'absolute',
                            top: '16px',
                            right: '16px',
                            background: 'rgba(255, 255, 255, 0.05)',
                            border: '1px solid var(--border)',
                            color: 'var(--white)',
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            zIndex: 100000,
                            fontSize: '18px',
                        }}
                    >
                        ✕
                    </button>
                    
                    {/* Lightbox Image Container */}
                    <div
                        style={{
                            position: 'relative',
                            maxWidth: isZoomed ? '98vw' : '92vw',
                            maxHeight: isZoomed ? '92vh' : '80vh',
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
                            src={lightboxUrl}
                            alt={lightboxCaption}
                            style={{
                                maxWidth: isZoomed ? 'none' : '100%',
                                maxHeight: isZoomed ? 'none' : '100%',
                                objectFit: 'contain',
                                borderRadius: '6px',
                                boxShadow: '0 16px 40px rgba(0, 0, 0, 0.5)',
                                cursor: isZoomed ? 'zoom-out' : 'zoom-in',
                                transition: isZoomed ? 'none' : 'transform 0.3s ease',
                            }}
                            onClick={() => setIsZoomed(!isZoomed)}
                        />
                    </div>
                    
                    {/* Lightbox Caption */}
                    {lightboxCaption && (
                        <div
                            style={{
                                marginTop: '16px',
                                textAlign: 'center',
                                fontFamily: 'var(--font-mono)',
                                zIndex: 100000,
                            }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <p style={{ color: 'var(--white)', fontSize: '13px', margin: '0 0 4px 0', fontWeight: 'bold' }}>
                                {lightboxCaption}
                            </p>
                            <p style={{ color: 'var(--accent)', fontSize: '10px', margin: 0 }}>
                                Tap to zoom. Pinch/scroll to pan.
                            </p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

const products = [
    {
        num: '01',
        tag: 'Live',
        tagClass: 'tag-live',
        name: 'Alris-Security',
        desc: 'AIris Security is a cutting-edge vulnerability scanner designed to safeguard web applications. It leverages advanced AI and machine learning algorithms to detect and classify security flaws with unparalleled accuracy. From SQL injection to XSS attacks, AIris provides comprehensive protection for your digital assets.',
        links: [
            { text: 'View on GitHub →', url: 'https://github.com/Kush05Bhardwaj/AIris-Security_AI-Powered-Vulnerability-Scanner', type: 'primary' },
            { text: 'Visit Deployment', url: 'https://airis-security1.vercel.app/', type: 'dim' }
        ]
    },
    {
        num: '02',
        tag: 'Live',
        tagClass: 'tag-live',
        name: 'Paradigm-Shift',
        desc: 'ParadigmShift is a production-grade HRMS (Human Resource Management System) designed for modern organizations that need a unified, real-time platform to manage people, performance, and processes.',
        links: [
            { text: 'View on GitHub →', url: 'https://github.com/MRINALPRAKASHFSD/MINI_PROJECT_PARADIGM_SHIFT', type: 'primary' },
            { text: 'Visit Deployment', url: 'https://mini-project-paradigm-shift-5y6i.vercel.app/', type: 'dim' }
        ]
    },
    {
        num: '03',
        tag: 'Live',
        tagClass: 'tag-live',
        name: 'Entab-D',
        desc: 'A Chrome extension that auto-organises browser tabs by domain and title. Solves tab chaos for anyone working with 20+ tabs open. One-click install. Zero configuration needed.',
        links: [
            { text: 'View on GitHub →', url: 'https://github.com/eOzkull/entab-D', type: 'primary' },
            { text: 'Install Extension', url: 'https://github.com/eOzkull', type: 'dim' }
        ]
    },
    {
        num: '04',
        tag: 'Live',
        tagClass: 'tag-live',
        name: 'MindSpace',
        desc: 'MindSpace is an AI-powered mental health companion app designed to support users in managing stress, anxiety, and daily emotional well-being. Through guided meditation, mood tracking, and AI-driven insights, MindSpace provides personalized tools to foster mental clarity and resilience.',
        links: [
            { text: 'View on GitHub →', url: 'https://github.com/eOzkull/MindSpace', type: 'primary' }
        ]
    }
];

export default function Products3DCarousel() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const { playHoverWhoosh } = useAudio();
    const carouselRef = useRef<HTMLDivElement>(null);
    const [windowWidth, setWindowWidth] = useState(1200);

    // Touch Swipe references
    const touchStartX = useRef<number | null>(null);
    const touchEndX = useRef<number | null>(null);

    const nextSlide = useCallback(() => {
        setCurrentIndex((prev) => (prev + 1) % products.length);
        playHoverWhoosh?.();
    }, [playHoverWhoosh]);

    const prevSlide = useCallback(() => {
        setCurrentIndex((prev) => (prev === 0 ? products.length - 1 : prev - 1));
        playHoverWhoosh?.();
    }, [playHoverWhoosh]);

    useEffect(() => {
        if (typeof window === 'undefined') return;
        setWindowWidth(window.innerWidth);
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize, { passive: true });
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (isHovered) return;
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % products.length);
        }, 4500);
        return () => clearInterval(interval);
    }, [isHovered]);

    const getOffset = (index: number) => {
        let offset = index - currentIndex;
        const half = Math.floor(products.length / 2);
        if (offset > half) offset -= products.length;
        if (offset < -half) offset += products.length;
        return offset;
    };

    const getTranslateX = (offset: number) => {
        if (windowWidth < 480) {
            return offset * 120; // Tight spacing on narrow mobile
        } else if (windowWidth < 768) {
            return offset * 170; // Medium spacing on tablet/mobile
        }
        return offset * 220; // Default spacing on desktop
    };

    const getTranslateZ = (isCenter: boolean, absOffset: number) => {
        if (isCenter) return 120;
        if (windowWidth < 768) {
            return -absOffset * 120; // Bring side cards closer in Z-depth on mobile
        }
        return -absOffset * 180;
    };

    const getScale = (isCenter: boolean, absOffset: number) => {
        if (isCenter) return 1.05;
        if (windowWidth < 480) {
            return 1 - absOffset * 0.15; // Scale down side cards more on small viewports
        }
        return 1 - absOffset * 0.08;
    };

    // Touch handlers for mobile swipe functionality
    const handleTouchStart = (e: React.TouchEvent) => {
        touchStartX.current = e.targetTouches[0].clientX;
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        touchEndX.current = e.targetTouches[0].clientX;
    };

    const handleTouchEnd = () => {
        if (touchStartX.current === null || touchEndX.current === null) return;
        const diffX = touchStartX.current - touchEndX.current;
        const swipeThreshold = 50; // Minimum drag distance to trigger slide change
        
        if (diffX > swipeThreshold) {
            nextSlide();
        } else if (diffX < -swipeThreshold) {
            prevSlide();
        }
        
        // Reset values
        touchStartX.current = null;
        touchEndX.current = null;
    };

    return (
        <div className="mobile-carousel-section" style={{ width: '100%' }}>
            <div
                className="carousel-container reveal"
                ref={carouselRef}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
            >
                <div className="carousel-wrapper">
                    {products.map((product, index) => {
                        const offset = getOffset(index);
                        const isCenter = offset === 0;
                        const absOffset = Math.abs(offset);

                        const translateX = getTranslateX(offset);
                        const translateZ = getTranslateZ(isCenter, absOffset);
                        const rotateY = isCenter ? 0 : (offset > 0 ? -35 : 35);
                        const scale = getScale(isCenter, absOffset);
                        const opacity = isCenter ? 1 : Math.max(0, 1 - absOffset * 0.4);
                        const zIndex = 10 - absOffset;

                        return (
                            <div
                                key={product.num}
                                className={`carousel-slide ${isCenter ? 'active' : ''}`}
                                style={{
                                    transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                                    opacity,
                                    zIndex,
                                    cursor: isCenter ? 'default' : 'pointer'
                                }}
                                onClick={() => {
                                    if (!isCenter) {
                                        setCurrentIndex(index);
                                        playHoverWhoosh?.();
                                    }
                                }}
                            >
                                <div className="product-card carousel-card" style={{ pointerEvents: isCenter ? 'auto' : 'none' }}>
                                    <div className="product-card-top">
                                        <span className="product-num">{product.num}</span>
                                        <span className={`product-tag ${product.tagClass}`}>{product.tag}</span>
                                    </div>
                                    <div className="product-name">{product.name}</div>
                                    <p className="product-desc">{product.desc}</p>
                                    <div className="product-links">
                                        {product.links.map((link, idx) => (
                                            <a
                                                key={idx}
                                                href={link.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className={link.type === 'primary' ? 'product-link' : 'product-link-dim'}
                                            >
                                                {link.text}
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="carousel-controls">
                    <button className="carousel-btn" onClick={prevSlide} aria-label="Previous Product">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="15 18 9 12 15 6"></polyline>
                        </svg>
                    </button>
                    <div className="carousel-indicators">
                        {products.map((_, idx) => (
                            <button
                                key={idx}
                                className={`carousel-dot ${idx === currentIndex ? 'active' : ''}`}
                                onClick={() => {
                                    setCurrentIndex(idx);
                                    playHoverWhoosh?.();
                                }}
                                aria-label={`Go to product ${idx + 1}`}
                            />
                        ))}
                    </div>
                    <button className="carousel-btn" onClick={nextSlide} aria-label="Next Product">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="9 18 15 12 9 6"></polyline>
                        </svg>
                    </button>
                </div>
            </div>

            {/* Premium Mobile Media Preview & Showcase Panel is rendered OUTSIDE the carousel-container to prevent overlapping & height clipping */}
            <MobileShowcasePanel productName={products[currentIndex].name} />
        </div>
    );
}
