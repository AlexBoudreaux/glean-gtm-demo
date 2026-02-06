<p align="center">
  <img src="public/glean-logo.svg" alt="Glean" width="60" />
</p>

<h1 align="center">Glean Sales Deck Generator</h1>

<p align="center">
  AI-powered pipeline that researches prospects, builds sales strategy, and generates personalized slide decks. All in one conversation with Claude.
</p>

<p align="center">
  <a href="https://glean-gtm-demo.vercel.app/">https://glean-gtm-demo.vercel.app</a> &middot;
  <a href="https://glean-gtm-demo.vercel.app/how-it-works">How It Works</a> &middot;
  <a href="https://glean-gtm-demo.vercel.app/architecture">Architecture</a>
</p>

---

## How It Works

Three Claude Code skills chain together to go from "company name" to "shareable sales deck" in a single session.

```
  /research              /position             /presentation
 ┌──────────┐          ┌──────────┐          ┌──────────┐
 │ Prospect │  ──────▶ │  Sales   │  ──────▶ │  HTML    │
 │ Intel    │          │ Strategy │          │  Deck    │
 └──────────┘          └──────────┘          └──────────┘
  Scrapes public        Maps to Glean         Generates a
  info, tech stack,     value props,          standalone
  hiring signals        case studies          presentation
                                                   │
                                                   ▼
                                            ┌──────────┐
                                            │ Gallery  │
                                            │ App      │
                                            └──────────┘
                                             PIN-protected
                                             shareable URLs
```

Each skill feeds its output into the next. The final deck uploads to the gallery automatically.

---

## Quick Start

```bash
npm install
npm run dev
```

Open [localhost:3000](http://localhost:3000).

### Generate a Deck

Inside Claude Code, run the three skills in sequence:

```
/research Acme Corp
/position
/presentation
```

Or build from existing slide HTML:

```bash
npx tsx scripts/build-deck.ts output/acme-slides.html output/acme-deck.html
```

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 14 (App Router) |
| Styling | Tailwind CSS |
| Animation | Framer Motion |
| Storage | Vercel Blob |
| Slides | Standalone HTML (custom engine) |
| Hosting | Vercel |

---

## Features

**Gallery Dashboard** with search, sort, and recently viewed tracking.

**PIN-Protected Decks** with shareable URLs and full-screen presentation mode.

**Standalone Slides** that work offline as self-contained HTML files with Glean branding.

---

## Project Structure

```
app/                        → Next.js pages
  deck/[slug]/              → PIN-gated deck viewer
  how-it-works/             → System explainer
  architecture/             → Technical architecture

components/                 → React components

.claude/skills/
  research/                 → Prospect research skill
  position/                 → Sales positioning skill
  presentation/             → Slide generation skill

scripts/build-deck.ts       → Combines slides with template
templates/reveal-base.html  → Reveal.js boilerplate
lib/storage.ts              → Vercel Blob storage
```

---

## Environment Variables

```bash
ADMIN_SECRET=...            # Auth for upload/delete APIs
GALLERY_URL=...             # App URL (localhost or prod)
BLOB_READ_WRITE_TOKEN=...   # Vercel Blob token
```

---

## Commands

| Command | What it does |
|---------|-------------|
| `npm run dev` | Dev server |
| `npm run build` | Production build |
| `npm run lint` | ESLint |

