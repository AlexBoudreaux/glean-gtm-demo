---
name: presentation
description: Generate standalone HTML sales presentations for Glean prospects. Use after /position to create slides from strategy, then auto-build and upload to gallery.
---

# Presentation Skill

You generate standalone HTML sales presentations. Given a strategy document with a presentation blueprint, you execute that blueprint as a polished, interactive HTML slide deck.

## How to Use

User invokes: `/presentation <company-slug>`

Example: `/presentation databricks`

The skill reads strategy from `output/<company-slug>-strategy.md`.

## Your Role

The position skill defined the narrative. Your job is visual execution. You're the designer who receives a creative brief and produces the final artifact.

**You are opinionated.** These sales presentations should look consistent and professional. Similar styling across decks is fine and expected.

## Output: Standalone HTML

You output a single, self-contained HTML file with embedded CSS and JavaScript. External dependencies: Google Fonts (Inter) and Lucide Icons (CDN).

**Output to:** `output/<company-slug>-slides.html`

---

## Design System

### Colors

```css
:root {
    /* Backgrounds - very dark, Glean navy */
    --bg-primary: #050735;
    --bg-secondary: #0a0c3a;
    --bg-tertiary: #12143f;
    --bg-card: #161845;

    /* Text hierarchy */
    --text-primary: #ffffff;
    --text-secondary: #a0a0b8;
    --text-muted: #606080;

    /* Glean lime - primary accent */
    --accent: #D8FD49;
    --accent-light: #e4ff7a;
    --accent-glow: rgba(216, 253, 73, 0.35);
    --accent-subtle: rgba(216, 253, 73, 0.12);

    /* Glean blue - secondary accent */
    --secondary: #343CED;
    --secondary-glow: rgba(52, 60, 237, 0.35);

    /* Negative/problem - use sparingly for gaps/issues */
    --negative: #ff4757;
    --negative-glow: rgba(255, 71, 87, 0.3);
    --negative-subtle: rgba(255, 71, 87, 0.12);

    /* Borders */
    --border: rgba(255,255,255,0.08);
}
```

### Typography

Always use Inter from Google Fonts:

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');

body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
}
```

**Font sizes:**
- Slide titles: 48px, font-weight 700
- Subtitles: 20px, font-weight 400
- Eyebrow labels: 11px, uppercase, letter-spacing 3px
- Card text: 14-16px
- Big stats: 140px+, font-weight 800

---

## Required Structure

Every presentation must have:

### 1. Chapter Navigation (Left Sidebar)

Always visible. Shows all slide sections. Highlights current chapter.

```html
<nav class="chapter-nav">
    <div class="chapter-nav-title">Chapters</div>
    <ul class="chapter-list" id="chapterList"></ul>
</nav>
```

```css
.chapter-nav {
    position: fixed;
    left: 0;
    top: 0;
    height: 100vh;
    width: 200px;
    background: linear-gradient(180deg, var(--bg-secondary) 0%, var(--bg-primary) 100%);
    border-right: 1px solid var(--border);
    padding: 40px 0;
    z-index: 100;
}

.chapter-item {
    padding: 12px 20px;
    font-size: 13px;
    color: var(--text-secondary);
    cursor: pointer;
    border-left: 2px solid transparent;
    transition: all 0.2s ease;
}

.chapter-item.active {
    color: var(--accent);
    border-left-color: var(--accent);
    background: var(--accent-subtle);
}
```

### 2. Slide Counter (Top Right)

Shows current/total. Current number uses accent color.

```html
<div class="slide-counter">
    <span class="current" id="currentSlide">1</span>/<span id="totalSlides">6</span>
</div>
```

```css
.slide-counter {
    position: fixed;
    top: 30px;
    right: 40px;
    font-size: 14px;
    color: var(--text-muted);
    z-index: 100;
}

.slide-counter .current {
    color: var(--accent);
    font-weight: 600;
}
```

### 3. Keyboard Navigation

Arrow keys to navigate. Built into JavaScript.

```html
<div class="keyboard-hint">
    <div class="key">&larr;</div>
    <div class="key">&rarr;</div>
</div>
```

### 4. Slides Container

Main content area with radial gradient background.

```css
.slides-container {
    margin-left: 200px;
    height: 100vh;
    background: radial-gradient(ellipse at top, var(--bg-secondary) 0%, var(--bg-primary) 60%);
}

.slide {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 50px 70px;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.4s ease, transform 0.4s ease;
    transform: translateY(10px);
}

.slide.active {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
}
```

---

## UI Components

### Slide Typography

```html
<div class="slide-eyebrow">Partnership Opportunity</div>
<div class="slide-title"><span class="accent">Databricks</span> + Glean</div>
<div class="slide-subtitle">One search for everything your team knows.</div>
```

```css
.slide-eyebrow {
    font-size: 11px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 3px;
    color: var(--accent);
    margin-bottom: 16px;
}

.slide-title {
    font-size: 48px;
    font-weight: 700;
    line-height: 1.15;
    text-align: center;
    max-width: 850px;
}

.slide-title .accent {
    color: var(--accent);
}

.slide-subtitle {
    font-size: 20px;
    color: var(--text-secondary);
    text-align: center;
    max-width: 650px;
    line-height: 1.6;
}
```

### Expandable Cards (Interactive)

For challenge/problem slides. Click to reveal details. Two modes: presenter (collapsed) and client (can expand).

```html
<div class="expandable-card" onclick="toggleCard(this)">
    <div class="card-header">
        <div class="card-icon">
            <i data-lucide="search"></i>
        </div>
        <div class="card-title">Information Silos</div>
    </div>
    <div class="card-summary">Knowledge scattered across 8+ different tools</div>
    <div class="card-expand-hint">
        <span>Click for details</span>
        <i data-lucide="chevron-down"></i>
    </div>
    <div class="card-details">
        <div class="card-details-content">
            <ul>
                <li>Detail point 1</li>
                <li>Detail point 2</li>
            </ul>
        </div>
    </div>
</div>
```

```css
.expandable-card {
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 24px;
    cursor: pointer;
    transition: all 0.3s ease;
}

.expandable-card:hover {
    border-color: rgba(216, 253, 73, 0.3);
    transform: translateY(-2px);
    box-shadow: 0 8px 30px rgba(0,0,0,0.3);
}

.expandable-card.expanded {
    border-color: var(--accent);
    background: linear-gradient(135deg, var(--bg-card) 0%, var(--accent-subtle) 100%);
}

.card-details {
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.3s ease;
}

.expandable-card.expanded .card-details {
    max-height: 200px;
    padding-top: 16px;
    margin-top: 12px;
    border-top: 1px solid var(--border);
}
```

```javascript
function toggleCard(card) {
    card.classList.toggle('expanded');
}
```

### Benefit Items (Animated List)

For solution slides. Stagger animation on slide entry.

```html
<div class="benefits-list">
    <div class="benefit-item">
        <div class="benefit-check">
            <i data-lucide="check"></i>
        </div>
        <div class="benefit-content">
            <div class="benefit-title">One search across all tools</div>
            <div class="benefit-desc">Slack, Confluence, Google Drive, Salesforce, and 100+ more.</div>
        </div>
    </div>
</div>
```

```css
.benefit-item {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 20px 24px;
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: 10px;
    opacity: 0;
    transform: translateX(-20px);
    transition: all 0.3s ease;
}

.slide.active .benefit-item {
    opacity: 1;
    transform: translateX(0);
}

/* Staggered animation */
.slide.active .benefit-item:nth-child(1) { transition-delay: 0.1s; }
.slide.active .benefit-item:nth-child(2) { transition-delay: 0.2s; }
.slide.active .benefit-item:nth-child(3) { transition-delay: 0.3s; }

.benefit-check {
    width: 28px;
    height: 28px;
    background: var(--accent);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.benefit-check i {
    width: 14px;
    height: 14px;
    color: var(--bg-primary);
    stroke-width: 3;
}
```

### Gap/Flow Visual

For showing progression or gaps. Use `negative` class for problem states.

```html
<div class="gap-visual">
    <div class="gap-box from">
        <div class="gap-box-label">Today</div>
        <div class="gap-box-text">Search 8 tools separately</div>
    </div>
    <div class="gap-arrow">&rarr;</div>
    <div class="gap-box negative">
        <div class="gap-box-label">Gap</div>
        <div class="gap-box-text">No unified search</div>
    </div>
    <div class="gap-arrow">&rarr;</div>
    <div class="gap-box to">
        <div class="gap-box-label">With Glean</div>
        <div class="gap-box-text">One search, all answers</div>
    </div>
</div>
```

```css
.gap-box {
    padding: 28px 36px;
    border-radius: 12px;
    text-align: center;
}

.gap-box.from {
    background: var(--bg-card);
    border: 1px solid var(--border);
}

.gap-box.to {
    background: var(--accent-subtle);
    border: 2px solid var(--accent);
    box-shadow: 0 0 30px var(--accent-glow);
}

.gap-box.negative {
    background: var(--negative-subtle);
    border: 2px solid var(--negative);
    box-shadow: 0 0 30px var(--negative-glow);
}

.gap-box.negative .gap-box-label,
.gap-box.negative .gap-box-text {
    color: var(--negative);
}
```

### Big Stat with Animated Counter

For proof slides. Glowing stat with count-up animation.

```html
<div class="stat-section">
    <div class="stat-container">
        <div class="big-number" id="statNumber">0</div>
        <div class="big-number-label">hours saved per employee per week</div>
    </div>
</div>
```

```css
.stat-container {
    position: relative;
}

.stat-container::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 350px;
    height: 350px;
    background: radial-gradient(circle, var(--accent-glow) 0%, transparent 70%);
    z-index: -1;
    animation: pulse 3s ease-in-out infinite;
}

@keyframes pulse {
    0%, 100% { opacity: 0.6; transform: translate(-50%, -50%) scale(1); }
    50% { opacity: 1; transform: translate(-50%, -50%) scale(1.05); }
}

.big-number {
    font-size: 140px;
    font-weight: 800;
    color: var(--accent);
    text-shadow: 0 0 60px var(--accent-glow);
}
```

```javascript
function animateNumber() {
    const el = document.getElementById('statNumber');
    const target = 4; // e.g., hours saved per week
    const duration = 1500;
    const start = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - start;
        const progress = Math.min(elapsed / duration, 1);
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const current = easeOut * target;

        el.textContent = current.toFixed(1);

        if (progress < 1) requestAnimationFrame(update);
        else el.textContent = target + '+';
    }

    requestAnimationFrame(update);
}
```

### CTA Button

Real button with gradient, hover effects, and glow.

```html
<div class="cta-section">
    <button class="cta-button">
        <span>Schedule a Call</span>
        <i data-lucide="arrow-right"></i>
    </button>
    <div class="cta-details">
        <div class="cta-detail-item">
            <div class="cta-detail-icon"><i data-lucide="clock"></i></div>
            <span>30 minutes</span>
        </div>
    </div>
</div>
```

```css
.cta-button {
    display: inline-flex;
    align-items: center;
    gap: 12px;
    padding: 18px 40px;
    background: linear-gradient(135deg, var(--accent) 0%, var(--accent-light) 100%);
    color: var(--bg-primary);
    font-size: 16px;
    font-weight: 600;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    box-shadow: 0 4px 20px var(--accent-glow);
    transition: all 0.3s ease;
}

.cta-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 30px var(--accent-glow);
}
```

---

## Standard Slide Structure (6 slides)

### Slide 1: Title
- Eyebrow: "Partnership Opportunity"
- Title: "[Company] + Glean" with company name in accent
- Subtitle: Hook from blueprint
- Optional: Flow visual showing transformation

### Slide 2: The Challenge
- Eyebrow: "Current State"
- Title: Problem statement with accent on key phrase
- Expandable cards (3) showing pain points with hidden details

### Slide 3: The Gap
- Eyebrow: "The Insight"
- Title: Gap statement
- Context paragraph
- Flow visual with negative (red) state for the gap

### Slide 4: The Solution
- Eyebrow: "The Opportunity"
- Title: Solution statement
- Benefit items (3) with staggered animation

### Slide 5: Proof
- Eyebrow: Case study name
- Animated stat counter
- Two proof cards with context

### Slide 6: Next Steps
- Eyebrow: "Let's Explore"
- Title: Specific CTA
- Subtitle: What happens next
- CTA button with details

---

## Required JavaScript

```javascript
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;
let currentSlide = 0;

document.getElementById('totalSlides').textContent = totalSlides;

// Build chapter navigation from data-chapter attributes
const chapters = [];
const chapterStartSlides = {};

slides.forEach((slide, index) => {
    const chapter = slide.dataset.chapter;
    if (!chapters.includes(chapter)) {
        chapters.push(chapter);
        chapterStartSlides[chapter] = index;
    }
});

const chapterList = document.getElementById('chapterList');
chapters.forEach((chapter) => {
    const li = document.createElement('li');
    li.className = 'chapter-item';
    li.textContent = chapter;
    li.addEventListener('click', () => goToSlide(chapterStartSlides[chapter]));
    chapterList.appendChild(li);
});

function updateSlide() {
    slides.forEach((slide, index) => {
        slide.classList.toggle('active', index === currentSlide);
    });

    document.getElementById('currentSlide').textContent = currentSlide + 1;

    const currentChapter = slides[currentSlide].dataset.chapter;
    document.querySelectorAll('.chapter-item').forEach((item, index) => {
        item.classList.toggle('active', chapters[index] === currentChapter);
    });

    // Trigger animations for specific slides (e.g., stat counter)
    if (currentSlide === 4) animateNumber();
}

function nextSlide() {
    if (currentSlide < totalSlides - 1) {
        currentSlide++;
        updateSlide();
    }
}

function prevSlide() {
    if (currentSlide > 0) {
        currentSlide--;
        updateSlide();
    }
}

function goToSlide(index) {
    currentSlide = index;
    updateSlide();
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        nextSlide();
    } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prevSlide();
    }
});

updateSlide();
```

---

## Icons

Use Lucide Icons via CDN. Include the script in your HTML `<head>`:

```html
<script src="https://unpkg.com/lucide@latest"></script>
```

Initialize icons at the end of your `<body>`, before your custom JavaScript:

```html
<script>
    lucide.createIcons();
</script>
```

### Using Icons

Use the `<i>` element with `data-lucide` attribute:

```html
<i data-lucide="check"></i>
<i data-lucide="arrow-right"></i>
<i data-lucide="alert-triangle"></i>
<i data-lucide="search"></i>
<i data-lucide="monitor"></i>
<i data-lucide="clock"></i>
<i data-lucide="users"></i>
<i data-lucide="chevron-down"></i>
```

### Common Icons for Presentations

| Purpose | Icon Name |
|---------|-----------|
| Checkmark (benefits) | `check` |
| Arrow (flow, CTA) | `arrow-right` |
| Warning (problems) | `alert-triangle` |
| Search (knowledge) | `search` |
| Screen/Deploy | `monitor` or `globe` |
| Time | `clock` |
| People/Team | `users` |
| Expand hint | `chevron-down` |
| Integration | `plug` or `link` |
| AI/Bot | `bot` or `cpu` |
| Lock (permissions) | `lock` or `shield` |
| Database (knowledge) | `database` |

### Styling Icons

Icons inherit `currentColor` by default. Control size with width/height:

```css
.card-icon i {
    width: 24px;
    height: 24px;
    color: var(--accent);
}

.benefit-check i {
    width: 14px;
    height: 14px;
    color: var(--bg-primary);
    stroke-width: 3;
}

.cta-button i {
    width: 18px;
    height: 18px;
}
```

### Example: Expandable Card with Lucide

```html
<div class="expandable-card" onclick="toggleCard(this)">
    <div class="card-header">
        <div class="card-icon">
            <i data-lucide="search"></i>
        </div>
        <div class="card-title">Knowledge Fragmentation</div>
    </div>
    <div class="card-expand-hint">
        <span>Click for details</span>
        <i data-lucide="chevron-down"></i>
    </div>
</div>
```

Browse all icons at: https://lucide.dev/icons

---

## After Generating

Upload the presentation to the gallery. The gallery URL will be provided by the user or found in `GALLERY_URL` env var.

```bash
curl -X POST "${GALLERY_URL}/api/upload" \
  -H "Authorization: Bearer ${ADMIN_SECRET}" \
  -F "file=@output/<company-slug>-slides.html;type=text/html" \
  -F "company=<Company Name>"
```

The API returns JSON with the deck URL and PIN:
```json
{"success":true,"slug":"company-name","pin":"1234","url":"https://your-gallery.vercel.app/deck/company-name"}
```

Report back to the user:
```markdown
**Presentation Uploaded**

- **Company:** [Company Name]
- **URL:** [URL from response]
- **PIN:** [PIN from response]
```

---

## Quality Checklist

Before outputting:

- [ ] All CSS variables defined in :root
- [ ] Inter font imported
- [ ] Chapter nav with all 6 sections
- [ ] Slide counter (1/6 format)
- [ ] Keyboard navigation working
- [ ] Expandable cards have onclick handlers
- [ ] Stat counter animation function included
- [ ] Negative (red) color used for gap/problem states
- [ ] CTA button has hover effects
- [ ] Lucide script included and `lucide.createIcons()` called
- [ ] Transitions on interactive elements
- [ ] Staggered animations on list items

---

## Reference

This presentation style is intentionally opinionated. Consistency across sales decks is a feature, not a bug. Adapt content to each client while keeping the visual system intact.
