"""IVCO CLI — composable valuation tools."""
import click
import json
from ivco_calc.owner_earnings import calc_owner_earnings
from ivco_calc.cagr import calc_cagr
from ivco_calc.dcf import calc_three_stage_dcf
from ivco_calc.verify import verify_iv_range

@click.group()
@click.version_option(version="0.1.0")
def cli():
    """IVCO — Intrinsic Value Confidence Observatory CLI tools."""
    pass

def output_json(data: dict) -> None:
    """Print JSON to stdout for piping."""
    click.echo(json.dumps(data, indent=2, ensure_ascii=False))

@cli.command("calc-oe")
@click.option("--net-income", type=int, required=True)
@click.option("--depreciation", type=int, required=True)
@click.option("--amortization", type=int, required=True)
@click.option("--capex", type=int, required=True)
@click.option("--maintenance-ratio", type=float, required=True)
def calc_oe_cmd(net_income, depreciation, amortization, capex, maintenance_ratio):
    """Calculate Owner Earnings for a single year."""
    oe = calc_owner_earnings(
        net_income=net_income,
        depreciation=depreciation,
        amortization=amortization,
        capex=capex,
        maintenance_capex_ratio=maintenance_ratio
    )
    output_json({
        "owner_earnings": oe,
        "inputs": {
            "net_income": net_income,
            "depreciation": depreciation,
            "amortization": amortization,
            "capex": capex,
            "maintenance_capex_ratio": maintenance_ratio
        }
    })

@cli.command("calc-cagr")
@click.option("--start-oe", type=int, required=True)
@click.option("--end-oe", type=int, required=True)
@click.option("--start-year", type=int, required=True)
@click.option("--end-year", type=int, required=True)
@click.option("--rc-start", type=float, default=1.0)
@click.option("--rc-end", type=float, default=1.0)
def calc_cagr_cmd(start_oe, end_oe, start_year, end_year, rc_start, rc_end):
    """Calculate CAGR from Owner Earnings with Reality Coefficient."""
    oe_series = [{"year": start_year, "oe": start_oe}, {"year": end_year, "oe": end_oe}]
    rc = {start_year: rc_start, end_year: rc_end}
    result = calc_cagr(oe_series=oe_series, reality_coefficients=rc)
    output_json(result)

@cli.command("calc-iv")
@click.option("--latest-oe", type=int, required=True)
@click.option("--cagr", type=float, required=True)
@click.option("--cc-low", type=float, required=True)
@click.option("--cc-high", type=float, required=True)
@click.option("--stage2-cagr", type=float, required=True)
@click.option("--stage3-cagr", type=float, required=True)
@click.option("--discount-rate", type=float, required=True)
@click.option("--long-term-debt", type=int, required=True)
@click.option("--shares-outstanding", type=int, required=True)
@click.option("--share-par-value", type=int, default=10)
def calc_iv_cmd(latest_oe, cagr, cc_low, cc_high, stage2_cagr, stage3_cagr,
                discount_rate, long_term_debt, shares_outstanding, share_par_value):
    """Calculate Intrinsic Value using Three-Stage DCF."""
    result = calc_three_stage_dcf(
        latest_oe=latest_oe,
        cagr=cagr,
        cc_low=cc_low,
        cc_high=cc_high,
        stage2_cagr=stage2_cagr,
        stage3_cagr=stage3_cagr,
        discount_rate=discount_rate,
        long_term_debt=long_term_debt,
        shares_outstanding_raw=shares_outstanding,
        share_par_value=share_par_value,
    )
    output_json(result)

@cli.command("verify")
@click.option("--computed-low", type=int, required=True)
@click.option("--computed-high", type=int, required=True)
@click.option("--expected-low", type=int, required=True)
@click.option("--expected-high", type=int, required=True)
@click.option("--tolerance", type=int, default=0)
def verify_cmd(computed_low, computed_high, expected_low, expected_high, tolerance):
    """Verify computed IV Range against expected values."""
    result = verify_iv_range(
        computed_low=computed_low, computed_high=computed_high,
        expected_low=expected_low, expected_high=expected_high,
        tolerance=tolerance,
    )
    output_json(result)
    if result["status"] == "FAIL":
        raise SystemExit(1)

@cli.command("fetch")
@click.option("--ticker", type=str, required=True, help="Stock ticker (e.g. TSM, AAPL)")
@click.option("--years", type=int, default=10, help="Number of years to fetch")
@click.option("--source", type=click.Choice(["fmp"]), default="fmp", help="Data source")
def fetch_cmd(ticker, years, source):
    """Fetch financial data from external API."""
    from ivco_calc.fetchers.fmp import FMPFetcher
    fetcher = FMPFetcher()
    income = fetcher.fetch_income_statements(ticker, limit=years)
    balance = fetcher.fetch_balance_sheet(ticker, limit=years)
    quote = fetcher.fetch_quote(ticker)
    output_json({
        "ticker": ticker,
        "source": source,
        "income_statements": income,
        "balance_sheet": balance,
        "quote": quote,
    })

@cli.command("analyze")
@click.option("--ticker", type=str, required=True, help="Stock ticker (e.g. TSM)")
@click.option("--years", type=int, default=10, help="Years of history to fetch")
@click.option("--maintenance-ratio", type=float, required=True, help="Maintenance CapEx ratio (e.g. 0.20)")
@click.option("--cc-low", type=float, required=True, help="Confidence Coefficient lower bound")
@click.option("--cc-high", type=float, required=True, help="Confidence Coefficient upper bound")
@click.option("--stage2-cagr", type=float, default=0.15, help="Stage 2 CAGR (default 15%%)")
@click.option("--stage3-cagr", type=float, default=0.05, help="Stage 3 perpetual growth (default 5%%)")
@click.option("--discount-rate", type=float, default=0.08, help="Discount rate (default 8%%)")
@click.option("--long-term-debt", type=int, default=0, help="Long-term debt")
@click.option("--share-par-value", type=int, default=10, help="Share par value")
@click.option("--source", type=click.Choice(["fmp"]), default="fmp")
def analyze_cmd(ticker, years, maintenance_ratio, cc_low, cc_high,
                stage2_cagr, stage3_cagr, discount_rate, long_term_debt,
                share_par_value, source):
    """One-stop analysis: fetch → calc-oe → calc-cagr → calc-iv."""
    from ivco_calc.fetchers.fmp import FMPFetcher

    # Step 1: Fetch
    fetcher = FMPFetcher()
    income = fetcher.fetch_income_statements(ticker, limit=years)
    balance = fetcher.fetch_balance_sheet(ticker, limit=years)
    quote = fetcher.fetch_quote(ticker)

    if not income:
        click.echo(json.dumps({"error": f"No income data found for {ticker}"}))
        raise SystemExit(1)

    # Step 2: Calculate OE for each year
    oe_series = []
    for stmt in sorted(income, key=lambda x: x["year"]):
        oe = calc_owner_earnings(
            net_income=stmt["net_income"],
            depreciation=stmt["depreciation"],
            amortization=stmt["amortization"],
            capex=stmt["capex"],
            maintenance_capex_ratio=maintenance_ratio,
        )
        oe_series.append({"year": stmt["year"], "oe": oe})

    # Step 3: Calculate CAGR
    if len(oe_series) >= 2:
        cagr_result = calc_cagr(oe_series=oe_series, reality_coefficients={})
    else:
        cagr_result = {"cagr": 0, "years": 0}

    # Step 4: Calculate IV
    latest_oe = oe_series[-1]["oe"] if oe_series else 0
    shares = 0
    for bs in balance:
        if bs.get("shares_outstanding"):
            shares = bs["shares_outstanding"]
            break

    if latest_oe > 0 and shares > 0 and cagr_result.get("cagr", 0) > 0:
        iv_result = calc_three_stage_dcf(
            latest_oe=latest_oe,
            cagr=cagr_result["cagr"],
            cc_low=cc_low,
            cc_high=cc_high,
            stage2_cagr=stage2_cagr,
            stage3_cagr=stage3_cagr,
            discount_rate=discount_rate,
            long_term_debt=long_term_debt,
            shares_outstanding_raw=shares,
            share_par_value=share_par_value,
        )
    else:
        iv_result = {"error": "Insufficient data for IV calculation"}

    output_json({
        "ticker": ticker,
        "analysis": {
            "oe_series": oe_series,
            "cagr": cagr_result,
            "iv": iv_result,
            "current_price": quote.get("price", 0),
            "pe_ratio": quote.get("pe", 0),
        },
        "parameters": {
            "maintenance_ratio": maintenance_ratio,
            "cc_low": cc_low,
            "cc_high": cc_high,
            "stage2_cagr": stage2_cagr,
            "stage3_cagr": stage3_cagr,
            "discount_rate": discount_rate,
        },
    })

if __name__ == "__main__":
    cli()
