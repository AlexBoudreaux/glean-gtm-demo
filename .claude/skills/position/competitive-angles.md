# Competitive Positioning

How to position Glean against alternatives. Differentiate, don't bash.

---

## Not Every Conversation is Competitive

Sometimes the opportunity isn't replacing an existing solution. It's filling a gap.

**Examples of non-competitive opportunities:**
- Prospect uses basic SharePoint search and wants AI-powered results instead of keyword matching
- Prospect has no unified search at all (employees just ask each other or search individual tools)
- Prospect is building an AI strategy from scratch and needs a platform

In these cases, skip competitive positioning entirely. Focus on the value of having unified, AI-powered search and knowledge.

---

## vs Microsoft Copilot (M365 Copilot)

This is the most common competitive conversation. The core difference is ecosystem-agnostic (Glean) vs ecosystem-bound (Copilot).

### Key Differentiators
- **Ecosystem coverage**: Glean connects to 100+ apps with turnkey connectors. Copilot works best within Microsoft 365 and has limited third-party coverage.
- **Connector quality**: Glean connectors are ready to use. Copilot connectors "are frameworks that require developer work."
- **Permission handling**: Glean enforces document-level permissions across all sources in real time. Copilot depends on individual connectors and often only enforces data-source level permissions.
- **Model flexibility**: Glean supports 15+ LLMs via Model Hub with no vendor lock-in. Copilot is primarily Azure OpenAI.
- **Licensing simplicity**: Glean has simple per-seat pricing. Copilot has multiple licensing layers (M365 Copilot, Copilot Studio, Power Platforms, Dynamics add-ons).
- **Structured data**: Glean indexes CRM, HR, ticketing, custom Salesforce objects, Databricks, Snowflake, BigQuery. Copilot has no native support for Databricks, Workday, BigQuery, and can't index custom Salesforce objects.

### Messaging Approach
- "Most enterprises use 20-50+ different tools. Copilot covers the Microsoft slice. Glean covers everything."
- "Glean is ecosystem-agnostic. Your team isn't all-Microsoft, and your search shouldn't be either."
- "Simple per-seat pricing. No Copilot Studio, no Power Platform add-ons, no licensing maze."

### When They Say...

| Objection | Response |
|-----------|----------|
| "We're rolling out Copilot" | "Many customers run both. Copilot handles Microsoft apps, Glean connects the rest. They complement each other." |
| "Microsoft covers everything" | "Does your company only use Microsoft tools? Most enterprises have Slack, Salesforce, Jira, Confluence, Google Drive, and dozens more. Copilot can't search those natively." |
| "Copilot is cheaper because we already pay for M365" | "Copilot is an additional $30/user/month on top of M365. And it only covers Microsoft apps. Glean covers your entire tool stack for a similar per-seat cost." |
| "Our IT team prefers Microsoft" | "Glean deploys on Azure too (VPC option). IT gets the infrastructure they trust with coverage across all your tools." |

---

## vs Google (Vertex AI Search / Cloud Search)

Same story as Copilot but for Google-centric organizations.

### Key Differentiators
- Google Workspace-bound vs ecosystem-agnostic
- Limited connector coverage outside Google ecosystem
- Glean's Enterprise Graph provides deeper personalization

### Messaging Approach
- Same angle as Copilot: "Your company uses more than Google tools"
- "Google search is great for the internet. Glean search is built for your company."

---

## vs Moveworks

### Key Differentiators
- **Scope**: Glean is a horizontal platform (search + assistant + agents across all departments). Moveworks specializes in IT and HR support automation.
- **Search**: Glean provides universal enterprise search. Moveworks has narrower cross-tool search.
- **Expansion**: Glean serves sales, marketing, engineering, support, HR, and IT. Moveworks primarily serves IT helpdesk.

### Messaging Approach
- "If your only pain point is IT ticket volume, Moveworks might work. If you want AI for the entire company, that's Glean."
- "Glean starts with search and expands to agents. Moveworks starts with ticket automation and stays there."

### When They Say...

| Objection | Response |
|-----------|----------|
| "We use Moveworks for IT" | "Moveworks is good for IT tickets. Glean covers IT and every other department. Most of the value is in sales, support, engineering, and HR, not just IT." |
| "Moveworks has agents too" | "Moveworks agents automate IT workflows. Glean agents work across all connected tools and departments." |

---

## vs Coveo

### Key Differentiators
- **Focus**: Glean is internal enterprise search and AI. Coveo focuses on customer-facing search (ecommerce, support portals).
- **Best for**: Glean for employee productivity. Coveo for enhancing search within Salesforce, SAP, Adobe, or ecommerce sites.
- **AI scope**: Glean has full generative AI assistant and agents. Coveo focuses on ML-powered relevance and recommendations.

### Messaging Approach
- "Coveo is great for customer-facing search. Glean is built for your employees."
- "Different problems. Coveo improves your customers' search experience. Glean improves your employees' search experience."

### When They Say...

| Objection | Response |
|-----------|----------|
| "We already use Coveo" | "Coveo and Glean solve different problems. Coveo helps your customers find things. Glean helps your employees find things. They don't compete." |

---

## vs Elastic (Elasticsearch)

### Key Differentiators
- **Approach**: Glean is turnkey SaaS. Elastic is open-source search infrastructure that requires engineering to build, secure, and operate.
- **Setup**: Glean is ready in days. Elastic requires significant DevOps investment.
- **AI**: Glean has built-in AI assistant and agents. Elastic provides search infrastructure but AI must be built on top.

### Messaging Approach
- "Elastic is infrastructure. Glean is a product. Most companies don't want to build and maintain search clusters."
- "Your engineering team has better things to build than internal search infrastructure."

### When They Say...

| Objection | Response |
|-----------|----------|
| "We can build this ourselves with Elastic" | "You could. It'll take 6-12 months of engineering time, ongoing maintenance, and you still won't have permission-aware AI agents. Glean is live in days." |
| "Elastic is open source and free" | "The software is free. The engineering time to build, secure, maintain, and scale enterprise search on Elastic is not." |

---

## vs Guru

### Key Differentiators
- **Focus**: Glean searches across all enterprise data. Guru is a governed knowledge base with verification workflows.
- **Scope**: Glean connects to 100+ tools. Guru is a standalone knowledge management tool.
- **Best for**: Glean for finding information anywhere. Guru for teams that need authoritative, verified knowledge articles.

### Messaging Approach
- "Guru is great for curated knowledge. Glean searches everything, including Guru."
- "Most answers aren't in a knowledge base. They're in Slack threads, meeting notes, Jira tickets, and Google Docs."

---

## General Objection Handlers

| Objection | Response |
|-----------|----------|
| "We're happy with our current setup" | "That's what most customers say before they see that employees spend 2-3 hours per week just searching for information. Worth a 30-minute demo to see what you're missing." |
| "It's too expensive" | "At ~$50/seat/month, Glean typically delivers 5-17x ROI on time savings alone. Super.com saw 17x return. The cost of not having it is higher." |
| "Will people actually use it?" | "40% weekly active usage (2x industry benchmark). Upside hit 92% adoption. People use it because it actually works." |
| "What about data security?" | "Glean enforces the same permissions from your source systems in real time. SOC 2 Type II, GDPR, HIPAA, ISO 27001. LLM providers are contractually prevented from training on your data." |
| "We already have ChatGPT/generic AI" | "ChatGPT knows the internet. It doesn't know your company. Glean's AI is grounded in your actual documents, tickets, and conversations with permission enforcement." |
| "What about vendor lock-in?" | "Glean connects to your existing tools. If you stop using Glean, nothing changes about your data. And the Model Hub supports 15+ LLMs so you're not locked to one AI vendor either." |

---

## Competitor Detection to Positioning

| What They're Using | Positioning Angle |
|--------------------|-------------------|
| Microsoft Copilot | Ecosystem coverage, connector breadth, simple licensing |
| Moveworks | Horizontal platform vs IT-only, broader search |
| Coveo | Internal vs customer-facing, different problem |
| Elastic | Turnkey vs build-it-yourself, time to value |
| Guru | Search everything vs curated knowledge base |
| SharePoint/legacy intranet | Modern AI search, no migration needed |
| Nothing (ad hoc) | Unified search, productivity gains, stop relying on "just asking around" |
| ChatGPT/generic AI | Grounded in company data, permission-aware, enterprise-grade |

---

## When NOT to Compete

If the prospect already has a strong commitment to a competitor and is happy with it, don't force a competitive conversation. Instead:

- **Adjacent opportunities**: Can Glean cover departments or tools the current solution doesn't?
- **Complement**: Some prospects run Copilot for Microsoft apps and Glean for everything else
- **Timing**: Come back when they're up for renewal or hit the limitations of their current tool
