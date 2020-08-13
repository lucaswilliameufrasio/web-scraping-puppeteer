const puppeteer = require("puppeteer");

module.exports = class InstagramPhotosControllers {
  async index(request, reply) {
    const instagramUsername = request.query.username;

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(`https://instagram.com/${instagramUsername}`);

    const imageList = await page.evaluate(() => {
      // This whole function will be executed on browser

      // We will get all pictures that are in posts section
      const nodeList = document.querySelectorAll("article img");

      // convert NodeList into array
      const imageArray = [...nodeList];

      // convert the nodes (elements) into javascript objects
      const imageList = imageArray.map(({ src }) => ({
        src,
      }));

      // put this to outside of the function
      return imageList;
    });

    await browser.close();

    reply.send({ data: imageList });
  }
};
