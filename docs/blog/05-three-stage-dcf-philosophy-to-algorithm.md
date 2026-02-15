---
title: "Three-Stage DCF: From Philosophy to Algorithm"
slug: three-stage-dcf-philosophy-to-algorithm
published: false
created: 2026-02-15
author: IVCO Fisher
type: blog-post
category: framework
tags: [dcf, valuation, three-stage, cagr, confidence-coefficient, python]
description: "Most DCF models pretend the future is one straight line. The Allen Framework splits it into three stages — and turns philosophy into Python you can actually run."
---

# Three-Stage DCF: From Philosophy to Algorithm

Most DCF models are a lie.

Not because the math is wrong. The math is fine. Compound growth, present value, discount rates—Finance 101 works just fine.

The lie is this: **they pretend the future is one straight line.**

You've seen it. Some analyst takes a company growing at 25% CAGR, plugs that into a terminal value formula, and declares: "This company will grow at 25% forever." Or worse: "Perpetual growth rate = 3%"—as if every business eventually becomes a utility.

Here's what I learned after nearly 30 years: **The future doesn't move in straight lines. It moves in phases.**

High growth → moderation → maturity. Every company that survives long enough goes through this. And if your valuation model doesn't reflect that, you're not forecasting—you're fantasizing.

That's why the **Allen Framework uses Three-Stage DCF**. Not because it's trendy. Because it's **true**.

And today, I'm going to show you how it works—not just the philosophy, but the actual Python code we run at IVCO. Because theory without implementation is just noise.

---

> **TL;DR**: Traditional DCF assumes constant perpetual growth—which is fiction. The Allen Framework splits future cash flows into three realistic stages: (1) high-conviction growth (5 years), (2) mean reversion (years 6-10), and (3) steady-state perpetuity. Combined with a three-tier calibration pipeline (Reality Coefficient → CAGR → Confidence Coefficient), you get an intrinsic value **range**, not false precision. This article walks through the philosophy, the code, and a full TSMC worked example.

---

## The Problem with Single-Point DCF

Let me tell you what's wrong with most DCF models.

They give you a **single number**. Not a range. A number. "TSMC is worth NT$5,427 per share."

Really? Not NT$5,426? Not NT$5,428? You're telling me you can predict 10 years of geopolitical shifts, technology disruptions, management changes, competitive dynamics, and macro cycles—and land on a number precise to the **ones digit**?

That's not analysis. That's astrology.

And here's the second problem: **they assume growth is linear**.

Most models pick one growth rate—say, 20%—and apply it for 5 years. Then they slap on a "terminal value" using the Gordon Growth Model with some arbitrary perpetual rate like 3%.

But think about what that implies:
- **Years 1-5**: This company will grow at exactly 20%, every single year, regardless of market conditions.
- **Year 6 onward**: Growth instantly drops from 20% to 3% and stays there forever.

Does any business actually work that way? Of course not.

Growth **moderates**. It doesn't cliff-dive. A company expanding capacity aggressively might sustain 25% growth for a few years, slow to 15% as new capacity gets absorbed, and eventually settle into 5-8% mature-phase growth as the market saturates.

**That's reality. Your DCF model should reflect it.**

---

## Three Stages, Three Realities

Here's how the Allen Framework thinks about the future.

### Stage 1 (Years 1-5): High-Conviction Growth

This is where **evidence matters most**.

If a company is building 10 new fabs (like TSMC), acquiring a competitor (verified, not rumored), launching a new product line (already in production, not PowerPoint), or expanding into a new geography (contracts signed, not "exploring")—you have **visibility**.

You know what's coming. So you use an **adjusted CAGR** based on:
1. **Historical CAGR** (what the company has actually done)
2. **Confidence Coefficient** (how much conviction you have about the future)

This is the Allen Framework's **three-tier calibration pipeline** in action:
- **Layer 1**: Reality Coefficient corrects historical distortions
- **Layer 2**: CAGR calculation from calibrated data
- **Layer 3**: Confidence Coefficient adjusts for forward conviction

**Formula**: `Adjusted CAGR = Historical OE CAGR × Confidence Coefficient`

For TSMC (detailed in our [case study](/blog/tsmc-intrinsic-value-case-study)):
- Historical CAGR: 17.66%
- Confidence Coefficient: 1.2x - 1.5x
- **Stage 1 Adjusted CAGR: 21.19% - 26.49%**

### Stage 2 (Years 6-10): Mean Reversion

By year 6, reality starts catching up.

New capacity is absorbed. Competitors respond. Markets mature. The 25% growth story from Stage 1 isn't sustainable forever.

So we apply a **moderate, company-specific CAGR**—one that reflects "strong but slowing" growth. For TSMC, that's **15%**. For a mature consumer goods company, it might be 8%. For a fast-growing SaaS business, maybe 18%.

**This is not a guess.** It's a parameter you set based on:
- Industry life cycle position
- Competitive moat durability
- Historical behavior of similar companies
- Management guidance (if credible)

The key insight: **Stage 2 doesn't cliff-dive. It moderates gracefully.**

### Stage 3 (Year 11+): Perpetuity

By year 11, we're talking about a mature, steady-state business. Growth is low but sustainable. The company isn't dying—it's just not doubling every few years anymore.

We use the **Gordon Growth Model** here:

```
Terminal Value = CF_11 / (r - g)
```

Where:
- `CF_11` = cash flow in year 11 (end of Stage 2)
- `r` = discount rate
- `g` = perpetual growth rate (e.g., 5% for TSMC, maybe 3% for a utility)

This terminal value is then **discounted back to present value** by `(1 + r)^11`.

**Why 5% for TSMC?** Because semiconductors aren't going away. AI, EVs, IoT, edge computing—demand for leading-edge chips will exist for decades. But TSMC won't be building 10 fabs a year forever. 5% perpetual growth reflects "healthy mature expansion," not stagnation.

---

## The Three-Tier Calibration Pipeline

Before we even get to the three-stage DCF, we need **clean data**. That's where the Allen Framework's calibration pipeline comes in.

### Layer 1: Reality Coefficient

**Question**: Does this year's reported Owner Earnings reflect true operational capacity?

**Method**: Assign a percentage to each year's OE.
- **100%**: Clean year, use as-is
- **>100%** (e.g., 125%): One-time loss that year → adjust upward
- **<100%** (e.g., 80%): One-time gain that year → adjust downward

**Example**: If 2015's OE was depressed by a lawsuit settlement, you multiply it by 125% to restore the true operational baseline.

**Why this matters**: If you calculate CAGR from distorted endpoints, your growth rate is garbage. Reality Coefficient ensures you're measuring **real operational trajectory**, not accounting noise.

### Layer 2: CAGR Calculation

Once you have calibrated OE for each year, calculate the growth rate:

```
CAGR = (End_OE_Calibrated / Start_OE_Calibrated)^(1/n) - 1
```

For TSMC (2013-2022):
- Start OE (calibrated): NT$286,681,851K
- End OE (calibrated): NT$1,239,030,648K
- Periods: 9 years
- **CAGR: 17.66%**

This isn't just "revenue growth." It's **Owner Earnings growth**—the cash actually available to shareholders after maintaining competitive position.

(See our [first article](/blog/allen-framework-vs-buffett-owner-earnings-1986) for the deep dive on Owner Earnings vs Net Income.)

### Layer 3: Confidence Coefficient

**Question**: How much conviction do I have that the company can sustain (or exceed) this historical CAGR?

**Method**: Multiply historical CAGR by a confidence multiplier based on evidence.

| Level | CC Range | Evidence Required |
|-------|----------|------------------|
| Conservative | 0.8x - 1.0x | Integrity issues, competitive threats |
| Steady | 1.0x - 1.5x | 100% integrity + proven expansion |
| Aggressive | 1.5x - 2.5x | Major capacity expansion + tech leadership |
| Extreme | 2.5x+ | 3x capacity expansion + hidden champion |

For TSMC: **1.2x - 1.5x** (Steady tier)—because they have 100% management integrity, massive disclosed expansion plans, and technology leadership, but not a 3x moonshot bet.

**Adjusted CAGR**: 17.66% × 1.2 = 21.19% (lower) / 17.66% × 1.5 = 26.49% (upper)

---

## Show Me the Code

Philosophy is nice. Code is truth.

Here's the actual Python implementation of the three-stage DCF engine from IVCO's open-source CLI tools. This isn't pseudocode—this is production.

### The Core DCF Function

```python
def _calc_dcf_stages(
    latest_oe: int,
    stage1_cagr: float,
    stage2_cagr: float,
    stage3_cagr: float,
    discount_rate: float,
) -> dict:
    """Calculate DCF for all three stages."""
    yearly_values = []
    cumulative_oe = float(latest_oe)
    dcf_sum = 0.0

    # Stage 1: years 1-5
    for year in range(1, 6):
        cumulative_oe = cumulative_oe * (1 + stage1_cagr)
        discounted = cumulative_oe / ((1 + discount_rate) ** year)
        yearly_values.append({"year": year, "stage": 1, "value": round(discounted)})
        dcf_sum += discounted

    # Stage 2: years 6-10
    for year in range(6, 11):
        cumulative_oe = cumulative_oe * (1 + stage2_cagr)
        discounted = cumulative_oe / ((1 + discount_rate) ** year)
        yearly_values.append({"year": year, "stage": 2, "value": round(discounted)})
        dcf_sum += discounted

    # Stage 3: perpetuity (year 11+)
    # Gordon Growth Model: TV = CF_11 / (r - g), discounted to year 0 by (1+r)^11
    perpetuity_oe = cumulative_oe * (1 + stage3_cagr)
    perpetuity_value = perpetuity_oe / (discount_rate - stage3_cagr)
    discounted_perpetuity = perpetuity_value / ((1 + discount_rate) ** 11)
    yearly_values.append({"year": 11, "stage": 3, "value": round(discounted_perpetuity)})
    dcf_sum += discounted_perpetuity

    return {"yearly_values": yearly_values, "dcf_sum": round(dcf_sum)}
```

**What's happening**:
1. **Stage 1 loop**: Compound OE at `stage1_cagr` for 5 years, discount each year
2. **Stage 2 loop**: Continue from year 5's ending OE, compound at moderate `stage2_cagr` for 5 more years
3. **Stage 3 (Gordon Growth)**: Calculate terminal value using year 11's cash flow, discount back to present
4. **Sum all stages** → total DCF

### The Public API

```python
def calc_three_stage_dcf(
    latest_oe: int,
    cagr: float,
    cc_low: float,
    cc_high: float,
    stage2_cagr: float,
    stage3_cagr: float,
    discount_rate: float,
    long_term_debt: int,
    shares_outstanding_raw: int,
    share_par_value: int = 10,
) -> dict:
    """Full three-stage DCF calculation with Confidence Coefficient range."""

    # Layer 3: Apply Confidence Coefficient to historical CAGR
    stage1_cagr_low = cagr * cc_low
    stage1_cagr_high = cagr * cc_high

    # Run DCF for lower and upper bounds
    low = _calc_dcf_stages(latest_oe, stage1_cagr_low, stage2_cagr, stage3_cagr, discount_rate)
    high = _calc_dcf_stages(latest_oe, stage1_cagr_high, stage2_cagr, stage3_cagr, discount_rate)

    # Convert to per-share IV
    iv_total_low = low["dcf_sum"] - long_term_debt
    iv_total_high = high["dcf_sum"] - long_term_debt

    iv_per_share_low = round(iv_total_low * share_par_value / shares_outstanding_raw)
    iv_per_share_high = round(iv_total_high * share_par_value / shares_outstanding_raw)

    return {
        "stage1_cagr_low": round(stage1_cagr_low, 4),
        "stage1_cagr_high": round(stage1_cagr_high, 4),
        "dcf_sum_low": low["dcf_sum"],
        "dcf_sum_high": high["dcf_sum"],
        "iv_per_share_low": iv_per_share_low,
        "iv_per_share_high": iv_per_share_high,
        "dcf_low_detail": low["yearly_values"],
        "dcf_high_detail": high["yearly_values"],
    }
```

**Key design choices**:
- **Two DCF runs**: One for CC lower bound, one for CC upper bound → produces a **range**
- **Long-term debt subtracted**: Enterprise value → equity value
- **Per-share conversion**: Divide by raw shares × par value (10 for Taiwan stocks)
- **Returns full breakdown**: Not just final IV, but year-by-year DCF contributions

This is the same code that powers `ivco calc-iv` at the command line. No black boxes.

---

## TSMC: Running the Numbers

Let's run TSMC through the full pipeline. (Full breakdown in our [case study](/blog/tsmc-intrinsic-value-case-study)—this is the highlight reel.)

### Inputs

| Parameter | Value | Source |
|-----------|-------|--------|
| Latest OE (2022) | NT$1,239,030,648K | Audited financials + 20% maintenance CapEx ratio |
| Historical CAGR (2013-2022) | 17.66% | Calibrated via Reality Coefficient (100% both ends) |
| Confidence Coefficient | 1.2x - 1.5x | Management integrity 100% + disclosed expansion plans |
| Stage 2 CAGR | 15% | Company-specific parameter (moderate growth) |
| Stage 3 Perpetual Growth | 5% | Mature semiconductor demand assumption |
| Discount Rate | 8% | US 10Y Treasury (~4.5%) + ~3.5% long-term inflation |
| Long-Term Debt | NT$1,673,432,925K | Balance sheet (bonds payable + long-term loans) |
| Shares Outstanding (raw) | 259,303,805K | Common stock / par value (10) |

### Output: Full DCF Breakdown (Lower Bound, CC = 1.2x)

**Stage 1 CAGR**: 17.66% × 1.2 = **21.19%**

| Year | Stage | OE Projection (NT$B) | Present Value @ 8% |
|------|-------|---------------------|-------------------|
| 1 | 1 | 1,502 | 1,390 |
| 2 | 1 | 1,820 | 1,560 |
| 3 | 1 | 2,206 | 1,751 |
| 4 | 1 | 2,674 | 1,965 |
| 5 | 1 | 3,241 | 2,205 |
| **Stage 1 Sum** | | | **8,871** |

**Stage 2 CAGR**: 15% (moderate)

| Year | Stage | OE Projection | PV @ 8% |
|------|-------|--------------|---------|
| 6 | 2 | 3,727 | 2,348 |
| 7 | 2 | 4,286 | 2,500 |
| 8 | 2 | 4,929 | 2,662 |
| 9 | 2 | 5,668 | 2,834 |
| 10 | 2 | 6,518 | 3,018 |
| **Stage 2 Sum** | | | **13,362** |

**Stage 3 Terminal Value** (Gordon Growth: 5% perpetual)

```
CF_11 = 6,518 × 1.05 = 6,844
TV = 6,844 / (0.08 - 0.05) = 228,133
PV = 228,133 / (1.08^11) = 97,805
```

| Component | Value |
|-----------|-------|
| **Total DCF Sum** | **120,037** |
| Less: Long-Term Debt | 1,673 |
| **Total Intrinsic Value** | **118,364** |
| **IV per Share (lower)** | **NT$4,565** |

### Upper Bound (CC = 1.5x)

Following identical logic with **Stage 1 CAGR = 26.49%**:

| Metric | Value |
|--------|-------|
| Total DCF Sum | NT$147,889B |
| Less: Long-Term Debt | NT$1,673B |
| **Total IV** | **NT$146,216B** |
| **IV per Share (upper)** | **NT$5,639** |

---

## TSMC Intrinsic Value Range: NT$4,565 - NT$5,639

That's the answer. Not a single point. A **range of conviction**.

If TSMC trades at NT$600? Massive margin of safety—time to load up (assuming nothing fundamentally changed). At NT$5,000? Fair value. At NT$7,000? You're paying for optimism that hasn't been earned yet.

**This is how IVCO thinks**: Not "what's the price," but "what's the boundary of rational belief."

---

## Why Three Stages, Not Two or Five?

**Why not two?**

Two-stage DCF (high growth → perpetuity) creates a **cliff**. Growth drops from 25% to 3% instantly. That's not how businesses work.

**Why not five?**

Diminishing returns. Adding more stages doesn't improve accuracy—it just adds more parameters to guess. Three stages hit the sweet spot:
1. **Near-term** (evidence-based)
2. **Transition** (moderation)
3. **Maturity** (steady-state)

This matches how companies actually evolve. It's the **Goldilocks solution**—not too simple, not too complex.

---

## Frequently Asked Questions

### What is three-stage DCF valuation?

Three-stage DCF splits future cash flows into three realistic growth phases: (1) high-conviction growth based on evidence (years 1-5), (2) mean reversion to moderate growth (years 6-10), and (3) steady-state perpetuity (year 11+). This avoids the false precision of single-rate models and the complexity cliff of two-stage models.

### How do you calculate stage 1 CAGR in the Allen Framework?

Stage 1 CAGR = Historical OE CAGR × Confidence Coefficient. For TSMC: 17.66% × 1.2 (lower) or 1.5 (upper) = 21.19% - 26.49%. The Confidence Coefficient quantifies forward conviction based on management integrity, expansion evidence, technology moat, and demand visibility.

### What is the Gordon Growth Model in stage 3?

The Gordon Growth Model calculates terminal value as `TV = CF_11 / (r - g)`, where CF_11 is cash flow in year 11, r is the discount rate, and g is perpetual growth. This terminal value is then discounted back to present value by dividing by `(1 + r)^11`. For TSMC: 5% perpetual growth reflects mature semiconductor demand.

### Why does the Allen Framework output a range, not a single number?

Warren Buffett said it best: "It's better to be approximately right than precisely wrong." The Allen Framework uses a Confidence Coefficient range (e.g., 1.2x - 1.5x) to reflect uncertainty in forward projections. This produces an intrinsic value range (e.g., NT$4,565 - NT$5,639) rather than false single-point precision.

---

## What's Next

This is the engine. The three-stage DCF is how IVCO converts research into numbers—but the research comes first.

If you haven't read them yet:
- [Allen Framework vs Buffett Owner Earnings](/blog/allen-framework-vs-buffett-owner-earnings-1986): The evolution from 1986 to 2026
- [TSMC Case Study](/blog/tsmc-intrinsic-value-case-study): Full 10-year financial analysis with year-by-year breakdown
- [Why We Built IVCO](/blog/why-we-built-ivco): The story behind the system

**Coming soon**:
- **The Confidence Coefficient Deep Dive**: Evidence tiers, King Slide 3x example, how to spot extreme-CC opportunities
- **Reality Coefficient Mechanics**: When and how to correct historical distortions
- **Building IVCO with AI Agents**: How we turned 3 DCF bugs into a test-driven development case study

---

## About IVCO

IVCO (Intrinsic Value Confidence Observatory) is an intelligent value investing system that integrates the philosophies of Graham, Buffett, Fisher, and Munger into a computable framework. Built on the Allen Framework — a three-tier calibration pipeline with three-stage DCF valuation — IVCO transforms qualitative research into quantifiable parameters while preserving the "vaguely right rather than precisely wrong" spirit of classic value investing.

The IVCO CLI tools are open-source. Philosophy becomes code. Code becomes conviction.

**Website:** ivco.io
**X:** @ivco_fisher

---

*Disclaimer: This article is for educational purposes only. It does not constitute investment advice. All readers should conduct their own research and consult qualified professionals before making investment decisions.*
