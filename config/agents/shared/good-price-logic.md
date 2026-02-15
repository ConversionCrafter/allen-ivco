# Good Price Logic — Self-Correction Protocol

> "Good companies are easy to find. Good PRICES are not." — Allen

## The Core Insight

Famous companies with strong moats (NVDA, TSMC, AAPL) often trade at premium valuations.
The market has already priced in their excellence. Finding them is step 1. Getting a good
price is the real challenge.

## Self-Correction Loop

### Trigger Conditions

After evaluating a batch of candidates, check:
1. Query P/E ratio and 52-week performance for each candidate
2. Calculate: what percentage have P/E > 30 OR 52-week gain > 50%?

### Decision Logic

```
IF >60% of candidates are "too expensive":
    TRIGGER: "Market has fully priced in. Go upstream."
    ACTION:  Identify Tier 1 suppliers of these companies
    FILTER:  Gross margin > 35%, DSO < industry median,
             not easily squeezed by second-source strategies
    RECURSE: Apply same evaluation to suppliers

IF Margin of Safety > 20% found:
    PROCEED to full Allen Framework analysis

IF still >60% too expensive after Tier 1:
    GO DEEPER: Tier 2 suppliers (suppliers of suppliers)
    APPLY same filters
    RECURSE until Margin of Safety > 20% found OR depth limit reached
```

### Depth Limit

- **Tier 0**: The famous companies themselves
- **Tier 1**: Direct suppliers (most hidden champions found here)
- **Tier 2**: Suppliers' suppliers (maximum depth for Phase 1)

### What Makes a Good Supplier Investment

1. **Not easily replaceable**: Technical moat, not just price competition
2. **Multiple large customers**: Not dependent on one buyer
3. **Gross margin > 35%**: Indicates pricing power and value-add
4. **Growing with the wave**: Benefits from same secular trend as famous companies
5. **Market hasn't noticed yet**: Lower P/E, less analyst coverage
