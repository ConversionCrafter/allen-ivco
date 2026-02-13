"""Test verify command logic."""

from ivco_calc.verify import verify_iv_range


def test_verify_pass():
    result = verify_iv_range(
        computed_low=4565, computed_high=5639,
        expected_low=4565, expected_high=5639,
    )
    assert result["status"] == "PASS"


def test_verify_fail():
    result = verify_iv_range(
        computed_low=4500, computed_high=5600,
        expected_low=4565, expected_high=5639,
    )
    assert result["status"] == "FAIL"
    assert result["diff_low"] == -65
    assert result["diff_high"] == -39
