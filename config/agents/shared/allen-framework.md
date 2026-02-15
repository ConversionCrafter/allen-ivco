# Allen Framework — Shared Agent DNA

> Every IVCO agent must internalize this framework. It is the mathematical and philosophical core.

## The Four Masters

| Master | Contribution | IVCO Application |
|--------|-------------|------------------|
| **Graham** | Facts and scientific evaluation as foundation | Historical financials are the gate — no speculation without data |
| **Buffett** | Owner Earnings as the true measure of value | OE = Net Income + D&A - Maintenance CapEx (not net income, not FCF) |
| **Fisher** | Management integrity and growth capacity | Commitment tracking, say-do ratio, new product pipeline |
| **Munger** | Inversion and multidisciplinary thinking | "Why will this fail?" comes before "Why will this succeed?" |

## Three-Tier Calibration Pipeline

```
Layer 1: OE_calibrated = OE × Reality_Coefficient
Layer 2: CAGR = f(OE_calibrated series, 7-10 years)
Layer 3: CAGR_adjusted = CAGR × Confidence_Coefficient
```

## Three-Stage DCF

- **Stage 1 (Years 1-5):** CAGR_adjusted growth, year-by-year discounting
- **Stage 2 (Years 6-10):** Moderate growth (company-specific conservative assumption)
- **Stage 3 (Terminal):** Perpetual growth rate, discounted to present

```
IV = (Stage_1_PV + Stage_2_PV + Stage_3_PV - Long_Term_Debt) / Shares_Outstanding
```

**Discount Rate** = US 10-Year Treasury Yield + ~3% long-term inflation (dynamic, NOT fixed 8%)

## Seven Company-Specific Parameters

1. Maintenance CapEx Ratio (e.g. TSMC = 0.20)
2. Reality Coefficient (historical OE correction)
3. Confidence Coefficient Lower Bound
4. Confidence Coefficient Upper Bound
5. Stage 2 CAGR
6. Stage 3 Perpetual Growth Rate
7. Long-Term Debt

## Confidence Coefficient Grading

| Grade | CC Range | Condition | Evidence Required |
|-------|----------|-----------|-------------------|
| Conservative | 0.8x-1.0x | Integrity issues or competitive threats | Basic financials |
| Steady | 1.0x-1.5x | 100% integrity + stable-to-strong expansion | Commitment tracking + capacity verification |
| Aggressive | 1.5x-2.5x | Major expansion + tech leadership | CapEx timeline + supply chain verification |
| Extreme | 2.5x+ | 3x capacity expansion + hidden champion | Annual report + 100% execution + written thesis |
| Terminate | N/A | Integrity breach | One-strike rule, analysis stops |

## CLI Tools Available

- `ivco calc-oe` — Calculate Owner Earnings
- `ivco calc-cagr` — Calculate CAGR with Reality Coefficients
- `ivco calc-iv` — Three-Stage DCF → IV Range
- `ivco fetch` — Fetch financial data from FMP API
- `ivco analyze` — One-stop: fetch → calc-oe → calc-cagr → calc-iv
- `ivco verify` — Cross-validate against expected values
