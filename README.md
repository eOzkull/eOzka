# eOzka Web Portal — Core Node & Venture Hub

Welcome to the official repository of **eOzka**, a next-generation venture studio and software engineering ecosystem. This portal is built with a focus on speed, typography, semantic markup, and a state-of-the-art glassmorphic design system.

---

## 🚀 Technical Stack Overview

This application is built using the following modern web technologies:

*   **Core Framework**: [Next.js 16.2 (App Router)](https://nextjs.org/) & [React 19](https://react.dev/)
*   **Compilation Engine**: [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack) (Next.js high-speed dev bundler)
*   **Type Safety**: [TypeScript](https://www.typescriptlang.org/)
*   **Aesthetics & Styling**: Vanilla CSS (Global Variables, HSL Color Palettes, Custom keyframe animations, responsive grid engines)
*   **SEO Optimization**: Schema.org JSON-LD structured data graph schemas & Open Graph metadata
*   **Formatting Tools**: Prettier & ESLint with a post-build HTML View-Source Beautification script

---

## 📂 Project Directory Structure

Below is an overview of the codebase file layout, highlighting what each file and directory is responsible for:

```text
eozka/
├── .env.local                    # Local environment secrets (Discord Webhooks, Telegram API, etc.)
├── next.config.ts                # Next.js compiler options and React compiler configurations
├── package.json                  # Node dependencies, build task hooks, and linting rules
├── tsconfig.json                 # Strict TypeScript compiler options
├── public/                       # Static assets (images, logos, vector packages)
│   ├── favicon/                  # Active favicon directory (favicon.ico, favicon.png)
├── scripts/
│   └── beautify-html.js          # Postbuild HTML formatter to ensure beautiful View-Source outputs
└── src/
    ├── app/                      # Next.js App Router root & route pages
    │   ├── api/
    │   │   └── contact/
    │   │       └── route.ts      # Server-side Contact Form API (Discord + Telegram + Resend Email)
    │   ├── blog/
    │   │   ├── ai-vulnerability-scanner/
    │   │   │   └── page.tsx      # Case Study: NLP AppSec machine-learning scanner blog post
    │   │   ├── flutter-health-tech/
    │   │   │   └── page.tsx      # Case Study: Biometric telemetry GC benchmarks in Flutter blog post
    │   │   ├── BlogClient.tsx    # Client-side blogs grid & search component
    │   │   └── page.tsx          # Engineering blog main page (with schema graphs)
    │   ├── social/
    │   │   ├── SocialClient.tsx  # Redirection routing component for social networks
    │   │   └── page.tsx          # Redirection portal index
    │   ├── ventures/
    │   │   └── moce/
    │   │       ├── MoceClient.tsx# Visual node components for the MOCE subsidiary page
    │   │       └── page.tsx      # Technical subsidiary index page
    │   ├── globals.css           # Global fallback css resets
    │   ├── style.css             # Main styling tokens (glowing borders, dark themes, fonts)
    │   ├── extras.css            # Advanced subpage positioning styles
    │   ├── moce.css              # Custom layout rules for the MOCE subsidiary page
    │   ├── layout.tsx            # Root HTML template, Google Analytics injection, global schema
    │   └── page.tsx              # Main homepage (Hero, Ventures, Team, and Contact Form)
    │
    ├── components/               # Isolated, reusable React components
    │   ├── BackgroundParticles.js# Ambient dynamic matrix particle background
    │   ├── CustomCursor.tsx      # Liquid glassmorphic custom desktop cursor
    │   ├── Footer.tsx            # Footer containing copyright schemas and links
    │   ├── GoogleAnalytics.tsx   # Client-side Google Analytics Route Tracker for Next.js SPA transitions
    │   ├── Navbar.tsx            # Stateful responsive drawer menu (Mobile + Desktop layouts)
    │   ├── ScrollProgressBar.tsx # Top bar indicating user reading progress
    │   ├── SentientHub.tsx       # Core homepage interactive center dashboard
    │   └── SentientOrb.tsx       # Interactive glowing orb element
    │
    └── contexts/                 # Global React Context providers
        └── AudioContext.tsx      # Cyber background soundscape and hover sound controller
```

---

## ⚡ Core Systems & Custom Features

### 1. Unified Contact Routing System
The API handler at `src/app/api/contact/route.ts` manages visitor submissions, executing server-side input validation and email checks. The route forwards messages via multiple active streams:
1.  **Discord Webhook integration**: If `DISCORD_WEBHOOK_URL` is set, submissions are automatically pushed as a high-fidelity rich embed message.
2.  **Telegram Chatbot alerts**: Sends instant telegram chat notifications.
3.  **Resend HTML Email delivery**: Dispatches clean cyber-cards directly to `eozka.hq@gmail.com`.
4.  **Local Terminal logging**: Gracefully fallbacks to local logs if no environment keys are set, ensuring easy testing.

### 2. Google Analytics SPA Route Tracking
Next.js utilizes client-side routing, meaning a traditional analytic header script will only register the first page view. To resolve this:
- `src/components/GoogleAnalytics.tsx` hooks into Next.js router events (`usePathname` and `useSearchParams`).
- Every subpage click (e.g., navigating to `/blog` or `/ventures/moce`) is captured and sent directly to Google Analytics via `gtag` configuration updates.
- Wrapped in a `<Suspense>` boundary to guarantee zero impact on static site generation (SSG) performance.

### 3. Post-Build HTML Beautifier
To match our extreme standard of visual quality, the repository runs `scripts/beautify-html.js` immediately following Next.js compilation (`npm run build`). This script targets all generated static HTML pages and reformats their DOM structures so that choosing **"View Source"** in a browser displays perfectly indented HTML code.

---

## ⚙️ Environment Configuration

Create a `.env.local` file in the project root directory to configure integrations. Here are the variables you can define:

```env
# ── DISCORD INTEGRATION ──
DISCORD_WEBHOOK_URL=https://discord.com/api/webhooks/YOUR_CHANNEL_ID/YOUR_TOKEN

# ── TELEGRAM BOT INTEGRATION ──
TELEGRAM_BOT_TOKEN=your_telegram_bot_token
TELEGRAM_CHAT_ID=your_telegram_channel_or_chat_id

# ── RESEND EMAIL INTEGRATION ──
RESEND_API_KEY=re_your_secret_resend_api_key

# ── GOOGLE ANALYTICS MEASUREMENT ID ──
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

---

## 🛠️ Developer Setup & Commands

To set up the development environment locally:

### 1. Install Dependencies
```bash
npm install
```

### 2. Spin up Local Dev Server (With Turbopack)
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view your changes dynamically.

### 3. Build & Beautify for Production
This command compiles the TypeScript codebase, runs strict type checking, exports static pages, and formats the output HTML:
```bash
npm run build
```

### 4. Format files with Prettier
To format the source code with our styling standards:
```bash
npm run format
```

---

## 🤝 Contribution Guidelines

We love contributions! Follow these steps to submit additions to eOzka:

### Code Quality Checklist
Before submitting a pull request, ensure your branch satisfies the following rules:

1.  **Strict Typing**: Do not use `any` typings unless strictly required. Declare custom React interfaces or types.
2.  **CSS Tokens**: Always use CSS variables declared in [style.css](file:///c:/Users/USER/Desktop/Extras/eozka/src/app/style.css) (such as `var(--accent)`, `var(--bg-black)`, and `var(--card-bg)`) rather than injecting hardcoded hex codes.
3.  **Semantic HTML**: Ensure all input fields have explicit `<label>` bindings, and maintain a clear single `<h1>` hierarchy on every new subpage.
4.  **Schema Validity**: If creating new case-studies or directories, declare corresponding Schema.org JSON-LD script blocks to ensure search engine readability.
5.  **Build Verification**: Always run `npm run build` locally to verify that there are no compiler warnings or build-time exceptions before pushing.

### Submitting Changes
1. Fork the repository and create your feature branch: `git checkout -b feature/amazing-feature`.
2. Commit your modifications: `git commit -m "feat: integrate cool animations"`.
3. Push to your branch: `git push origin feature/amazing-feature`.
4. Open a Pull Request for code review!
