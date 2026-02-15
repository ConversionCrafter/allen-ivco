"""Test tool ecosystem discovery."""
from click.testing import CliRunner
from ivco_calc.cli import cli
from ivco_calc.tools_registry import list_tools, get_tool_info


def test_list_tools_returns_all():
    """list_tools returns all registered tools."""
    tools = list_tools()
    assert len(tools) >= 6  # calc-oe, calc-cagr, calc-iv, verify, fetch, analyze
    names = [t["name"] for t in tools]
    assert "calc-oe" in names
    assert "fetch" in names
    assert "analyze" in names


def test_get_tool_info():
    """get_tool_info returns details for a specific tool."""
    info = get_tool_info("calc-oe")
    assert info is not None
    assert info["name"] == "calc-oe"
    assert "layer" in info
    assert "description" in info


def test_get_tool_info_not_found():
    """get_tool_info returns None for unknown tool."""
    info = get_tool_info("nonexistent")
    assert info is None


def test_list_tools_cli():
    """CLI list-tools command outputs JSON."""
    runner = CliRunner()
    result = runner.invoke(cli, ["list-tools"])
    assert result.exit_code == 0
    import json
    data = json.loads(result.output)
    assert isinstance(data, list)
    assert len(data) >= 6
