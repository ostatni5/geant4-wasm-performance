import re
from playwright.sync_api import Page, expect


def test_has_title(page: Page):
    page.goto("http://127.0.0.1:5500/example/web/shell_minimal_worker.html")

    result = page.evaluate(
        """async () => {
    return window.runSimulation();
    }"""
    )

    print(result)
