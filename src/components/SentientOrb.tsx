'use client';

import { useEffect, useRef } from 'react';

export default function SentientOrb() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = (canvas.width = canvas.offsetWidth);
    let h = (canvas.height = canvas.offsetHeight);
    let orbits: OrbitNode[] = [];
    let isMobile = window.innerWidth <= 900;
    let lastTheme: string | null = null;

    class OrbitNode {
      orbitRadius: number;
      angle: number;
      speed: number;
      size: number;
      color: string;
      baseOpacity: number;
      x: number = 0;
      y: number = 0;

      constructor(orbitRadius: number, angle: number, speed: number, size: number, color: string) {
        this.orbitRadius = orbitRadius;
        this.angle = angle;
        this.speed = speed;
        this.size = size;
        this.color = color;
        this.baseOpacity = Math.random() * 0.3 + 0.55;
      }

      update(mx: number, my: number) {
        this.angle += this.speed;

        // Base orbiting coordinates
        this.x = w / 2 + Math.cos(this.angle) * this.orbitRadius;
        this.y = h / 2 + Math.sin(this.angle) * this.orbitRadius;

        // Mouse displacement pull
        const dx = mx - this.x;
        const dy = my - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 200) {
          const t = (200 - dist) / 200;
          this.x += dx * 0.12 * t;
          this.y += dy * 0.12 * t;
        }
      }

      draw(isLight: boolean) {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);

        ctx.save();
        ctx.globalAlpha = this.baseOpacity;
        ctx.fillStyle = this.color;

        if (isLight) {
          const isGolden =
            this.color.includes('179') || this.color.includes('120') || this.color.includes('194');
          if (isGolden) {
            ctx.shadowBlur = 10;
            ctx.shadowColor = 'rgba(179, 138, 43, 0.5)';
          } else {
            ctx.shadowBlur = 0;
          }
        } else {
          ctx.shadowBlur = 12;
          ctx.shadowColor = this.color;
        }

        ctx.fill();
        ctx.restore();
      }
    }

    const initSystem = () => {
      if (!canvas) return;
      w = canvas.width = canvas.offsetWidth;
      h = canvas.height = canvas.offsetHeight;
      isMobile = window.innerWidth <= 900;
      orbits = [];

      const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
      const isLight = currentTheme === 'light';

      const orbitCount = isMobile ? 3 : 7;
      const colors = isLight
        ? [
            'rgba(179, 138, 43, 1)', // Gold
            'rgba(15, 20, 35, 1)', // Slate-charcoal
            'rgba(120, 91, 25, 1)', // Slate-gold/bronze
            'rgba(80, 80, 90, 1)', // Muted grey-charcoal
          ]
        : [
            'rgba(212, 201, 168, 1)', // Gold accent
            'rgba(184, 184, 192, 1)', // Zinc 400
            'rgba(255, 255, 255, 1)', // White
            'rgba(144, 144, 154, 1)', // Zinc 500
          ];

      for (let i = 0; i < orbitCount; i++) {
        const radius = (i + 1) * (isMobile ? 45 : 65);
        const nodeCount = isMobile ? 1 : Math.floor(Math.random() * 4) + 2;
        const speedBase = (Math.random() * 0.004 + 0.001) * (i % 2 === 0 ? 1 : -1);

        for (let j = 0; j < nodeCount; j++) {
          const angle = ((Math.PI * 2) / nodeCount) * j;
          const color = colors[Math.floor(Math.random() * colors.length)];
          orbits.push(new OrbitNode(radius, angle, speedBase, Math.random() * 3 + 2, color));
        }
      }
    };

    initSystem();
    window.addEventListener('resize', initSystem);

    let smX = w / 2;
    let smY = h / 2;

    const handleMouseMove = (e: MouseEvent) => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      smX = e.clientX - rect.left;
      smY = e.clientY - rect.top;
    };

    document.addEventListener('mousemove', handleMouseMove);

    let animationId: number;

    const animateSystem = () => {
      if (!ctx) return;

      // Handle dynamic canvas sizing to solve offset resolution bugs on initial render
      if (canvas.width !== canvas.clientWidth || canvas.height !== canvas.clientHeight) {
        w = canvas.width = canvas.clientWidth || 600;
        h = canvas.height = canvas.clientHeight || 600;
        initSystem();
      }

      ctx.clearRect(0, 0, w, h);

      // Track theme state transitions dynamically in the render loop
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
      if (currentTheme !== lastTheme) {
        lastTheme = currentTheme;
        initSystem();
      }

      const isLight = currentTheme === 'light';

      const coreColor = isLight ? 'rgba(179, 138, 43, 0.95)' : 'rgba(212, 201, 168, 0.85)';

      // Central glowing core
      ctx.beginPath();
      ctx.arc(w / 2, h / 2, isMobile ? 10 : 14, 0, Math.PI * 2);
      ctx.fillStyle = coreColor;
      ctx.shadowBlur = 30;
      ctx.shadowColor = coreColor;
      ctx.fill();
      ctx.shadowBlur = 0;

      // Concentric circles represent orbits (laptop only)
      if (!isMobile) {
        ctx.strokeStyle = isLight ? 'rgba(179, 138, 43, 0.15)' : 'rgba(255, 255, 255, 0.08)';
        ctx.lineWidth = 1;
        for (let i = 1; i <= 7; i++) {
          ctx.beginPath();
          ctx.arc(w / 2, h / 2, i * 65, 0, Math.PI * 2);
          ctx.stroke();
        }
      }

      orbits.forEach((node) => {
        node.update(smX, smY);
        node.draw(isLight);
      });

      animationId = requestAnimationFrame(animateSystem);
    };

    animateSystem();

    return () => {
      window.removeEventListener('resize', initSystem);
      document.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return <canvas id="sentient-canvas" ref={canvasRef} />;
}
