'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useAudio } from '@/contexts/AudioContext';

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
        name: 'Stress-Calculator',
        desc: 'A Flutter app that assesses stress risk using biometric data — heart rate and blood pressure. Built for real users. Processes physiological inputs to generate meaningful, actionable stress assessments.',
        links: [
            { text: 'View on GitHub →', url: 'https://github.com/eOzkull/stress-calculator', type: 'primary' },
            { text: 'Download App', url: 'https://github.com/eOzkull/Stress-Calculator/releases', type: 'dim' }
        ]
    },
    {
        num: '04',
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
        num: '05',
        tag: 'Live',
        tagClass: 'tag-live',
        name: 'MindSpace',
        desc: 'MindSpace is an AI-powered mental health companion app designed to support users in managing stress, anxiety, and daily emotional well-being. Through guided meditation, mood tracking, and AI-driven insights, MindSpace provides personalized tools to foster mental clarity and resilience.',
        links: [
            { text: 'View on GitHub →', url: 'https://github.com/eOzkull/MindSpace', type: 'primary' }
        ]
    },
    {
        num: '06',
        tag: 'Live',
        tagClass: 'tag-live',
        name: 'Management-Systems',
        desc: 'Enterprise-grade custom administration platforms designed to unify organizational workflows, human resource operations, secure data pipelines, and real-time internal metrics tailored specifically for modern, decentralized holdings.',
        links: [
            { text: 'Request Integration →', url: 'https://github.com/eOzkull', type: 'primary' }
        ]
    }
];

export default function Products3DCarousel() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const { playHoverWhoosh } = useAudio();
    const carouselRef = useRef<HTMLDivElement>(null);

    const nextSlide = useCallback(() => {
        setCurrentIndex((prev) => (prev + 1) % products.length);
        playHoverWhoosh?.();
    }, [playHoverWhoosh]);

    const prevSlide = useCallback(() => {
        setCurrentIndex((prev) => (prev === 0 ? products.length - 1 : prev - 1));
        playHoverWhoosh?.();
    }, [playHoverWhoosh]);

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

    return (
        <div
            className="carousel-container reveal"
            ref={carouselRef}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="carousel-wrapper">
                {products.map((product, index) => {
                    const offset = getOffset(index);
                    const isCenter = offset === 0;
                    const absOffset = Math.abs(offset);

                    const translateX = offset * 220;
                    const translateZ = isCenter ? 120 : -absOffset * 180;
                    const rotateY = isCenter ? 0 : (offset > 0 ? -35 : 35);
                    const scale = isCenter ? 1.05 : 1 - absOffset * 0.08;
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
    );
}
