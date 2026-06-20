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
  customImage?: string; // Optional custom image URL
}

const SHOW_GITHUB_AVATARS = false; // Set to true to show GitHub avatars by default if customImage is missing

const membersList: TeamMember[] = [
  {
    name: 'Mahin',
    role: 'Designing Lead',
    category: 'leads',
    badge: 'Design',
    desc: 'Owns the visual and product design language. Translates conceptual ideas into high-fidelity, stunning, and functional UI/UX paradigms.',
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
];

function renderTeamCard(member: TeamMember) {
  const initials = member.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();

  const githubUsername = member.github ? member.github.split('/').filter(Boolean).pop() : null;
  const githubAvatarUrl =
    githubUsername && githubUsername !== 'github.com'
      ? `https://github.com/${githubUsername}.png`
      : null;

  // Prioritize customImage, fallback to githubAvatarUrl if flag is active, otherwise null
  const displayAvatarUrl = member.customImage || (SHOW_GITHUB_AVATARS ? githubAvatarUrl : null);
  const schemaImageUrl = member.customImage || githubAvatarUrl || '';

  return (
    <div className="team-card" key={member.name} itemScope itemType="https://schema.org/Person">
      {schemaImageUrl && <meta itemProp="image" content={schemaImageUrl} />}
      <div className="team-card-top">
        <div className="team-avatar" style={{ overflow: 'hidden' }}>
          {displayAvatarUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={displayAvatarUrl}
              alt={`${member.name} Avatar`}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          ) : (
            initials
          )}
        </div>
        <div className="team-card-meta">
          <div className="team-name" itemProp="name">
            {member.name}
          </div>
          <div className="team-title" itemProp="jobTitle">
            {member.role}
          </div>
        </div>
        {member.badge && <span className="team-badge">{member.badge}</span>}
      </div>
      <div className="team-desc" itemProp="description">
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
              itemProp="sameAs"
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
              itemProp="sameAs"
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
    const cleanups: (() => void)[] = [];

    const destroyMobileAutoscroll = () => {
      const targets = ['.team-leads-track', '.team-sde-track'];
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

      if (window.innerWidth > 900) {
        if (autoscrollInitialized) destroyMobileAutoscroll();
        return;
      }

      if (autoscrollInitialized) return;
      autoscrollInitialized = true;

      const targets = ['.team-leads-track', '.team-sde-track'];

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
      });
    };

    const setupAutoscroll = () => {
      const scrollContainers = [
        { selector: '.team-cards-grid.leads' },
        { selector: '.team-cards-grid.sde' },
      ];

      const speed = 0.8;
      const activeScrollers: {
        container: HTMLElement;
        paused: boolean;
        scrollPos: number;
        resumeTimeout?: NodeJS.Timeout;
      }[] = [];

      scrollContainers.forEach(({ selector }) => {
        const container = document.querySelector(selector) as HTMLElement | null;
        if (!container) return;

        const scrollerState = {
          container,
          paused: false,
          scrollPos: container.scrollLeft,
          resumeTimeout: undefined as NodeJS.Timeout | undefined,
        };

        const handleStart = () => {
          scrollerState.paused = true;
          if (scrollerState.resumeTimeout) clearTimeout(scrollerState.resumeTimeout);
        };

        const handleEnd = () => {
          if (scrollerState.resumeTimeout) clearTimeout(scrollerState.resumeTimeout);
          scrollerState.resumeTimeout = setTimeout(() => {
            scrollerState.scrollPos = container.scrollLeft;
            scrollerState.paused = false;
          }, 2000);
        };

        container.addEventListener('touchstart', handleStart, { passive: true });
        container.addEventListener('touchend', handleEnd, { passive: true });
        container.addEventListener('touchcancel', handleEnd, { passive: true });
        container.addEventListener('mousedown', handleStart, { passive: true });
        container.addEventListener('mouseup', handleEnd, { passive: true });
        container.addEventListener('mouseleave', handleEnd, { passive: true });

        cleanups.push(() => {
          container.removeEventListener('touchstart', handleStart);
          container.removeEventListener('touchend', handleEnd);
          container.removeEventListener('touchcancel', handleEnd);
          container.removeEventListener('mousedown', handleStart);
          container.removeEventListener('mouseup', handleEnd);
          container.removeEventListener('mouseleave', handleEnd);
          if (scrollerState.resumeTimeout) clearTimeout(scrollerState.resumeTimeout);
        });

        activeScrollers.push(scrollerState);
      });

      let animationFrameId: number;
      const scrollLoop = () => {
        if (window.innerWidth <= 900) {
          activeScrollers.forEach((scroller) => {
            const { container, paused } = scroller;
            if (paused) return;

            const currentScroll = container.scrollLeft;
            if (Math.abs(currentScroll - Math.round(scroller.scrollPos)) > 2) {
              scroller.scrollPos = currentScroll;
            }

            scroller.scrollPos += speed;

            const maxScroll = container.scrollWidth / 2;
            if (scroller.scrollPos >= maxScroll) {
              scroller.scrollPos -= maxScroll;
            }

            container.scrollLeft = Math.round(scroller.scrollPos);
          });
        }
        animationFrameId = requestAnimationFrame(scrollLoop);
      };

      animationFrameId = requestAnimationFrame(scrollLoop);
      cleanups.push(() => cancelAnimationFrame(animationFrameId));
    };

    const handleAutoscrollResize = () => {
      initMobileAutoscroll();
    };
    window.addEventListener('resize', handleAutoscrollResize, { passive: true });

    const startTimeout = setTimeout(() => {
      initMobileAutoscroll();
      setupAutoscroll();
    }, 800);

    return () => {
      window.removeEventListener('resize', handleAutoscrollResize);
      clearTimeout(startTimeout);
      destroyMobileAutoscroll();
      cleanups.forEach((c) => c());
    };
  }, []);

  return (
    <main
      className="subpage-wrapper"
      style={{ minHeight: '100vh', background: 'var(--black)', color: 'var(--white)' }}
    >
      {/* Hero Header */}
      <section
        className="members-hero"
        style={{ padding: '160px 24px 40px 24px', maxWidth: '1200px', margin: '0 auto' }}
      >
        <div className="section-label">More — Members</div>
        <h1
          className="section-headline"
          style={{ marginTop: '16px', fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', lineHeight: '1.1' }}
        >
          Creative & Engineering
          <br />
          <em style={{ fontStyle: 'italic', fontFamily: 'var(--serif)' }}>Force of eOzka.</em>
        </h1>
        <p
          className="team-intro"
          style={{
            marginTop: '24px',
            maxWidth: '700px',
            fontSize: '1.1rem',
            color: 'var(--sub-text)',
            lineHeight: '1.6',
          }}
        >
          The designers and software developers who turn our executive vision into live production
          code, high-fidelity interfaces, and robust systems.
        </p>
      </section>

      {/* Grid Container */}
      <section
        className="members-grids-section"
        style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 24px 100px 24px' }}
      >
        <div className="team-grid-wrap" id="team-grid" style={{ marginTop: '0' }}>
          {/* Creative & Execution Leads */}
          <div className="team-category-group" style={{ marginTop: '32px' }}>
            <div className="team-category-header" style={{ gap: '32px' }}>
              <span
                className="team-category-title"
                style={{ letterSpacing: '0.2em', paddingRight: '12px' }}
              >
                Design Lead
              </span>
              <div className="team-category-line"></div>
            </div>
            <div className="team-cards-grid leads">
              <div className="team-leads-track">
                {membersList
                  .filter((m) => m.category === 'leads')
                  .map((member) => renderTeamCard(member))}
              </div>
            </div>
          </div>

          {/* Software Development Pool */}
          <div className="team-category-group" style={{ marginTop: '80px' }}>
            <div className="team-category-header" style={{ gap: '32px' }}>
              <span
                className="team-category-title"
                style={{ letterSpacing: '0.2em', paddingRight: '12px' }}
              >
                Software Development Pool
              </span>
              <div className="team-category-line"></div>
            </div>
            <div className="team-cards-grid sde">
              <div className="team-sde-track">
                {membersList
                  .filter((m) => m.category === 'sde')
                  .map((member) => renderTeamCard(member))}
              </div>
            </div>
          </div>
        </div>

        {/* Back Link */}
        <div style={{ marginTop: '80px', textAlign: 'center' }}>
          <Link
            href="/"
            className="theme-btn"
            style={{ padding: '16px 32px', display: 'inline-block', textDecoration: 'none' }}
          >
            ← Back to Main Studio
          </Link>
        </div>
      </section>
    </main>
  );
}
