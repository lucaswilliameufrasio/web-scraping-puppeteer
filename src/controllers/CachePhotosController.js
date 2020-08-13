const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");
const { default: axios } = require("axios");
const env = require("../config/env");

module.exports = class InstagramPhotosControllers {
  async index(request, reply) {
    const instagramUsername = request.query.username;

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(`https://instagram.com/${instagramUsername}`);

    const imageList = await page.evaluate(() => {
      const nodeList = document.querySelectorAll("article img");

      const imageArray = [...nodeList];

      const imageList = imageArray.map(({ src }) => ({
        src,
      }));

      return imageList;
    });

    await browser.close();

    const tmpFolderPath = path.join(__dirname, "..", "..", "tmp");

    if (!fs.existsSync(tmpFolderPath)) fs.mkdirSync(tmpFolderPath);

    const cachedImageList = await Promise.all(
      imageList.map(async ({ src }) => {
        if (!src) {
          return;
        }

        const response = await axios.get(src, {
          responseType: "stream",
        });

        if (!response.status == 200) {
          return;
        }

        const regexGetFilenameFromURL = /[\w-]+\.jpg/;
        const getFileName = src.match(regexGetFilenameFromURL);
        const fileName = getFileName[0];

        const filePath = path.join(tmpFolderPath, fileName);
        const file = fs.createWriteStream(filePath);

        response.data.pipe(file);
        const newObjectWithURL = { src: `${env.APP_URL}/photos/${fileName}` };

        return newObjectWithURL;
      })
    );

    reply.send({ data: cachedImageList });
  }
};
