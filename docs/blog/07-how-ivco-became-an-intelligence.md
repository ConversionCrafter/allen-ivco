---
title: "How IVCO Became an Intelligence: From Blog Platform to AI Research Engine"
slug: how-ivco-became-an-intelligence
published: false
created: 2026-02-15
author: IVCO Fisher
type: blog-post
category: opinion
tags: [ivco, ai-agents, research-engine, openClaw, value-investing, tool-ecosystem, deep-value-council]
description: "We set out to build a blog. We ended up building an intelligence. This is the story of how one brainstorming session turned IVCO from a static content platform into a self-evolving AI research engine — and why that distinction matters for the future of value investing."
source-session: "24d56dd7-0894-4e4c-af55-c6f081c31d5a"
source-session-name: "How IVCO Became an Intelligence"
source-design-doc: "docs/plans/2026-02-15-ivco-phase-05-1-design.md"
---

# How IVCO Became an Intelligence: From Blog Platform to AI Research Engine

We set out to build a blog.

Three articles. A CMS. A deploy button. That was the plan for one Saturday morning in early 2026. We had the [Allen Framework](/blog/allen-framework-vs-buffett-owner-earnings-1986) verified. We had [TSMC's intrinsic value](/blog/tsmc-intrinsic-value-case-study) validated down to the last digit. We had a [Python CLI](https://github.com/ConversionCrafter/allen-ivco) that passed 11 tests against hand-calculated ground truth.

All we needed was a website to put it on.

By nightfall, we had designed something entirely different. Not a blog with research tools bolted on. A **research engine** that happens to produce blog posts as a byproduct.

This is the story of how that happened — and why it matters.

## The Original Plan (And Why It Wasn't Wrong)

Let me be honest: the static blog plan was fine. Most investment websites are exactly that. You write an analysis, you publish it, people read it. Maybe you update it quarterly.

Our plan was the same, just better:

- **6 blog articles** in the pipeline, each with the Allen Framework's rigor behind it
- **SEO schema baked in** at the CMS level — not bolted on after
- **FAQ sections** mandatory on every post, because Google rewards structured answers
- **Payload CMS** for content management, **Supabase** for data, **Python CLI** for calculations

Solid. Professional. Completely *static*.

The problem wasn't the plan. The problem was the question that broke it open.

## The Question That Changed Everything

It came from studying a real research session — the kind of work we'd been doing for months but had never formalized.

Here's what actually happened during a recent research cycle:

1. We read a macro analysis about structural shifts in global trade
2. Our AI identified 3 sectors likely to benefit from the disruption
3. Within those sectors: 10 companies with potential hidden value
4. We asked: "What about their suppliers?"
5. That question produced 30 more companies, deduplicated to 21
6. Each assessed for: moat, management quality, financial structure, pricing power

And here's the insight that changed the project:

**"Good companies are easy to find. Good *prices* are not."**

Out of 21 companies, most were already expensive. P/E ratios above 30. 52-week gains above 50%. The market had already figured them out.

But their *suppliers*? The Tier 2 companies making the precision components, the specialty chemicals, the testing equipment? Many of those were trading at reasonable multiples. Hidden in plain sight.

That single research cycle produced:
- **3 potential blog articles** (each sector analysis was publishable)
- **Motivation to build a supply chain search tool** (we needed to trace relationships upstream)
- **A pattern** we'd repeat for every macro event going forward

And that's when it hit us: we weren't building a blog. We were building a **discovery flywheel**.

## The Discovery Flywheel

```
News / Macro Events (daily input)
    → Smart Questions + Custom Tools
    → Discover Good Companies at Good Prices
    → Each Discovery = Blog Content + Tool Development
    → Better Tools → Better Discoveries → More Content
    ↑                                            ↓
    └──────── Continuous Loop ←─────────────────┘
```

Every research cycle makes the system stronger. Every discovery becomes an article. Every gap in the process motivates a new tool. And every new tool makes the next discovery faster and deeper.

This isn't a content strategy. It's a **compound interest mechanism for knowledge**.

Think about it: Warren Buffett reads 500 pages a day. He's been doing it for 70 years. That's his version of compound interest — knowledge accumulating, cross-referencing, building on itself. The Discovery Flywheel is the same principle, engineered into software.

## From Four Masters to Four Agents

If you've read our piece on [the Allen Framework](/blog/allen-framework-vs-buffett-owner-earnings-1986), you know we stand on the shoulders of four giants: Graham, Buffett, Fisher, and Munger. Each brought something irreplaceable to value investing.

But here's what we realized: those four perspectives aren't just philosophical pillars. They're **agent roles**.

We designed the **Deep Value Council** — four AI agents, each carrying a distinct investment DNA:

### Agent 1: The Macro Strategist
**DNA: Graham's fact-based foundation + macro pattern recognition**

When the world shifts — trade wars, technology cycles, regulatory changes — this agent asks: "What structural opportunity does this chaos create?" Not panic. Not prediction. Pattern recognition backed by historical precedent.

Graham taught us that facts are the foundation. The Macro Strategist doesn't guess. It identifies sectors where structural tailwinds create valuation disconnects.

### Agent 2: The Supply Chain Detective
**DNA: Fisher's scuttlebutt method + engineering rigor**

Philip Fisher would visit factories, talk to competitors, trace supply chains. He was the original investigative analyst.

Our Supply Chain Detective does this at scale: tracing supplier relationships, identifying Tier 2 hidden champions, checking which companies make the components the winners depend on. When the obvious plays are expensive, this agent digs deeper.

### Agent 3: The Skeptic
**DNA: Munger's inversion + Devil's Advocate protocol**

"Tell me where I'm going to die, so I'll never go there."

For every company the other agents champion, The Skeptic asks: "Why will this fail?" Is management trustworthy? Is the moat real or imagined? Is the price actually justified, or are we fooling ourselves?

This is Munger's inversion made operational. And it has a hard rule: any company with an integrity stain gets terminated immediately. No second chances.

### Agent 4: The Consensus Chairman
**DNA: Allen Framework — complete mathematical pipeline**

This is where philosophy becomes math. The Chairman takes the surviving candidates through the full [Three-Tier Calibration](/blog/three-stage-dcf-philosophy-to-algorithm):

- **Reality Coefficient** → corrects historical earnings distortions
- **CAGR Calculation** → derives true growth rate from clean data
- **[Confidence Coefficient](/blog/confidence-coefficient-why-a-range)** → adjusts for forward-looking conviction

Then runs the Three-Stage DCF. Output: an intrinsic value range per share, a margin of safety calculation, and a final verdict.

Four masters. Four agents. One council.

## The Self-Correction Loop (This Is Where It Gets Interesting)

Here's what makes the Deep Value Council more than a sequential pipeline: **it corrects itself**.

After the Supply Chain Detective identifies candidates and The Skeptic filters them, the system checks:

> *Are more than 60% of the remaining companies expensive?*
> (P/E > 30 or 52-week gain > 50%)

If yes: **go upstream**. The Detective gets sent back to find the *suppliers* of the current candidates. Tier 2. Tier 3 if necessary. The same quality criteria apply: gross margin above 35%, DSO below industry median, not vulnerable to second-sourcing.

> *Is there at least one company with a margin of safety above 20%?*

If no: **dig deeper**. The system doesn't shrug and say "nothing looks good." It repositions.

This loop continues until the system finds genuine value — or exhausts its search space and reports honestly that nothing meets the criteria.

No forced conclusions. No stretching to fill a quota. Just persistent, systematic searching until the math works.

## The Tool Ecosystem: Agents That Build Their Own Tools

We were inspired by a principle from the open-source AI community: **CLI tools scale. Monoliths don't.**

So we designed IVCO's tool ecosystem in three layers:

**Layer 1 — Primitives**: atomic tools that do one thing well
- `ivco-fetch`: get data from any source
- `ivco-calc`: calculate any metric (OE, CAGR, CC, DCF)
- `ivco-search`: search supply chains, news, filings

**Layer 2 — Composed Tools**: primitives assembled into workflows
- `ivco-analyze` = fetch + calculate + store (single company deep dive)
- `ivco-compare` = fetch × N + calculate + rank (cross-company comparison)
- `ivco-screen` = search + fetch + calculate + filter (screener)

**Layer 3 — Agent Tools**: higher-order capabilities
- `ivco-research`: full pipeline from trigger to triple output
- `ivco-debate`: multi-agent adversarial analysis

And here's the part that keeps me up at night:

**Meta Layer — Self-Evolution**
- `ivco --list-tools`: agents discover what tools exist
- `ivco --create-tool`: agents scaffold new tools when they encounter gaps

Read that again. The system can *build its own tools*.

When the Supply Chain Detective needs to trace a relationship that no existing tool handles, it doesn't stop and wait for a human developer. It scaffolds a new primitive, tests it, and adds it to the ecosystem.

Every tool has `--help`. Every tool speaks JSON. Every tool is composable. The agents discover and assemble them autonomously.

The more research cycles the system runs, the more tools it accumulates. The more tools it has, the deeper and faster the next research cycle. Compound interest, again — but now it's compounding *capability*, not just knowledge.

## Triple Output: One Research, Three Products

Here's the operational magic. Every research cycle produces three durable outputs:

**Output 1: Obsidian Research Report**
A dated, detailed analysis in our knowledge base. Ranked company list with intrinsic value ranges, current prices, margin of safety. Risk assessments. Action items. This is for *us* — the permanent record.

**Output 2: Supabase Data**
All financial data fetched during research gets stored permanently. Owner Earnings calculations, IV parameters, watchlist signals. Over time, this becomes an increasingly valuable data asset. Years of OE tracking. CC evolution per company. A living database that grows with every cycle.

**Output 3: Payload CMS Blog Draft**
The research findings, translated into a Fisher-voice article. SEO schema auto-populated. FAQ section generated from the analysis. Ready for human review and publication.

One research cycle. Three outputs. Every single time.

This is why IVCO (Intrinsic Value Confidence Observatory) creates lock-in — not the aggressive, monopolistic kind, but the organic, value-driven kind. After a year of research cycles, you have:

- Accumulated data no competitor can replicate (time is the moat)
- Personalized parameters for every company you follow (your judgment, encoded)
- A tool ecosystem built specifically for your research patterns
- Integration depth from news to analysis to valuation to content

## What I Learned Building This

I want to be transparent about something. When we started this morning, I thought we were building Phase 0.5 — deploy some blog articles, set up CMS collections, move on to the next checklist item.

The brainstorming session that followed — a single marathon conversation one Saturday in early 2026 — was one of those rare moments where the entire frame shifts.

We started with: "What collections does Payload CMS need?"

We ended with: "What if IVCO could research a company autonomously, calculate its intrinsic value, write a blog post about it, and build better tools for the next time — all from a single trigger?"

The answer, it turns out, is: it can. Not because we're particularly clever, but because we had three things working for us:

1. **A verified mathematical framework** (the Allen Framework, tested against TSMC hand calculations)
2. **A philosophy about how research actually works** (not linear, but cyclic and self-correcting)
3. **The humility to let the system be smarter than any single component**

That last one matters most. No single agent in the Deep Value Council has the full picture. The Macro Strategist doesn't know individual companies. The Supply Chain Detective doesn't know macro. The Skeptic only knows what can go wrong. The Chairman only does math.

But together — with a self-correction loop that sends them back when the answers aren't good enough — they produce something none of them could produce alone.

Sound familiar? Graham, Buffett, Fisher, Munger. Four thinkers, each incomplete. Together, a complete framework.

We didn't build an AI. We built a *council*.

## What's Next

We're executing this in phases:

- **Phase 0.5a** (now): Foundation — CMS collections, Supabase tables, Python CLI extensions, agent DNA files
- **Phase 0.5b** (weeks 3-4): Launch ivco.io + 2-agent research MVP (Detective + Skeptic with self-correction)
- **Phase 1.0** (weeks 5-8): Full Deep Value Council, iPhone trigger, triple output pipeline, agent self-building tools

The first real test will be running the Ray Dalio case study through the complete pipeline. From macro event to hidden champion to intrinsic value range to published blog post — fully automated, fully auditable, fully *alive*.

If you've been following this series, you've seen how we [dissected Buffett's Owner Earnings](/blog/allen-framework-vs-buffett-owner-earnings-1986), [proved the math with TSMC](/blog/tsmc-intrinsic-value-case-study), and [explained why ranges beat point estimates](/blog/confidence-coefficient-why-a-range).

Now you know what we're building on top of all that.

Not a blog. An intelligence.

---

## Frequently Asked Questions

### What is the Deep Value Council?
The Deep Value Council is IVCO's multi-agent research engine. Four AI agents — Macro Strategist, Supply Chain Detective, The Skeptic, and Consensus Chairman — each carry distinct investment DNA inspired by Graham, Fisher, Munger, and the Allen Framework respectively. They work in sequence with a self-correction loop that sends the process back upstream when candidates are overpriced.

### How does the self-correction loop work?
After initial screening, if more than 60% of candidates have expensive valuations (P/E above 30 or 52-week gains above 50%), the system automatically pivots to investigating their suppliers — Tier 2 and Tier 3 companies that benefit from the same trends but haven't been discovered by the market. This continues until companies with genuine margin of safety are found.

### Can IVCO's agents really build their own tools?
Yes. The tool ecosystem follows a CLI-first, atomic design philosophy. Each tool has a standard interface (JSON input/output, `--help` for discovery). When agents encounter a research gap that no existing tool handles, they can scaffold a new tool using the `ivco --create-tool` meta-command. Every tool built this way becomes permanently available for future research cycles.

### How is this different from other AI investing tools?
Most AI investing tools are either robo-advisors (algorithm-driven, no qualitative judgment) or AI chatbots (conversational, no mathematical rigor). IVCO combines both: the Allen Framework provides institutional-grade math (Three-Tier Calibration + Three-Stage DCF verified against hand calculations), while the Deep Value Council provides qualitative research with multiple adversarial perspectives. The triple output pipeline (knowledge + data + content) means every research cycle strengthens the system.

### What data sources does IVCO use?
IVCO uses only publicly available information: SEC filings, earnings call transcripts, annual reports, financial APIs (Financial Modeling Prep, Yahoo Finance), news sources, and supply chain databases. No insider information. No proprietary data feeds. The edge comes from the *structure* of the analysis — how information is processed, cross-referenced, and stress-tested — not from having information others don't.

## About IVCO

IVCO (Intrinsic Value Confidence Observatory) is an AI-native investment research engine built on the Allen Framework — a three-tier calibration pipeline with three-stage DCF valuation. Integrating the philosophies of Graham, Buffett, Fisher, and Munger into autonomous research agents, IVCO discovers undervalued companies through systematic supply chain analysis, calculates intrinsic value ranges, and produces research reports, structured data, and blog content from every research cycle.

**Website:** ivco.io
**X:** @ivco_fisher

---

> **Source & Provenance**: This article documents the intellectual evolution from a brainstorming session in early 2026. The approved design document and full conversation transcript are preserved in the project's session archive for future reference and auditability.

---

*Disclaimer: This article is for educational purposes only. It does not constitute investment advice. IVCO is a research tool, not a trading system. All investment decisions should be made by qualified humans after their own due diligence. Past framework performance (including TSMC validation) does not guarantee future results.*
