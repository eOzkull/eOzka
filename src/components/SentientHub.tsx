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

        ctx.beginPath();
        ctx.arc(px, py, Math.max(0.3, size), 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
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
      return 'Harsh Dev Jha is the founder, Chairperson, and prime architect of eOzka. He founded this holding venture to turn the boundless potential of student builders into enterprise-grade systems and real-world impact.';
    }

    if (/\b(ceo|krishyangi|chief executive)\b/.test(q)) {
      return 'Krishyangi Dixit is our CEO. She drives day-to-day operations and ensures every eOzka subsidiary moves with institutional discipline, operational clarity, and high execution velocity.';
    }

    if (/\b(cso|mrinal|strategy officer|chief strategy)\b/.test(q)) {
      return "Mrinal Prakash is our CSO — he defines the multi-sector expansion roadmap and aligns stakeholders around eOzka's long-term market positioning.";
    }

    if (/\b(coo|aman|chapadiya|operations officer|chief operations)\b/.test(q)) {
      return 'Aman Chapadiya is our COO — he keeps the physical and digital machinery running by synchronising teams, timelines, and operations across the holding structure.';
    }

    if (/\b(cto|pratham|sharma|technology officer|chief technology)\b/.test(q)) {
      return 'Pratham Sharma is our CTO — spearheading product engineering across the eOzka ecosystem with systems designed for high scalability, responsiveness, and zero-defect deployment.';
    }

    if (/\b(cpo|mahin|product officer|chief product)\b/.test(q)) {
      return "Mahin is our CPO — translating complex user needs into beautiful, premium, and highly functional digital solutions that uphold eOzka's standards.";
    }

    if (/\b(cdo|rishita|documentation|chief documentation)\b/.test(q)) {
      return 'Rishita is our CDO — maintaining institutional memory across eOzka, ensuring every single decision, architectural standard, and project schema is documented with precision.';
    }

    if (/\b(team|members|who is eozka|founding team|people)\b/.test(q)) {
      return 'Our 10-person founding team: Harsh (Founder & Chairperson), Krishyangi (CEO), Mrinal (CSO), Aman (COO), Pratham (CTO), Mahin (CPO), Aditya (CGO), Rishita (CDO), and our high-performance SDE core — Kushagra, Ishan, Saurabh, Manas, and Trijal.';
    }

    if (/\b(stress|stress.calc|biometric|heart rate|blood pressure|health|flutter)\b/.test(q)) {
      return 'Stress-Calculator is a premium, cross-platform biometric mobile application developed in Flutter and Dart. It parses real-time heart rate and blood pressure data using proprietary algorithms to deliver actionable psychological and physical stress assessments for modern professionals.';
    }

    if (/\b(entab|tab|browser extension|chrome|chromium|grouping)\b/.test(q)) {
      return 'Entab-D is our flagship browser extension for Google Chrome/Chromium. It automatically parses active browser states to sort, group, and label tabs by domain category and workspace context in real-time, instantly resolving tab clutter for users with 20+ tabs open.';
    }

    if (/\b(airis|alris|security|vulnerability|scanner|scanning|cve|threat)\b/.test(q)) {
      return 'AIris-Security is an open-source, automated threat intelligence and vulnerability scanner. Designed by eOzka engineering, it executes security scanning, highlights common CVEs, configuration leaks, and provides deep-dive reports to protect codebase integrity.';
    }

    if (/\b(paradigm|paradigm.shift|strategic|orchestration|status|systems)\b/.test(q)) {
      return 'Paradigm-Shift is a centralized strategic software system designed to coordinate and synchronize decentralized APIs across the entire eOzka ecosystem. It ensures absolute uptime, reliability, and security telemetry across all holding components.';
    }

    if (/\b(product|what do you make|what do you build|software|app|live)\b/.test(q)) {
      return 'We have four major live products: Stress-Calculator (biometric health tracking), Entab-D (AI tab grouping browser extension), AIris-Security (automated codebase vulnerability scanning), and Paradigm-Shift (strategic network orchestration). All products are fully open-source and Apache 2.0 licensed.';
    }

    if (/\b(mission|goal|purpose|conviction|vision)\b/.test(q)) {
      return 'Our mission is to close the gap between student potential and real-world impact — building software that extends human capability, starting with technology and rapidly expanding into healthcare solutions and agriculture-tech.';
    }

    if (/\b(moce|development house|ventures|development core)\b/.test(q)) {
      return 'MOCE (Mind of Core Engineering) is our primary software development subsidiary. It drives engineering excellence, constructs enterprise-ready solutions, and houses software like Entab-D and Stress-Calculator.';
    }

    if (/\b(mock|research arm|experimental|experimental arm)\b/.test(q)) {
      return 'MOCK is the specialized research, exploration, and bio-engineering arm of eOzka. It handles high-risk experimentation and builds technical architecture for our forthcoming expansions into automated health and agricultural robotics.';
    }

    if (/\b(tech stack|technology|react|next|typescript|css|html|python|dart)\b/.test(q)) {
      return 'Our ecosystem leverages a high-performance, modern tech stack: React, Next.js, and TypeScript for premium web experiences; Dart & Flutter for cross-platform mobile apps; Python for security heuristics; and pure, elegant CSS/Canvas for fluid, immersive visual motion.';
    }

    if (/\b(careers|join|hire|hiring|job|recruit|work with us|apply|collaborate)\b/.test(q)) {
      return 'We are always looking for ambitious, student-led builders, designers, and thinkers who challenge standard bounds. To collaborate, join, or present ideas to eOzka, use the "Connect" contact form on our landing page or email us at eozka.hq@gmail.com!';
    }

    if (/\b(name|origin|eozka mean|why eozka|etymology)\b/.test(q)) {
      return 'The name "eOzka" reflects digital discovery ("e-") combined with physical architectural framework. It is our ultimate design mark, representing the convergence of digital logic and raw structural impact.';
    }

    if (/\b(github|code|open.source|apache|license)\b/.test(q)) {
      return 'All eOzka products are fully open-source and available on GitHub (github.com/eOzkull) under the Apache 2.0 license. We believe in building in public and contributing to open-source software.';
    }

    if (/\b(instagram|linkedin|twitter|social|contact|email)\b/.test(q)) {
      return 'Connect with us: Instagram & X/Twitter (@weareeozka), LinkedIn (linkedin.com/company/eozka), or via direct email at eozka.hq@gmail.com. You can also send us a message using our on-page contact form!';
    }

    if (/\b(where|location|college|india|university)\b/.test(q)) {
      return 'eOzka is a decentralized, student-founded initiative operating across the digital landscape, born with the conviction to build software that goes far beyond classroom assignments.';
    }

    if (/\b(help|what can you do|command|options|ask)\b/.test(q)) {
      return "I can answer questions on: our **founder & executives** (Harsh, Krishyangi, Mrinal, Aman, Pratham, Mahin, Rishita), our **products** (*Stress-Calculator*, *Entab-D*, *AIris-Security*, *Paradigm-Shift*), our subsidiaries (**MOCE** & **MOCK**), our **tech stack**, **careers/joining**, or our **etymology & name**. Just type what you're curious about!";
    }

    return "I've processed your query, but my data resonance is low on that specific topic. Try asking about eOzka's mission, our founders, or products like Stress-Calculator and Entab-D.";
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
