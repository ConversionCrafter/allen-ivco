# IVCO Phase 0.5-1 Design: Research Engine + Tool Ecosystem + Content Platform

> Brainstorming Session: 2026-02-15
> Participants: Allen (Decision Maker) + Jane (Architect)
> Status: **Approved by Allen**

---

## 1. Vision

IVCO is not a blog platform with research tools. IVCO is an **AI-native investment research engine** — a self-evolving tool ecosystem where agents think with Allen's DNA, calculate with Allen Framework math, and produce three outputs per research cycle: knowledge (Obsidian), data (Supabase), and content (Payload CMS Blog).

The goal: an investment research system so integrated and powerful that once you use it, you can't go back. Like a corporate analyst's briefing notebook + a securities trader's terminal, combined into one AI-native experience.

### The Discovery Flywheel

```
News/Articles (daily input)
    → Smart Questions + Custom Tools
    → Discover Good Companies at Good Prices
    → Each Discovery = Blog Content + Tool Development Motivation
    → Better Tools → Better Discoveries → More Content
    ↑                                          ↓
    └──────── Continuous Loop ←────────────────┘
```

### Ray Dalio Case Study (The Pattern We're Systematizing)

1. Allen reads a Dalio article about world order breaking down
2. Claude Desktop analyzes → identifies 3 golden sectors → 10 hidden champions
3. Allen asks "what about their suppliers?" → 30 companies → deduplicated to 21
4. Each company assessed for: moat, management quality, financial structure, pricing power
5. Key insight: "Good companies are easy to find. Good PRICES are not."
6. Famous companies (NVDA, Tesla) have sky-high P/E → market already priced in
7. The real opportunity: suppliers and suppliers' suppliers (Tier 2) that benefit equally but aren't yet discovered by the market
8. This entire analysis = 3 blog articles + motivation to build supply chain research tools

---

## 2. Design Philosophy (OpenClaw-Inspired)

> "MCP can't scale. CLI can scale." — Peter Steinberger

Inspired by OpenClaw's CLI-first, atomic tool design philosophy:

1. **Everything is a File**: All communication, state, memory, and task queues exist as JSON or Markdown files. Full observability and recoverability.
2. **Atomic CLI Tools**: No monoliths. Each tool does one thing well. JSON I/O. Unix pipes for composition.
3. **Agent-Discoverable**: Every tool has `--help`. Agents discover and compose tools autonomously.
4. **Self-Evolving**: When agents encounter a gap, they can scaffold and build new tools. The ecosystem grows with use.
5. **Local-First, Cloud-Enabled**: Core computation on Mac. Data sync via iCloud/Git. Deploy via Vercel/Cloudflare.
6. **Institutional Rigor**: Not LLM hallucinations — real financial data + Allen Framework math for quantitative verification.

---

## 3. Architecture

### 3.1 Tool Ecosystem (Three-Layer, OpenClaw-Inspired)

```
Layer 1: Core Primitives (like read/write/edit/bash)
─────────────────────────────────────────────────
ivco-fetch     Fetch data from any source (APIs, web, files)
ivco-calc      Calculate any metric (OE, CAGR, CC, DCF, DSO, margins)
ivco-store     Write to any destination (Supabase, Obsidian, Payload)
ivco-search    Search anything (supply chain, news, filings, earnings calls)
ivco-watch     Monitor any signal (price, earnings dates, management changes)

Layer 2: Composed Tools (atomic tools assembled)
─────────────────────────────────────────────────
ivco-analyze   = fetch + calc + store (single company deep dive)
ivco-compare   = fetch × N + calc + rank (cross-company comparison)
ivco-screen    = search + fetch + calc + filter (screener)
ivco-report    = analyze + format (Obsidian/Blog output)
ivco-alert     = watch + notify (price/event alerts)

Layer 3: Agent Tools (agent-driven higher-order capabilities)
─────────────────────────────────────────────────
ivco-debate    Multi-agent adversarial generation (research engine core)
ivco-research  Full research pipeline (trigger → debate → triple output)
ivco-brief     Daily briefing (news + watchlist + signals)

Meta: Ecosystem Self-Evolution
─────────────────────────────────────────────────
ivco --list-tools     Discover all available tools
ivco --create-tool    Scaffold a new tool
ivco --help           Universal help for any tool
```

### 3.2 Research Engine: The Deep Value Council

**4 Agents + Self-Correcting Loop + Allen Framework Math**

```
iPhone → LLMInbox → n8n Trigger
                        ↓
        ┌───────────────────────────────┐
        │  Round 1: Macro Strategist     │
        │  DNA: Allen + Graham           │
        │  "What structural opportunity  │
        │   does this chaos create?"     │
        │  Output: 3 golden sectors      │
        └───────────┬───────────────────┘
                    ↓
        ┌───────────────────────────────┐
        │  Round 2: Supply Chain         │
        │  Detective                     │
        │  DNA: Chi + Fisher             │
        │  "Who supplies the winners?    │
        │   Where are hidden champions?" │
        │  Tool: ivco-search (Tavily)    │
        │  Output: 20-30 candidates      │
        └───────────┬───────────────────┘
                    ↓
        ┌───────────────────────────────┐
        │  Round 3: The Skeptic          │
        │  DNA: Munger + Jane            │
        │  "Why will this fail?          │
        │   Is the price justified?"     │
        │  Tool: ivco-fetch + ivco-calc  │
        │  Output: Cut to 6-10 + IV     │
        └───────────┬───────────────────┘
                    ↓
          ┌─── Self-Correction Loop ───┐
          │                            │
          │  ">60% too expensive?"     │
          │  YES → Go upstream Tier 2  │──→ Back to Round 2
          │  NO  → Proceed             │
          │                            │
          │  "Margin of Safety >20%?"  │
          │  YES → Proceed to Round 4  │
          │  NO  → Dig deeper          │
          │                            │
          └────────────────────────────┘
                    ↓
        ┌───────────────────────────────┐
        │  Round 4: Consensus Chairman   │
        │  DNA: Allen Framework Complete │
        │  Three-Tier Calibration:       │
        │    RC → CAGR → CC             │
        │  Three-Stage DCF: IV Range     │
        │  Output: Final List + Triple   │
        └───────────┬───────────────────┘
                    ↓
            ┌───────┼───────┐
            ↓       ↓       ↓
        Obsidian  Supabase  Payload CMS
        Report    Data      Blog Draft
```

### 3.3 Agent DNA Injection

Each agent's System Prompt = 3 layers:

```
config/agents/
├── shared/
│   ├── allen-framework.md        Four Masters + Three-Tier Calibration + Three-Stage DCF
│   ├── evaluation-criteria.md    Good company: moat + management + financials + efficiency
│   └── good-price-logic.md       Self-correction trigger + supply chain upstream logic
├── macro-strategist.md           Allen's macro thinking + Graham's fact-based foundation
├── supply-chain-detective.md     Chi's engineering rigor + Fisher's scuttlebutt + recursive search
├── the-skeptic.md                Jane's Devil's Advocate DNA + Munger's inversion + one-strike rule
└── consensus-chairman.md         Allen Framework math + final verdict + action items
```

**Self-Correction Protocol (embedded in good-price-logic.md):**

1. Query P/E ratio and 52-week performance for each candidate
2. If >60% of candidates have P/E > 30 or 52-week gain > 50%:
   → Trigger: "Market has fully priced in. Go upstream."
   → Focus: Suppliers with gross margin > 35%, DSO < industry median, not easily squeezed by second-source strategies
3. Repeat until companies with Margin of Safety > 20% are found
4. Apply Allen Framework for final IV calculation

### 3.4 Triple Output Pipeline

**Output 1: Obsidian Research Report** → `research/ivco/{date}-{topic}.md`
- Macro analysis, company deep dive, risk assessment, final verdict
- Ranked company list with IV Range, Current Price, Margin of Safety
- Action items (Obsidian task format)

**Output 2: Supabase Data** → `company_financials` + `historical_owner_earnings`
- All financial data fetched during research stored permanently
- IV calculations and parameters preserved
- Data accumulates with each research cycle

**Output 3: Payload CMS Blog Draft** → Posts Collection (status: draft)
- Fisher-voice article derived from research findings
- Auto-populated SEO Schema + FAQ (min 3 questions)
- Allen reviews and publishes

---

## 4. Payload CMS Collections Schema

### Posts Collection (Blog)

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| title | text | ✅ | |
| slug | text | ✅ | regex: `^[a-z0-9-]+$` |
| content | richText | ✅ | Lexical editor |
| author | relationship→Authors | ✅ | |
| relatedCompany | relationship→Companies | ❌ | Link to analysis source |
| status | select | ✅ | draft/ai_reviewing/ready/published |
| category | select | ✅ | framework/case-study/opinion/tool |
| tags | array(text) | ✅ | |
| seo.title | text | ✅ | ≤60 chars |
| seo.description | textarea | ✅ | ≤160 chars |
| seo.ogImage | upload | ✅ | |
| seo.canonicalUrl | text | ❌ | |
| faq | array | ✅ | min 3, auto-generates FAQPage JSON-LD |
| faq.question | text | ✅ | |
| faq.answer | textarea | ✅ | |
| schema.enableHowTo | checkbox | ❌ | |
| schema.authorBio | textarea | ✅ | E-E-A-T signal |

### Companies Collection (Watchlist)

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| name | text | ✅ | |
| ticker | text | ✅ | e.g., TSM, KLAC |
| exchange | select | ✅ | NYSE/NASDAQ/TPE/... |
| status | select | ✅ | active/watchlist/too_hard |
| sector | text | ✅ | |
| maintenance_capex_ratio | number | ✅ | Allen Framework parameter |
| confidence_coefficient_low | number | ❌ | CC range |
| confidence_coefficient_high | number | ❌ | CC range |
| management_trust_score | number | ❌ | 0-100 |
| notes | richText | ❌ | |

### Authors Collection

| Field | Type | Required |
|-------|------|----------|
| name | text | ✅ |
| bio | textarea | ✅ |
| avatar | upload | ❌ |

---

## 5. Supabase Tables (Data Layer)

```sql
-- Historical Owner Earnings (Python CLI writes)
historical_owner_earnings (
  id, company_ticker, year,
  net_income, depreciation, amortization,
  capex, maintenance_ratio, owner_earnings,
  reality_coefficient, cagr_from_base,
  source, created_at
)

-- Company Financial Snapshots (Finance API periodic fetch)
company_financials (
  id, ticker, period, period_type,
  revenue, net_income, total_assets,
  total_debt, fcf, shares_outstanding,
  pe_ratio, market_cap, gross_margin,
  dso, dio,
  fetched_at, source_api
)

-- Watchlist Signals (X Intel + News + Events)
watchlist_signals (
  id, ticker, signal_type,
  headline, content, source,
  relevance_score, created_at
)

-- IV Calculations (Research engine output)
iv_calculations (
  id, ticker, calculated_at,
  maintenance_ratio, reality_coefficient,
  historical_cagr, cc_low, cc_high,
  stage1_cagr_low, stage1_cagr_high,
  stage2_cagr, stage3_growth, discount_rate,
  iv_per_share_low, iv_per_share_high,
  current_price, margin_of_safety_low,
  parameters_json, source_research_id
)
```

---

## 6. Python CLI Extensions

Extend existing `ivco-calc` package:

```
cli/ivco-calc/src/ivco_calc/
├── owner_earnings.py    ← Existing
├── cagr.py              ← Existing
├── dcf.py               ← Existing
├── verify.py            ← Existing
├── cli.py               ← Existing (extend with new commands)
├── fetchers/            ← New
│   ├── base.py          ← Abstract interface
│   ├── fmp.py           ← Financial Modeling Prep (free tier)
│   └── yahoo.py         ← Yahoo Finance (fallback)
├── storage/             ← New
│   └── supabase.py      ← Write to Supabase tables
└── search/              ← New
    ├── tavily.py        ← Supply chain research
    └── base.py          ← Abstract interface
```

New CLI commands:
- `ivco fetch --ticker TSM --years 10` → Fetch + store in Supabase
- `ivco analyze --ticker TSM` → fetch + calc-oe + calc-iv (one-stop)
- `ivco search --query "ASML suppliers" --depth 2` → Supply chain search
- `ivco compare --tickers KLAC,ASML,ENTG --metric dso,margin` → Cross-company
- `ivco watchlist` → List all watched companies with latest status

---

## 7. Deployment

**Target:** Vercel (primary) or Cloudflare Pages (alternative)

- Next.js App Router + Payload CMS embedded
- Payload uses Postgres adapter → Supabase connection
- Environment: `DATABASE_URL`, `PAYLOAD_SECRET`, `S3_*` (media)
- Auto CI/CD: push to main → deploy
- Domain: ivco.io → DNS configured at host

---

## 8. Phase Roadmap

### Phase 0.5a: Foundation (Week 1-2)

| Task | Description | Dependencies |
|------|-------------|-------------|
| Payload CMS Collections | Posts + Companies + Authors with SEO schema baked in | None |
| Supabase Tables | 4 core tables (OE, financials, signals, IV calculations) | None |
| Python CLI: ivco-fetch | FMP/Yahoo API integration + Supabase storage | Supabase tables |
| Python CLI: ivco-analyze | One-stop: fetch + calc-oe + calc-iv | ivco-fetch + existing MVP |
| Agent DNA Files | 4 role prompts + 3 shared files | Allen Framework doc |
| Tool ecosystem skeleton | `ivco --list-tools`, `--help` infrastructure | None |

### Phase 0.5b: Launch + Research MVP (Week 3-4)

| Task | Description | Dependencies |
|------|-------------|-------------|
| Deploy ivco.io | Vercel/Cloudflare, 6 blog articles | Payload CMS Collections |
| Fix X Skill | Restore X Intel pipeline | Existing X skill code |
| n8n 2-Agent MVP | Detective + Skeptic with self-correction loop | Agent DNA, ivco-fetch |
| ivco-search MVP | Tavily API for supply chain research | Tavily API key |
| First real test | Ray Dalio case study through full pipeline | All above |
| ivco-brief v1 | Daily briefing MVP (watchlist + news) | ivco-watch, ivco-fetch |

### Phase 1.0: Full Research Engine (Week 5-8)

| Task | Description | Dependencies |
|------|-------------|-------------|
| n8n 4-Agent workflow | Full Deep Value Council with all 4 roles | 2-Agent MVP validated |
| iPhone → n8n trigger | LLMInbox → file watcher → auto-start | n8n on Mac |
| Triple output pipeline | Obsidian + Supabase + Payload CMS per research | All outputs configured |
| Payload MCP Plugin | Claude Code ↔ Payload CRUD with token protection | Payload deployed |
| ivco --create-tool | Agent self-builds tools when gaps found | Tool ecosystem skeleton |
| Blog ← Research semi-auto | Research report → Fisher voice → Blog draft | Triple output + Payload |

---

## 9. Ecosystem Lock-In (Why Users Can't Leave)

| Dimension | Value | Why Competitors Can't Copy |
|-----------|-------|---------------------------|
| Accumulated Data | Years of OE calculations, CC tracking, signal history | Time asset, can't be rushed |
| Personalized DNA | Allen Framework 7 parameters × N companies | Every investor's judgment differs |
| Tool Ecosystem | More usage → more tools → stronger system | Agent-built tools serve only you |
| Integration Depth | News→Analysis→Valuation→Action→Content, fully closed loop | No end-to-end competitor exists |
| Agent Memory | Knows why you passed last time, what changed now | Personal investment logic accumulation |

---

## 10. Key Design Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Architecture approach | Plan B: Blog + Data Foundation simultaneous | Collections designed once, no rework |
| Deploy target | Vercel or Cloudflare | Next.js native, free tier start |
| Finance API | Free tier first (FMP/Yahoo) | Validate architecture before paying |
| Research depth | Tier 1 + Tier 2 | Most hidden champions at supplier level |
| Agent team | 4 roles (NotebookLM + Allen DNA) | Balanced coverage without over-complexity |
| Output format | Triple: Obsidian + Supabase + Blog | One research, three outputs |
| Tool philosophy | OpenClaw-inspired atomic CLI | Composable, agent-discoverable, self-evolving |

---

## 11. References

- Allen Framework ground truth: `allen-framework-tsmc-owners-earning.md`
- OpenClaw CLI philosophy: Chi's CLAUDE.md DNA
- Content Engine Manual: `Obsidian/inbox/IVCO Content Engine Payload CMS Operation Manual & Schema v1.0.md`
- Payload MCP Guide: `Obsidian/inbox/Payload CMS MCP Guideline (For Claude Code).md`
- Blog SEO Checklist: `Obsidian/inbox/Payload CMS Blog SEO Checklist.md`
- Blog Planning: `Obsidian/inbox/Intelligence Payload CMS Blog Planning.md`
- IVCO Evolution Guide: `Obsidian/inbox/IVCO_Evolution_Guide_v1.md`
- AI Hub N8N Architecture: `Obsidian/inbox/Allen AI Hub through N8N from NotebookLM.md`
- Hidden Champions Analysis: `Obsidian/inbox/美國黃金時代的隱形冠軍企業分析 by Claude Desktop APP.md`
- PRD by ChatGPT: `Obsidian/inbox/IVCO Project PRD Suggestion by ChatGPT 5.2.md`
- SEO Tips: `Obsidian/inbox/AI Content SEO Tips.md`
- X Bookmark Tool: `Obsidian/inbox/X Bookmark Tool.md`
- Schema Enforcement Consensus: `shared-state/inbox/claude-code/2026-02-14-24-schema-enforcement-consensus.json`
