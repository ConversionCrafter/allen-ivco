"""Abstract base for financial data fetchers."""
from abc import ABC, abstractmethod


class BaseFetcher(ABC):
    """Interface for financial data sources."""

    @abstractmethod
    def fetch_income_statements(self, ticker: str, limit: int = 10) -> list[dict]:
        """Fetch income statement data. Returns list of parsed dicts."""
        ...

    @abstractmethod
    def fetch_balance_sheet(self, ticker: str, limit: int = 10) -> list[dict]:
        """Fetch balance sheet data. Returns list of parsed dicts."""
        ...

    @abstractmethod
    def fetch_quote(self, ticker: str) -> dict:
        """Fetch current price quote. Returns dict with price, pe, market_cap."""
        ...
