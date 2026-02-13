"""Verify computed IV against Allen's hand calculation."""


def verify_iv_range(
    computed_low: int,
    computed_high: int,
    expected_low: int,
    expected_high: int,
    tolerance: int = 0,
) -> dict:
    """Compare computed IV Range against expected values."""
    diff_low = computed_low - expected_low
    diff_high = computed_high - expected_high
    passed = abs(diff_low) <= tolerance and abs(diff_high) <= tolerance

    return {
        "status": "PASS" if passed else "FAIL",
        "computed_low": computed_low,
        "computed_high": computed_high,
        "expected_low": expected_low,
        "expected_high": expected_high,
        "diff_low": diff_low,
        "diff_high": diff_high,
        "tolerance": tolerance,
    }
