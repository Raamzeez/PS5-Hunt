const dotenv = require('dotenv').config()
const puppeteer = require("puppeteer");

const ebaySearch = async () => {
  try {
    const URL = process.env.EBAY_SEARCH_URL
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.setDefaultNavigationTimeout(0);
    await page.goto(URL, { waitUntil: "domcontentloaded" });
    const ebayProductsData = await page.evaluate(() => {
      const elementsContainer = Array.from(
        document.getElementsByClassName("s-item__wrapper")
      );
      let ebayProducts = [];
      for (let i = 0; i < elementsContainer.length; i++) {
        const element = elementsContainer[i];
        const price = parseInt(
          Array.from(element.getElementsByClassName("s-item__price"))[0]
            .innerHTML.replace("$", "")
            .replace(",", "")
        );
        ebayProducts.push({
          link: Array.from(
            element.getElementsByClassName("s-item__link")
          )[0].getAttribute("href"),
          price,
        });
      }
      return ebayProducts;
    });
    return ebayProductsData;
  } catch (err) {
    return console.error(err);
  }
};

module.exports = ebaySearch;
