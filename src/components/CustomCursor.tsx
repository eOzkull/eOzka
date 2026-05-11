'use client';

import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const ringOuterRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(true); // Default to true so we don't flash on mobile

  useEffect(() => {
    // Check if on mobile or touch device to disable custom cursor
    if (typeof window === 'undefined') return;

    const checkTouch = () => {
      return (
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0 ||
        (window.matchMedia && window.matchMedia('(max-width: 900px)').matches)
      );
    };

    const touchDevice = checkTouch();
    setIsTouch(touchDevice);

    if (touchDevice) {
      return;
    }

    let mx = 0;
    let my = 0;
    let rx = 0;
    let ry = 0;
    let rox = 0;
    let roy = 0;

    const handleMouseMove = (e: MouseEvent) => {
      if (!visible) {
        setVisible(true);
      }
      mx = e.clientX;
      my = e.clientY;

      if (dotRef.current) {
        dotRef.current.style.left = `${mx}px`;
        dotRef.current.style.top = `${my}px`;
      }
    };

    let animationFrameId: number;
    const animateRing = () => {
      // Inner ring follow (faster, tight lerp)
      rx += (mx - rx) * 0.45;
      ry += (my - ry) * 0.45;

      // Outer ring follow (cohesive, snappy trail lag)
      rox += (mx - rox) * 0.3;
      roy += (my - roy) * 0.3;

      if (ringRef.current) {
        ringRef.current.style.left = `${rx}px`;
        ringRef.current.style.top = `${ry}px`;
      }
      if (ringOuterRef.current) {
        ringOuterRef.current.style.left = `${rox}px`;
        ringOuterRef.current.style.top = `${roy}px`;
      }
      animationFrameId = requestAnimationFrame(animateRing);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    animationFrameId = requestAnimationFrame(animateRing);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [visible]);

  if (isTouch || !visible) return null;

  return (
    <>
      <div id="cursor-dot" ref={dotRef} className="active"></div>
      <div id="cursor-ring" ref={ringRef} className="active"></div>
      <div id="cursor-ring-outer" ref={ringOuterRef} className="active"></div>
    </>
  );
}
