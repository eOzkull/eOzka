'use client';

import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const ringOuterRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(true); // Default to true so we don't flash on mobile

  useEffect(() => {
    // Check if on mobile or touch device to disable custom cursor on mount
    const checkTouch = () => {
      return (
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0 ||
        (window.matchMedia && window.matchMedia('(max-width: 900px)').matches)
      );
    };
    setTimeout(() => {
      setIsTouch(checkTouch());
    }, 0);
  }, []);

  useEffect(() => {
    if (isTouch) return;

    let mx = 0;
    let my = 0;
    let dx = 0;
    let dy = 0;
    let rx = 0;
    let ry = 0;
    let rox = 0;
    let roy = 0;
    let initialized = false;

    const handleMouseMove = (e: MouseEvent) => {
      if (!visible) {
        setVisible(true);
      }
      mx = e.clientX;
      my = e.clientY;

      if (!initialized) {
        dx = mx;
        dy = my;
        rx = mx;
        ry = my;
        rox = mx;
        roy = my;
        initialized = true;
      }
    };

    let animationFrameId: number;
    const animateRing = () => {
      if (initialized) {
        // Dot follow (snappy, near-instant but frame-synced)
        dx += (mx - dx) * 0.85;
        dy += (my - dy) * 0.85;

        // Inner ring follow (faster, liquid lerp)
        rx += (mx - rx) * 0.18;
        ry += (my - ry) * 0.18;

        // Outer ring follow (cohesive, gorgeous slow kinetic trail lag)
        rox += (mx - rox) * 0.08;
        roy += (my - roy) * 0.08;

        if (dotRef.current) {
          dotRef.current.style.transform = `translate3d(${dx}px, ${dy}px, 0) translate(-50%, -50%)`;
        }
        if (ringRef.current) {
          ringRef.current.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`;
        }
        if (ringOuterRef.current) {
          ringOuterRef.current.style.transform = `translate3d(${rox}px, ${roy}px, 0) translate(-50%, -50%)`;
        }
      }
      animationFrameId = requestAnimationFrame(animateRing);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    animationFrameId = requestAnimationFrame(animateRing);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isTouch, visible]);

  if (isTouch || !visible) return null;

  return (
    <>
      <div id="cursor-dot" ref={dotRef} className="active"></div>
      <div id="cursor-ring" ref={ringRef} className="active"></div>
      <div id="cursor-ring-outer" ref={ringOuterRef} className="active"></div>
    </>
  );
}
