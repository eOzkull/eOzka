/* ── THEME TOGGLE ── */
const themeToggle = document.getElementById("theme-toggle");
const htmlEl = document.documentElement;
const savedTheme = localStorage.getItem("eOzka_theme");

if (savedTheme === "light") {
  htmlEl.setAttribute("data-theme", "light");
}

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const isLight = htmlEl.getAttribute("data-theme") === "light";
    if (isLight) {
      htmlEl.removeAttribute("data-theme");
      localStorage.setItem("eOzka_theme", "dark");
    } else {
      htmlEl.setAttribute("data-theme", "light");
      localStorage.setItem("eOzka_theme", "light");
    }
  });
}

/* ── SENTIENT ORB SYSTEM V2 (ORBITAL) ── */
const sentientCanvas = document.getElementById("sentient-canvas");
if (sentientCanvas) {
  const sentientCtx = sentientCanvas.getContext("2d");
  let sw, sh;
  let orbits = [];
  const isMobile = window.innerWidth <= 900; // Alignment with CSS breakpoints

  class OrbitNode {
    constructor(orbitRadius, angle, speed, size, color) {
      this.orbitRadius = orbitRadius;
      this.angle = angle;
      this.speed = speed;
      this.size = size;
      this.color = color;
      this.baseOpacity = Math.random() * 0.4 + 0.3;
      this.noiseOffset = Math.random() * 1000;
    }

    update(mx, my) {
      this.angle += this.speed;

      // Calculate normal position
      this.x = sw / 2 + Math.cos(this.angle) * this.orbitRadius;
      this.y = sh / 2 + Math.sin(this.angle) * this.orbitRadius;

      // Mouse displacement (pull orbits toward mouse)
      const dx = mx - this.x;
      const dy = my - this.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 200) {
        const t = (200 - dist) / 200;
        this.x += dx * 0.12 * t;
        this.y += dy * 0.12 * t;
      }
    }

    draw() {
      sentientCtx.beginPath();
      sentientCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      sentientCtx.fillStyle = this.color.replace("1)", `${this.baseOpacity})`);
      sentientCtx.fill();

      // Node glow for professional refinement
      sentientCtx.shadowBlur = 12;
      sentientCtx.shadowColor = this.color;
      sentientCtx.fill();
      sentientCtx.shadowBlur = 0;
    }
  }

  function initSystem() {
    sw = sentientCanvas.width = sentientCanvas.offsetWidth;
    sh = sentientCanvas.height = sentientCanvas.offsetHeight;
    orbits = [];

    // Different complexity for Laptop vs Mobile
    const orbitCount = isMobile ? 3 : 7;
    const colors = [
      "rgba(212, 201, 168, 1)", // eOzka Accent Gold
      "rgba(161, 161, 170, 1)", // Zinc 400
      "rgba(255, 255, 255, 1)", // White (High contrast)
      "rgba(113, 113, 122, 1)"  // Zinc 500
    ];

    for (let i = 0; i < orbitCount; i++) {
      const radius = (i + 1) * (isMobile ? 45 : 65);
      const nodeCount = isMobile ? 1 : Math.floor(Math.random() * 4) + 2;
      const speedBase = (Math.random() * 0.004 + 0.001) * (i % 2 === 0 ? 1 : -1);

      for (let j = 0; j < nodeCount; j++) {
        const angle = (Math.PI * 2 / nodeCount) * j;
        const color = colors[Math.floor(Math.random() * colors.length)];
        orbits.push(new OrbitNode(radius, angle, speedBase, Math.random() * 3 + 2, color));
      }
    }
  }

  window.addEventListener("resize", initSystem);
  initSystem();

  let smX = sw / 2, smY = sh / 2;
  document.addEventListener("mousemove", (e) => {
    smX = e.clientX - sentientCanvas.getBoundingClientRect().left;
    smY = e.clientY - sentientCanvas.getBoundingClientRect().top;
  });

  function animateSystem() {
    sentientCtx.clearRect(0, 0, sw, sh);

    // Draw central core (sentient heart)
    const isLight = document.documentElement.getAttribute("data-theme") === "light";
    const coreColor = isLight ? "rgba(139, 125, 87, 0.5)" : "rgba(212, 201, 168, 0.5)";

    sentientCtx.beginPath();
    sentientCtx.arc(sw / 2, sh / 2, isMobile ? 8 : 12, 0, Math.PI * 2);
    sentientCtx.fillStyle = coreColor;
    sentientCtx.shadowBlur = 25;
    sentientCtx.shadowColor = coreColor;
    sentientCtx.fill();
    sentientCtx.shadowBlur = 0;

    // Draw orbits (faint lines for high-end feel)
    if (!isMobile) {
      sentientCtx.strokeStyle = isLight ? "rgba(0,0,0,0.06)" : "rgba(255,255,255,0.06)";
      sentientCtx.lineWidth = 0.8;
      for (let i = 1; i <= 7; i++) {
        sentientCtx.beginPath();
        sentientCtx.arc(sw / 2, sh / 2, i * 65, 0, Math.PI * 2);
        sentientCtx.stroke();
      }
    }

    orbits.forEach(node => {
      node.update(smX, smY);
      node.draw();
    });

    requestAnimationFrame(animateSystem);
  }
  animateSystem();
}

/* ── MOBILE MENU ── */
const mobileMenuBtn = document.getElementById("mobile-menu-btn");
const navMenu = document.getElementById("nav-menu");

if (mobileMenuBtn && navMenu) {
  mobileMenuBtn.addEventListener("click", () => {
    mobileMenuBtn.classList.toggle("active");
    navMenu.classList.toggle("active");
  });

  navMenu.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      mobileMenuBtn.classList.remove("active");
      navMenu.classList.remove("active");
    });
  });
}

/* ── CUSTOM CURSOR ── */
const dot = document.getElementById("cursor-dot");
const ring = document.getElementById("cursor-ring");
let mx = 0, my = 0, rx = 0, ry = 0;
let cursorInitialized = false;

document.addEventListener("mousemove", (e) => {
  if (!cursorInitialized) {
    if (dot) dot.classList.add("active");
    if (ring) ring.classList.add("active");
    cursorInitialized = true;
  }
  mx = e.clientX;
  my = e.clientY;
  if (dot) {
    dot.style.left = mx + "px";
    dot.style.top = my + "px";
  }
});

function animateRing() {
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  if (ring) {
    ring.style.left = rx + "px";
    ring.style.top = ry + "px";
  }
  requestAnimationFrame(animateRing);
}
animateRing();

/* ── SCROLL PROGRESS & NAV ── */
const progress = document.getElementById("scroll-progress");
window.addEventListener(
  "scroll",
  () => {
    const scrolled = window.scrollY;
    const total = document.documentElement.scrollHeight - window.innerHeight;
    if (progress) progress.style.width = (scrolled / total) * 100 + "%";

    const nav = document.getElementById("main-nav");
    if (nav) nav.classList.toggle("scrolled", scrolled > 60);
  },
  { passive: true },
);

/* ── REVEAL ON SCROLL ── */
const reveals = document.querySelectorAll(".reveal");
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const delay = entry.target.dataset.delay || 0;
        setTimeout(() => {
          entry.target.classList.add("visible");
        }, +delay + 80);
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.08, rootMargin: "0px 0px -40px 0px" },
);

reveals.forEach((el, i) => {
  el.dataset.delay = (i % 4) * 80;
  revealObserver.observe(el);
});

/* ── COUNTER ANIMATION ── */
const counters = document.querySelectorAll(".stat-num[data-target]");
const counterObs = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = +el.dataset.target;
        const duration = 1200;
        const startTime = performance.now();
        function updateCounter(now) {
          const elapsed = now - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const ease = 1 - Math.pow(1 - progress, 3);
          el.textContent = Math.round(ease * target);
          if (progress < 1) requestAnimationFrame(updateCounter);
        }
        requestAnimationFrame(updateCounter);
        counterObs.unobserve(el);
      }
    });
  },
  { threshold: 0.5 },
);
counters.forEach((c) => counterObs.observe(c));

/* ── SMOOTH ANCHOR SCROLL ── */
document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener("click", (e) => {
    e.preventDefault();
    const target = document.querySelector(a.getAttribute("href"));
    if (target) target.scrollIntoView({ behavior: "smooth" });
  });
});

/* ── BACKGROUND PARTICLE CANVAS ── */
const particleCanvas = document.getElementById("particle-canvas");
if (particleCanvas) {
  const pCtx = particleCanvas.getContext("2d");
  let pW, pH, pParticles = [];

  function resizeParticles() {
    pW = particleCanvas.width = window.innerWidth;
    pH = particleCanvas.height = window.innerHeight;
  }
  resizeParticles();
  window.addEventListener("resize", resizeParticles);

  class pParticle {
    constructor() {
      this.x = Math.random() * pW;
      this.y = Math.random() * pH;
      this.r = Math.random() * 1.2 + 0.3;
      this.vx = (Math.random() - 0.5) * 0.18;
      this.vy = (Math.random() - 0.5) * 0.18;
      this.alpha = Math.random() * 0.5 + 0.1;
      this.color = Math.random() > 0.7 ? "#d4c9a8" : "#555";
    }
    draw() {
      pCtx.beginPath();
      pCtx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      pCtx.fillStyle = this.color;
      pCtx.globalAlpha = this.alpha;
      pCtx.fill();
    }
  }

  for (let i = 0; i < 80; i++) pParticles.push(new pParticle());

  function drawParticles() {
    pCtx.clearRect(0, 0, pW, pH);
    pParticles.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0) p.x = pW;
      if (p.x > pW) p.x = 0;
      if (p.y < 0) p.y = pH;
      if (p.y > pH) p.y = 0;
      p.draw();
    });

    for (let i = 0; i < pParticles.length; i++) {
      for (let j = i + 1; j < pParticles.length; j++) {
        const dx = pParticles[i].x - pParticles[j].x;
        const dy = pParticles[i].y - pParticles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          pCtx.beginPath();
          pCtx.moveTo(pParticles[i].x, pParticles[i].y);
          pCtx.lineTo(pParticles[j].x, pParticles[j].y);
          pCtx.strokeStyle = "#d4c9a8";
          pCtx.globalAlpha = (1 - dist / 120) * 0.06;
          pCtx.lineWidth = 0.5;
          pCtx.stroke();
        }
      }
    }
    pCtx.globalAlpha = 1;
    requestAnimationFrame(drawParticles);
  }
  drawParticles();
}

/* ── MAGNETIC BUTTONS ── */
document.querySelectorAll(".btn-primary, .btn-secondary").forEach((btn) => {
  btn.addEventListener("mousemove", (e) => {
    const rect = btn.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) * 0.25;
    const dy = (e.clientY - cy) * 0.25;
    btn.style.transform = `translate(${dx}px, ${dy}px)`;
  });
  btn.addEventListener("mouseleave", () => {
    btn.style.transform = "";
  });
});

/* ── TEAM TIMELINE & ROW VISIBILITY ── */
const teamRows = document.querySelectorAll(".team-row");
const tlObs = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        teamRows.forEach((el, i) => {
          setTimeout(() => el.classList.add("tl-visible"), i * 90);
        });
        tlObs.disconnect();
      }
    });
  },
  { threshold: 0.05 },
);
if (teamRows.length) tlObs.observe(teamRows[0]);

/* ── SECTION INDICATOR & UNDERLINE ── */
const sections = document.querySelectorAll("header, section");
const navIndicator = document.getElementById("section-indicator");
const navBars = document.querySelectorAll(".indicator-bar");
const navAnchors = document.querySelectorAll(".nav-links a");
const navUnderline = document.getElementById("nav-underline");
let scrollTimeout;

if (navIndicator) {
  window.addEventListener("scroll", () => {
    navIndicator.classList.add("active");
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      navIndicator.classList.remove("active");
    }, 1200);
  }, { passive: true });
}

function updateNavUnderline(activeLink) {
  if (!navUnderline || !activeLink) return;
  navUnderline.classList.add("active");
  navUnderline.style.width = `${activeLink.offsetWidth}px`;
  navUnderline.style.left = `${activeLink.offsetLeft}px`;
}

const spyObs = new IntersectionObserver(
  (entries) => {
    // Filter out sections that are not intersecting
    const intersecting = entries.filter(entry => entry.isIntersecting);
    if (!intersecting.length) return;

    // Sort by intersectionRatio descending to find the most visible section
    intersecting.sort((a, b) => b.intersectionRatio - a.intersectionRatio);
    const dominantEntry = intersecting[0];
    const id = dominantEntry.target.getAttribute("id");

    // Update Side Indicators
    navBars.forEach((bar) => {
      bar.classList.toggle("current", bar.dataset.target === id);
    });

    // Update Navbar Links and Underline
    navAnchors.forEach((a) => {
      const isActive = a.getAttribute("href") === `#${id}`;
      if (isActive) {
        a.classList.add("nav-active");
        updateNavUnderline(a);
      } else {
        a.classList.remove("nav-active");
      }
    });
  },
  {
    threshold: [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
    rootMargin: "-15% 0px -20% 0px"
  },
);
sections.forEach((sec) => { if (sec.id) spyObs.observe(sec); });

/* ── TEAM CARD MOBILE INTERACTION ── */
const teamCards = document.querySelectorAll('.team-card');
teamCards.forEach(card => {
  card.addEventListener('click', () => {
    if (window.innerWidth < 900) {
      const isActive = card.classList.contains('active');
      teamCards.forEach(c => c.classList.remove('active'));
      if (!isActive) card.classList.add('active');
    }
  });
});

/* ── HEADLINE TYPEWRITER ── */
const headlineEm = document.querySelector(".hero-headline em");
if (headlineEm) {
  const phrases = ["become Impact.", "take Shape.", "drive Change.", "shape Future."];
  let phraseIndex = 0, charIndex = phrases[0].length, isDeleting = true;
  headlineEm.classList.add("typewriter-cursor-loop");

  const typeLoop = () => {
    const current = phrases[phraseIndex];
    if (isDeleting) {
      headlineEm.textContent = current.substring(0, charIndex - 1);
      charIndex--;
    } else {
      headlineEm.textContent = current.substring(0, charIndex + 1);
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
    setTimeout(typeLoop, speed);
  };
  setTimeout(typeLoop, 2500);
}
/* ── INTERACTIVE MARQUEE SYSTEM ── */
class InteractiveMarquee {
  constructor(selector, speed = 0.6) {
    this.container = document.querySelector(selector);
    if (!this.container) return;

    this.speed = speed;
    this.paused = false;
    this.isDragging = false;
    this.startX = 0;
    this.scrollLeftStart = 0;
    this.pauseTimeout = null;
    this.lastAutoScrollTime = 0; // Timestamp to distinguish auto-scroll from user interaction

    this.init();
  }

  init() {
    // Clones are created on load regardless of device. 
    // Their visibility is controlled by CSS (.marquee-clone).

    // Clone children to ensure seamless loop
    const children = Array.from(this.container.children);
    children.forEach(item => {
      const clone = item.cloneNode(true);
      clone.classList.add('marquee-clone');
      this.container.appendChild(clone);
    });

    // Mouse Dragging (for Desktop users)
    this.container.addEventListener('mousedown', (e) => this.startDragging(e));
    window.addEventListener('mousemove', (e) => this.drag(e));
    window.addEventListener('mouseup', () => this.stopDragging());

    // Touch Interaction
    this.container.addEventListener('touchstart', () => {
      this.paused = true;
      this.container.style.scrollSnapType = 'none'; // Disable snapping during interaction
    }, { passive: true });
    this.container.addEventListener('touchend', () => {
      this.temporaryPause();
    });

    // Detect manual scrolling to pause
    this.container.addEventListener('scroll', () => {
      // If the scroll happened very close to our programmatic scroll, ignore it
      if (Date.now() - this.lastAutoScrollTime < 100) return;
      
      if (!this.isDragging && !this.paused) this.temporaryPause();
    }, { passive: true });

    this.animate();
  }

  startDragging(e) {
    this.isDragging = true;
    this.paused = true;
    this.startX = e.pageX - this.container.offsetLeft;
    this.scrollLeftStart = this.container.scrollLeft;
    this.container.style.cursor = 'grabbing';
  }

  drag(e) {
    if (!this.isDragging) return;
    const x = e.pageX - this.container.offsetLeft;
    const walk = (x - this.startX) * 1.5;
    this.container.scrollLeft = this.scrollLeftStart - walk;
  }

  stopDragging() {
    if (!this.isDragging) return;
    this.isDragging = false;
    this.container.style.cursor = 'grab';
    this.temporaryPause();
  }

  temporaryPause() {
    this.paused = true;
    clearTimeout(this.pauseTimeout);
    this.pauseTimeout = setTimeout(() => {
      this.paused = false;
    }, 3000);
  }

  animate() {
    if (!this.paused && window.innerWidth <= 900) {
      if (this.container) {
        // Ensure no snapping is interfering with auto-scroll
        if (this.container.style.scrollSnapType !== 'none') {
          this.container.style.scrollSnapType = 'none';
        }

        this.lastAutoScrollTime = Date.now(); // Mark time of programmatic scroll
        this.container.scrollLeft += this.speed;

        // Reset for seamless loop
        const halfWidth = this.container.scrollWidth / 2;
        if (this.container.scrollLeft >= halfWidth) {
          this.container.scrollLeft -= halfWidth;
        }
      }
    }
    requestAnimationFrame(() => this.animate());
  }
}

function initMarquees() {
  new InteractiveMarquee('.products-grid', 1.0);
  new InteractiveMarquee('.ventures-grid', 0.8);
  new InteractiveMarquee('.team-grid-wrap', 0.9);
  new InteractiveMarquee('.about-grid', 0.7);
}

function initScrollHints() {
  document.querySelectorAll('.scroll-hint').forEach(hint => {
    hint.addEventListener('click', () => {
      const nextId = hint.getAttribute('data-next');
      const target = document.querySelector(nextId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

if (document.readyState === 'complete' || document.readyState === 'interactive') {
  initMarquees();
  initScrollHints();
} else {
  document.addEventListener('DOMContentLoaded', () => {
    initMarquees();
    initScrollHints();
  });
}
