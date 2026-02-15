"""Financial Modeling Prep (FMP) API fetcher — free tier."""
import os
import json
from urllib.request import urlopen, Request
from urllib.error import URLError
from ivco_calc.fetchers.base import BaseFetcher


class FMPFetcher(BaseFetcher):
    """FMP API v3 client. Free tier: 250 requests/day."""

    BASE_URL = "https://financialmodelingprep.com/api/v3"

    def __init__(self, api_key: str | None = None):
        self.api_key = api_key or os.environ.get("FMP_API_KEY", "")
        if not self.api_key:
            raise ValueError("FMP_API_KEY not set. Get free key at financialmodelingprep.com")

    def build_url(self, ticker: str, endpoint: str, limit: int = 10) -> str:
        return f"{self.BASE_URL}/{endpoint}/{ticker}?limit={limit}&apikey={self.api_key}"

    def _get_json(self, url: str) -> list | dict:
        req = Request(url, headers={"User-Agent": "IVCO-CLI/0.2.0"})
        with urlopen(req, timeout=30) as resp:
            return json.loads(resp.read().decode())

    def parse_income_statement(self, raw: dict) -> dict:
        """Parse FMP income statement into IVCO format."""
        date_str = raw.get("date", "")
        year = int(date_str[:4]) if date_str else 0
        capex_raw = raw.get("capitalExpenditure", 0)
        capex = abs(capex_raw) if capex_raw else 0
        da = raw.get("depreciationAndAmortization", 0) or 0
        return {
            "ticker": raw.get("symbol", ""),
            "year": year,
            "period": raw.get("period", "FY"),
            "net_income": raw.get("netIncome", 0) or 0,
            "depreciation": da,
            "amortization": 0,  # FMP combines D&A; split if needed
            "capex": capex,
            "revenue": raw.get("revenue", 0) or 0,
            "gross_profit": raw.get("grossProfit", 0) or 0,
        }

    def fetch_income_statements(self, ticker: str, limit: int = 10) -> list[dict]:
        url = self.build_url(ticker, "income-statement", limit)
        raw_list = self._get_json(url)
        if not isinstance(raw_list, list):
            return []
        return [self.parse_income_statement(r) for r in raw_list]

    def fetch_balance_sheet(self, ticker: str, limit: int = 10) -> list[dict]:
        url = self.build_url(ticker, "balance-sheet-statement", limit)
        raw_list = self._get_json(url)
        if not isinstance(raw_list, list):
            return []
        return [
            {
                "ticker": r.get("symbol", ""),
                "year": int(r.get("date", "0000")[:4]),
                "total_debt": r.get("totalDebt", 0) or 0,
                "total_assets": r.get("totalAssets", 0) or 0,
                "shares_outstanding": r.get("commonStockSharesOutstanding", 0) or 0,
            }
            for r in raw_list
        ]

    def fetch_quote(self, ticker: str) -> dict:
        url = f"{self.BASE_URL}/quote/{ticker}?apikey={self.api_key}"
        data = self._get_json(url)
        if isinstance(data, list) and data:
            q = data[0]
            return {
                "ticker": q.get("symbol", ticker),
                "price": q.get("price", 0),
                "pe": q.get("pe", 0),
                "market_cap": q.get("marketCap", 0),
                "change_pct": q.get("changesPercentage", 0),
            }
        return {"ticker": ticker, "price": 0, "pe": 0, "market_cap": 0, "change_pct": 0}
