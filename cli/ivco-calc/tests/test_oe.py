"""Test Owner Earnings calculation against TSMC ground truth."""
from ivco_calc.owner_earnings import calc_owner_earnings

def test_tsmc_oe_2022(tsmc_annual_data, tsmc_expected_oe):
    row = tsmc_annual_data[-1]
    oe = calc_owner_earnings(
        net_income=row["net_income"],
        depreciation=row["depreciation"],
        amortization=row["amortization"],
        capex=row["capex"],
        maintenance_capex_ratio=0.20,
    )
    assert oe == tsmc_expected_oe[2022]

def test_tsmc_oe_all_years(tsmc_annual_data, tsmc_expected_oe):
    for row in tsmc_annual_data:
        oe = calc_owner_earnings(
            net_income=row["net_income"],
            depreciation=row["depreciation"],
            amortization=row["amortization"],
            capex=row["capex"],
            maintenance_capex_ratio=0.20,
        )
        assert oe == tsmc_expected_oe[row["year"]], f"Year {row['year']} mismatch"
