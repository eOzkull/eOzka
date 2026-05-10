'use client';

import { useEffect, useState } from 'react';

export default function ScrollProgressBar() {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleScroll = () => {
      const scrolled = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      if (total > 0) {
        setWidth((scrolled / total) * 100);
      } else {
        setWidth(0);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return <div id="scroll-progress" style={{ width: `${width}%` }} />;
}
