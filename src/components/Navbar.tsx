'use client';

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAudio } from '@/contexts/AudioContext';

export default function Navbar() {
  const pathname = usePathname();
  const { isMuted, toggleMute } = useAudio();
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [mobileActive, setMobileActive] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  const navMenuRef = useRef<HTMLUListElement>(null);
  const underlineRef = useRef<HTMLDivElement>(null);

  // Theme logic
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const saved = localStorage.getItem('eOzka_theme');
    const htmlEl = document.documentElement;
    if (saved === 'light') {
      htmlEl.setAttribute('data-theme', 'light');
      setTheme('light');
    } else {
      htmlEl.removeAttribute('data-theme');
      setTheme('dark');
    }
  }, []);

  const toggleTheme = () => {
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

  // Scroll listener (shrink nav & scrollspy)
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Update navbar active underline positioning
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const navMenu = navMenuRef.current;
    const underline = underlineRef.current;
    if (!navMenu || !underline) return;

    const activeLink = navMenu.querySelector(
      `a[href$="#${activeSection}"]`
    ) as HTMLAnchorElement | null;
    if (activeLink && pathname === '/') {
      underline.classList.add('active');
      underline.style.width = `${activeLink.offsetWidth}px`;
      underline.style.left = `${activeLink.offsetLeft}px`;
    } else {
      underline.classList.remove('active');
    }
  }, [activeSection, pathname]);

  // Scrollspy observer for headings
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (pathname !== '/') return;

    const sections = document.querySelectorAll('header, section');
    const observerOptions = {
      threshold: [0.1, 0.15, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
      rootMargin: '-15% 0px -20% 0px',
    };

    const observer = new IntersectionObserver((entries) => {
      const intersecting = entries.filter((e) => e.isIntersecting);
      if (!intersecting.length) return;

      intersecting.sort((a, b) => b.intersectionRatio - a.intersectionRatio);
      const dominant = intersecting[0];
      const id = dominant.target.getAttribute('id');
      if (id) {
        setActiveSection(id);
      }
    }, observerOptions);

    sections.forEach((s) => {
      if (s.id) observer.observe(s);
    });

    return () => {
      sections.forEach((s) => {
        if (s.id) observer.unobserve(s);
      });
    };
  }, [pathname]);

  const handleMobileClick = () => {
    setMobileActive(!mobileActive);
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    setMobileActive(false);
    if (pathname === '/') {
      e.preventDefault();
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleHomeClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    setMobileActive(false);
    if (pathname === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setActiveSection('hero');
    }
  };

  const navItem = (label: string, id: string) => {
    const isHomePage = pathname === '/';
    const href = isHomePage ? `#${id}` : `/#${id}`;
    const isActive = isHomePage && activeSection === id;

    return (
      <li>
        <Link
          href={href}
          className={isActive ? 'nav-active' : ''}
          onClick={(e) => isHomePage && handleLinkClick(e, id)}
        >
          {label}
        </Link>
      </li>
    );
  };

  return (
    <nav id="main-nav" className={`${scrolled ? 'scrolled' : ''} ${mobileActive ? 'active' : ''}`}>
      <Link href="/" className="nav-logo" onClick={handleHomeClick}>
        <div className="nav-logo-svgs">
          <img
            className="nav-svg-monogram"
            src="/assets/eOzka-essentials/eOzka_Logo_Package_V1/SVG/eozka-venture-studio-logo.svg"
            alt="eOzka Technology Holding Company Logo Monogram"
          />
        </div>
        <span className="nav-tagline">Augmenting-Sentient</span>
      </Link>

      <ul className={`nav-links ${mobileActive ? 'active' : ''}`} id="nav-menu" ref={navMenuRef}>
        {navItem('Story', 'story')}
        {navItem('About', 'about')}
        {navItem('Products', 'products')}
        {navItem('Team', 'team')}
        {navItem('Contact', 'contact')}
        {navItem('Ventures', 'ventures')}
        <li className="nav-dropdown">
          <span style={{ cursor: 'pointer' }} tabIndex={0}>
            More ▾
          </span>
          <ul className="dropdown-content">
            <li>
              <Link href="/members" onClick={() => setMobileActive(false)}>
                Members
              </Link>
            </li>
            <li>
              <Link href="/social" onClick={() => setMobileActive(false)}>
                Social
              </Link>
            </li>
            <li>
              <Link href="/blog" onClick={() => setMobileActive(false)}>
                Blog
              </Link>
            </li>
          </ul>
        </li>
        <div className="nav-underline" id="nav-underline" ref={underlineRef}></div>
      </ul>

      <div className="nav-actions">
        <Link
          href="/"
          id="home-link"
          className="theme-btn"
          title="Return to Home"
          onClick={handleHomeClick}
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
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
          </svg>
        </Link>
        <button
          id="sound-toggle"
          className={`theme-btn ${isMuted ? 'muted' : 'active'}`}
          onClick={toggleMute}
          title="Toggle Ambience"
        >
          <svg
            className="theme-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M11 5L6 9H2v6h4l5 4V5zM19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
          </svg>
        </button>
        <button
          id="theme-toggle"
          className="theme-btn"
          onClick={toggleTheme}
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
        <button
          id="mobile-menu-btn"
          className={`mobile-menu-btn ${mobileActive ? 'active' : ''}`}
          onClick={handleMobileClick}
          aria-label="Open Menu"
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>
      </div>
    </nav>
  );
}
