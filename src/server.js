require("dotenv").config();

const fastify = require("fastify")();
const path = require("path");
const env = require("./config/env");

const PORT = env.PORT;

const apiPlugin = require("./plugins/api-plugin");

fastify.register(require("fastify-static"), {
  root: path.join(__dirname, "..", "tmp"),
  prefix: "/photos/",
});

fastify.register(apiPlugin, {
  prefix: "/api",
});

fastify.listen(PORT, (error) => {
  if (error) throw new Error();
  console.log(`Listening on port ${fastify.server.address().port}`);
});
