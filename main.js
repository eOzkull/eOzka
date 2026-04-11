/* â”€â”€ CUSTOM CURSOR â”€â”€ */
const dot = document.getElementById("cursor-dot");
const ring = document.getElementById("cursor-ring");
let mx = 0,
  my = 0,
  rx = 0,
  ry = 0;

document.addEventListener("mousemove", (e) => {
  mx = e.clientX;
  my = e.clientY;
  dot.style.left = mx + "px";
  dot.style.top = my + "px";
});

function animateRing() {
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  ring.style.left = rx + "px";
  ring.style.top = ry + "px";
  requestAnimationFrame(animateRing);
}
animateRing();

/* â”€â”€ SCROLL PROGRESS â”€â”€ */
const progress = document.getElementById("scroll-progress");
window.addEventListener(
  "scroll",
  () => {
    const scrolled = window.scrollY;
    const total = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = (scrolled / total) * 100 + "%";

    // Nav scrolled class
    document
      .getElementById("main-nav")
      .classList.toggle("scrolled", scrolled > 60);
  },
  { passive: true },
);

/* â”€â”€ REVEAL ON SCROLL â”€â”€ */
const reveals = document.querySelectorAll(".reveal, .reveal-left");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        const delay = entry.target.dataset.delay || 0;
        setTimeout(() => {
          entry.target.classList.add("visible");
        }, +delay + 80);
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.08, rootMargin: "0px 0px -40px 0px" },
);

reveals.forEach((el, i) => {
  el.dataset.delay = (i % 4) * 80;
  observer.observe(el);
});

/* â”€â”€ COUNTER ANIMATION â”€â”€ */
const counters = document.querySelectorAll(".stat-num[data-target]");
const counterObs = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = +el.dataset.target;
        let start = 0;
        const duration = 1200;
        const startTime = performance.now();
        function update(now) {
          const elapsed = now - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const ease = 1 - Math.pow(1 - progress, 3);
          el.textContent = Math.round(ease * target);
          if (progress < 1) requestAnimationFrame(update);
        }
        requestAnimationFrame(update);
        counterObs.unobserve(el);
      }
    });
  },
  { threshold: 0.5 },
);
counters.forEach((c) => counterObs.observe(c));

/* â”€â”€ SMOOTH ANCHOR SCROLL â”€â”€ */
document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener("click", (e) => {
    e.preventDefault();
    const target = document.querySelector(a.getAttribute("href"));
    if (target) target.scrollIntoView({ behavior: "smooth" });
  });
});

/* â”€â”€ PARTICLE CANVAS â”€â”€ */
const canvas = document.getElementById("particle-canvas");
const ctx = canvas.getContext("2d");
let W,
  H,
  particles = [];

function resize() {
  W = canvas.width = window.innerWidth;
  H = canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

function Particle() {
  this.x = Math.random() * W;
  this.y = Math.random() * H;
  this.r = Math.random() * 1.2 + 0.3;
  this.vx = (Math.random() - 0.5) * 0.18;
  this.vy = (Math.random() - 0.5) * 0.18;
  this.alpha = Math.random() * 0.5 + 0.1;
  this.color = Math.random() > 0.7 ? "#d4c9a8" : "#555";
}

for (let i = 0; i < 80; i++) particles.push(new Particle());

function drawParticles() {
  ctx.clearRect(0, 0, W, H);
  particles.forEach((p) => {
    p.x += p.vx;
    p.y += p.vy;
    if (p.x < 0) p.x = W;
    if (p.x > W) p.x = 0;
    if (p.y < 0) p.y = H;
    if (p.y > H) p.y = 0;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = p.color;
    ctx.globalAlpha = p.alpha;
    ctx.fill();
  });

  // Draw connecting lines for nearby particles
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 120) {
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.strokeStyle = "#d4c9a8";
        ctx.globalAlpha = (1 - dist / 120) * 0.06;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    }
  }
  ctx.globalAlpha = 1;
  requestAnimationFrame(drawParticles);
}
drawParticles();

/* â”€â”€ MAGNETIC BUTTONS â”€â”€ */
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

/* â”€â”€ TEAM TIMELINE — centered alternating stagger â”€â”€ */
const teamRows = document.querySelectorAll(".team-row");
const tlObs = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Stagger all entries once the first one hits viewport
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

/* â”€â”€ HIDE SCROLL HINT ON FIRST SCROLL â”€â”€ */
const hint = document.querySelector(".hero-scroll-hint");
window.addEventListener(
  "scroll",
  () => {
    if (hint && window.scrollY > 80) hint.style.opacity = "0";
  },
  { passive: true, once: false },
);
/* â”€â”€ SECTION INDICATOR (SCROLLSPY) â”€â”€ */
const sections = document.querySelectorAll("header, section");
const navIndicator = document.getElementById("section-indicator");
const navBars = document.querySelectorAll(".indicator-bar");
let scrollTimeout;

if (navIndicator) {
  window.addEventListener(
    "scroll",
    () => {
      navIndicator.classList.add("active");

      // Hide after scrolling stops
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        navIndicator.classList.remove("active");
      }, 1200);
    },
    { passive: true },
  );

  const spyObs = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");
          navBars.forEach((bar) => {
            if (bar.dataset.target === id) {
              bar.classList.add("current");
            } else {
              bar.classList.remove("current");
            }
          });
        }
      });
    },
    { threshold: 0.3 },
  );

  sections.forEach((sec) => {
    if (sec.hasAttribute("id")) spyObs.observe(sec);
  });
}

/* ── HEADLINE LOOPING TYPEWRITER ── */
const headlineEm = document.querySelector(".hero-headline em");
if (headlineEm) {
  const phrases = [
    "become Impact.",
    "take Shape.",
    "drive Change.",
    "shape the Future.",
  ];
  let phraseIndex = 0;
  let charIndex = phrases[0].length; // Start with first phrase fully visible if it's rendered by HTML
  let isDeleting = true;
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
      speed = 2000; // Pause at end of word
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      speed = 500; // Pause before typing new word
    }
    setTimeout(typeLoop, speed);
  };
  setTimeout(typeLoop, 2500); // Wait long initially before first backspace
}
