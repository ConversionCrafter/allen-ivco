"""Test ivco-fetch financial data fetcher."""
import json
from unittest.mock import patch, MagicMock
from click.testing import CliRunner
from ivco_calc.cli import cli
from ivco_calc.fetchers.fmp import FMPFetcher


def test_fmp_fetcher_parse_income_statement():
    """FMP API response parsing produces correct OE inputs."""
    raw = {
        "symbol": "TSM",
        "date": "2022-12-31",
        "period": "FY",
        "netIncome": 1016900515000,
        "depreciationAndAmortization": 437254273000,
        "capitalExpenditure": -1075620698000,
        "revenue": 2263891000000,
        "grossProfit": 1370280000000,
        "totalDebt": 710000000000,
        "sharesOutstanding": 25930380000,
    }
    fetcher = FMPFetcher(api_key="test_key")
    parsed = fetcher.parse_income_statement(raw)
    assert parsed["ticker"] == "TSM"
    assert parsed["year"] == 2022
    assert parsed["net_income"] == 1016900515000
    assert parsed["capex"] == 1075620698000  # positive
    assert parsed["depreciation"] > 0


def test_fmp_fetcher_build_url():
    """FMP API URL is correctly constructed."""
    fetcher = FMPFetcher(api_key="demo_key")
    url = fetcher.build_url("TSM", "income-statement", limit=10)
    assert "financialmodelingprep.com" in url
    assert "TSM" in url
    assert "apikey=demo_key" in url
    assert "limit=10" in url


def test_fetch_cli_requires_ticker():
    """CLI fetch command requires --ticker."""
    runner = CliRunner()
    result = runner.invoke(cli, ["fetch", "--years", "5"])
    assert result.exit_code != 0
    assert "Missing" in result.output or "required" in result.output.lower()
