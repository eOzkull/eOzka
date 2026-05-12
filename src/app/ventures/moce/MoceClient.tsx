'use client';

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { useAudio } from '@/contexts/AudioContext';
import '@/app/moce.css';

export default function MoceClient() {
  const { isMuted, toggleMute } = useAudio();
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const cosmosCanvasRef = useRef<HTMLCanvasElement>(null);
  const scrollProgressRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);

  // Sync with global theme settings
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const htmlEl = document.documentElement;
    const saved = localStorage.getItem('eOzka_theme');
    if (saved === 'light') {
      setTheme('light');
    } else {
      setTheme('dark');
    }

    // Observer to keep theme synchronized if it changes elsewhere
    const observer = new MutationObserver(() => {
      const isLight = htmlEl.getAttribute('data-theme') === 'light';
      setTheme(isLight ? 'light' : 'dark');
    });

    observer.observe(htmlEl, { attributes: true, attributeFilter: ['data-theme'] });
    return () => observer.disconnect();
  }, []);

  // Set body class for layout isolation
  useEffect(() => {
    if (typeof window === 'undefined') return;
    document.body.classList.add('moce-active');
    return () => {
      document.body.classList.remove('moce-active');
    };
  }, []);

  const toggleMoceTheme = () => {
    const htmlEl = document.documentElement;
    if (theme === 'light') {
      htmlEl.removeAttribute('data-theme');
      localStorage.setItem('eOzka_theme', 'dark');
      setTheme('dark');
    } else {
      htmlEl.setAttribute('data-theme', 'light');
      localStorage.setItem('eOzka_theme', 'light');
      setTheme('light');
    }
  };

  // Particle Cosmos, Kinetic Cursors, Reveal Observers, and Magnetics
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // ── INTERACTIVE CURSOR KINETICS ──
    const cursor = cursorRef.current;
    const cursorRing = cursorRingRef.current;
    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;
    let isHovering = false;

    const handleMouseMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (cursor) {
        cursor.style.opacity = '1';
      }
      if (cursorRing) {
        cursorRing.style.opacity = isHovering ? '0.9' : '0.6';
      }

      // Track mouse position on project cards for radial glow spotlight
      document.querySelectorAll('.project-card').forEach((el) => {
        const card = el as HTMLElement;
        const rect = card.getBoundingClientRect();
        card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
        card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
      });
    };

    const handleMouseLeaveWindow = () => {
      if (cursor) cursor.style.opacity = '0';
      if (cursorRing) cursorRing.style.opacity = '0';
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeaveWindow);

    const interactives = document.querySelectorAll('a, button, .project-card, [role="button"], input, textarea, select, .clickable');
    interactives.forEach((el) => {
      el.addEventListener('mouseenter', () => {
        isHovering = true;
      });
      el.addEventListener('mouseleave', () => {
        isHovering = false;
      });
    });

    let animationFrameId: number;
    const animateCursor = () => {
      rx += (mx - rx) * 0.15;
      ry += (my - ry) * 0.15;

      const ringScale = isHovering ? 2.4 : 1;
      const ringOpacity = isHovering ? 0.9 : 0.6;
      const dotScale = isHovering ? 1.5 : 1;

      if (cursor) {
        cursor.style.transform = `translate3d(${mx}px, ${my}px, 0) translate3d(-50%, -50%, 0) scale(${dotScale})`;
      }
      if (cursorRing) {
        cursorRing.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate3d(-50%, -50%, 0) scale(${ringScale})`;
        cursorRing.style.opacity = String(ringOpacity);
        cursorRing.style.borderColor = isHovering ? 'var(--brand)' : 'var(--text)';
      }

      animationFrameId = requestAnimationFrame(animateCursor);
    };
    animateCursor();

    // ── MAGNETIC BUTTON EFFECTS ──
    const handleMagneticMove = (e: MouseEvent) => {
      document.querySelectorAll('.nav-cta, .project-card, .theme-toggle-btn').forEach((el) => {
        const btn = el as HTMLElement;
        const rect = btn.getBoundingClientRect();
        const btnX = rect.left + rect.width / 2;
        const btnY = rect.top + rect.height / 2;
        const dist = Math.hypot(e.clientX - btnX, e.clientY - btnY);

        if (dist < 80) {
          const x = (e.clientX - btnX) * 0.2;
          const y = (e.clientY - btnY) * 0.2;
          btn.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        } else {
          btn.style.transform = `translate3d(0, 0, 0)`;
        }
      });
    };
    document.addEventListener('mousemove', handleMagneticMove);

    // ── INTERSECTION OBSERVER FOR REVEALS & TYPEWRITERS ──
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

    const typeObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const target = entry.target as HTMLElement;
          if (entry.isIntersecting && !target.dataset.typed) {
            const text = target.innerText;
            if (!text) return;
            target.innerText = '';
            target.dataset.typed = 'true';
            let i = 0;
            const type = () => {
              if (i < text.length) {
                target.innerText += text.charAt(i);
                i++;
                setTimeout(type, 60);
              }
            };
            type();
          }
        });
      },
      { threshold: 1 }
    );
    document.querySelectorAll('.section-label').forEach((el) => typeObserver.observe(el));

    // ── SCROLL PROGRESS METRIC ──
    const handleScroll = () => {
      const progress = scrollProgressRef.current;
      if (!progress) return;
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      progress.style.width = scrolled + '%';
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // ── COSMOS CANVAS FLOAT ANIMATION ──
    const canvas = cosmosCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let W = (canvas.width = window.innerWidth);
    let H = (canvas.height = window.innerHeight);

    const colors = [
      '168, 85, 247', // Neon Purple
      '234, 179, 8',  // Royal Gold
      '236, 72, 153', // Vibrant Pink
    ];

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      r: number;
      o: number;
      c: string;
    }

    let particles: Particle[] = [];
    const initParticles = () => {
      const count = Math.min(Math.floor((W * H) / 12000), 80);
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r: Math.random() * 1.5 + 0.5,
        o: Math.random() * 0.4 + 0.1,
        c: colors[Math.floor(Math.random() * colors.length)],
      }));
    };

    const handleResize = () => {
      if (!canvas) return;
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
      initParticles();
    };

    window.addEventListener('resize', handleResize);
    initParticles();

    let canvasFrameId: number;
    const drawFrame = () => {
      ctx.clearRect(0, 0, W, H);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = W;
        if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H;
        if (p.y > H) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.c}, ${p.o})`;
        ctx.fill();
      }
      canvasFrameId = requestAnimationFrame(drawFrame);
    };
    drawFrame();

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeaveWindow);
      document.removeEventListener('mousemove', handleMagneticMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      cancelAnimationFrame(canvasFrameId);
      revealObserver.disconnect();
      typeObserver.disconnect();
    };
  }, []);

  return (
    <div className="moce-container">
      {/* Scroll indicator bar */}
      <div id="scroll-progress" ref={scrollProgressRef}></div>

      {/* Scoped kinetic cursor */}
      <div id="moce-cursor" ref={cursorRef}></div>
      <div id="moce-cursor-ring" ref={cursorRingRef}></div>

      {/* Scoped cosmos particle field */}
      <canvas id="cosmos" ref={cosmosCanvasRef}></canvas>

      <nav>
        <Link
          href="/"
          className="theme-btn"
          title="Return to Home"
          style={{ margin: 0, padding: '8px' }}
        >
          <svg
            className="theme-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
          </svg>
        </Link>
        <a href="#" className="nav-logo">
          <div className="nav-wordmark">
            MOCE
            <span>Technical Subsidiary</span>
          </div>
        </a>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <ul className="nav-links">
            <li>
              <a href="#projects">Projects</a>
            </li>
            <li>
              <a href="#wiki">Wiki</a>
            </li>
          </ul>

          <button
            id="sound-toggle"
            className={`theme-btn ${isMuted ? 'muted' : 'active'}`}
            onClick={toggleMute}
            title={isMuted ? 'Unmute Ambience' : 'Mute Ambience'}
          >
            <svg
              className="theme-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {isMuted ? (
                <>
                  <path d="M11 5L6 9H2v6h4l5 4V5z"></path>
                  <line x1="22" y1="9" x2="16" y2="15"></line>
                  <line x1="16" y1="9" x2="22" y2="15"></line>
                </>
              ) : (
                <>
                  <path d="M11 5L6 9H2v6h4l5 4V5z"></path>
                  <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
                  <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                </>
              )}
            </svg>
          </button>

          <button
            id="theme-toggle"
            className="theme-btn"
            onClick={toggleMoceTheme}
            aria-label="Toggle Theme"
          >
            <svg
              id="theme-icon-sun"
              className="theme-icon sun"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
            </svg>
            <svg
              id="theme-icon-moon"
              className="theme-icon moon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
          </button>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section id="hero">
        <h1 className="hero-title reveal">The Technical Domain.</h1>
        <p className="hero-sub reveal">
          Shipping logic, building augmentation systems, and exploring the boundaries of sentient
          engineering.
        </p>
      </section>

      {/* PROJECTS SECTION */}
      <section id="projects">
        <div className="section-inner">
          <div className="section-label reveal">Projects</div>
          <div className="projects-grid">
            <a href="#" className="project-card reveal">
              <div className="project-name">Nexus AI</div>
              <p className="project-desc">
                A distributed intelligence layer designed for real-time sentient grounding and
                recursive context management.
              </p>
              <div className="project-link">Source →</div>
            </a>
            <a href="#" className="project-card reveal">
              <div className="project-name">Kendra</div>
              <p className="project-desc">
                Logic optimization engine for biosphere monitoring and autonomous resource
                allocation protocols.
              </p>
              <div className="project-link">Source →</div>
            </a>
            <a href="#" className="project-card reveal">
              <div className="project-name">entab-D</div>
              <p className="project-desc">
                Hyper-personal ledger systems built on sovereign encryption for cognitive data
                retention.
              </p>
              <div className="project-link">Source →</div>
            </a>
            <a href="#" className="project-card reveal">
              <div className="project-name">Stress-Calc</div>
              <p className="project-desc">
                Neural feedback analysis engine providing real-time physiological insights for
                system alignment.
              </p>
              <div className="project-link">Source →</div>
            </a>
          </div>
        </div>
      </section>

      {/* WIKI SECTION */}
      <section id="wiki">
        <div className="section-inner">
          <div className="section-label reveal">Internal Wiki</div>
          <p className="hero-sub reveal" style={{ textAlign: 'left', marginBottom: '40px' }}>
            Documentation, engineering patterns, and the MOCE technical handbook.
          </p>
          <div className="projects-grid">
            <a href="#" className="project-card reveal" style={{ padding: '32px' }}>
              <div className="project-name" style={{ fontSize: '18px' }}>
                Engineering Standards
              </div>
              <div className="project-link">Read Doc</div>
            </a>
            <a href="#" className="project-card reveal" style={{ padding: '32px' }}>
              <div className="project-name" style={{ fontSize: '18px' }}>
                Ecosystem Architecture
              </div>
              <div className="project-link">Read Doc</div>
            </a>
          </div>
        </div>
      </section>


    </div>
  );
}
