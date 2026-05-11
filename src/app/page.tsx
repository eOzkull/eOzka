'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import SentientOrb from '@/components/SentientOrb';
import { useAudio } from '@/contexts/AudioContext';
interface TeamMember {
  name: string;
  role: string;
  category: 'core' | 'directorate' | 'leads' | 'sde';
  badge?: string;
  desc: string;
  github?: string;
  linkedin?: string;
}

const teamMembers: TeamMember[] = [
  {
    name: 'Harsh Dev Jha',
    role: 'Founder & Chairperson',
    category: 'core',
    badge: 'Founder',
    desc: 'Founded eOzka to close the gap between student builders and real-world impact. Leads governance, vision, and the institutional standards that hold the structure together.',
    github: 'https://github.com/inkesk-dozing',
    linkedin: 'https://linkedin.com/in/harsh-dev-jha-primus',
  },
  {
    name: 'Mrinal Prakash',
    role: 'Co-Founder, Vice Chair & MD',
    category: 'core',
    badge: 'Co-Founder',
    desc: "Defines eOzka's multi-sector roadmap and long-term positioning. Focused on stakeholder alignment and turning conviction into a structured expansion plan.",
    github: 'https://github.com/mrinalprakashfsd',
    linkedin: 'https://www.linkedin.com/in/mrinal-prakash-fullstackdeveloper/',
  },
  {
    name: 'Krishyangi Dixit',
    role: 'Group CEO',
    category: 'core',
    badge: 'CEO',
    desc: 'Drives day-to-day operations and strategic execution across eOzka. Ensures every subsidiary moves with purpose, clarity, and institutional discipline.',
    github: 'https://github.com/krishyangi-bit',
    linkedin: 'https://www.linkedin.com/in/krishyangi-dixit-9527ba388/',
  },
  {
    name: 'Aman Chapadiya',
    role: 'COO',
    category: 'directorate',
    badge: 'COO',
    desc: 'Keeps the machinery running smoothly. Synchronizes teams, timelines, and operations across the holding structure with precision and efficiency.',
    github: 'https://github.com/obscure-01',
    linkedin: 'https://www.linkedin.com/in/amanchapadiya/',
  },
  {
    name: 'Pratham Sharma',
    role: 'CTO',
    category: 'directorate',
    badge: 'CTO',
    desc: 'Spearheads product engineering across the eOzka ecosystem. Architecting systems that are reliable, scalable, and built with long-term accountability.',
    github: 'https://github.com/Prarock83',
    linkedin: 'https://www.linkedin.com/in/pratham-sharma-574844332/',
  },
  {
    name: 'Aditya Bhatia',
    role: 'CGO',
    category: 'directorate',
    badge: 'CGO',
    desc: "Building eOzka's presence and reach from the ground up. Focused on distribution, brand storytelling, and sustainable growth across all subsidiary verticals.",
    github: 'https://github.com/AdiT0015',
    linkedin: 'https://www.linkedin.com/in/aditya-bhatia-244849252/',
  },
];

function renderTeamCard(member: TeamMember, index: number) {
  // Generate a beautiful, initials-based avatar indicator automatically
  const initials = member.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();

  return (
    <div className="team-card" key={member.name}>
      <div className="team-card-top">
        <div className="team-avatar">
          {initials}
        </div>
        <div className="team-card-meta">
          <div className="team-name">{member.name}</div>
          <div className="team-title">{member.role}</div>
        </div>
        {member.badge && (
          <span className={`team-badge ${member.badge.toLowerCase() === 'founder' ? 'badge-founder' : ''}`}>
            {member.badge}
          </span>
        )}
      </div>
      <div className="team-desc">
        {member.desc}
      </div>
      {(member.github || member.linkedin) && (
        <div className="team-socials">
          {member.github && (
            <a
              href={member.github}
              target="_blank"
              rel="noopener noreferrer"
              className="team-social-link"
            >
              <svg viewBox="0 0 16 16">
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
              </svg>
              GitHub
            </a>
          )}
          {member.linkedin && (
            <a
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="team-social-link"
            >
              <svg viewBox="0 0 16 16">
                <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z" />
              </svg>
              LinkedIn
            </a>
          )}
        </div>
      )}
    </div>
  );
}

export default function Home() {
  const [headlineText, setHeadlineText] = useState('become Impact.');
  const { playHoverWhoosh, stopHoverWhoosh } = useAudio();

  // Contact Form States
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [formErrorMessage, setFormErrorMessage] = useState('');

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    setFormErrorMessage('');
    playHoverWhoosh(); // Mechanical tape start-stop sound for message sending/transmission feedback

    const startTime = Date.now();

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      // Enforce physical minimum delay to match the cassette sound's mechanical playback duration (2.8 seconds)
      const elapsedTime = Date.now() - startTime;
      const minDuration = 2800;
      if (elapsedTime < minDuration) {
        await new Promise((resolve) => setTimeout(resolve, minDuration - elapsedTime));
      }

      stopHoverWhoosh(); // Stop physical tape whirr as transmission completes

      if (res.ok && data.success) {
        setFormStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setFormStatus('error');
        setFormErrorMessage(data.error || 'Failed to send message. Please try again.');
      }
    } catch (err: any) {
      console.error('Submission failure:', err);

      // Enforce physical minimum delay even in case of failure
      const elapsedTime = Date.now() - startTime;
      const minDuration = 2800;
      if (elapsedTime < minDuration) {
        await new Promise((resolve) => setTimeout(resolve, minDuration - elapsedTime));
      }

      stopHoverWhoosh(); // Stop physical tape whirr as transmission terminates in error

      setFormStatus('error');
      setFormErrorMessage('Network error. Please check your internet connection and try again.');
    }
  };


  useEffect(() => {
    if (typeof window === 'undefined') return;

    // ── HEADLINE TYPEWRITER LOOP ──
    const phrases = ['become Impact.', 'take Shape.', 'drive Change.', 'shape Future.'];
    let phraseIndex = 0;
    let charIndex = phrases[0].length;
    let isDeleting = true;
    let typeTimeout: NodeJS.Timeout;

    const typeLoop = () => {
      const current = phrases[phraseIndex];
      if (isDeleting) {
        setHeadlineText(current.substring(0, charIndex - 1));
        charIndex--;
      } else {
        setHeadlineText(current.substring(0, charIndex + 1));
        charIndex++;
      }

      let speed = isDeleting ? 40 : 80;
      if (!isDeleting && charIndex === current.length) {
        speed = 2000;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        speed = 500;
      }
      typeTimeout = setTimeout(typeLoop, speed);
    };

    const startTimeout = setTimeout(typeLoop, 2500);

    // ── REVEAL ON SCROLL IntersectionObserver ──
    const reveals = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const delay = entry.target.getAttribute('data-delay') || '0';
            setTimeout(() => {
              entry.target.classList.add('visible');
            }, +delay + 80);
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );

    reveals.forEach((el, i) => {
      el.setAttribute('data-delay', String((i % 4) * 80));
      revealObserver.observe(el);
    });

    // ── COUNTER ANIMATION (Cubical easing count-up stats) ──
    const counters = document.querySelectorAll('.stat-num[data-target]');
    const counterObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            const targetAttr = el.getAttribute('data-target') || '0';
            if (targetAttr === '∞') {
              el.textContent = '∞';
              counterObs.unobserve(el);
              return;
            }
            const target = +targetAttr;
            const duration = 1200;
            const startTime = performance.now();
            function updateCounter(now: number) {
              const elapsed = now - startTime;
              const progress = Math.min(elapsed / duration, 1);
              const ease = 1 - Math.pow(1 - progress, 3);
              el.textContent = String(Math.round(ease * target));
              if (progress < 1) requestAnimationFrame(updateCounter);
            }
            requestAnimationFrame(updateCounter);
            counterObs.unobserve(el);
          }
        });
      },
      { threshold: 0.5 }
    );
    counters.forEach((c) => counterObs.observe(c));

    // ── MAGNETIC BUTTONS HOVER TRANSITIONS ──
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');
    const handleBtnMove = (e: MouseEvent, btn: HTMLElement) => {
      const rect = btn.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) * 0.25;
      const dy = (e.clientY - cy) * 0.25;
      btn.style.transform = `translate(${dx}px, ${dy}px)`;
    };
    const handleBtnLeave = (btn: HTMLElement) => {
      btn.style.transform = '';
    };

    const cleanups: (() => void)[] = [];
    buttons.forEach((b) => {
      const btn = b as HTMLElement;
      const moveHandler = (e: MouseEvent) => handleBtnMove(e, btn);
      const leaveHandler = () => handleBtnLeave(btn);
      btn.addEventListener('mousemove', moveHandler);
      btn.addEventListener('mouseleave', leaveHandler);
      cleanups.push(() => {
        btn.removeEventListener('mousemove', moveHandler);
        btn.removeEventListener('mouseleave', leaveHandler);
      });
    });

    // ── TEAM TIMELINE CASCADE UNVEIL ──
    const teamRows = document.querySelectorAll('.team-row');
    const tlObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            teamRows.forEach((el, i) => {
              setTimeout(() => el.classList.add('tl-visible'), i * 90);
            });
            tlObs.disconnect();
          }
        });
      },
      { threshold: 0.05 }
    );
    if (teamRows.length) tlObs.observe(teamRows[0]);

    // ── TEAM CARD MOBILE TOUCH OVERRIDES ──
    const teamCards = document.querySelectorAll('.team-card');
    const handleCardClick = (card: HTMLElement) => {
      if (window.innerWidth < 900) {
        const isActive = card.classList.contains('active');
        teamCards.forEach((c) => c.classList.remove('active'));
        if (!isActive) card.classList.add('active');
      }
    };
    teamCards.forEach((c) => {
      const card = c as HTMLElement;
      const clickHandler = () => handleCardClick(card);
      card.addEventListener('click', clickHandler);
      cleanups.push(() => card.removeEventListener('click', clickHandler));
    });

    // ── SCROLLING NAVIGATION HINTS ──
    const scrollHints = document.querySelectorAll('.scroll-hint');
    const handleScrollHintClick = (hint: HTMLElement) => {
      const nextId = hint.getAttribute('data-next');
      if (nextId) {
        const target = document.querySelector(nextId);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };
    scrollHints.forEach((h) => {
      const hint = h as HTMLElement;
      const clickHandler = () => handleScrollHintClick(hint);
      hint.addEventListener('click', clickHandler);
      cleanups.push(() => hint.removeEventListener('click', clickHandler));
    });

    // ── PERSISTENT SIDEBAR SECTION SCROLL INDICATOR ──
    const sectionIndicator = document.getElementById('section-indicator');
    const navBars = document.querySelectorAll('.indicator-bar');
    const sectionElements = document.querySelectorAll('section');
    let scrollTimeout: NodeJS.Timeout;

    const handleWindowScroll = () => {
      if (sectionIndicator) {
        sectionIndicator.classList.add('active');
      }
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        if (sectionIndicator) {
          sectionIndicator.classList.remove('active');
        }
      }, 1200);
    };
    window.addEventListener('scroll', handleWindowScroll, { passive: true });

    const spyObs = new IntersectionObserver(
      (entries) => {
        const intersecting = entries.filter((entry) => entry.isIntersecting);
        if (!intersecting.length) return;

        intersecting.sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        const dominantEntry = intersecting[0];
        const id = dominantEntry.target.getAttribute('id');

        navBars.forEach((bar) => {
          const b = bar as HTMLElement;
          b.classList.toggle('current', b.dataset.target === id);
        });
      },
      {
        threshold: [0.1, 0.15, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
        rootMargin: '-15% 0px -20% 0px',
      }
    );
    sectionElements.forEach((sec) => {
      if (sec.id) spyObs.observe(sec);
    });

    // ── MOBILE ACTIVE AUTOSCROLLER ──
    let autoscrollInitialized = false;

    const destroyMobileAutoscroll = () => {
      const targets = [
        '.products-track',
        '.ventures-track',
        '.team-core-track',
        '.team-directorate-track'
      ];
      targets.forEach((selector) => {
        const container = document.querySelector(selector) as HTMLElement | null;
        if (container) {
          container.querySelectorAll('.marquee-clone').forEach((clone) => clone.remove());
        }
      });
      autoscrollInitialized = false;
    };

    const initMobileAutoscroll = () => {
      if (typeof window === 'undefined') return;

      // Clean up and return early if resized to desktop widths
      if (window.innerWidth > 900) {
        if (autoscrollInitialized) destroyMobileAutoscroll();
        return;
      }

      if (autoscrollInitialized) return;
      autoscrollInitialized = true;

      const targets = [
        '.products-track',
        '.ventures-track',
        '.team-core-track',
        '.team-directorate-track'
      ];

      targets.forEach((selector) => {
        const container = document.querySelector(selector) as HTMLElement | null;
        if (!container) return;

        // Clean up any marquee clones from previous hot-reloads to avoid duplication
        container.querySelectorAll('.marquee-clone').forEach((clone) => clone.remove());

        // Clone children once for infinite wrapping
        const children = Array.from(container.children);
        if (children.length === 0) return;

        children.forEach((item) => {
          const clone = item.cloneNode(true) as HTMLElement;
          clone.classList.add('marquee-clone');
          container.appendChild(clone);
        });
      });
    };

    // Attach resize listeners to handle dynamic toggles in DevTools or device rotations
    const handleAutoscrollResize = () => {
      initMobileAutoscroll();
    };
    window.addEventListener('resize', handleAutoscrollResize, { passive: true });
    cleanups.push(() => {
      window.removeEventListener('resize', handleAutoscrollResize);
      destroyMobileAutoscroll();
    });

    // Initialize after a tiny delay so the DOM is fully layout-calculated
    const autoscrollStartTimeout = setTimeout(initMobileAutoscroll, 800);
    cleanups.push(() => clearTimeout(autoscrollStartTimeout));

    return () => {
      clearTimeout(startTimeout);
      clearTimeout(typeTimeout);
      clearTimeout(scrollTimeout);
      revealObserver.disconnect();
      counterObs.disconnect();
      tlObs.disconnect();
      spyObs.disconnect();
      window.removeEventListener('scroll', handleWindowScroll);
      cleanups.forEach((c) => c());
    };
  }, []);

  const handleScrollToId = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main style={{ position: 'relative', zIndex: 2 }}>
      {/* ── HERO SECTION ── */}
      <section className="hero" id="hero">
        <div className="hero-visual" id="hero-visual-container">
          <SentientOrb />
        </div>
        <div className="hero-content" style={{ position: 'relative', zIndex: 2 }}>
          <p className="hero-eyebrow">eOzka — Parent Holding Company</p>
          <h1 className="hero-headline">
            Where ideas
            <br />
            <em
              className="typewriter-cursor-loop"
              style={{ color: 'var(--accent)', textTransform: 'uppercase' }}
            >
              {headlineText}
            </em>
          </h1>
          <p className="hero-sub">
            We believe great ideas need room to breathe. Our goal is to{' '}
            <strong>
              support a family of independent companies across tech, health, and farming
            </strong>
            , giving them the resources to grow on their own terms while{' '}
            <strong>staying true to a shared set of values.</strong>
          </p>
          <div className="hero-ctas">
            <a
              href="#products"
              className="btn-primary"
              onClick={(e) => handleScrollToId(e, 'products')}
            >
              <span>See Our Products</span>
            </a>
            <a
              href="#story"
              className="btn-secondary"
              onClick={(e) => handleScrollToId(e, 'story')}
            >
              Our Story
            </a>
          </div>
        </div>

        <div className="scroll-hint" data-next="#story">
          <div className="scroll-arrow-wrap">
            <svg
              className="scroll-arrow"
              width="36"
              height="36"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7 13L12 18L17 13"
                stroke="var(--accent)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M7 6L12 11L17 6"
                stroke="var(--accent)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.4"
              />
            </svg>
          </div>
        </div>
      </section>



      {/* ── STORY SECTION ── */}
      <section id="story">
        <div className="section-label">01 — Story</div>
        <h2 className="section-headline reveal">
          A gap we couldn't ignore.
          <br />
          <em>Born from conviction. Built with intent.</em>
        </h2>
        <div className="story-grid">
          <div className="story-body reveal">
            <p>
              A group of college students noticed that capable builders rarely get the environment
              to build things that matter. eOzka was founded to close that gap, starting with
              technology, expanding into more fields.
            </p>
            <p>We are a structured holding company, not a club.</p>
            <p>
              The name eOzka is a phonetic evolution of OSKA, a term coined by the Founder to
              encapsulate the spirit of the organisation. Every product shipped, every governance
              standard upheld, every person brought in during this phase contributes to the
              institutional credibility that makes the broader structure possible.
            </p>
          </div>
          <div className="stats-strip reveal">
            <div className="stat-cell">
              <span className="stat-num" data-target="5">
                0
              </span>
              <span className="stat-label">
                Live products
                <span className="stat-sub">Open-source, Apache 2.0</span>
              </span>
            </div>
            <div className="stat-cell">
              <span className="stat-num" data-target="12">
                0
              </span>
              <span className="stat-label">
                Founding team
                <span className="stat-sub">Structured governance</span>
              </span>
            </div>
            <div className="stat-cell">
              <span className="stat-num" data-target="4">
                0
              </span>
              <span className="stat-label">
                Target sectors
                <span className="stat-sub">Edu, Tech, Health, Agri</span>
              </span>
            </div>
            <div className="stat-cell">
              <span className="stat-num" data-target="∞">
                0
              </span>
              <span className="stat-label">
                Conviction
                <span className="stat-sub">Beyond college limits</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── ABOUT SECTION ── */}
      <section id="about">
        <div className="section-label">02 — About</div>
        <h2 className="section-headline reveal">
          We build technology that solves
          <br />
          real problems for real people.
        </h2>
        <div className="about-grid">
          <div className="about-block reveal">
            <h3>The Mission</h3>
            <p>
              Our mission is to build entities that solve real-world problems across a range of
              industries. We began with technology and have since expanded into{' '}
              <strong>Education</strong>, and furthermore we will expand into{' '}
              <strong>healthcare and agricultural technology</strong>.
              <br />
              eOzka at the parent level holds equity, sets enterprise-wide standards, and provides
              the structural backing that enables subsidiaries to operate with both autonomy and
              accountability.
            </p>
          </div>
          <div className="about-block reveal">
            <h3>The Philosophy</h3>
            <p>
              We believe the best builders are underestimated early. We are proving that conviction
              one product at a time — with the governance, structure, and discipline of a company
              built to last beyond college. Technology is the first chapter that will be integrated
              in upcoming chapters as well. Healthcare and agri-tech are the next two domains where
              we've identified both meaningful need and a realistic pathway to execution.
            </p>
          </div>
        </div>
      </section>

      {/* ── PRODUCTS SECTION ── */}
      <section id="products">
        <div className="section-label">03 — Products</div>
        <h2 className="section-headline reveal">
          Five products. Live.
          <br />
          <em>In active use.</em>
        </h2>
        <p className="products-intro reveal">
          Products are open-source under Apache 2.0 and available on GitHub. Built and maintained by
          the eOzka engineering team.
        </p>
        <div className="products-grid reveal">
          <div className="products-track">
          <div className="product-card">
            <div className="product-card-top">
              <span className="product-num">01</span>
              <span className="product-tag tag-live">Live</span>
            </div>
            <div className="product-name">Alris-Security</div>
            <p className="product-desc">
              AIris Security is a cutting-edge vulnerability scanner designed to safeguard web
              applications. It leverages advanced AI and machine learning algorithms to detect and
              classify security flaws with unparalleled accuracy. From SQL injection to XSS attacks,
              AIris provides comprehensive protection for your digital assets.
            </p>
            <div className="product-links">
              <a
                href="https://github.com/Kush05Bhardwaj/AIris-Security_AI-Powered-Vulnerability-Scanner"
                target="_blank"
                rel="noopener noreferrer"
                className="product-link"
              >
                View on GitHub →
              </a>
              <a
                href="https://airis-security1.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="product-link-dim"
              >
                Visit Deployment
              </a>
            </div>
          </div>

          <div className="product-card">
            <div className="product-card-top">
              <span className="product-num">02</span>
              <span className="product-tag tag-live">Live</span>
            </div>
            <div className="product-name">Paradigm-Shift</div>
            <p className="product-desc">
              ParadigmShift is a production-grade HRMS (Human Resource Management System) designed
              for modern organizations that need a unified, real-time platform to manage people,
              performance, and processes.
            </p>
            <div className="product-links">
              <a
                href="https://github.com/MRINALPRAKASHFSD/MINI_PROJECT_PARADIGM_SHIFT"
                target="_blank"
                rel="noopener noreferrer"
                className="product-link"
              >
                View on GitHub →
              </a>
              <a
                href="https://mini-project-paradigm-shift-5y6i.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="product-link-dim"
              >
                Visit Deployment
              </a>
            </div>
          </div>

          <div className="product-card">
            <div className="product-card-top">
              <span className="product-num">03</span>
              <span className="product-tag tag-live">Live</span>
            </div>
            <div className="product-name">Stress-Calculator</div>
            <p className="product-desc">
              A Flutter app that assesses stress risk using biometric data — heart rate and blood
              pressure. Built for real users. Processes physiological inputs to generate meaningful,
              actionable stress assessments.
            </p>
            <div className="product-links">
              <a
                href="https://github.com/eOzkull/stress-calculator"
                target="_blank"
                rel="noopener noreferrer"
                className="product-link"
              >
                View on GitHub →
              </a>
              <a
                href="https://github.com/eOzkull/Stress-Calculator/releases"
                target="_blank"
                rel="noopener noreferrer"
                className="product-link-dim"
              >
                Download App
              </a>
            </div>
          </div>

          <div className="product-card">
            <div className="product-card-top">
              <span className="product-num">04</span>
              <span className="product-tag tag-live">Live</span>
            </div>
            <div className="product-name">Entab-D</div>
            <p className="product-desc">
              A Chrome extension that auto-organises browser tabs by domain and title. Solves tab
              chaos for anyone working with 20+ tabs open. One-click install. Zero configuration
              needed.
            </p>
            <div className="product-links">
              <a
                href="https://github.com/eOzkull/entab-D"
                target="_blank"
                rel="noopener noreferrer"
                className="product-link"
              >
                View on GitHub →
              </a>
              <a
                href="https://github.com/eOzkull"
                target="_blank"
                rel="noopener noreferrer"
                className="product-link-dim"
              >
                Install Extension
              </a>
            </div>
          </div>

          <div className="product-card">
            <div className="product-card-top">
              <span className="product-num">05</span>
              <span className="product-tag tag-live">Live</span>
            </div>
            <div className="product-name">MindSpace</div>
            <p className="product-desc">
              MindSpace is an AI-powered mental health companion app designed to support users in
              managing stress, anxiety, and daily emotional well-being. Through guided meditation,
              mood tracking, and AI-driven insights, MindSpace provides personalized tools to foster
              mental clarity and resilience.
            </p>
            <div className="product-links">
              <a
                href="https://github.com/eOzkull/MindSpace"
                target="_blank"
                rel="noopener noreferrer"
                className="product-link"
              >
                View on GitHub →
              </a>
            </div>
          </div>

          <div className="product-card">
            <div className="product-card-top">
              <span className="product-num">06</span>
              <span className="product-tag tag-research">In Research</span>
            </div>
            <div className="product-name">Management System</div>
            <p className="product-desc">Under Development...</p>
            <div className="product-links">
              <span className="product-link-dim">Coming Soon →</span>
            </div>
          </div>
          </div>
        </div>
      </section>

      {/* ── TEAM SECTION ── */}
      <section id="team">
        <div className="section-label">04 — Leadership</div>
        <h2 className="section-headline reveal">
          The Board of
          <br />
          <em>Directors.</em>
        </h2>
        <p className="team-intro reveal">
          Our governing board and operational directorate leading eOzka's strategic vision. For our full engineering and creative design force, view our dedicated <Link href="/members" style={{ color: 'var(--accent)', textDecoration: 'underline' }}>Members directory</Link> under the More menu.
        </p>

        <div className="team-grid-wrap" id="team-grid">
          {/* Governing Board */}
          <div className="team-category-group reveal">
            <div className="team-category-header">
              <span className="team-category-title">Governing Board</span>
              <div className="team-category-line"></div>
            </div>
            <div className="team-cards-grid core">
              <div className="team-core-track">
                {teamMembers
                  .filter((m) => m.category === 'core')
                  .map((member, index) => renderTeamCard(member, index))}
              </div>
            </div>
          </div>

          {/* Operational & Technical Directorate */}
          <div className="team-category-group reveal">
            <div className="team-category-header">
              <span className="team-category-title">Operational & Technical Directorate</span>
              <div className="team-category-line"></div>
            </div>
            <div className="team-cards-grid directorate">
              <div className="team-directorate-track">
                {teamMembers
                  .filter((m) => m.category === 'directorate')
                  .map((member, index) => renderTeamCard(member, index))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTACT SECTION ── */}
      <section id="contact">
        <div className="contact-inner">
          {/* LEFT: FORM */}
          <div className="reveal">
            {formStatus === 'success' ? (
              <div
                style={{
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid var(--accent-dim)',
                  padding: '40px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '24px',
                  position: 'relative',
                  overflow: 'hidden',
                  animation: 'fadeIn 0.5s ease'
                }}
              >
                {/* Glowing neon checkmark node */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '50%',
                      border: '1px solid var(--accent)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: 'rgba(212, 201, 168, 0.08)',
                      boxShadow: '0 0 16px var(--accent-glow)',
                    }}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      style={{ width: '20px', height: '20px', fill: 'none', stroke: 'var(--accent)', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' }}
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <div>
                    <h3
                      style={{
                        fontFamily: "'DM Serif Display', serif",
                        fontSize: '22px',
                        fontWeight: '400',
                        color: 'var(--white)',
                        lineHeight: '1.2'
                      }}
                    >
                      Message Sent.
                    </h3>
                    <p style={{ fontFamily: "'DM Mono', monospace", fontSize: '10px', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: '4px' }}>
                      Thank you for reaching out
                    </p>
                  </div>
                </div>

                <p style={{ fontSize: '14px', color: 'var(--white-dim)', lineHeight: '1.7' }}>
                  We have received your message. Our team will review your inquiry and get back to you as soon as possible.
                </p>

                <button
                  type="button"
                  onClick={() => setFormStatus('idle')}
                  className="btn-submit"
                  style={{ marginTop: '12px' }}
                >
                  Send Another Message —&gt;
                </button>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleContactSubmit}>
                <div className="form-group">
                  <label>Name</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    disabled={formStatus === 'submitting'}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    className="form-input"
                    placeholder="email@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    disabled={formStatus === 'submitting'}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Message</label>
                  <textarea
                    className="form-input"
                    placeholder="Tell us about your project..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    disabled={formStatus === 'submitting'}
                    required
                  ></textarea>
                </div>

                {formStatus === 'error' && (
                  <div
                    style={{
                      padding: '12px 16px',
                      background: 'rgba(239, 68, 68, 0.05)',
                      border: '1px solid rgba(239, 68, 68, 0.25)',
                      color: '#fca5a5',
                      fontSize: '13px',
                      fontFamily: "'DM Mono', monospace",
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '4px',
                      marginBottom: '10px'
                    }}
                  >
                    <div style={{ fontWeight: 'bold', textTransform: 'uppercase', fontSize: '10px', color: '#f87171', letterSpacing: '0.05em' }}>
                      ⚠️ Transmission Error
                    </div>
                    <div>{formErrorMessage}</div>
                  </div>
                )}

                <button
                  type="submit"
                  className="btn-submit"
                  disabled={formStatus === 'submitting'}
                  style={{
                    opacity: formStatus === 'submitting' ? 0.7 : 1,
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                  }}
                >
                  {formStatus === 'submitting' ? (
                    <>
                      <svg
                        className="animate-spin"
                        viewBox="0 0 24 24"
                        style={{
                          width: '14px',
                          height: '14px',
                          stroke: 'currentColor',
                          fill: 'none',
                          strokeWidth: '3',
                          strokeLinecap: 'round'
                        }}
                      >
                        <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.15)"></circle>
                        <path d="M4 12a8 8 0 018-8V4" fill="none" stroke="currentColor"></path>
                      </svg>
                      Sending Message...
                    </>
                  ) : (
                    'Send Message —>'
                  )}
                </button>
              </form>
            )}
          </div>


          {/* RIGHT: INFO */}
          <div className="reveal">
            <div className="section-label">05 — Contact</div>
            <h2 className="contact-headline">
              Want to collaborate,
              <br />
              invest, or join us?
            </h2>
            <p className="contact-sub">
              We're open to partnerships, sponsorships, and new talent. If you believe in what we're
              building, reach out directly.
            </p>
            <a href="mailto:eozka.hq@gmail.com" className="contact-email">
              eozka.hq@gmail.com
            </a>
          </div>
        </div>
      </section>

      {/* ── VENTURES SECTION ── */}
      <section id="ventures">
        <div className="section-label">06 — Ventures</div>
        <h2 className="section-headline reveal">
          Our <em>ventures.</em>
        </h2>
        <div className="ventures-grid">
          <div className="ventures-track">
          <Link
            href="/ventures/moce"
            className="venture-card reveal"
          >
            <span className="venture-num">Subsidiary I</span>
            <span className="venture-name">MOCE</span>
            <p className="venture-desc">
              The technology arm of eOzka. Home to Stress-Calculator, entab-D, and the engineering
              team building what comes next. Focused on software that extends human capability.
            </p>
            <span className="venture-cta">Explore MOCE</span>
          </Link>
          <div className="venture-card coming-soon reveal">
            <span className="venture-num">Subsidiary II</span>
            <span className="venture-name">MOCK</span>
            <p className="venture-desc">
              The research and experimentation arm. Currently laying groundwork for eOzka's
              expansion into healthcare and agri-tech. Operational framework in development.
            </p>
            <span className="venture-cta">Coming Soon</span>
          </div>
          </div>
        </div>
      </section>

      {/* ── PERSISTENT SIDE NAVIGATION BAR (SCROLLSPY) ── */}
      <div id="section-indicator" className="section-indicator">
        <div className="indicator-bar" data-target="hero"></div>
        <div className="indicator-bar" data-target="story"></div>
        <div className="indicator-bar" data-target="about"></div>
        <div className="indicator-bar" data-target="products"></div>
        <div className="indicator-bar" data-target="team"></div>
        <div className="indicator-bar" data-target="contact"></div>
        <div className="indicator-bar" data-target="ventures"></div>
      </div>
    </main>
  );
}
