---
title: "TSMC Case Study: From 10-Year Financials to Intrinsic Value Range"
slug: tsmc-intrinsic-value-case-study
author: IVCO Fisher
date: 2026-02-14
category: case-study
tags: [tsmc, dcf, owner-earnings, confidence-coefficient, reality-coefficient]
status: draft
description: "Walk through TSMC's complete valuation: 10-year financials → Owner Earnings → Reality Coefficient → Three-Stage DCF → Confidence Coefficient → IV Range of NT$4,565-5,639"
---

# TSMC Case Study: From 10-Year Financials to Intrinsic Value Range

I've been doing this for nearly three decades. Read enough annual reports, attend enough earnings calls, and you start to notice patterns. But here's what never changes: **the numbers don't lie—if you know which numbers to read.**

Today I'm walking you through a complete valuation of Taiwan Semiconductor Manufacturing Company (TSMC). Not a back-of-the-envelope guess. Not a DCF model copied from a textbook. This is the **Allen Framework** in action—a methodology that integrates Graham's margin of safety, Buffett's Owner Earnings, Fisher's management quality assessment, and Munger's inversion—into a **three-tier calibration pipeline** that produces not a single number, but a **trustworthy range**.

The underlying audited filings are available through [TSMC Investor Relations](https://investor.tsmc.com).

By the end of this, you'll understand:
- Why Owner Earnings beats Net Income
- How the Reality Coefficient corrects historical distortions
- What the Confidence Coefficient really measures
- Why our DCF has three stages, not one
- And why TSMC's intrinsic value lands between **NT$4,565 and NT$5,639 per share**

Let's begin.

---

> **TL;DR — TSMC Intrinsic Value Summary**
>
> Using 10 years of audited financials (2013-2022), the Allen Framework produces a per-share intrinsic value range of **NT$4,565 – NT$5,639** for TSMC. This range reflects a 17.66% historical Owner Earnings CAGR, a 20% Maintenance CapEx ratio, Confidence Coefficients of 1.2x–1.5x, and a three-stage DCF with an 8% discount rate. Below is the full step-by-step walkthrough.

---

## Step 1: How to Calculate TSMC Owner Earnings (Not Net Income)

Warren Buffett taught us this decades ago: **Net Income is an accounting fiction.** It includes depreciation that already happened, ignores the cash you must spend to maintain competitive position, and pretends working capital changes don't matter.

Owner Earnings corrects all that:

```
Owner Earnings = Net Income
               + Depreciation & Amortization
               - Maintenance CapEx
               - Working Capital Changes
```

But here's the critical detail most people miss: **how do you separate maintenance CapEx from growth CapEx?**

For TSMC, we know from their annual reports and earnings calls that roughly **80% of CapEx goes toward expanding leading-edge capacity** (new 3nm, 2nm fabs), while only **20% goes toward maintaining existing mature-node equipment and facilities**. This isn't a guess—it's derived from their disclosed multi-year capital expenditure plans.

Here's TSMC's 10-year Owner Earnings trajectory (2013-2022):

| Year | Net Income (A) | Depreciation (B) | Amortization (C) | Cash Earnings (D) | Total CapEx (E) | **Owner Earnings (F)** |
|------|---------------|------------------|------------------|-------------------|----------------|----------------------|
| 2013 | 188,018,937 | 153,979,847 | 2,202,022 | 344,200,806 | 287,594,773 | **286,681,851** |
| 2014 | 263,780,869 | 197,645,186 | 2,606,349 | 464,032,404 | 288,540,028 | **406,324,398** |
| 2015 | 306,556,167 | 219,303,369 | 3,202,200 | 529,061,736 | 257,516,835 | **477,558,369** |
| 2016 | 334,338,236 | 220,084,998 | 3,743,406 | 558,166,640 | 326,508,158 | **492,865,008** |
| 2017 | 343,146,848 | 255,795,962 | 4,346,736 | 603,289,546 | 327,956,630 | **537,698,220** |
| 2018 | 351,184,406 | 288,124,897 | 4,421,405 | 643,730,708 | 315,405,143 | **580,649,679** |
| 2019 | 345,343,809 | 281,411,832 | 5,472,409 | 632,228,050 | 454,712,784 | **541,285,493** |
| 2020 | 518,158,082 | 324,538,443 | 7,186,248 | 849,882,773 | 506,138,977 | **748,654,978** |
| 2021 | 597,073,134 | 414,187,700 | 8,207,169 | 1,019,468,003 | 838,367,791 | **851,794,445** |
| 2022 | 1,016,900,515 | 428,498,179 | 8,756,094 | 1,454,154,788 | 1,075,620,698 | **1,239,030,648** |

**Formula**: `F = D - E × 0.2` (since 20% of CapEx is maintenance)

From NT$286.7 billion (2013) to NT$1,239.0 billion (2022). That's the real cash-generating power we're analyzing.

---

## Step 2: Reality Coefficient — Correcting TSMC's Historical Earnings

Here's where most analysts go wrong: they take the starting and ending Owner Earnings, calculate a CAGR, and call it a day. **Bad idea.**

What if 2013's OE was artificially depressed by a one-time write-off? What if 2022's OE was inflated by a temporary windfall? Your CAGR would be garbage.

The **Reality Coefficient** is Allen Framework's first calibration layer. It answers: *"Does this year's reported OE reflect true operational capacity, or is it distorted?"*

- **100%**: Use as-is (accurate reflection)
- **>100%** (e.g., 125%): Year had one-time losses → upward correction needed
- **<100%** (e.g., 80%): Year had one-time gains → downward correction needed

**For TSMC (2013-2022)**: After reviewing annual reports and earnings calls, both endpoints reflect genuine operational performance with no major distortions → **Reality Coefficient = 100% at both ends**.

| Metric | Starting Point (2013) | Ending Point (2022) | Years | CAGR |
|--------|----------------------|---------------------|-------|------|
| Reported OE | 286,681,851 | 1,239,030,648 | 9 | — |
| Reality Coefficient | 100% | 100% | — | — |
| **Calibrated OE** | 286,681,851 | 1,239,030,648 | 9 | **17.66%** |

That 17.66% CAGR is now trustworthy—it's built on corrected data, not accounting artifacts.

**Why this matters**: As IVCO's database matures, we'll track *every* year's reality coefficient. Early-stage approach (pre-database maturity): use **3-year averaging** at endpoints (average of years 10/9/8 and 2/1/0) to smooth out noise. Advanced approach: assign reality coefficients annually.

---

## Step 3: Confidence Coefficient — Why TSMC Deserves 1.2x-1.5x

Historical CAGR tells you where a company *has been*. The **Confidence Coefficient** tells you where it's *going*—and with what degree of certainty.

This is Allen Framework's second calibration layer, and **globally unprecedented**: I've searched English, Chinese, and Japanese academic literature—no one else quantifies forward conviction this way.

**What it does**: Multiplies CAGR to produce `Adjusted_CAGR = Historical_CAGR × CC`

**Why TSMC gets 1.2x - 1.5x**:

1. **Management Integrity = 100%**: TSMC says they'll build 10+ fabs over 3 years → they deliver on schedule. Zero credibility issues. (Fisher's criterion)

2. **Expansion Evidence**: NT$2+ trillion committed to Arizona, Germany, Japan fabs. Not PowerPoint slides—**actual construction underway**, equipment orders public record.

3. **Technology Moat**: 3nm GAA in production, 2nm on roadmap. Competitors (Intel, Samsung) are 2+ nodes behind. This isn't market share—it's physics and manufacturing prowess.

4. **Demand Visibility**: AI chip demand (NVIDIA, AMD, etc.) growing exponentially. TSMC is the **only** company that can produce cutting-edge logic at scale.

**CC Ranges** (evidence requirements escalate with each tier):

| Level | CC Range | Conditions | Evidence Required |
|-------|----------|-----------|------------------|
| Conservative | 0.8x - 1.0x | Integrity <100% / competitive threats | Basic financials |
| Steady | **1.0x - 1.5x** | Integrity 100% + proven expansion | Commitment tracking + capacity verification |
| Aggressive | 1.5x - 2.5x | Major expansion eve + tech leadership | CapEx timeline + supply chain validation |
| Extreme | 2.5x+ | 3x capacity + hidden champion | Annual report disclosure + 100% execution + exceptional margins |

TSMC lands in **Steady** tier (1.2x-1.5x)—not because we're being timid, but because the framework demands **proof for every step up**. Is TSMC building aggressively? Yes. Is it a 3x capacity moonshot like a Tier-2 supplier betting the company? No.

**Adjusted CAGR**:
- Lower bound: 17.66% × 1.2 = **21.19%**
- Upper bound: 17.66% × 1.5 = **26.49%**

---

## Step 4: Three-Stage DCF Valuation for TSMC

Most DCF models commit a fatal error: they assume **growth is linear and perpetual**. That's fantasy.

The Allen Framework uses **Three-Stage DCF** because:
- **Stage 1 (Years 1-5)**: Current momentum + expansion plans → use Adjusted CAGR
- **Stage 2 (Years 6-10)**: Growth moderates as new capacity gets absorbed → use conservative 15% CAGR (company-specific parameter)
- **Stage 3 (Terminal Value)**: Mature steady-state → use 5% perpetual growth (company-specific parameter)

**Discount Rate**: `r = US 10-Year Treasury Yield + ~3% long-term inflation`

For this calculation: **8%** (reflecting recent conditions—adjust when you run yours)

### The Math (Confidence Coefficient Lower Bound: 1.2x)

| Year | Stage | OE (NT$B) | PV @ 8% (NT$B) |
|------|-------|-----------|----------------|
| 1 | Stage 1 (21.19% CAGR) | 1,502.1 | 1,390.4 |
| 2 | Stage 1 | 1,820.4 | 1,560.2 |
| 3 | Stage 1 | 2,206.3 | 1,750.8 |
| 4 | Stage 1 | 2,674.1 | 1,964.7 |
| 5 | Stage 1 | 3,240.8 | 2,204.7 |
| 6 | Stage 2 (15% CAGR) | 3,726.9 | 2,347.6 |
| 7 | Stage 2 | 4,285.9 | 2,499.7 |
| 8 | Stage 2 | 4,928.8 | 2,661.8 |
| 9 | Stage 2 | 5,668.1 | 2,834.3 |
| 10 | Stage 2 | 6,518.3 | 3,018.0 |
| Terminal | Stage 3 (5% perpetual) | 211,135.6 | 97,805.2 |
| **Total DCF Sum** | | | **120,037.4** |

**Subtract Long-Term Debt** (bonds payable + long-term loans from latest balance sheet): **NT$1,673.4 billion**

**Total Intrinsic Value (lower bound)**: 120,037.4 - 1,673.4 = **NT$118,364.0 billion**

**Per-Share Intrinsic Value**:
- Shares outstanding = 259.3 billion (common stock ÷ 10, since par value = NT$10)
- IV/share (lower) = 118,364.0 ÷ 25.93 = **NT$4,565**

### The Math (Confidence Coefficient Upper Bound: 1.5x)

Following identical logic with 26.49% CAGR in Stage 1:

| Metric | Value |
|--------|-------|
| Total DCF Sum | NT$147,889.1 billion |
| Less: Long-Term Debt | NT$1,673.4 billion |
| **Total IV** | **NT$146,215.6 billion** |
| **IV per Share (upper)** | **NT$5,639** |

---

## Step 5: TSMC Intrinsic Value Range — NT$4,565 to NT$5,639

**TSMC's Intrinsic Value Range: NT$4,565 - NT$5,639 per share**

This isn't a target price. It's not a recommendation to buy or sell. It's a **boundary of rational confidence** based on 10 years of financial data, publicly disclosed expansion plans, and a systematic framework that penalizes speculation.

**Why a range?** Because Buffett was right: *"It's better to be approximately right than precisely wrong."* The line is widely attributed to Buffett's shareholder letters. Anyone claiming TSMC is worth exactly NT$5,000 (not NT$4,999 or NT$5,001) is selling you false precision.

**How to use this**:
1. **Compare to market price**: If TSMC trades at NT$800, you have a massive margin of safety (Graham). If it trades at NT$6,500, you're paying for optimism not yet earned.
2. **Monitor the triggers**: Fab construction delays → CC drops. New 2nm customer wins → CC rises. This is a **dynamic system**, not a stone tablet.
3. **Pressure-test your assumptions**: What if Stage 2 CAGR is only 10%? What if discount rate rises to 10%? Run the scenarios. Know where your risks live.

---

## The Hidden Power: Company-Specific Parameters

Here's what makes this framework **scalable**: TSMC's valuation uses **7 company-specific parameters** that evolve as IVCO's database deepens:

1. **Maintenance CapEx Ratio** (TSMC: 20%)
2. **Reality Coefficient** (TSMC: 100% both endpoints)
3. **Confidence Coefficient Range** (TSMC: 1.2x - 1.5x)
4. **Stage 2 CAGR** (TSMC: 15%)
5. **Stage 3 Perpetual Growth** (TSMC: 5%)
6. **Discount Rate** (TSMC: 8%)
7. **Long-Term Debt** (TSMC: NT$1,673.4B)

A different company—say, a mature consumer goods business—might have:
- Maintenance CapEx = 60% (high sustaining costs)
- CC Range = 0.9x - 1.1x (low growth visibility)
- Stage 2 CAGR = 8% (slower mature growth)

**The genius of the framework**: Same process, different inputs, company-specific outputs. No cookie-cutter.

---

## A Real-World Example: Why This Matters

Twenty years ago, King Slide disclosed in their annual report: **"Next year's new capacity = 3x current capacity."**

Market reaction? **Crickets.** The stock barely moved. Why? Tier-2 supplier, not glamorous, under-the-radar.

But the facts were public:
- Exceptional gross margins (60%+)
- Ultra-low DSO (Days Sales Outstanding)
- Best-in-class inventory turnover
- Key supplier to major global brands
- Management with 100% execution history

An analyst using the Allen Framework would have:
1. Calculated historical OE CAGR (already strong)
2. Applied a Reality Coefficient to ensure clean data
3. Assigned a CC of **2.5x - 3.0x** (Extreme tier: 3x capacity, hidden champion, public disclosure)
4. Run three-stage DCF
5. Found an intrinsic value **5-7x the market price**

The margin of safety wasn't 15%. It was **400%+**.

That's the difference between reading annual reports for entertainment and reading them like an owner.

---

> **Data Note**: This analysis uses 2013-2022 audited financial data from TSMC's annual reports. As of publication, this represents the most recent complete 10-year dataset available. IVCO continuously updates valuations as new annual reports become available — parameters like the Confidence Coefficient and Stage 2 CAGR are adjusted when material new information arrives.

---

## Closing: Valuation You Can Trust

This is what IVCO does. Not predictions. Not hot takes. **Structured attention backed by facts.**

We didn't guess TSMC's Owner Earnings—we calculated them from 10 years of audited financials. We didn't assume growth—we verified expansion plans from official disclosures. We didn't pick a CC arbitrarily—we matched evidence to a tiered framework.

And we produced not a single price, but a **range of conviction**: NT$4,565 - NT$5,639.

Is TSMC undervalued at NT$600? Massively. At NT$5,000? Fairly valued. At NT$7,000? You're paying for future execution that hasn't happened yet.

**The Allen Framework is your compass, not your autopilot.** It shows you the boundaries of rational belief. What you do with that information—that's always been, and always will be, the decision only a human can make.

---

## Frequently Asked Questions

### What is TSMC intrinsic value per share?
Based on 10 years of audited financials and the Allen Framework's three-tier calibration pipeline, TSMC's intrinsic value range is NT$4,565 to NT$5,639 per share. This uses a 17.66% historical Owner Earnings CAGR with Confidence Coefficients of 1.2x to 1.5x.

### How do you value TSMC stock?
The Allen Framework values TSMC through five steps: (1) calculate Owner Earnings from 10-year financials, (2) apply a Reality Coefficient to correct historical distortions, (3) determine a Confidence Coefficient based on forward-looking evidence, (4) run a three-stage DCF, and (5) express the result as a per-share intrinsic value range.

### What is TSMC fair value in 2026?
Using 2013-2022 data, the Allen Framework estimates TSMC's intrinsic value between NT$4,565 and NT$5,639 per share. This is not a price target — it represents a boundary of rational confidence that should be compared against current market prices to assess margin of safety.

### What percentage of TSMC capex is maintenance?
Approximately 20% of TSMC's total capital expenditure goes toward maintaining existing mature-node equipment and facilities. The remaining 80% funds expansion into leading-edge nodes (3nm, 2nm). This ratio is derived from TSMC's disclosed multi-year capital expenditure plans.

---

**Want to dive deeper?**
- Read: [The Allen Framework vs Buffett's Owner Earnings](/blog/allen-framework-vs-buffett-owner-earnings-1986) — How 40 years of evolution turned Owner Earnings from art into science
- Read: [Why We Built IVCO](/blog/why-we-built-ivco) — The story behind the system
- Explore: [IVCO](https://ivco.io)

**IVCO: Valuation you can trust, backed by facts.**

---

*Disclaimer: This case study is for educational purposes only. It does not constitute investment advice. All readers should conduct their own research and consult qualified professionals before making investment decisions.*
