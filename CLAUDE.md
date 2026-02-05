# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Demo project for Glean GTM Engineer role. Builds a system that chains three Claude skills (Research, Position, Presentation) to generate personalized sales decks, deployed on Vercel.

## Documentation Map

**Read these docs based on what you're doing:**

| When you need... | Read this |
|------------------|-----------|
| Full project context, strategic rationale, success criteria | `docs/PROJECT_SPEC.md` |
| Technical architecture, routes, API design, data flow | `docs/plans/2025-01-13-architecture-design.md` |
| Brand colors, typography, UI patterns, Tailwind config | `docs/design/glean-brand-assets.md` |
| Implementation steps for a specific phase | `docs/plans/phase-N-*.md` |

**When to read what:**
- Starting a new task? Read the relevant phase plan first
- Building UI? Read brand-assets.md before writing CSS
- Unsure about project goals or scope? Read PROJECT_SPEC.md
- Need to understand how pieces connect? Read architecture-design.md

## Commands

```bash
npm run dev      # Start dev server (localhost:3000)
npm run build    # Build for production
npm run lint     # ESLint

# Build presentation from AI-generated slides
npx tsx scripts/build-deck.ts <slides-file> <output-file>
# Example: npx tsx scripts/build-deck.ts output/acme-slides.html output/acme-deck.html
```

## How to Work in This Codebase

### Sub-agents
- Use Explore agent for open-ended searches ("find where X is handled")
- Use Bash with `run_in_background: true` for long-running processes (dev servers)
- Keep main context focused on implementation, offload exploration

### Tool Preferences
- Read over cat/head/tail
- Edit over sed/awk
- Glob over find
- Grep tool over bash grep/rg

### Testing Patterns
- Test APIs with curl before marking phase complete
- Use dev-browser for UI verification (especially Phase 3)
- Take screenshots to verify visual correctness

### Quality Gates (Must Pass Before Commit)
- `npm run lint` - no errors
- `npm run build` - builds successfully
- All curl tests from phase plan pass
- **Do NOT proceed if any gate fails. Fix first.**

### Updating Shared Knowledge
If you discover a reusable pattern (gotcha, convention, dependency quirk), add it to:
- `.ralph/progress.txt` "Codebase Patterns" section (for future iterations)
- This file (CLAUDE.md) if it's permanent knowledge

## Architecture

**Stack:** Next.js 14 (App Router) + Tailwind CSS, deployed on Vercel

**Key directories:**
- `app/` - Next.js pages (currently placeholder home page)
- `scripts/build-deck.ts` - Combines AI slide content with Reveal.js template
- `templates/reveal-base.html` - Reveal.js boilerplate with placeholders
- `output/` - Generated presentation files
- `docs/` - All project documentation
- `docs/plans/` - Implementation phase plans

**Planned routes:**
- `/` - Dashboard listing presentations
- `/deck/[slug]` - PIN-protected presentation view
- `/deck/[slug]/present` - Fullscreen presentation mode

**Slide generation flow:**
1. AI outputs slides with markers: `<!-- CUSTOM_STYLES -->`, `<!-- SLIDES -->`, `<!-- CUSTOM_SCRIPTS -->`
2. `build-deck.ts` parses these sections and injects into reveal-base.html template
3. Output is self-contained HTML presentation

**Brand colors:** Primary Blue (#343CED), Accent Lime (#D8FD49), Dark Navy (#050735)

## Browser Testing

Use dev-browser to test UI you build. Invoke it when:
- Finishing a UI feature and need to verify it works
- Debugging why something looks wrong or doesn't respond to clicks
- Building Playwright test scripts (use browser to understand the flow, then write deterministic test)

Don't use it for:
- Simple styling changes you can verify by reading code
- Backend-only changes

When writing Playwright tests, use dev-browser to explore the flow first, then output a `.spec.ts` file that can run without browser control.

## Plan Mode

- Make the plan extremely concise. Sacrifice grammar for the sake of concision.
- At the end of each plan, give me a list of unresolved questions to answer, if any.
