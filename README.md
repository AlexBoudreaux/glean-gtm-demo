# Sales Deck Generator

AI-powered sales deck generator that chains three Claude skills together to produce personalized presentations for prospects.

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
2. **Position** converts research into Glean-specific positioning (why Glean, why now, which case studies)
3. **Presentation** generates a production-ready HTML sales deck

The gallery app hosts the generated decks with PIN protection and shareable URLs.

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| **Framework** | Next.js 14 (App Router) |
| **Styling** | Tailwind CSS |
| **Animation** | Framer Motion |
| **Storage** | File-based (JSON + HTML) |
| **Slides** | Standalone HTML (custom engine) |
| **Hosting** | Vercel |

---

## Quick Start

```bash
npm install
npm run dev
```

The app runs on `localhost:3000`.

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
├── .claude/skills/
│   ├── research/             # Prospect research skill
│   ├── position/             # Sales positioning skill
│   └── presentation/         # Slide generation skill
├── scripts/
│   └── build-deck.ts         # Combines slides with template
├── templates/
│   └── reveal-base.html      # Reveal.js boilerplate
└── lib/
    └── storage.ts            # File-based storage
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
- Standalone HTML presentations
- Custom styles and scripts support
- Glean brand theming

---

## Environment Variables

```bash
# .env.local
ADMIN_SECRET=your-admin-secret        # For upload/delete API endpoints
GALLERY_URL=http://localhost:3000      # Gallery app URL (set to prod URL after deploy)
```

---

## Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Next.js dev server |
| `npm run build` | Production build |
| `npm run lint` | Run ESLint |

---

## Brand

| Element | Value |
|---------|-------|
| Primary Blue | `#343CED` |
| Accent Lime | `#D8FD49` |
| Dark Navy | `#050735` |
| Purple | `#8151F5` |
| Orange | `#FF7E4C` |
| Font | Inter |

---

<p align="center">
  Built with Claude Code
</p>
