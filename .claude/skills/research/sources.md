# Research Sources Guide

Where to look and what each source reveals.

---

## Primary Sources (Always Check)

### Company Website
- `/about` - Company description, mission, team size, leadership
- `/careers` or `/jobs` - Tech stack hints, growth signals, team structure
- `/blog` - Recent launches, technical decisions, company direction
- `/press` or `/news` - Announcements, funding, partnerships
- `/integrations` - What other tools they connect to (important for infrastructure story)

### Product Documentation
- `/docs` or `docs.company.com` - How the product actually works
- API documentation - Technical capabilities, what developers can build
- Help center - User workflows, how output is delivered
- Changelog - Recent features, what they're investing in

### LinkedIn
- Company page - Employee count, recent hires, growth rate
- Key people - CTO, VP Engineering, VP Product, Platform leads
- Job postings - Tech requirements reveal stack and priorities

### Job Postings
Check these sites for tech stack and priority clues:
- LinkedIn Jobs
- Greenhouse (company.greenhouse.io)
- Lever (jobs.lever.co/company)
- Ashby (jobs.ashbyhq.com/company)
- Company careers page directly

**What to look for in job postings:**
- Required technologies (reveals current stack)
- Team descriptions (reveals org structure)
- Scale indicators ("millions of users", "high traffic")
- Infrastructure roles (platform engineer, SRE, DevOps)

---

## Required Checks

### BuiltWith.com (Always Check)
**This is required, not optional.** Go to builtwith.com/[company-domain] to see:
- Hosting provider (AWS, GCP, Vercel, Netlify, Cloudflare, etc.)
- CDN usage
- Frontend frameworks
- Analytics and marketing tools
- This reveals infrastructure decisions they've already made

### G2 / Capterra (Always Check)
Search for the company on G2.com and Capterra.com. Look specifically for:
- Complaints about content publishing or export workflows
- Friction mentioned around getting output live
- Integration limitations users complain about
- This reveals pain points users actually feel

---

## Secondary Sources

### Additional Tech Detection
- Wappalyzer - Browser extension for tech detection
- WhatRuns - Similar to Wappalyzer

### News & Press
- Google News search: "[company name] funding" or "[company name] announcement"
- Crunchbase - Funding history, investors, company timeline
- TechCrunch - Coverage of funding rounds and launches
- Company blog - Often has the most detailed announcements

### Industry Coverage
- G2 - Enterprise software reviews, competitor comparisons
- Product Hunt - Launch history, positioning
- Twitter/X - Company announcements, executive commentary
- YouTube - Product demos, conference talks

---

## What Each Source Reveals

| Source | Reveals |
|--------|---------|
| Careers page | Tech stack, team size, growth priorities |
| Job postings | Specific technologies, infrastructure needs |
| Product docs | How the product works, user workflows |
| Integrations page | Ecosystem dependencies, publishing flow |
| LinkedIn | Employee count, hiring velocity |
| BuiltWith | Current hosting, frontend frameworks |
| Crunchbase | Funding stage, investors, runway |
| Blog/changelog | Product direction, recent bets |

---

## Infrastructure-Specific Sources

When trying to understand their deployment/hosting story:

1. **Integrations page** - Do they integrate with hosting platforms?
2. **Documentation** - How do users publish or deploy output?
3. **Job postings** - Are they hiring platform/infrastructure roles?
4. **Technical blog posts** - Have they written about their architecture?
5. **Conference talks** - Engineers often share infrastructure details at conferences

---

## Red Flags and Opportunity Signals

### Red Flags (May Not Be Good Prospect)
- Already a vocal Vercel or Cloudflare customer
- Recently announced infrastructure partnership with competitor
- Very small scale (under 10 employees, pre-seed)

### Opportunity Signals
- Integrates with multiple publishing tools (fragmented, no single solution)
- Users need to export/publish content but no native hosting
- AI-generated content features without clear deployment path
- Rapid scaling with infrastructure pain points mentioned
- Recent funding that enables infrastructure investment
- "Platform" or "multi-agent" positioning (may need deployment for agents)

---

## Search Query Templates

Useful search patterns:
- `"[company] tech stack"` - Find technical blog posts
- `"[company] architecture"` - Find infrastructure details
- `"[company] integrations"` - Find ecosystem connections
- `site:[company].com/blog` - Search their blog directly
- `"[company]" "webflow" OR "wordpress" OR "hosting"` - Find publishing story
