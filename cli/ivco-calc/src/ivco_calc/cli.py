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

if __name__ == "__main__":
    cli()
