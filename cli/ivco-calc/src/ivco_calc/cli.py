"""IVCO CLI — composable valuation tools."""
import click
import json
from ivco_calc.owner_earnings import calc_owner_earnings

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

if __name__ == "__main__":
    cli()
