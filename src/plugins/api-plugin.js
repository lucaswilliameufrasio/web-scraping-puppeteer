const InstagramPhotosController = require("../controllers/InstagramPhotosController");
const CachePhotosController = require("../controllers/CachePhotosController");
const MoviesController = require("../controllers/MoviesController");
const instagramPhotosController = new InstagramPhotosController();
const cachePhotosController = new CachePhotosController();
const moviesController = new MoviesController();
module.exports = async (fastify, opts) => {
  fastify.get("/instagram/photos", instagramPhotosController.index);

  fastify.get("/cache/instagram/photos", cachePhotosController.index);

  fastify.get("/movies/coming", moviesController.index);

};
