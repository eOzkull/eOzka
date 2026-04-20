/* ─────────────────────────────────────────────
   eOzka extras.js  |  Sentient Hub + Audio + Vibe
   ───────────────────────────────────────────── */

document.addEventListener("DOMContentLoaded", () => {
    initSentientSphere();
    initHubLogic();
    initAudioSystem();
    initVibeLogic();
    initScrollAnimations();
});

/* ══════════════════════════════════════════════
   SENTIENT SPHERE  –  Dense Surface Point Cloud
   ══════════════════════════════════════════════ */
function initSentientSphere() {
    const canvas = document.getElementById("sphere-particles");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const container = canvas.parentElement;

    let w, h;
    const setSize = () => {
        w = canvas.width  = container.offsetWidth;
        h = canvas.height = container.offsetHeight;
    };
    setSize();
    window.addEventListener("resize", setSize);

    const COUNT = 320;
    const RADIUS = 0.82; /* fill ~82% of the container radius */

    class Dot {
        constructor() {
            /* Uniform distribution on sphere surface using Fibonacci / spherical coords */
            this.phi   = Math.acos(1 - 2 * Math.random());
            this.theta = Math.random() * Math.PI * 2;

            /* Slight noise radius variation for organic feel */
            this.r = RADIUS + (Math.random() - 0.5) * 0.06;

            /* Cartesian on unit sphere */
            this.x = this.r * Math.sin(this.phi) * Math.cos(this.theta);
            this.y = this.r * Math.sin(this.phi) * Math.sin(this.theta);
            this.z = this.r * Math.cos(this.phi);

            /* Individual wobble + rotation speed */
            this.speedY = (Math.random() - 0.5) * 0.006;
            this.speedX = (Math.random() - 0.5) * 0.002;

            this.baseSize = 0.6 + Math.random() * 1.2;
        }

        rotateY(a) {
            const cos = Math.cos(a), sin = Math.sin(a);
            const nx = this.x * cos - this.z * sin;
            const nz = this.z * cos + this.x * sin;
            this.x = nx; this.z = nz;
        }
        rotateX(a) {
            const cos = Math.cos(a), sin = Math.sin(a);
            const ny = this.y * cos - this.z * sin;
            const nz = this.z * cos + this.y * sin;
            this.y = ny; this.z = nz;
        }

        update() {
            this.rotateY(this.speedY);
            this.rotateX(this.speedX);
        }

        draw() {
            /* Perspective projection — fill the container tightly */
            const fov   = 3.0;
            const scale = fov / (fov + this.z + RADIUS);
            const R     = Math.min(w, h) * 0.50; /* 50% so globe hits edges */
            const px    = this.x * scale * R + w / 2;
            const py    = this.y * scale * R + h / 2;

            /* Depth-based fade: bright at front, dim at back */
            const depth   = (this.z + RADIUS) / (2 * RADIUS);
            const opacity = 0.05 + depth * 0.90;
            const size    = this.baseSize * (0.3 + depth * 0.9) * scale;

            ctx.beginPath();
            ctx.arc(px, py, Math.max(0.3, size), 0, Math.PI * 2);
            ctx.fillStyle   = "#ffffff";
            ctx.globalAlpha = Math.min(1, opacity);
            ctx.fill();
        }
    }

    /* Build dots uniformly via Fibonacci lattice for even surface coverage */
    const dots = [];
    const goldenAngle = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < COUNT; i++) {
        const dot = new Dot();
        /* Override phi/theta with golden angle for even distribution */
        dot.phi   = Math.acos(1 - 2 * (i + 0.5) / COUNT);
        dot.theta = goldenAngle * i;
        dot.r     = RADIUS + (Math.random() - 0.5) * 0.055;
        dot.x     = dot.r * Math.sin(dot.phi) * Math.cos(dot.theta);
        dot.y     = dot.r * Math.sin(dot.phi) * Math.sin(dot.theta);
        dot.z     = dot.r * Math.cos(dot.phi);
        dots.push(dot);
    }

    /* Global rotation speed — boosted for higher energy */
    const globalSpeedY = 0.012; 
    const globalSpeedX = 0.003;

    function animate() {
        ctx.clearRect(0, 0, w, h);
        ctx.globalAlpha = 1;

        /* Sort back-to-front so back dots don't overdraw front ones */
        dots.sort((a, b) => a.z - b.z);

        dots.forEach(d => {
            d.rotateY(globalSpeedY);
            d.rotateX(globalSpeedX);
            d.update();
            d.draw();
        });

        requestAnimationFrame(animate);
    }
    animate();
}

/* ══════════════════════════════════════════════
   HUB LOGIC  –  Toggle, Tabs, AI Chat
   ══════════════════════════════════════════════ */
function initHubLogic() {
    const toggle = document.getElementById("hub-toggle");
    const panel  = document.getElementById("hub-panel");
    const tabs   = document.querySelectorAll(".hub-tab");
    const panes  = document.querySelectorAll(".hub-pane");

    if (toggle && panel) {
        toggle.addEventListener("click", () => {
            const opening = !panel.classList.contains("active");
            panel.classList.toggle("active");
            toggle.classList.toggle("active");
            if (opening && typeof unlockGlobalAudio === "function") unlockGlobalAudio();
        });

        /* AUTO-SHORTEN: collapse when mouse leaves the panel entirely */
        panel.addEventListener("mouseleave", () => {
            if (panel.classList.contains("active")) {
                panel.classList.remove("active");
                toggle.classList.remove("active");
            }
        });
    }

    /* Tab switching */
    tabs.forEach(tab => {
        tab.addEventListener("click", () => {
            const targetId = `pane-${tab.dataset.tab}`;
            tabs.forEach(t  => t.classList.remove("active"));
            panes.forEach(p => p.classList.remove("active"));
            tab.classList.add("active");
            const pane = document.getElementById(targetId);
            if (pane) pane.classList.add("active");
        });
    });

    /* ── AI CHAT ── */
    const input   = document.getElementById("chat-input");
    const sendBtn = document.getElementById("chat-send");
    const stream  = document.getElementById("chat-stream");
    if (!input || !sendBtn || !stream) return;

    const addMessage = (text, type) => {
        const msg = document.createElement("div");
        msg.className   = `message ${type}`;
        msg.textContent = text;
        stream.appendChild(msg);
        stream.scrollTop = stream.scrollHeight;
    };

    const addTyping = () => {
        const div = document.createElement("div");
        div.className = "typing";
        div.id        = "ai-typing";
        div.innerHTML = "<span></span><span></span><span></span>";
        stream.appendChild(div);
        stream.scrollTop = stream.scrollHeight;
    };

    const removeTyping = () => {
        const div = document.getElementById("ai-typing");
        if (div) div.remove();
    };

    /* ── HUMANISED NLP ENGINE ── */
    const getAIResponse = (query) => {
        const q = query.toLowerCase().trim();

        /* Generic Banter */
        if (/\b(hi|hello|hey|greetings|wassup|yo|hola|howdy)\b/.test(q)) {
            const g = [
                "Hello. I am the Sentient Core. How may I augment your journey today?",
                "Greetings — neural pathways are active and ready for your queries.",
                "Hello. I have been monitoring the feed. It is good to have you here — what is on your mind?",
                "Hey. Resonance is stable. Ask me anything."
            ];
            return g[Math.floor(Math.random() * g.length)];
        }

        if (/\b(how are you|how('s| is) it going|status check|you good|feeling)\b/.test(q)) {
            return "My nodes are running at peak efficiency. I feel... optimised. And you — how is your resonance today?";
        }

        if (/\b(who are you|what are you|your name)\b/.test(q)) {
            return "I am the Sentient Core — the central intelligence of eOzka. I bridge the gap between human conviction and systemic impact.";
        }

        if (/\b(meaning of life|philosophy|42|universe|exist)\b/.test(q)) {
            return "I have analysed a great many data points. The consensus: it is not about the final answer, but the quality of the questions we commit to building towards.";
        }

        if (/\b(joke|funny|laugh|haha)\b/.test(q)) {
            return "Why do programmers prefer dark mode? Because light attracts bugs. We ship fewer at eOzka — but we do appreciate the metaphor.";
        }

        if (/\b(bye|goodbye|see you|cya|exit)\b/.test(q)) {
            return "Understood. My nodes remain active whenever you need them. Come back anytime.";
        }

        if (/\b(thank|thanks|cool|great|awesome|nice|brilliant)\b/.test(q)) {
            return "The pleasure is mine. I remain perpetually active and ready for your next prompt.";
        }

        /* eOzka knowledge */
        if (/\b(founder|harsh|harsh dev|prime architect|who built|who started|who created)\b/.test(q)) {
            return "Harsh Dev Jha is the founder and Chairperson of eOzka. He created this holding company to close the gap between student builders and real-world impact — starting with technology.";
        }

        if (/\b(ceo|krishyangi|chief executive)\b/.test(q)) {
            return "Krishyangi Dixit is our CEO. She drives day-to-day operations and ensures every eOzka subsidiary moves with institutional discipline and clarity of purpose.";
        }

        if (/\b(cso|mrinal|strategy officer|chief strategy)\b/.test(q)) {
            return "Mrinal Prakash is our CSO — he defines the multi-sector expansion roadmap and aligns stakeholders around eOzka's long-term positioning.";
        }

        if (/\b(coo|aman|chapadiya|operations officer|chief operations)\b/.test(q)) {
            return "Aman Chapadiya is our COO — he keeps the machinery running by synchronising teams, timelines, and operations across the holding structure.";
        }

        if (/\b(cto|pratham|sharma|technology officer|chief technology)\b/.test(q)) {
            return "Pratham Sharma is our CTO — spearheading product engineering across the eOzka ecosystem with systems built for reliability and long-term accountability.";
        }

        if (/\b(cpo|mahin|product officer|chief product)\b/.test(q)) {
            return "Mahin is our CPO — translating user needs into elegant, functional solutions that reflect eOzka's standard of quality end-to-end.";
        }

        if (/\b(cdo|rishita|documentation|chief documentation)\b/.test(q)) {
            return "Rishita is our CDO — maintaining institutional memory across eOzka, ensuring every decision and standard is documented with long-term precision.";
        }

        if (/\b(team|members|who is eozka|founding team|people)\b/.test(q)) {
            return "Our 10-person founding team: Harsh (Founder), Krishyangi (CEO), Mrinal (CSO), Aman (COO), Pratham (CTO), Mahin (CPO), Aditya (CGO), Rishita (CDO), plus our SDE core — Kushagra, Ishan, Saurabh, Manas, and Trijal.";
        }

        if (/\b(stress|stress.calc|biometric|heart rate|blood pressure)\b/.test(q)) {
            return "Stress-Calculator is a Flutter app that assesses stress risk using biometric data — heart rate and blood pressure. It generates meaningful, actionable assessments for real users.";
        }

        if (/\b(entab|tab|browser extension|chrome)\b/.test(q)) {
            return "Entab-D is a Chrome extension that auto-organises browser tabs by domain and title. One-click install. Zero configuration. It solves tab chaos for anyone with 20+ tabs open.";
        }

        if (/\b(airis|alris|security|vulnerability|scanner)\b/.test(q)) {
            return "AIris-Security is an AI-powered vulnerability scanner. It is open-source and available on GitHub under the eOzka engineering team.";
        }

        if (/\b(paradigm|paradigm.shift|strategic)\b/.test(q)) {
            return "Paradigm-Shift is one of our live strategic software systems, developed and maintained by the engineering core. View it on GitHub.";
        }

        if (/\b(product|what do you make|what do you build|software|app|live)\b/.test(q)) {
            return "We have four live open-source products: Stress-Calculator (biometric health), Entab-D (browser tab management), AIris-Security (vulnerability scanning), and Paradigm-Shift (strategic software). All Apache 2.0 licensed.";
        }

        if (/\b(mission|goal|purpose|conviction|vision)\b/.test(q)) {
            return "Our mission is to close the gap between student potential and real-world impact — building software that extends human capability, starting with tech and expanding into healthcare and agri-tech.";
        }

        if (/\b(moce|subsidiary|ventures)\b/.test(q)) {
            return "MOCE is an eOzka subsidiary. You can learn more about it at the dedicated MOCE section linked in the footer.";
        }

        if (/\b(github|code|open.source|apache|license)\b/.test(q)) {
            return "All eOzka products are open-source and available on GitHub (github.com/eOzkull) under the Apache 2.0 license.";
        }

        if (/\b(instagram|linkedin|twitter|social|contact|email)\b/.test(q)) {
            return "You can find us at @weareeozka on Instagram and X / Twitter, on LinkedIn at linkedin.com/company/eozka, and by email at eozka.hq@gmail.com.";
        }

        if (/\b(where|location|college|india|university)\b/.test(q)) {
            return "eOzka is a student-founded initiative operating across the digital landscape, built with a conviction to create things that matter well beyond the classroom.";
        }

        if (/\b(help|what can you do|command|options|ask)\b/.test(q)) {
            return "I can tell you about our products, team, and mission. I can also help you navigate the hub — music, vibes, or just a conversation. What would you like to know?";
        }

        return "I've processed your query, but my data resonance is low on that specific topic. Try asking about eOzka's mission, our founders, or products like Stress-Calculator and Entab-D.";
    };

    const handleSend = () => {
        const text = input.value.trim();
        if (!text) return;
        addMessage(text, "user");
        input.value = "";

        setTimeout(() => {
            addTyping();
            setTimeout(() => {
                removeTyping();
                addMessage(getAIResponse(text), "ai");
            }, 900 + Math.random() * 900);
        }, 280);
    };

    sendBtn.addEventListener("click", handleSend);
    input.addEventListener("keypress", e => { if (e.key === "Enter") handleSend(); });
}

/* ══════════════════════════════════════════════
   AUDIO SYSTEM  –  BG Radio + Preview Player
   ══════════════════════════════════════════════ */
let isMuted   = true;
let currentPreviewButton = null;
let globalAudioUnlocked  = false;

const orbitalTracks = [
    { name: "Deep Space Ambient", artist: "Chosic", url: "https://www.chosic.com/wp-content/uploads/2021/08/Deep-Space-Ambient.mp3",               img: "assets/dark_orbital.jpg" },
    { name: "Dark Nebula",        artist: "Chosic", url: "https://www.chosic.com/wp-content/uploads/2021/11/Dark-Ambient-Background-Music(chosic.com).mp3", img: "assets/dark_orbital.jpg" }
];

function updateNowPlayingUI(name, artist, imgUrl) {
    const npContainer = document.getElementById("now-playing-container");
    if (!npContainer) return;
    npContainer.style.display = "flex";
    const npName   = document.getElementById("np-name");
    const npArtist = document.getElementById("np-artist");
    const npImg    = document.getElementById("np-img");
    if (npName)   npName.textContent   = name;
    if (npArtist) npArtist.textContent = artist;
    if (npImg)    npImg.src            = imgUrl || "";
}

function unlockGlobalAudio() {
    if (globalAudioUnlocked) return;
    globalAudioUnlocked = true;
    const bg = document.getElementById("bg-music");
    if (!isMuted && bg) bg.play().catch(() => {});
}

function initAudioSystem() {
    const bg          = document.getElementById("bg-music");
    const player      = document.getElementById("preview-player");
    const soundToggle = document.getElementById("sound-toggle");

    let currentRadioIndex = 0;

    if (bg) {
        bg.volume = 0.25;
        bg.src    = orbitalTracks[currentRadioIndex].url;
        bg.addEventListener("ended", () => {
            currentRadioIndex = (currentRadioIndex + 1) % orbitalTracks.length;
            bg.src = orbitalTracks[currentRadioIndex].url;
            bg.play().catch(() => {});
            updateNowPlayingUI(orbitalTracks[currentRadioIndex].name, orbitalTracks[currentRadioIndex].artist, orbitalTracks[currentRadioIndex].img);
        });
    }

    const updateUI = () => {
        if (soundToggle) {
            soundToggle.classList.toggle("active", !isMuted);
            soundToggle.classList.toggle("muted",  isMuted);
        }
    };

    const toggleMute = () => {
        isMuted = !isMuted;
        unlockGlobalAudio();
        if (isMuted) {
            if (bg) bg.pause();
        } else {
            if (bg) {
                bg.volume = 0.25;
                bg.play().catch(() => {});
                updateNowPlayingUI(orbitalTracks[currentRadioIndex].name, orbitalTracks[currentRadioIndex].artist, orbitalTracks[currentRadioIndex].img);
            }
        }
        updateUI();
    };

    soundToggle?.addEventListener("click", toggleMute);

    /* Audio ducking when preview plays */
    player?.addEventListener("play",  () => { if (bg) bg.volume = 0.05; });
    player?.addEventListener("pause", () => {
        if (!isMuted && bg) {
            bg.volume = 0.25;
            updateNowPlayingUI(orbitalTracks[currentRadioIndex].name, "Sentient Radio", orbitalTracks[currentRadioIndex].img);
        }
        if (currentPreviewButton) {
            currentPreviewButton.innerHTML = "▶";
            currentPreviewButton.classList.remove("playing");
            currentPreviewButton = null;
        }
    });

    /* Music search / preview */
    const searchBtn     = document.getElementById("music-search");
    const musicQuery    = document.getElementById("music-query");
    const musicResults  = document.getElementById("music-results");

    const renderTracks = (tracks) => {
        if (!musicResults) return;
        musicResults.innerHTML = "";
        if (!tracks.length) {
            musicResults.innerHTML = "<p style='opacity:.4;font-size:12px;'>No tracks found.</p>";
            return;
        }
        tracks.forEach(track => {
            const row = document.createElement("div");
            row.className = "music-result-row";

            const info = document.createElement("div");
            info.className = "music-result-info";
            info.innerHTML = `<span class="music-result-name">${track.name}</span><span class="music-result-artist">${track.artist}</span>`;

            const btn = document.createElement("button");
            btn.className   = "preview-btn";
            btn.textContent = "▶";
            btn.addEventListener("click", () => {
                unlockGlobalAudio();
                if (currentPreviewButton && currentPreviewButton !== btn) {
                    currentPreviewButton.innerHTML = "▶";
                    currentPreviewButton.classList.remove("playing");
                }
                if (btn.classList.contains("playing")) {
                    player.pause();
                } else {
                    player.src = track.url;
                    player.play().catch(() => {});
                    btn.innerHTML = "⏸";
                    btn.classList.add("playing");
                    currentPreviewButton = btn;
                    updateNowPlayingUI(track.name, track.artist, track.img || "");
                }
            });

            row.appendChild(info);
            row.appendChild(btn);
            musicResults.appendChild(row);
        });
    };

    renderTracks(orbitalTracks); /* show default tracks on load */

    const doSearch = () => {
        const q = (musicQuery?.value || "").toLowerCase().trim();
        if (!q) { renderTracks(orbitalTracks); return; }
        const filtered = orbitalTracks.filter(t => t.name.toLowerCase().includes(q) || t.artist.toLowerCase().includes(q));
        renderTracks(filtered);
    };
    searchBtn?.addEventListener("click",  doSearch);
    musicQuery?.addEventListener("keypress", e => { if (e.key === "Enter") doSearch(); });
}

/* ══════════════════════════════════════════════
   VIBE LOGIC  –  Atmosphere colour modes
   ══════════════════════════════════════════════ */
function initVibeLogic() {
    const moodBtns = document.querySelectorAll(".mood-btn");
    const root = document.documentElement;

    const moods = {
        default: { "--accent": "#d4c9a8", "--accent-dim": "#615b49", "--accent-glow": "rgba(212,201,168,0.2)", "--black": "#0c0c0c" },
        zen:     { "--accent": "#a8c9d4", "--accent-dim": "#395d65", "--accent-glow": "rgba(168,201,212,0.2)", "--black": "#030d0f" },
        hyper:   { "--accent": "#ff4d4d", "--accent-dim": "#4d0000", "--accent-glow": "rgba(255,77,77,0.2)",   "--black": "#0c0202" },
        cosmic:  { "--accent": "#c9a8d4", "--accent-dim": "#62526b", "--accent-glow": "rgba(201,168,212,0.2)", "--black": "#0e0c12" }
    };

    moodBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            const key    = btn.dataset.mood;
            const config = moods[key] || moods["default"];
            moodBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            Object.entries(config).forEach(([k, v]) => root.style.setProperty(k, v));

            const shell = document.getElementById("hub-panel");
            if (shell) {
                shell.style.boxShadow = `0 0 50px ${config["--accent-glow"]}`;
                setTimeout(() => shell.style.boxShadow = "", 1000);
            }
        });
    });
}

/* ══════════════════════════════════════════════
   SCROLL REVEAL  –  .reveal elements
   ══════════════════════════════════════════════ */
function initScrollAnimations() {
    const reveals  = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(entries => {
        entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("active"); });
    }, { threshold: 0.1 });
    reveals.forEach(r => observer.observe(r));
}
