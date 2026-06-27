'use client';

import { useEffect } from 'react';

export default function SmoothScroll() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Disable smooth scroll on touch/mobile devices as they have native momentum scroll
    const isTouchDevice = () => {
      return (
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0 ||
        (window.matchMedia && window.matchMedia('(max-width: 900px)').matches)
      );
    };

    if (isTouchDevice()) return;

    let targetY = window.scrollY;
    let currentY = window.scrollY;
    let isMoving = false;
    let rafId: number | null = null;

    const lerp = (start: number, end: number, amt: number) => {
      return (1 - amt) * start + amt * end;
    };

    const animate = () => {
      const diff = targetY - currentY;

      if (Math.abs(diff) < 0.25) {
        currentY = targetY;
        window.scrollTo(0, currentY);
        isMoving = false;
        rafId = null;
        return;
      }

      currentY = lerp(currentY, targetY, 0.08);
      window.scrollTo(0, currentY);

      rafId = requestAnimationFrame(animate);
    };

    // Helper to determine if an element or any of its parents is a scrollable container
    const isScrollable = (el: HTMLElement | null): boolean => {
      if (!el || el === document.body || el === document.documentElement) return false;
      
      const style = window.getComputedStyle(el);
      const overflowY = style.overflowY;
      const isScrollableType = overflowY === 'auto' || overflowY === 'scroll';
      const canScroll = el.scrollHeight > el.clientHeight;
      
      if (isScrollableType && canScroll) {
        return true;
      }
      
      return isScrollable(el.parentElement);
    };

    const onWheel = (e: WheelEvent) => {
      // Dynamic mobile viewport width check to support desktop responsive resize
      if (window.innerWidth <= 900) return;

      // Allow native scrolling inside scrollable sub-elements (chatlogs, cards, textareas, etc.)
      const target = e.target as HTMLElement;
      if (isScrollable(target)) return;

      // Do not block default browser behavior for modifier key events (e.g. pinch-to-zoom)
      if (e.ctrlKey || e.metaKey || e.defaultPrevented) return;

      e.preventDefault();

      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      
      // Accumulate target scroll position
      targetY = Math.max(0, Math.min(maxScroll, targetY + e.deltaY));

      if (!isMoving) {
        isMoving = true;
        if (rafId === null) {
          rafId = requestAnimationFrame(animate);
        }
      }
    };

    const onScrollSync = () => {
      // If the scroll position is updated externally (e.g. scrollbar drag, anchor links, keyboard navigation),
      // update our trackers to prevent scroll jumping.
      if (!isMoving) {
        targetY = window.scrollY;
        currentY = window.scrollY;
      }
    };

    const onKeyDown = (e: KeyboardEvent) => {
      // Let standard keyboard keys scroll smoothly too
      const keys = ['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Space', 'Home', 'End'];
      if (!keys.includes(e.key)) return;

      // Sync the coordinates immediately so key scroll starts from the correct position
      targetY = window.scrollY;
      currentY = window.scrollY;
      
      // Cancel any running animation to let native key scroll execute cleanly
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
      isMoving = false;
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('scroll', onScrollSync, { passive: true });
    window.addEventListener('keydown', onKeyDown, { passive: true });

    return () => {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('scroll', onScrollSync);
      window.removeEventListener('keydown', onKeyDown);
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
    };
  }, []);

  return null;
}
