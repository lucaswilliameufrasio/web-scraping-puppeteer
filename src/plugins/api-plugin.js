const InstagramPhotosController = require("../controllers/InstagramPhotosController");
const instagramPhotosController = new InstagramPhotosController();
module.exports = async (fastify, opts) => {
  fastify.get("/instagram/photos", instagramPhotosController.index);

};
