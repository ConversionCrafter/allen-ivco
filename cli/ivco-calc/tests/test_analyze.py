"""Test ivco-analyze one-stop analysis pipeline."""
import json
from unittest.mock import patch, MagicMock
from click.testing import CliRunner
from ivco_calc.cli import cli


def test_analyze_cli_requires_ticker():
    """CLI analyze command requires --ticker."""
    runner = CliRunner()
    result = runner.invoke(cli, ["analyze"])
    assert result.exit_code != 0


def test_analyze_cli_help():
    """CLI analyze command has help text."""
    runner = CliRunner()
    result = runner.invoke(cli, ["analyze", "--help"])
    assert result.exit_code == 0
    assert "ticker" in result.output.lower()
    assert "maintenance" in result.output.lower()
