'use client';

import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';

export interface Track {
  name: string;
  artist: string;
  url: string;
  img?: string;
}

interface AudioContextType {
  isMuted: boolean;
  toggleMute: () => void;
  nowPlaying: { name: string; artist: string; img: string } | null;
  setNowPlaying: React.Dispatch<
    React.SetStateAction<{ name: string; artist: string; img: string } | null>
  >;
  playPreview: (track: Track) => void;
  stopPreview: () => void;
  activePreviewUrl: string | null;
  unlockAudio: () => void;
  playClickSound: () => void;
  playHoverWhoosh: () => void;
  stopHoverWhoosh: () => void;
  playHoverClickable: () => void;
  playNavClickSound: () => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const ORBITAL_TRACKS: Track[] = [
  {
    name: 'Deep Space Ambient',
    artist: 'Chosic',
    url: 'https://www.chosic.com/wp-content/uploads/2021/08/Deep-Space-Ambient.mp3',
    img: '/assets/dark_orbital.jpg',
  },
  {
    name: 'Dark Nebula',
    artist: 'Chosic',
    url: 'https://www.chosic.com/wp-content/uploads/2021/11/Dark-Ambient-Background-Music(chosic.com).mp3',
    img: '/assets/dark_orbital.jpg',
  },
];

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [isMuted, setIsMuted] = useState(true);
  const [nowPlaying, setNowPlaying] = useState<{
    name: string;
    artist: string;
    img: string;
  } | null>(null);
  const [activePreviewUrl, setActivePreviewUrl] = useState<string | null>(null);

  const bgMusicRef = useRef<HTMLAudioElement | null>(null);
  const previewPlayerRef = useRef<HTMLAudioElement | null>(null);
  const currentRadioIndex = useRef(0);
  const globalUnlocked = useRef(false);

  // High-fidelity sound effects refs
  const metallicClickRef = useRef<HTMLAudioElement | null>(null);
  const cassetteHoverRef = useRef<HTMLAudioElement | null>(null);

  const unlockAudio = useCallback(() => {
    if (globalUnlocked.current) return;
    globalUnlocked.current = true;
    if (!isMuted && bgMusicRef.current) {
      bgMusicRef.current.play().catch(() => {});
    }
  }, [isMuted]);

  // Load initial mute state from localStorage on client-side mount
  useEffect(() => {
    if (typeof window === 'undefined') return;
    let saved = null;
    try {
      saved = localStorage.getItem('eOzka_audio_muted');
    } catch (e) {
      console.warn('localStorage is not available:', e);
    }
    if (saved !== null) {
      const parsedMuted = saved === 'true';
      if (parsedMuted !== true) {
        setTimeout(() => setIsMuted(parsedMuted), 0);
      }
    }
  }, []);

  // Preload sound effects on client-side mount
  useEffect(() => {
    if (typeof window === 'undefined' || typeof Audio === 'undefined') return;

    try {
      metallicClickRef.current = new Audio('/assets/audio/metallic_click.mp3');
      metallicClickRef.current.preload = 'auto';
    } catch (e) {
      console.warn('Failed to initialize metallic click audio:', e);
    }

    try {
      cassetteHoverRef.current = new Audio('/assets/audio/cassette_hover.mp3');
      cassetteHoverRef.current.preload = 'auto';
    } catch (e) {
      console.warn('Failed to initialize cassette hover audio:', e);
    }
  }, []);

  // Helper to play a cloned audio instance supporting rapid, polyphonic overlapping plays
  const playAudioHelper = useCallback(
    (audioRef: React.RefObject<HTMLAudioElement | null>, volume: number = 0.5) => {
      if (isMuted || typeof window === 'undefined' || !audioRef.current) return;
      try {
        const clone = audioRef.current.cloneNode(true) as HTMLAudioElement;
        clone.volume = volume;
        clone.play().catch((err) => {
          console.warn('Audio playback failed or was interrupted:', err);
        });
      } catch (e) {
        console.error('Error playing cloned audio:', e);
      }
    },
    [isMuted]
  );

  // 1. Mechanical Keyboard Keystroke (Buttons click sound)
  const playClickSound = useCallback(() => {
    playAudioHelper(metallicClickRef, 0.45);
  }, [playAudioHelper]);

  // 2. Cassette tape start-stop (triggered programmatically during message transmission)
  const playHoverWhoosh = useCallback(() => {
    if (isMuted || typeof window === 'undefined' || !cassetteHoverRef.current) return;
    try {
      cassetteHoverRef.current.currentTime = 0;
      cassetteHoverRef.current.volume = 0.35;
      cassetteHoverRef.current.play().catch((err) => {
        console.warn('Audio playback failed or was interrupted:', err);
      });
    } catch (e) {
      console.error('Error playing cassette audio:', e);
    }
  }, [isMuted]);

  const stopHoverWhoosh = useCallback(() => {
    if (typeof window === 'undefined' || !cassetteHoverRef.current) return;
    try {
      cassetteHoverRef.current.pause();
      cassetteHoverRef.current.currentTime = 0;
    } catch (e) {
      console.error('Error stopping cassette audio:', e);
    }
  }, []);

  // 3. Silent no-op hover for standard clickables (revolver sound removed)
  const playHoverClickable = useCallback(() => {}, []);

  // 4. Futuristic Soft Chime (For navbar clicks under 150ms)
  const playNavClickSound = useCallback(() => {
    if (isMuted) return;
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const destination = ctx.destination;
      const now = ctx.currentTime;

      // Primary oscillator: Pure Sine chime at high frequency (C6 note, 1046.50 Hz)
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(1046.5, now);

      gain1.gain.setValueAtTime(0, now);
      gain1.gain.linearRampToValueAtTime(0.06, now + 0.003); // ultra-fast attack
      gain1.gain.exponentialRampToValueAtTime(0.0001, now + 0.15); // soft decay in 150ms

      // Secondary oscillator: Airy, bright overtone triangle (perfect fifth G6, 1567.98 Hz)
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(1567.98, now);

      gain2.gain.setValueAtTime(0, now);
      gain2.gain.linearRampToValueAtTime(0.02, now + 0.003); // ultra-fast attack
      gain2.gain.exponentialRampToValueAtTime(0.0001, now + 0.1); // quicker decay

      // Highpass filter to eliminate any mid-frequency thuds, making it airy and sparkling
      const filter = ctx.createBiquadFilter();
      filter.type = 'highpass';
      filter.frequency.setValueAtTime(900, now);

      osc1.connect(gain1);
      osc2.connect(gain2);

      gain1.connect(filter);
      gain2.connect(filter);

      filter.connect(destination);

      osc1.start(now);
      osc2.start(now);

      osc1.stop(now + 0.16);
      osc2.stop(now + 0.16);
    } catch (e) {
      console.error('Failed to play navbar chime click:', e);
    }
  }, [isMuted]);

  // ── BACKGROUND MUSIC ENGINE EFFECTS ──

  useEffect(() => {
    if (typeof window === 'undefined' || typeof Audio === 'undefined') return;

    // Instantiate elements
    try {
      bgMusicRef.current = new Audio();
      bgMusicRef.current.loop = false;
      bgMusicRef.current.volume = 0.25;
      bgMusicRef.current.src = ORBITAL_TRACKS[0].url;
    } catch (e) {
      console.warn('Failed to initialize background music audio:', e);
    }

    try {
      previewPlayerRef.current = new Audio();
      previewPlayerRef.current.volume = 1.0;
    } catch (e) {
      console.warn('Failed to initialize preview player audio:', e);
    }

    const handleBgEnded = () => {
      currentRadioIndex.current = (currentRadioIndex.current + 1) % ORBITAL_TRACKS.length;
      if (bgMusicRef.current) {
        bgMusicRef.current.src = ORBITAL_TRACKS[currentRadioIndex.current].url;
        if (!isMuted) {
          bgMusicRef.current.play().catch(() => {});
          const track = ORBITAL_TRACKS[currentRadioIndex.current];
          setNowPlaying({ name: track.name, artist: track.artist, img: track.img || '' });
        }
      }
    };

    if (bgMusicRef.current) {
      bgMusicRef.current.addEventListener('ended', handleBgEnded);
    }

    const handlePreviewPlay = () => {
      if (bgMusicRef.current) {
        bgMusicRef.current.volume = 0.05; // Duck background sound
      }
    };

    const handlePreviewPauseOrEnd = () => {
      if (bgMusicRef.current && !isMuted) {
        bgMusicRef.current.volume = 0.25; // Restore volume
        setNowPlaying({
          name: ORBITAL_TRACKS[currentRadioIndex.current].name,
          artist: 'Sentient Radio',
          img: ORBITAL_TRACKS[currentRadioIndex.current].img || '',
        });
      }
      setActivePreviewUrl(null);
    };

    if (previewPlayerRef.current) {
      previewPlayerRef.current.addEventListener('play', handlePreviewPlay);
      previewPlayerRef.current.addEventListener('pause', handlePreviewPauseOrEnd);
      previewPlayerRef.current.addEventListener('ended', handlePreviewPauseOrEnd);
    }

    return () => {
      if (bgMusicRef.current) {
        bgMusicRef.current.pause();
        bgMusicRef.current.removeEventListener('ended', handleBgEnded);
      }
      if (previewPlayerRef.current) {
        previewPlayerRef.current.pause();
        previewPlayerRef.current.removeEventListener('play', handlePreviewPlay);
        previewPlayerRef.current.removeEventListener('pause', handlePreviewPauseOrEnd);
        previewPlayerRef.current.removeEventListener('ended', handlePreviewPauseOrEnd);
      }
    };
  }, [isMuted]);

  // ── GLOBAL INTERACTION EVENT LISTENERS ──

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleGlobalClick = (e: MouseEvent) => {
      if (isMuted) return;
      const target = e.target as HTMLElement;
      if (!target) return;

      // Intercept click on any button, anchor, navbar link, form inputs, etc.
      const isClickable = target.closest(
        'button, a, [role="button"], .btn-submit, .nav-link, .nav-item, .clickable, .social-icon, .orb-wrapper, .mute-toggle'
      );
      if (isClickable) {
        // Play soft chime for navbar clicks, Sentient Hub buttons, and key call-to-action buttons
        const isNavItem =
          isClickable.closest('nav') ||
          isClickable.matches('.nav-link, .nav-item, [class*="nav-"]');
        const isHubButton =
          isClickable.closest('#hub-panel, #hub-toggle') && !isClickable.closest('.chat-send');

        const clickableText = (isClickable.textContent || '').trim().toLowerCase();
        const isActionButton =
          clickableText.includes('see our products') ||
          clickableText.includes('our story') ||
          clickableText.includes('explore details') ||
          clickableText.includes('explore more') ||
          clickableText.includes('play briefing') ||
          clickableText.includes('access slides') ||
          clickableText.includes('apply now') ||
          clickableText.includes('send message') ||
          isClickable.matches(
            '.btn-primary, .btn-secondary, .theme-btn, .project-link-btn, .nav-cta, [class*="btn-"]'
          );

        if (isNavItem || isHubButton || isActionButton) {
          playNavClickSound();
        } else {
          playClickSound();
        }
      }
    };

    document.addEventListener('click', handleGlobalClick, { passive: true });

    return () => {
      document.removeEventListener('click', handleGlobalClick);
    };
  }, [isMuted, playClickSound, playNavClickSound]);

  // ── FIRST USER INTERACTION UNLOCK (FOR BROWSER AUTOPLAY COMPLIANCE) ──
  useEffect(() => {
    if (typeof window === 'undefined' || isMuted) return;

    const handleFirstInteraction = () => {
      unlockAudio();
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
    };

    window.addEventListener('click', handleFirstInteraction, { passive: true });
    window.addEventListener('keydown', handleFirstInteraction, { passive: true });
    window.addEventListener('touchstart', handleFirstInteraction, { passive: true });

    return () => {
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
    };
  }, [isMuted, unlockAudio]);

  const toggleMute = () => {
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('eOzka_audio_muted', String(newMuted));
      } catch (e) {
        console.warn('localStorage is not available:', e);
      }
    }

    if (!globalUnlocked.current) {
      globalUnlocked.current = true;
    }

    if (bgMusicRef.current) {
      if (newMuted) {
        bgMusicRef.current.pause();
      } else {
        const isPreviewing = previewPlayerRef.current && !previewPlayerRef.current.paused;
        bgMusicRef.current.volume = isPreviewing ? 0.05 : 0.25;
        bgMusicRef.current.play().catch(() => {});

        if (isPreviewing && activePreviewUrl) {
          const track = ORBITAL_TRACKS.find((t) => t.url === activePreviewUrl);
          if (track) {
            setNowPlaying({ name: track.name, artist: track.artist, img: track.img || '' });
          }
        } else {
          const track = ORBITAL_TRACKS[currentRadioIndex.current];
          setNowPlaying({ name: track.name, artist: track.artist, img: track.img || '' });
        }
      }
    }
  };

  const playPreview = (track: Track) => {
    unlockAudio();
    if (!previewPlayerRef.current) return;

    if (activePreviewUrl === track.url) {
      previewPlayerRef.current.pause();
    } else {
      previewPlayerRef.current.src = track.url;
      previewPlayerRef.current.play().catch(() => {});
      setActivePreviewUrl(track.url);
      setNowPlaying({ name: track.name, artist: track.artist, img: track.img || '' });
    }
  };

  const stopPreview = () => {
    if (previewPlayerRef.current) {
      previewPlayerRef.current.pause();
    }
  };

  return (
    <AudioContext.Provider
      value={{
        isMuted,
        toggleMute,
        nowPlaying,
        setNowPlaying,
        playPreview,
        stopPreview,
        activePreviewUrl,
        unlockAudio,
        playClickSound,
        playHoverWhoosh,
        stopHoverWhoosh,
        playHoverClickable,
        playNavClickSound,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
}
