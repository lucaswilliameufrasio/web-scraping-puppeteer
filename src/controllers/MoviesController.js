const puppeteer = require("puppeteer");

module.exports = class MoviesController {
  async index(request, reply) {
    const browser = await puppeteer.launch();
    // const browser = await puppeteer.launch({ headless: false });

    const page = await browser.newPage();
    await page.goto(`https://www.imdb.com/movies-coming-soon/?ref_=nv_mv_cs`);

    const movieList = await page.evaluate(() => {
      const nodeList = document.querySelectorAll(
        "#main > div > div.list.detail > div > table > tbody > tr:nth-child(1)"
      );

      const movieArray = [...nodeList];

      const movieList = movieArray.map((movie) => {
        const title = movie.children[1].children[0].textContent;

        const banner = movie.children[0].children[0].children[0].children[0].children[0].getAttribute(
          "src"
        );

        const link = movie.children[1].children[0].children[0].href;

        const genre = movie.children[1].children[1].children[2].textContent;

        const metascore = !!movie.children[1].children[2].children[0]
          ? movie.children[1].children[2].children[0].textContent.trim()
          : "";

        const description = movie.children[1].children[3].textContent.trim();

        const director =
          movie.children[1].children[4].children[1].children[0].textContent;

        let actors = [];
        movie.children[1].children[5]
          .getElementsByTagName("a")
          .forEach((element) => {
            if (element) {
              actors.push({ name: element.textContent });
              return { name: element.textContent };
            }
          });

        return {
          title,
          banner,
          link,
          genre,
          metascore,
          description,
          director,
          actors,
        };
      });

      return movieList;
    });

    await browser.close();

    reply.send({ data: movieList });
  }
};
