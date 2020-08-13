const InstagramPhotosController = require("../controllers/InstagramPhotosController");
const CachePhotosController = require("../controllers/CachePhotosController");
const instagramPhotosController = new InstagramPhotosController();
const cachePhotosController = new CachePhotosController();
module.exports = async (fastify, opts) => {
  fastify.get("/instagram/photos", instagramPhotosController.index);

  fastify.get("/cache/instagram/photos", cachePhotosController.index);
};
