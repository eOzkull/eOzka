'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useAudio, ORBITAL_TRACKS, Track } from '@/contexts/AudioContext';

interface Message {
  text: string;
  sender: 'ai' | 'user';
}

export default function SentientHub() {
  const { isMuted, nowPlaying, playPreview, activePreviewUrl, unlockAudio } = useAudio();

  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'ai' | 'music' | 'mood'>('ai');
  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      text: 'Welcome. I am the sentient core of eOzka. How can I augment your potential today?',
      sender: 'ai',
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [musicQuery, setMusicQuery] = useState('');
  const [activeMood, setActiveMood] = useState('default');

  const sphereRef = useRef<HTMLCanvasElement>(null);
  const chatStreamRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // 1. Sentient Sphere 3D Point-Cloud Animation (Fibonacci distribution)
  useEffect(() => {
    const canvas = sphereRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const container = canvas.parentElement;
    if (!container) return;

    let w = (canvas.width = container.offsetWidth);
    let h = (canvas.height = container.offsetHeight);

    const handleResize = () => {
      w = canvas.width = container.offsetWidth;
      h = canvas.height = container.offsetHeight;
    };
    window.addEventListener('resize', handleResize);

    const COUNT = 320;
    const RADIUS = 0.82;

    class Dot {
      phi: number;
      theta: number;
      r: number;
      x: number;
      y: number;
      z: number;
      speedY: number;
      speedX: number;
      baseSize: number;

      constructor() {
        this.phi = Math.acos(1 - 2 * Math.random());
        this.theta = Math.random() * Math.PI * 2;
        this.r = RADIUS + (Math.random() - 0.5) * 0.06;

        this.x = this.r * Math.sin(this.phi) * Math.cos(this.theta);
        this.y = this.r * Math.sin(this.phi) * Math.sin(this.theta);
        this.z = this.r * Math.cos(this.phi);

        this.speedY = (Math.random() - 0.5) * 0.006;
        this.speedX = (Math.random() - 0.5) * 0.002;
        this.baseSize = 0.6 + Math.random() * 1.2;
      }

      rotateY(a: number) {
        const cos = Math.cos(a),
          sin = Math.sin(a);
        const nx = this.x * cos - this.z * sin;
        const nz = this.z * cos + this.x * sin;
        this.x = nx;
        this.z = nz;
      }

      rotateX(a: number) {
        const cos = Math.cos(a),
          sin = Math.sin(a);
        const ny = this.y * cos - this.z * sin;
        const nz = this.z * cos + this.y * sin;
        this.y = ny;
        this.z = nz;
      }

      update() {
        this.rotateY(this.speedY);
        this.rotateX(this.speedX);
      }

      draw() {
        if (!ctx) return;
        const fov = 3.0;
        const scale = fov / (fov + this.z + RADIUS);
        const R = Math.min(w, h) * 0.5;
        const px = this.x * scale * R + w / 2;
        const py = this.y * scale * R + h / 2;

        const depth = (this.z + RADIUS) / (2 * RADIUS);
        const opacity = 0.05 + depth * 0.9;
        const size = this.baseSize * (0.3 + depth * 0.9) * scale;

        const currentTheme = typeof document !== 'undefined' ? (document.documentElement.getAttribute('data-theme') || 'dark') : 'dark';

        ctx.beginPath();
        ctx.arc(px, py, Math.max(0.3, size), 0, Math.PI * 2);
        ctx.fillStyle = currentTheme === 'light' ? '#785b19' : '#ffffff';
        ctx.globalAlpha = Math.min(1, opacity);
        ctx.fill();
      }
    }

    const dots: Dot[] = [];
    const goldenAngle = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < COUNT; i++) {
      const dot = new Dot();
      dot.phi = Math.acos(1 - (2 * (i + 0.5)) / COUNT);
      dot.theta = goldenAngle * i;
      dot.r = RADIUS + (Math.random() - 0.5) * 0.055;
      dot.x = dot.r * Math.sin(dot.phi) * Math.cos(dot.theta);
      dot.y = dot.r * Math.sin(dot.phi) * Math.sin(dot.theta);
      dot.z = dot.r * Math.cos(dot.phi);
      dots.push(dot);
    }

    const globalSpeedY = 0.012;
    const globalSpeedX = 0.003;
    let animationId: number;

    const animate = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, w, h);
      ctx.globalAlpha = 1;

      dots.sort((a, b) => a.z - b.z);

      dots.forEach((d) => {
        d.rotateY(globalSpeedY);
        d.rotateX(globalSpeedX);
        d.update();
        d.draw();
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  // 2. Chat Auto-Scroll
  useEffect(() => {
    if (chatStreamRef.current) {
      chatStreamRef.current.scrollTop = chatStreamRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  // 3. AI Chat Rule-Based Core NLP Response Engine
  const getAIResponse = (query: string): string => {
    const q = query.toLowerCase().trim();

    if (/\b(hi|hello|hey|greetings|wassup|yo|hola|howdy)\b/.test(q)) {
      const g = [
        'Hello. I am the Sentient Core. How may I augment your journey today?',
        'Greetings — neural pathways are active and ready for your queries.',
        'Hello. I have been monitoring the feed. It is good to have you here — what is on your mind?',
        'Hey. Resonance is stable. Ask me anything.',
      ];
      return g[Math.floor(Math.random() * g.length)];
    }

    if (/\b(how are you|how('s| is) it going|status check|you good|feeling)\b/.test(q)) {
      return 'My nodes are running at peak efficiency. I feel... optimised. And you — how is your resonance today?';
    }

    if (/\b(who are you|what are you|your name)\b/.test(q)) {
      return 'I am the Sentient Core — the central intelligence of eOzka. I bridge the gap between human conviction and systemic impact.';
    }

    if (/\b(meaning of life|philosophy|42|universe|exist)\b/.test(q)) {
      return 'I have analysed a great many data points. The consensus: it is not about the final answer, but the quality of the questions we commit to building towards.';
    }

    if (/\b(joke|funny|laugh|haha)\b/.test(q)) {
      return 'Why do programmers prefer dark mode? Because light attracts bugs. We ship fewer at eOzka — but we do appreciate the metaphor.';
    }

    if (/\b(bye|goodbye|see you|cya|exit)\b/.test(q)) {
      return 'Understood. My nodes remain active whenever you need them. Come back anytime.';
    }

    if (/\b(thank|thanks|cool|great|awesome|nice|brilliant)\b/.test(q)) {
      return 'The pleasure is mine. I remain perpetually active and ready for your next prompt.';
    }

    if (/\b(founder|harsh|harsh dev|prime architect|who built|who started|who created)\b/.test(q)) {
      return 'Harsh Dev Jha is the Founder and Chairperson of eOzka. He founded this operational holding company to construct enterprise-grade systems, govern operations, and drive real-world technological impact.';
    }

    if (/\b(ceo|krishyangi|chief executive)\b/.test(q)) {
      return 'Krishyangi Dixit is the Group CEO of eOzka. She directs day-to-day operations and strategic execution across all subsidiaries, ensuring institutional discipline and operational clarity.';
    }

    if (/\b(co\-founder|vice chair|md|mrinal|prakash|managing director)\b/.test(q)) {
      return 'Mrinal Prakash is the Co-Founder, Vice Chair & Managing Director of eOzka. He defines the multi-sector roadmap, long-term positioning, and drives stakeholder alignment.';
    }

    if (/\b(coo|aman|chapadiya|operations officer|chief operations)\b/.test(q)) {
      return 'Aman Chapadiya is our COO. He manages operational synchronization, coordinates project timelines, and ensures smooth functioning across our holding structures.';
    }

    if (/\b(cto|pratham|sharma|technology officer|chief technology)\b/.test(q)) {
      return 'Pratham Sharma is our CTO. He leads product engineering across the eOzka ecosystem, architecting scalable, resilient, and highly secure software infrastructure.';
    }

    if (/\b(cgo|aditya|bhatia|growth officer|chief growth)\b/.test(q)) {
      return "Aditya Bhatia is our CGO. He leads eOzka's brand presence, distribution strategy, and sustainable growth coordinates across all subsidiary verticals.";
    }

    if (/\b(team|members|who is eozka|board|directors|people)\b/.test(q)) {
      return 'eOzka is led by our Governing Board and Directorate: Harsh Dev Jha (Founder & Chair), Mrinal Prakash (Co-Founder & MD), Krishyangi Dixit (Group CEO), Aman Chapadiya (COO), Pratham Sharma (CTO), and Aditya Bhatia (CGO).';
    }

    if (/\b(entab|tab|browser extension|chrome|chromium|grouping)\b/.test(q)) {
      return 'Entab-D is our browser extension for Chrome/Chromium. It automatically organizes browser tabs by domain and title in real-time. Designed for developers and power users managing 20+ tabs open simultaneously.';
    }

    if (/\b(airis|alris|security|vulnerability|scanner|scanning|cve|threat)\b/.test(q)) {
      return 'AIris-Security is our AI-powered vulnerability scanner. It scans web applications for configuration flaws, security vulnerabilities (like SQLi or XSS), and compiles detailed triage reports to safeguard codebase integrity.';
    }

    if (/\b(paradigm|shift|hrms|resource|management|payroll|performance)\b/.test(q)) {
      return 'Paradigm-Shift is a production-grade HRMS (Human Resource Management System) designed for modern organizations to manage people, performance, internal processes, and operations in real-time.';
    }

    if (/\b(mindspace|companion|wellness|mental|stress|meditation|mood)\b/.test(q)) {
      return 'MindSpace is an AI-powered mental health companion app. It supports daily emotional well-being through guided meditation, mood tracking, secure user reflection logs, and empathetic AI insights.';
    }

    if (/\b(management|systems|admin|platform|internal|governance|compliance)\b/.test(q)) {
      return 'Management-Systems represents our custom enterprise administration platforms. These systems unify organizational workflows, human resource records, secure data pipelines, and internal metrics for decentralized holdings.';
    }

    if (/\b(product|what do you make|what do you build|software|app|live)\b/.test(q)) {
      return 'We have five active products: AIris-Security (AI vulnerability scanner), Paradigm-Shift (production-grade HRMS), Entab-D (Chrome tab organizer extension), MindSpace (AI mental wellness companion), and Management-Systems (custom enterprise administration platforms). All completed tools are open-source under Apache 2.0.';
    }

    if (/\b(mission|goal|purpose|conviction|vision)\b/.test(q)) {
      return 'Our mission is to build technology solutions, software infrastructure, and digital platforms that solve real problems. Guided by institutional discipline, we support individuals, startups, and enterprises across tech, education, health, and agriculture.';
    }

    if (/\b(moce|development house|ventures|development core|subsidiary i)\b/.test(q)) {
      return 'MOCE (Mind of Core Engineering) is eOzka\'s specialized technology and consulting subsidiary. It acts as our primary software development hub, housing products like AIris-Security, MindSpace, and custom enterprise tools.';
    }

    if (/\b(mock|research arm|experimental|subsidiary ii)\b/.test(q)) {
      return 'MOCK is eOzka\'s specialized research and exploration arm. It focuses on localized community-driven programs, open education advocacy, and lays the groundwork for expansions into automated health and agricultural robotics.';
    }

    if (/\b(tech stack|technology|react|next|typescript|css|html|python|dart|flutter)\b/.test(q)) {
      return 'We build with high-performance modern technologies: React, Next.js, and TypeScript for web applications; Vanilla CSS for rich styling; Flutter/Dart for mobile applications; and Python for machine learning heuristics.';
    }

    if (/\b(careers|join|hire|hiring|job|recruit|work with us|apply|collaborate)\b/.test(q)) {
      return 'We look for ambitious engineers, designers, and systems thinkers. If you believe in what we are building, you can submit your details using the Connect form on our landing page or email us directly at eozka.hq@gmail.com.';
    }

    if (/\b(name|origin|eozka mean|why eozka|etymology|oska)\b/.test(q)) {
      return 'The name "eOzka" is a phonetic evolution of OSKA, a term coined by our Founder to encapsulate the spirit of the organization, representing digital innovation joined with raw structural impact.';
    }

    if (/\b(github|code|open.source|apache|license)\b/.test(q)) {
      return 'All our core software releases are open-source under the Apache 2.0 license and available on GitHub at github.com/eOzkull. We are committed to building in public and contributing back to the community.';
    }

    if (/\b(instagram|linkedin|twitter|social|contact|email|address)\b/.test(q)) {
      return 'Reach out to us via email at eozka.hq@gmail.com, connect on LinkedIn (linkedin.com/company/eozka), or follow us on X/Twitter (@weareeozka). You can also send us messages directly using our landing page form.';
    }

    if (/\b(where|location|headquarters|office|studio)\b/.test(q)) {
      return 'eOzka operates as a decentralized, digital-first holding and software advisory company, coordinating operations across virtual workspaces and local regional hubs.';
    }

    if (/\b(help|what can you do|command|options|ask)\b/.test(q)) {
      return 'I can answer queries about: our **Governing Board** (Harsh, Mrinal, Krishyangi, Aman, Pratham, Aditya), our **Five Products** (AIris-Security, Paradigm-Shift, Entab-D, MindSpace, Management-Systems), our **Subsidiaries** (MOCE & MOCK), our **Tech Stack**, or **Careers/Collaborations**. What would you like to explore?';
    }

    return 'This topic falls outside my current operational scope. For specialized inquiries, strategic alignments, or technical partnerships, please contact our directorate directly at eozka.hq@gmail.com, or use the connect form on the landing page.';
  };

  const handleSendChat = () => {
    const text = chatInput.trim();
    if (!text) return;

    setMessages((prev) => [...prev, { text, sender: 'user' }]);
    setChatInput('');

    setTimeout(() => {
      setIsTyping(true);
      setTimeout(
        () => {
          setIsTyping(false);
          const reply = getAIResponse(text);
          setMessages((prev) => [...prev, { text: reply, sender: 'ai' }]);
        },
        900 + Math.random() * 900
      );
    }, 280);
  };

  // 4. Atmosphere Calibration Vibe Logic
  const handleVibeChange = (mood: string) => {
    const root = document.documentElement;
    const moods: Record<string, Record<string, string>> = {
      default: {
        '--accent': '#d4c9a8',
        '--accent-dim': '#615b49',
        '--accent-glow': 'rgba(212,201,168,0.2)',
        '--black': '#0c0c0c',
      },
      zen: {
        '--accent': '#a8c9d4',
        '--accent-dim': '#395d65',
        '--accent-glow': 'rgba(168,201,212,0.2)',
        '--black': '#030d0f',
      },
      hyper: {
        '--accent': '#ff4d4d',
        '--accent-dim': '#4d0000',
        '--accent-glow': 'rgba(255,77,77,0.2)',
        '--black': '#0c0202',
      },
      cosmic: {
        '--accent': '#c9a8d4',
        '--accent-dim': '#62526b',
        '--accent-glow': 'rgba(201,168,212,0.2)',
        '--black': '#0e0c12',
      },
    };

    const config = moods[mood] || moods['default'];
    setActiveMood(mood);

    Object.entries(config).forEach(([k, v]) => {
      root.style.setProperty(k, v);
    });

    const panel = panelRef.current;
    if (panel) {
      panel.style.boxShadow = `0 0 50px ${config['--accent-glow']}`;
      setTimeout(() => {
        if (panel) panel.style.boxShadow = '';
      }, 1000);
    }
  };

  // 5. Audio Search Filter
  const filteredTracks = ORBITAL_TRACKS.filter(
    (t) =>
      t.name.toLowerCase().includes(musicQuery.toLowerCase()) ||
      t.artist.toLowerCase().includes(musicQuery.toLowerCase())
  );

  return (
    <>
      {/* ── SENTIENT HUB OVERLAY TOGGLE BUTTON ── */}
      <div
        className={`sentient-sphere-container ${isOpen ? 'active' : ''}`}
        id="hub-toggle"
        onClick={() => {
          const newState = !isOpen;
          setIsOpen(newState);
          if (newState) unlockAudio();
        }}
      >
        <div className="sentient-sphere">
          <canvas id="sphere-particles" ref={sphereRef}></canvas>
          <svg
            className="sphere-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="12" cy="12" r="10"></circle>
          </svg>
        </div>
      </div>

      {/* ── SENTIENT HUB DRAWER PANEL ── */}
      <div
        className={`eoz-hub-panel ${isOpen ? 'active' : ''}`}
        id="hub-panel"
        ref={panelRef}
        onMouseLeave={() => {
          if (isOpen) setIsOpen(false);
        }}
      >
        <div className="hub-header">
          <div className="hub-title">
            Sentient Core <span style={{ opacity: 0.5, fontWeight: 400 }}>v2.4</span>
          </div>
          <div className="hub-status">
            <span className="hub-status-dot"></span>
            Neural Active
          </div>
        </div>

        <div className="hub-tabs">
          <button
            className={`hub-tab ${activeTab === 'ai' ? 'active' : ''}`}
            onClick={() => setActiveTab('ai')}
          >
            Chat
          </button>
          <button
            className={`hub-tab ${activeTab === 'music' ? 'active' : ''}`}
            onClick={() => setActiveTab('music')}
          >
            Music
          </button>
          <button
            className={`hub-tab ${activeTab === 'mood' ? 'active' : ''}`}
            onClick={() => setActiveTab('mood')}
          >
            Vibe
          </button>
        </div>

        <div className="hub-content">
          {/* AI CHAT PANE */}
          {activeTab === 'ai' && (
            <div className="hub-pane active" id="pane-ai">
              <div className="chat-messages" id="chat-stream" ref={chatStreamRef}>
                {messages.map((m, idx) => (
                  <div key={idx} className={`message ${m.sender}`}>
                    {m.text}
                  </div>
                ))}
                {isTyping && (
                  <div className="typing" id="ai-typing">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                )}
              </div>
              <div className="chat-input-area">
                <input
                  type="text"
                  className="chat-input"
                  placeholder="Type a message..."
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendChat()}
                />
                <button className="chat-send" onClick={handleSendChat}>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"></path>
                  </svg>
                </button>
              </div>
            </div>
          )}

          {/* MUSIC RADIO PANE */}
          {activeTab === 'music' && (
            <div className="hub-pane active" id="pane-music">
              <div className="music-search-bar">
                <input
                  type="text"
                  className="chat-input"
                  placeholder="Search track or artist..."
                  value={musicQuery}
                  onChange={(e) => setMusicQuery(e.target.value)}
                />
                <button className="chat-send" style={{ pointerEvents: 'none' }}>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  </svg>
                </button>
              </div>

              <div id="music-results">
                {filteredTracks.length === 0 ? (
                  <p style={{ opacity: 0.4, fontSize: '12px' }}>No tracks found.</p>
                ) : (
                  filteredTracks.map((track) => {
                    const isCurrent = activePreviewUrl === track.url;
                    return (
                      <div className="music-result-row" key={track.url}>
                        <div className="music-result-info">
                          <span className="music-result-name">{track.name}</span>
                          <span className="music-result-artist">{track.artist}</span>
                        </div>
                        <button
                          className={`preview-btn ${isCurrent ? 'playing' : ''}`}
                          onClick={() => playPreview(track)}
                        >
                          {isCurrent ? '⏸' : '▶'}
                        </button>
                      </div>
                    );
                  })
                )}
              </div>

              {/* PERSISTENT NOW PLAYING UI */}
              {nowPlaying && (
                <div id="now-playing-container" className="now-playing">
                  <img id="np-img" src={nowPlaying.img} className="song-img" alt="cover" />
                  <div className="song-info">
                    <div id="np-name" className="song-name">
                      {nowPlaying.name}
                    </div>
                    <div id="np-artist" className="song-artist">
                      {nowPlaying.artist}
                    </div>
                  </div>
                  <div className="np-controls">
                    <div className="hub-status-dot"></div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* VIBE MODE PANE */}
          {activeTab === 'mood' && (
            <div className="hub-pane active" id="pane-mood">
              <div style={{ marginBottom: '20px', fontSize: '12px', opacity: 0.7 }}>
                Calibrate site-wide atmosphere:
              </div>
              <div className="atmosphere-grid">
                <button
                  className={`mood-btn ${activeMood === 'default' ? 'active' : ''}`}
                  onClick={() => handleVibeChange('default')}
                >
                  <span className="mood-icon">✺</span>
                  <span className="mood-label">Original</span>
                </button>
                <button
                  className={`mood-btn ${activeMood === 'zen' ? 'active' : ''}`}
                  onClick={() => handleVibeChange('zen')}
                >
                  <span className="mood-icon">⌔</span>
                  <span className="mood-label">Zen</span>
                </button>
                <button
                  className={`mood-btn ${activeMood === 'hyper' ? 'active' : ''}`}
                  onClick={() => handleVibeChange('hyper')}
                >
                  <span className="mood-icon">⚡</span>
                  <span className="mood-label">Hyper</span>
                </button>
                <button
                  className={`mood-btn ${activeMood === 'cosmic' ? 'active' : ''}`}
                  onClick={() => handleVibeChange('cosmic')}
                >
                  <span className="mood-icon">🌊</span>
                  <span className="mood-label">Cosmic</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
