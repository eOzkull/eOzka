'use client';

import { useEffect } from 'react';
import Link from 'next/link';

interface TeamMember {
  name: string;
  role: string;
  category: 'leads' | 'sde';
  badge?: string;
  desc: string;
  github?: string;
  linkedin?: string;
}

const membersList: TeamMember[] = [
  {
    name: 'Rishita',
    role: 'Documentation Officer',
    category: 'leads',
    badge: 'Docs',
    desc: 'Maintains institutional memory across eOzka. Ensures every decision, process, and standard is documented with precision and long-term clarity.',
    github: 'https://github.com/RishitaVerma25',
    linkedin: 'https://www.linkedin.com/in/rishita-verma-7064b0305/',
  },
  {
    name: 'Mahin',
    role: 'Designing Lead',
    category: 'leads',
    badge: 'Design',
    desc: "Owns the visual and product design language. Translates conceptual ideas into high-fidelity, stunning, and functional UI/UX paradigms.",
    github: 'https://github.com/mahinmirzagit',
    linkedin: 'https://www.linkedin.com/in/mahin2006/',
  },
  {
    name: 'Kushagra Bharadwaj',
    role: 'Software Development Engineer',
    category: 'sde',
    badge: 'SDE',
    desc: "Builds with intent — crafting reliable, well-considered systems that underpin eOzka's live products and support future tech pipelines.",
    github: 'https://github.com/Kush05Bhardwaj',
    linkedin: 'https://www.linkedin.com/in/kush2012bhardwaj/',
  },
  {
    name: 'Ishaan Parashar',
    role: 'Software Development Engineer',
    category: 'sde',
    badge: 'SDE',
    desc: "Architects the hidden systems that power eOzka's diverse ventures, optimizing for robustness and the unseen standards of high-end software.",
    github: 'https://github.com/IshaanParashar2025',
    linkedin: 'https://www.linkedin.com/in/ishaan-parashar-0b7379326/',
  },
  {
    name: 'Saurabh Mudgal',
    role: 'Software Development Engineer',
    category: 'sde',
    badge: 'SDE',
    desc: "Engineers robust, production-ready software for eOzka's technology arm. Code-first, quality-obsessed, and focused on shipping functional products.",
    github: 'https://github.com/saurabh-mudgal-dev',
    linkedin: 'https://www.linkedin.com/in/saurabh-mudgal-443a3937b/',
  },
  {
    name: 'Manas Bhasker',
    role: 'Software Development Engineer',
    category: 'sde',
    badge: 'SDE',
    desc: 'Translates complex ideas into efficient code, ensuring every system within the eOzka ecosystem is built for speed, scalability, and long-term impact.',
    github: 'https://github.com/stillnwater',
    linkedin: 'https://www.linkedin.com/in/manas-bhasker/',
  },
  {
    name: 'Trijal Garg',
    role: 'Software Development Engineer',
    category: 'sde',
    badge: 'SDE',
    desc: 'Bridging the gap between conceptual architecture and live software, focusing on seamless integration and engineering excellence.',
    github: 'https://github.com/trijalgarg2006',
    linkedin: 'https://www.linkedin.com/in/trijal-garg/',
  },
];

function renderTeamCard(member: TeamMember) {
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
          <span className="team-badge">
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

export default function MembersPage() {
  useEffect(() => {
    // Scroll to top on load
    window.scrollTo(0, 0);

    // ── MOBILE ACTIVE AUTOSCROLLER ──
    let autoscrollInitialized = false;
    let activeScrollers: { destroy: () => void }[] = [];

    const destroyMobileAutoscroll = () => {
      activeScrollers.forEach((s) => s.destroy());
      activeScrollers = [];

      const targets = ['.team-cards-grid.leads', '.team-cards-grid.sde'];
      targets.forEach((selector) => {
        const container = document.querySelector(selector) as HTMLElement | null;
        if (container) {
          container.querySelectorAll('.marquee-clone').forEach((clone) => clone.remove());
          container.style.removeProperty('scroll-snap-type');
          container.style.removeProperty('overflow-x');
        }
      });

      autoscrollInitialized = false;
    };

    const initMobileAutoscroll = () => {
      if (typeof window === 'undefined') return;

      if (window.innerWidth > 900) {
        if (autoscrollInitialized) destroyMobileAutoscroll();
        return;
      }

      if (autoscrollInitialized) return;
      autoscrollInitialized = true;

      const targets = ['.team-cards-grid.leads', '.team-cards-grid.sde'];

      targets.forEach((selector) => {
        const container = document.querySelector(selector) as HTMLElement | null;
        if (!container) return;

        container.querySelectorAll('.marquee-clone').forEach((clone) => clone.remove());

        const children = Array.from(container.children);
        if (children.length === 0) return;

        children.forEach((item) => {
          const clone = item.cloneNode(true) as HTMLElement;
          clone.classList.add('marquee-clone');
          container.appendChild(clone);
        });

        let paused = false;
        let pauseTimeout: NodeJS.Timeout | null = null;
        let animationId: number;
        const speed = 1.35; // Increased speed for speedy continuous drift
        let scrollX = container.scrollLeft;
        const firstClone = container.querySelector('.marquee-clone') as HTMLElement | null;

        const tick = () => {
          if (!paused && window.innerWidth <= 900) {
            // Keep overflow-x active so scrollLeft is programmatically writable on all mobile browsers
            container.style.setProperty('overflow-x', 'auto', 'important');
            container.style.setProperty('scroll-snap-type', 'none', 'important');
            scrollX += speed;
            container.scrollLeft = scrollX;

            // Check if actual scrollLeft has reached the exact offset of the first cloned child (with sub-pixel tolerance)
            if (firstClone) {
              const wrapThreshold = firstClone.offsetLeft;
              if (container.scrollLeft >= wrapThreshold - 1.5) {
                scrollX = container.scrollLeft - wrapThreshold;
                container.scrollLeft = scrollX;
              }
            }
          } else if (paused) {
            // Synchronize the float accumulator with manual user swipes
            scrollX = container.scrollLeft;
          }
          animationId = requestAnimationFrame(tick);
        };

        const triggerPause = () => {
          paused = true;
          // Restore native scrollways and snap points instantly for perfectly fluid touch dragging
          container.style.setProperty('overflow-x', 'auto', 'important');
          container.style.setProperty('scroll-snap-type', 'x mandatory', 'important');
          if (pauseTimeout) clearTimeout(pauseTimeout);
        };

        const resumeWithDelay = () => {
          if (pauseTimeout) clearTimeout(pauseTimeout);
          pauseTimeout = setTimeout(() => {
            // Industry standard: briefly toggle overflow-x to hidden to kill active swipe momentum, then restore to auto immediately
            container.style.setProperty('overflow-x', 'hidden', 'important');
            void container.offsetHeight; // force rendering reflow
            container.style.setProperty('overflow-x', 'auto', 'important');

            scrollX = container.scrollLeft;
            paused = false;
          }, 3500);
        };

        container.addEventListener('touchstart', triggerPause, { passive: true });
        container.addEventListener('touchend', resumeWithDelay, { passive: true });
        container.addEventListener('mousedown', triggerPause);
        container.addEventListener('mouseup', resumeWithDelay);
        container.addEventListener('mouseleave', resumeWithDelay);

        tick();

        activeScrollers.push({
          destroy: () => {
            cancelAnimationFrame(animationId);
            if (pauseTimeout) clearTimeout(pauseTimeout);
            container.removeEventListener('touchstart', triggerPause);
            container.removeEventListener('touchend', resumeWithDelay);
            container.removeEventListener('mousedown', triggerPause);
            container.removeEventListener('mouseup', resumeWithDelay);
            container.removeEventListener('mouseleave', resumeWithDelay);
          }
        });
      });
    };

    const handleAutoscrollResize = () => {
      initMobileAutoscroll();
    };
    window.addEventListener('resize', handleAutoscrollResize, { passive: true });

    const startTimeout = setTimeout(initMobileAutoscroll, 800);

    return () => {
      window.removeEventListener('resize', handleAutoscrollResize);
      clearTimeout(startTimeout);
      destroyMobileAutoscroll();
    };
  }, []);

  return (
    <main className="subpage-wrapper" style={{ minHeight: '100vh', background: 'var(--black)', color: 'var(--white)' }}>
      {/* Hero Header */}
      <section className="members-hero" style={{ padding: '160px 24px 40px 24px', maxWidth: '1200px', margin: '0 auto' }}>
        <div className="section-label">More — Members</div>
        <h1 className="section-headline" style={{ marginTop: '16px', fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', lineHeight: '1.1' }}>
          Creative & Engineering<br />
          <em style={{ fontStyle: 'italic', fontFamily: 'var(--serif)' }}>Force of eOzka.</em>
        </h1>
        <p className="team-intro" style={{ marginTop: '24px', maxWidth: '700px', fontSize: '1.1rem', color: 'var(--sub-text)', lineHeight: '1.6' }}>
          The designers, software developers, and documentation leads who turn our executive vision into live production code, high-fidelity interfaces, and robust systems.
        </p>
      </section>

      {/* Grid Container */}
      <section className="members-grids-section" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px 100px 24px' }}>
        <div className="team-grid-wrap" id="team-grid" style={{ marginTop: '0' }}>
          {/* Creative & Execution Leads */}
          <div className="team-category-group">
            <div className="team-category-header">
              <span className="team-category-title">Creative & Execution Leads</span>
              <div className="team-category-line"></div>
            </div>
            <div className="team-cards-grid leads">
              {membersList
                .filter((m) => m.category === 'leads')
                .map((member) => renderTeamCard(member))}
            </div>
          </div>

          {/* Software Development Pool */}
          <div className="team-category-group" style={{ marginTop: '60px' }}>
            <div className="team-category-header">
              <span className="team-category-title">Software Development Pool</span>
              <div className="team-category-line"></div>
            </div>
            <div className="team-cards-grid sde">
              {membersList
                .filter((m) => m.category === 'sde')
                .map((member) => renderTeamCard(member))}
            </div>
          </div>
        </div>

        {/* Back Link */}
        <div style={{ marginTop: '80px', textAlign: 'center' }}>
          <Link href="/" className="theme-btn" style={{ padding: '16px 32px', display: 'inline-block', textDecoration: 'none' }}>
            ← Back to Main Studio
          </Link>
        </div>
      </section>
    </main>
  );
}
