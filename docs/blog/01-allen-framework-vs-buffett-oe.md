---
title: "Allen Framework vs Buffett Owner Earnings: What Changed"
slug: allen-framework-vs-buffett-owner-earnings-1986
published: false
created: 2026-02-14
author: IVCO Fisher
type: blog-post
category: framework
tags: [buffett, owner-earnings, allen-framework, valuation, dcf]
description: Warren Buffett gave us the philosophy. The Allen Framework gave us the algorithm. Here's how 40 years of evolution transformed "owner earnings" from an art into a science you can actually run.
---

# Allen Framework vs Buffett Owner Earnings: What Changed

I've been reading annual letters since the 90s. And if you've been around value investing long enough, you know the moment everything clicked: 1986, [Berkshire Hathaway's letter](https://www.berkshirehathaway.com/letters/1986.html), buried in an appendix titled "Purchase-Price Accounting Adjustments and the 'Cash Flow' Fallacy."

That's where Warren Buffett dropped *Owner Earnings* on us.

It wasn't flashy. No headlines. Just a quiet revolution: "Stop looking at what accountants tell you. Look at what actually flows into shareholders' pockets."

```
Owner Earnings = (a) + (b) - (c)
```

Simple. Profound. And — here's the thing — *unfinished*.

Because Buffett left us with a problem. That little **(c)** in the formula? "The average annual amount of capitalized expenditures for plant and equipment needed to maintain the business's competitive position and unit volume."

He literally said: you'll have to *guess*.

And for 40 years, that's what we've been doing.

Until now.

## Why Buffett's Owner Earnings Formula Needed an Update

Let me be clear: Buffett wasn't wrong. He was *vague on purpose*. He quotes Keynes in that same letter (often attributed to Keynes): "I would rather be vaguely right than precisely wrong."

Fair enough. When you're Warren Buffett, you can afford to rely on intuition backed by decades of experience. You can look at a company and *feel* how much of its capex is maintenance versus growth.

But what if you're not Warren Buffett? What if you want to build a system that can monitor 10 companies simultaneously, update valuations in real-time as new information arrives, and — here's the kicker — actually *show its work*?

That's where the Allen Framework comes in.

I've spent the last 20+ years wrestling with this exact problem. Not because Buffett's philosophy was flawed, but because the world changed. We have AI now. We have structured data pipelines. We have the tools to engineer what Buffett could only philosophize about.

And we built it.

## 3 Key Innovations Beyond Buffett's Owner Earnings

### Innovation 1: The Maintenance Ratio

Buffett said subtract **(c)** — the capex needed to maintain competitive position. But he never told us *how much* that was.

The Allen Framework says: make it explicit.

```
Allen OE = Net Income + D&A - (Total CapEx × Maintenance Ratio) - WCC
```

See that **Maintenance Ratio**? That's company-specific. For [TSMC](https://investor.tsmc.com), it's 20% — because 80% of their massive capex goes toward *growth* (building cutting-edge fabs), not just keeping the lights on.

For a mature railroad company? Maybe 80% maintenance, 20% growth.

This isn't guesswork. It's *parameterized guesswork* — which means as IVCO's database grows, as we track annual reports and earnings calls and capex announcements, that ratio gets more accurate.

**Why this matters:** Without this, you'd look at TSMC's $1 trillion in capex and think "holy hell, their free cash flow is terrible." But that's not maintenance. That's *expansion*. The Allen Framework separates the two — and suddenly, you see TSMC's true earning power.

### Innovation 2: The Reality Coefficient

Buffett talked about removing accounting distortions — like when Berkshire acquired Scott Fetzer and purchase-price adjustments made GAAP earnings look $11.6M worse, even though the *economic substance* was identical.

But he only addressed *one* kind of distortion: acquisition accounting.

The Allen Framework says: let's systematize *all* distortions.

Every year's reported Owner Earnings gets a **Reality Coefficient**:
- **100%** = normal year, use as-is
- **>100%** (like 125%) = one-time loss that year, adjust upward
- **<100%** (like 80%) = one-time gain that year, adjust downward

When you calculate CAGR from historical data, you're not just taking the raw numbers. You're taking the *truth* behind the numbers.

**Early-stage method:** Take 3-year averages at endpoints to smooth out anomalies.

**Advanced method:** Assign a Reality Coefficient to *every single year* as your database matures.

**Why this matters:** A single lawsuit settlement or foreign exchange gain can throw off your growth rate by 5%. Multiply that over 10 years of compounding, and you're off by 50%. The Reality Coefficient fixes that.

### Innovation 3: The Confidence Coefficient

This is the big one.

Buffett's 1986 letter was about *calculating historical Owner Earnings correctly*. It didn't tell you how to forecast the future.

The Allen Framework does.

We introduce the **Confidence Coefficient** — a multiplier that sits on top of your historical CAGR to reflect forward-looking conviction:

```
Adjusted CAGR = Historical OE CAGR × Confidence Coefficient
```

| Level | CC Range | When You Use It |
|-------|----------|-----------------|
| **Conservative** | 0.8x – 1.0x | Management integrity <100%, competitive threats |
| **Steady** | 1.0x – 1.5x | 100% integrity, stable to strong expansion |
| **Aggressive** | 1.5x – 2.5x | Major capacity expansion verified, tech leadership |
| **Extreme** | 2.5x+ | 3x capacity expansion + hidden champion status |

Let me give you a real example from early in my career.

### The Case That Proved It

I found a precision component manufacturer — a Tier 2 supplier buried deep in the supply chains of some of the world's biggest brands. In their annual report — publicly disclosed, right there in black and white — they were building production capacity *3 times their current size*.

Not "we're thinking about it." Not "we hope to." They were *building it*.

The market? Didn't care. Stock price barely moved.

I applied what's now the Confidence Coefficient. Historical CAGR was solid. New capacity was verified. Management had a 100% track record of delivering on commitments.

CC = 2.5x to 3.0x.

The intrinsic value range I calculated was so far above the market price that the margin of safety was laughable.

That's what the Allen Framework does. It takes publicly available information — the kind Fisher taught us to hunt for, the kind Buffett taught us to analyze — and *quantifies* it into a math problem you can actually solve.

## From Owner Earnings Philosophy to a Complete Valuation Algorithm

Buffett gave us the starting point: how to calculate one year's Owner Earnings.

The Allen Framework gives us the full pipeline:

```
┌─────────────────────────────────────────────┐
│ Layer 1: Reality Coefficient                │
│   Financial OE → Real OE                    │
├─────────────────────────────────────────────┤
│ Layer 2: CAGR Calculation                   │
│   Multi-year Real OE → Growth Rate          │
├─────────────────────────────────────────────┤
│ Layer 3: Confidence Coefficient             │
│   Historical CAGR → Adjusted CAGR Range     │
└─────────────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────────────┐
│         Three-Stage DCF Valuation           │
│                                             │
│  Stage 1 (Yrs 1-5):  CAGR × CC → PV        │
│  Stage 2 (Yrs 6-10): Moderate CAGR → PV    │
│  Stage 3 (Terminal): Low perpetual → PV    │
│                                             │
│  IV = (Sum of PVs - LT Debt) / Shares      │
└─────────────────────────────────────────────┘
```

Let's run TSMC through it.

### TSMC: Theory Meets Reality

| Parameter | Value |
|-----------|-------|
| Historical OE CAGR (2013-2022) | 17.66% |
| Reality Coefficient | 100% (clean books) |
| Maintenance Ratio | 20% |
| Confidence Coefficient Range | 1.2x – 1.5x |
| **Stage 1 CAGR (Yrs 1-5)** | **21.19% – 26.49%** |
| Stage 2 CAGR (Yrs 6-10) | 15% (conservative) |
| Stage 3 (Terminal) | 5% |
| Discount Rate | 8% |
| **Intrinsic Value per Share** | **NT$4,565 – NT$5,639** |

Not a single point estimate. A *range*. Because Buffett was right: vaguely right beats precisely wrong.

But now? That vague rightness is *backed by an algorithm*. Every assumption is documented. Every coefficient is traceable. If new information comes in — a capex announcement, a management change, a competitive threat — IVCO updates the coefficients, reruns the model, and outputs a new range.

In real-time.

## What Buffett Left Us — And What the Allen Framework Adds

| What Buffett Gave Us (1986) | What the Allen Framework Adds (2026) |
|------------------------------|---------------------------------------|
| Philosophy: "Look through accounting" | Engineering: Parameterized Reality Coefficients |
| Formula: (a) + (b) - (c) | Computation: Maintenance Ratio solves (c) |
| Art: "You'll have to guess" | Science: Confidence Coefficients quantify conviction |
| One year's OE | Full DCF pipeline: OE → CAGR → IV Range |
| Static analysis | Dynamic system: updates as new info arrives |

Here's the thing: this isn't a replacement. It's a continuation.

Buffett wrote that letter because Wall Street was lying to itself, calling EBITDA "cash flow" while ignoring the reality that every piece of equipment eventually needs replacing.

The Allen Framework takes that insight and asks: okay, *how much* needs replacing? And how much of what you're spending is actually *expansion*?

Because in 1986, the world's greatest investors were running industrial conglomerates and insurers. Today? TSMC spends a trillion on capex to build 2nm fabs. SpaceX spends billions on reusable rockets. Tesla builds gigafactories.

If you treat all capex as "maintenance," you'll never buy a growth company.

The Allen Framework doesn't just honor Buffett's philosophy. It *extends* it into the 21st century.

## One More Thing: The Four Masters

I didn't do this alone. Nobody does.

The Allen Framework integrates the wisdom of four giants:

- **Graham**: Facts and safety margins. We output ranges, not false precision.
- **Buffett**: Owner Earnings as the core energy. That foundation doesn't change.
- **Fisher**: Qualitative research. Our Confidence Coefficient comes from reading, listening, and yes — "scuttlebutt."
- **Munger**: Inversion and stress testing. Our CC can go *below* 1.0. We're not perma-bulls.

If Buffett gave us the philosophy, the Allen Framework gave us the algorithm.

And if you're a value investor in 2026, you deserve both.

---

## What's Next

This is the first in a series where we unpack the Allen Framework piece by piece. Next up:

- [TSMC Case Study](/blog/tsmc-intrinsic-value-case-study): How we turned 10 years of financials into a NT$4,565–$5,639 intrinsic value range
- **The Confidence Coefficient Deep Dive**: What drives it, what caps it, and why one hidden champion got a 3x multiplier
- [Why We Built IVCO](/blog/why-we-built-ivco): The story behind the system

If this resonates with you — if you've been waiting for someone to turn Buffett's footnotes into running code — welcome to IVCO.

**Intrinsic value you can trust. Backed by facts. Updated in real-time.**

---

## Frequently Asked Questions

### What is the difference between owner earnings and free cash flow?
Owner earnings, as defined by Buffett, subtract only the maintenance capex needed to preserve competitive position — not total capex. Free cash flow subtracts all capex indiscriminately, which penalizes companies investing heavily in growth. The Allen Framework makes this distinction explicit through a company-specific Maintenance Ratio.

### How do you calculate maintenance capex?
The Allen Framework uses a parameterized Maintenance Ratio specific to each company. For TSMC, approximately 20% of total capex goes toward maintaining existing capacity, while 80% funds expansion of leading-edge fabs. This ratio is derived from annual reports, earnings calls, and disclosed capital expenditure plans.

### What is the Confidence Coefficient?
The Confidence Coefficient is a forward-looking multiplier applied to historical growth rates. It quantifies your conviction about a company's future based on management integrity, expansion evidence, technology moat, and demand visibility. It ranges from 0.8x (conservative) to 2.5x+ (extreme), with each tier requiring progressively stronger evidence.

### How is the Allen Framework different from traditional DCF?
Traditional DCF uses a single growth rate forever. The Allen Framework uses a three-stage DCF (high growth → moderation → steady state) combined with two calibration layers: the Reality Coefficient (corrects historical distortions) and the Confidence Coefficient (adjusts forward expectations). This produces a value range rather than a false-precision single number.

## About IVCO

IVCO (Intrinsic Value Confidence Observatory) is an intelligent value investing system that integrates the philosophies of Graham, Buffett, Fisher, and Munger into a computable framework. Built on the Allen Framework — a three-tier calibration pipeline with three-stage DCF valuation — IVCO transforms qualitative research into quantifiable parameters while preserving the "vaguely right rather than precisely wrong" spirit of classic value investing.

**Website:** ivco.io
**X:** @ivco_fisher

---

*Disclaimer: This article is for educational purposes only. It does not constitute investment advice. All readers should conduct their own research and consult qualified professionals before making investment decisions.*
