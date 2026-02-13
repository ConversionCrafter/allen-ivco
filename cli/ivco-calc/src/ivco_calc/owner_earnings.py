"""Owner Earnings calculator.
Formula: OE = Net Income + Depreciation + Amortization - CapEx * maintenance_ratio
"""

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
