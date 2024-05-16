from selenium.webdriver import FirefoxOptions, ChromeOptions
from selenium import webdriver


def create_firefox_driver():
    opts = FirefoxOptions()
    opts.add_argument("--headless")
    driver = webdriver.Firefox(options=opts)
    return driver


def create_chromium_driver():
    opts = ChromeOptions()
    opts.add_argument("--headless")
    driver = webdriver.Chrome(options=opts)
    return driver
