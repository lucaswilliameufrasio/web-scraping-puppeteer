const puppeteer = require("puppeteer");
const fs = require("fs");

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://instagram.com/rocketseat_oficial");

  const imageList = await page.evaluate(() => {
    // Toda essa função será executada no browser

    // Vamos pegar todas as imagens que estão na parte de posts
    const nodeList = document.querySelectorAll("article img");

    // transformar o NodeList em array
    const imageArray = [...nodeList];

    // transformar os nodes(elementos) em objetos javascript
    const imageList = imageArray.map(({ src }) => ({
      src,
    }));

    // colocar para fora da função
    return imageList;
  });

  // escrever os dados em um arquivo local
  fs.writeFile(
    "instagram.json",
    JSON.stringify(imageList, null, 2),
    (error) => {
      if (error) throw new Error("Mission failed we will get them next time");

      console.log("Well done");
    }
  );

  await browser.close();
})();
