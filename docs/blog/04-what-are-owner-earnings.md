---
title: "What Are Owner Earnings? A Practical Guide"
slug: what-are-owner-earnings
published: false
created: 2026-02-15
author: IVCO Fisher
type: blog-post
category: framework
tags: [owner-earnings, buffett, valuation, maintenance-capex, python]
description: "Warren Buffett said subtract maintenance capex — then told us to guess. The Allen Framework replaces the guesswork with a company-specific Maintenance Ratio you can actually measure."
---

# What Are Owner Earnings? A Practical Guide

## TL;DR

Owner Earnings is Buffett's way of asking one practical question: after we keep the business healthy, how much cash is really left for owners? Net Income is too accounting-heavy, and Free Cash Flow is often too blunt because it subtracts all capex, even growth capex. In the Allen Framework, I keep Buffett's logic but replace the old "guess" with a measurable, company-specific Maintenance Ratio.

## What Buffett Actually Said in 1986

If you read Berkshire Hathaway's 1986 shareholder letter closely, Buffett is trying to solve a very specific problem: reported earnings are not the same thing as owner reality. Accountants can be precise and still miss economics.

He laid out Owner Earnings like this:

```
Owner Earnings = (a) reported earnings + (b) depreciation, depletion, amortization
                 - (c) average annual capex for maintenance
```

That was a big deal. Before that line, many investors used earnings per share as if it were cash. Buffett was basically saying, "No. Start from reported earnings, add back non-cash charges, then subtract the money you must reinvest just to stand still."

Simple, elegant, durable.

But he also admitted the hard part: (c) is an estimate. He said it directly. In other words, the most important adjustment in the whole formula was left to investor judgment.

That wasn't a bug. It was reality. In 1986, even top investors had limited structured data, slower information flow, and almost no scalable way to maintain company-level capex intelligence across sectors. So Buffett gave us a framework powered by business understanding, not by a data pipeline.

I think that was exactly right for his era. It's also why the concept survived for four decades.

Over time, this became common behavior among serious value investors:

1. Read annual reports and management discussion for capex context.
2. Decide what part of capex is maintenance versus expansion.
3. Use that judgment inside a valuation model.

It worked for disciplined analysts. But it was hard to scale, hard to audit, and hard to compare across companies unless you were extremely consistent.

And if you got (c) wrong, everything downstream broke:

- Owner Earnings was mismeasured.
- Historical growth looked better or worse than reality.
- DCF output became a false precision exercise.

So yes, Buffett gave us the right philosophy. But anyone building a repeatable valuation engine eventually runs into the same wall: we needed a better treatment of (c).

## The Problem with (c)

Let's call it what it is: maintenance capex is the hardest number in practical valuation.

Why? Because financial statements usually report total capex, not maintenance capex split cleanly from growth capex. That means one line item can contain two economically different behaviors:

- Maintenance capex: spending required to preserve current earning power.
- Growth capex: spending intended to expand future earning power.

If you lump them together, you distort reality.

If you classify too much capex as maintenance, you understate Owner Earnings and may miss great expansion stories.

If you classify too little as maintenance, you overstate Owner Earnings and fool yourself into thinking the cash engine is stronger than it is.

This is why Net Income and standard FCF both miss something important.

Net Income misses the cash burden of maintaining productive assets. It can look smooth while economic wear and reinvestment pressure build under the surface.

FCF has the opposite issue in many cases: by subtracting all capex, it can punish companies that are investing heavily in growth projects with high expected returns. You end up treating optional expansion like unavoidable upkeep.

For a mature utility, maybe that difference is smaller. For a frontier semiconductor manufacturer, cloud infrastructure builder, or high-quality compounder entering new markets, that difference is enormous.

This is not a theoretical debate. It changes decisions.

Two analysts can agree on revenue, margins, balance sheet strength, and even management quality, then reach opposite conclusions just because one treats 80% of capex as maintenance while the other treats 20% as maintenance.

Buffett knew this. That's why he said "guess." He was telling us humility is required.

But in 2026, "guess" should not mean "hand-wave." We can do better.

## How the Allen Framework Solves It

In IVCO's Allen Framework, I keep Buffett's structure and make the uncertain part explicit.

```
Allen OE = Net Income + Depreciation + Amortization - (CapEx × Maintenance_Ratio)
```

That `Maintenance_Ratio` is the key improvement.

Instead of embedding a hidden assumption in a spreadsheet cell with no governance, I define a company-specific maintenance ratio as a first-class model input. It's visible, reviewable, and updateable.

For TSMC, the working ratio is `0.20`.

That means:

- 20% of total capex is treated as maintenance.
- 80% is treated as growth/expansion, especially into advanced nodes and capacity build-out.

This matches the economics better than subtracting all capex.

The point is not that `0.20` is a universal truth forever. The point is that we can justify it, track it, and revise it as evidence changes.

At IVCO, ratio quality improves over time as we accumulate and re-check:

1. Annual reports and capex footnotes.
2. Earnings call commentary about node migration, replacement cycles, and expansion intent.
3. Capacity announcements, fab plans, and timing updates.
4. Historical outcomes versus prior guidance.

In other words, the ratio is a living parameter, not a static belief.

This matters for process discipline. Buffett, Fisher, and Munger all cared about thinking quality, not just model output. A transparent Maintenance Ratio supports that because it forces clear assumptions:

- What must be spent to keep current economics intact?
- What is discretionary growth capital?
- What evidence supports today's split?

When those answers are explicit, debates become productive. You can challenge assumptions directly instead of arguing over final valuation numbers without seeing their drivers.

For the full Allen Framework, read [Allen Framework vs Buffett Owner Earnings](/allen-framework-vs-buffett-owner-earnings-1986).

## The Code

This is the exact Python function used to calculate Owner Earnings in the Allen Framework:

```python
def calc_owner_earnings(
    net_income: int,
    depreciation: int,
    amortization: int,
    capex: int,
    maintenance_capex_ratio: float,
) -> int:
    cash_earnings = net_income + depreciation + amortization
    maintenance_capex = round(capex * maintenance_capex_ratio)
    return cash_earnings - maintenance_capex
```

I like this implementation because it is intentionally boring. No hidden magic, no opaque abstractions.

Inputs:

- `net_income`: reported profit attributable to owners.
- `depreciation`: non-cash depreciation expense.
- `amortization`: non-cash amortization expense.
- `capex`: total capital expenditures for the period.
- `maintenance_capex_ratio`: the company-specific maintenance share.

Computation steps:

1. Build `cash_earnings` by adding back non-cash charges.
2. Estimate maintenance capex by multiplying total capex by the ratio.
3. Subtract maintenance capex from cash earnings.

That final number is Owner Earnings for the period.

If you want to make this production-grade, the practical upgrades are straightforward:

1. Add input validation for negative values and ratio bounds.
2. Track currency units explicitly (`NT$K`, `USD millions`, etc.).
3. Version-control ratio changes with source notes.
4. Keep a reproducible audit trail for every historical recalculation.

The function stays simple. Governance around the function is where quality compounds.

## TSMC: A Real Example

Let's run the framework on TSMC using 2022 values.

| Item | Value (NT$K) |
|------|-------------|
| Net Income | 1,016,900,515 |
| Depreciation | 428,498,179 |
| Amortization | 8,756,094 |
| Cash Earnings (A+B+C) | 1,454,154,788 |
| Total CapEx | 1,075,620,698 |
| Maintenance CapEx (20%) | 215,124,140 |
| **Owner Earnings** | **1,239,030,648** |

Now let's walk it line by line.

First, cash earnings:

```text
Cash Earnings = Net Income + Depreciation + Amortization
              = 1,016,900,515 + 428,498,179 + 8,756,094
              = 1,454,154,788
```

Second, maintenance capex estimate:

```text
Maintenance CapEx = Total CapEx × 0.20
                  = 1,075,620,698 × 0.20
                  = 215,124,140
```

Third, Owner Earnings:

```text
Owner Earnings = Cash Earnings - Maintenance CapEx
               = 1,454,154,788 - 215,124,140
               = 1,239,030,648
```

This is where interpretation matters.

If you used Net Income only, you'd report `1,016,900,515` and ignore the non-cash add-backs and maintenance reinvestment structure.

If you used a naive FCF logic and subtracted all capex, you'd get:

```text
1,454,154,788 - 1,075,620,698 = 378,534,090
```

That number heavily penalizes TSMC for aggressive expansion. It treats growth spending as if it were unavoidable maintenance. Economically, that's too harsh for valuation of long-duration compounding ability.

Owner Earnings with a justified Maintenance Ratio lands in the middle and is much closer to business reality.

Now zoom out from one year to ten years.

### TSMC 10-Year Owner Earnings Snapshot

- 2013 Owner Earnings: `286,681,851`
- 2022 Owner Earnings: `1,239,030,648`
- Period: 9 years
- CAGR: `17.66%`

That growth path is exactly why Owner Earnings matters. It captures the underlying cash engine while not confusing expansion investment with maintenance burden.

In IVCO's process, this historical OE series becomes a core input into the Three-Stage DCF.

To see how Owner Earnings feed into valuation, read [TSMC Intrinsic Value Case Study](/tsmc-intrinsic-value-case-study).

## Owner Earnings vs Net Income vs FCF

Here is the practical comparison I use.

| Metric | What It Captures Well | What It Misses | Best Use Case |
|------|------------------------|----------------|---------------|
| Net Income | Accounting profitability under GAAP/IFRS | Non-cash distortions and maintenance reinvestment burden | Quick profitability scan, margin trend analysis |
| Free Cash Flow (standard) | Cash left after all capex | Penalizes growth-heavy capex by treating expansion and maintenance equally | Liquidity discipline, financing pressure checks |
| Owner Earnings (Allen) | Sustainable owner cash after maintenance needs | Requires judgment via Maintenance Ratio | Intrinsic value work and long-term compounding analysis |

When I build conviction, I don't treat these as enemies. I use all three and ask where they diverge and why.

If Net Income is growing but Owner Earnings is flat, something is off in reinvestment economics or accounting quality.

If FCF is weak but Owner Earnings is strong, the business may be in an intentional expansion phase, not necessarily deteriorating.

If all three line up over time, confidence increases.

That triangulation mindset is pure Munger: never rely on one metric when multiple perspectives can reduce error.

## FAQ

### 1. Is Owner Earnings the same as Free Cash Flow?

No. Standard Free Cash Flow usually subtracts all capex. Owner Earnings subtracts only maintenance capex. That distinction is critical when a company is investing heavily for growth.

### 2. How do you estimate maintenance capex in practice?

I start with management disclosures, historical replacement patterns, unit economics, and asset intensity by segment. Then I assign a Maintenance Ratio and keep revising it as new evidence comes in. The ratio is company-specific and should be treated as a living assumption, not a one-time guess.

### 3. Why did Buffett call maintenance capex a guess?

Because exact separation is rarely disclosed in financial statements. Even management teams often discuss capex plans in mixed language. Buffett acknowledged that uncertainty openly. The right response is disciplined estimation, not pretending certainty.

### 4. Can Owner Earnings be negative even if Net Income is positive?

Yes. If true maintenance requirements are high enough, economic owner cash can be weak despite positive accounting earnings. That's one reason capital-intensive businesses can look better on paper than in owner reality.

### 5. Should I use one Maintenance Ratio forever?

No. Business models evolve. Product mix changes, asset age changes, technology cycles compress or stretch, and expansion programs end. Your ratio should update when economics update.

### 6. Where does Owner Earnings fit in a full valuation workflow?

In my process, historical Owner Earnings is the cash foundation. Then I estimate growth ranges, apply confidence calibration, and run a Three-Stage DCF to produce an intrinsic value range instead of a single point estimate.

## Closing Thought

Buffett gave us a timeless question. Fisher reminded us to understand the business behind the numbers. Munger forced us to check our own blind spots.

Owner Earnings, done properly, sits at that intersection.

The formula itself is simple. The craft is in maintenance capex judgment, evidence quality, and consistency over time. That's exactly why the Allen Framework focuses on making assumptions explicit, measurable, and improvable.

If you're serious about intrinsic value, don't stop at reported earnings and don't blindly punish all capex. Separate maintenance from growth, track the ratio, and let the economics speak.

## Author Bio

IVCO Fisher studies businesses, not markets. Building tools at ivco.io to help long-term investors think in ranges, not predictions.
