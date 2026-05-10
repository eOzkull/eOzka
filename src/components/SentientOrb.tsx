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
        this.baseOpacity = Math.random() * 0.4 + 0.3;
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

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color.replace('1)', `${this.baseOpacity})`);
        ctx.fill();

        ctx.shadowBlur = 12;
        ctx.shadowColor = this.color;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    const initSystem = () => {
      if (!canvas) return;
      w = canvas.width = canvas.offsetWidth;
      h = canvas.height = canvas.offsetHeight;
      isMobile = window.innerWidth <= 900;
      orbits = [];

      const orbitCount = isMobile ? 3 : 7;
      const colors = [
        'rgba(212, 201, 168, 1)', // Gold accent
        'rgba(161, 161, 170, 1)', // Zinc 400
        'rgba(255, 255, 255, 1)', // White
        'rgba(113, 113, 122, 1)', // Zinc 500
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
      ctx.clearRect(0, 0, w, h);

      // Central glowing core
      const isLight = document.documentElement.getAttribute('data-theme') === 'light';
      const coreColor = isLight ? 'rgba(139, 125, 87, 0.5)' : 'rgba(212, 201, 168, 0.5)';

      ctx.beginPath();
      ctx.arc(w / 2, h / 2, isMobile ? 8 : 12, 0, Math.PI * 2);
      ctx.fillStyle = coreColor;
      ctx.shadowBlur = 25;
      ctx.shadowColor = coreColor;
      ctx.fill();
      ctx.shadowBlur = 0;

      // Concentric circles represent orbits (laptop only)
      if (!isMobile) {
        ctx.strokeStyle = isLight ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.06)';
        ctx.lineWidth = 0.8;
        for (let i = 1; i <= 7; i++) {
          ctx.beginPath();
          ctx.arc(w / 2, h / 2, i * 65, 0, Math.PI * 2);
          ctx.stroke();
        }
      }

      orbits.forEach((node) => {
        node.update(smX, smY);
        node.draw();
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
