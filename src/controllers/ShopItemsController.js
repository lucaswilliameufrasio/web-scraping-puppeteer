const puppeteer = require("puppeteer");

module.exports = class ShopItemsController {
  async index(request, reply) {
    const browser = await puppeteer.launch();
    // const browser = await puppeteer.launch({ headless: false });

    const page = await browser.newPage();
    await page.goto("https://www.americanas.com.br/categoria/moveis/poltrona");

    const productList = await page.evaluate(() => {
      const nodeList = document.querySelectorAll(
        "#content-middle > div:nth-child(4) > div > div > div > div.row.product-grid.no-gutters.main-grid > div"
      );

      const productArray = [...nodeList];

      const productList = productArray.map((product) => {
        const picture =
          product.children[0].children[1].children[0].children[0].children[1]
            .children[0].textContent;

        const name =
          product.children[0].children[1].children[0].children[0].children[1]
            .children[0].children[0].textContent;

        const price =
          product.children[0].children[1].children[0].children[0].children[1]
            .children[1].children[3].children[0].textContent;

        return {
          picture,
          name,
          price,
        };
      });

      return productList;
    });

    await browser.close();

    reply.send({ data: productList });
  }
};
