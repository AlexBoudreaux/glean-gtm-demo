<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://www.netlify.com/v3/img/components/full-logo-dark.svg">
  <source media="(prefers-color-scheme: light)" srcset="https://www.netlify.com/v3/img/components/full-logo-light.svg">
  <img alt="Netlify" src="https://www.netlify.com/v3/img/components/full-logo-light.svg" height="40">
</picture>

# Sales Deck Generator

[![Netlify Status](https://api.netlify.com/api/v1/badges/642ddbcf-4f9b-4365-bbb3-931d38f7d8b3/deploy-status)](https://app.netlify.com/sites/lucent-zabaione-ae9488/deploys)
[![Built with Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)](https://nextjs.org)
[![Deployed on Netlify](https://img.shields.io/badge/Deployed%20on-Netlify-00C7B7?logo=netlify&logoColor=white)](https://lucent-zabaione-ae9488.netlify.app)

AI-powered sales deck generator that chains three Claude skills together to produce personalized presentations for prospects, deployed and hosted on Netlify.

**[View Live Demo](https://lucent-zabaione-ae9488.netlify.app)**

---

## What It Does

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│    /research    │────▶│    /position    │────▶│  /presentation  │
│                 │     │                 │     │                 │
│ Finds public    │     │ Converts to     │     │ Generates HTML  │
│ prospect info   │     │ sales strategy  │     │ slide deck      │
└─────────────────┘     └─────────────────┘     └─────────────────┘
                                                        │
                                                        ▼
                                               ┌─────────────────┐
                                               │  Gallery App    │
                                               │                 │
                                               │ Host & share    │
                                               │ presentations   │
                                               └─────────────────┘
```

**Three Claude skills work together:**

1. **Research** finds public info about a prospect (tech stack, funding, hiring signals, key personas)
2. **Position** converts research into Netlify-specific positioning (why Netlify, why now, which case studies)
3. **Presentation** generates a production-ready HTML sales deck with Reveal.js

The gallery app hosts the generated decks with PIN protection and shareable URLs.

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| **Framework** | Next.js 14 (App Router) |
| **Styling** | Tailwind CSS |
| **Animation** | Framer Motion |
| **Storage** | Netlify Blobs |
| **Slides** | Reveal.js |
| **Hosting** | Netlify |

---

## Quick Start

```bash
# Install dependencies
npm install

# Run with Netlify CLI (required for Blobs)
netlify dev

# Or just Next.js dev server (limited functionality)
npm run dev
```

The app runs on `localhost:8888` when using `netlify dev`.

### Building a Deck

```bash
# Generate deck from AI output
npx tsx scripts/build-deck.ts <slides-file> <output-file>

# Example
npx tsx scripts/build-deck.ts output/acme-slides.html output/acme-deck.html
```

---

## Project Structure

```
├── app/
│   ├── page.tsx              # Dashboard
│   ├── deck/[slug]/          # Deck viewer with PIN protection
│   ├── how-it-works/         # How the system works
│   └── architecture/         # Technical architecture
├── components/
│   ├── Dashboard.tsx         # Main gallery view
│   ├── DeckViewer.tsx        # Presentation viewer
│   └── ui/                   # Reusable components
├── scripts/
│   └── build-deck.ts         # Combines slides with Reveal.js
├── templates/
│   └── reveal-base.html      # Reveal.js boilerplate
└── docs/
    └── plans/                # Implementation plans
```

---

## Features

**Gallery Dashboard**
- Browse all generated presentations
- Search and sort by name or date
- Recently viewed section
- Delete decks

**Deck Viewer**
- PIN-protected access
- Full-screen presentation mode
- Keyboard navigation
- Shareable URLs

**Slide Generation**
- Reveal.js powered presentations
- Custom styles and scripts support
- Netlify brand theming

---

## Environment Variables

```bash
# .env.local
NEXT_PUBLIC_ADMIN_SECRET=your-admin-secret  # For delete operations
```

---

## Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Next.js dev server |
| `netlify dev` | Start with Netlify runtime (required for Blobs) |
| `npm run build` | Production build |
| `npm run lint` | Run ESLint |

---

## The Skill Chain

This architecture demonstrates modular AI tooling for GTM:

**Separation of Concerns**
Research, strategy, and output are distinct skills that can be improved independently.

**Reusability**
The same pattern works for competitive battlecards, proposal docs, and customer success playbooks.

**Agent Orchestration**
Shows how to chain specialized AI capabilities together for complex workflows.

---

## Brand

Built with Netlify's visual identity:

| Element | Value |
|---------|-------|
| Primary Blue | `#2E51ED` |
| Signature Teal | `#05BDBA` |
| Dark Background | `#181A1C` |
| Display Font | Inter |
| Body Font | Mulish |

---

<p align="center">
  <a href="https://www.netlify.com">
    <img src="https://www.netlify.com/v3/img/components/netlify-color-accent.svg" alt="Deploys by Netlify" height="40" />
  </a>
</p>

<p align="center">
  Built with Claude Code
</p>
