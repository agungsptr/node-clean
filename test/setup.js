const { urlencoded, json } = require("body-parser");
const express = require("express");
const routes = require("../drivers/web/routes");

const beforeAction = async () => {
  const app = express();
  app.use(json());
  app.use(urlencoded({ extended: false }));
  app.use("/api", routes);
  return app;
};

module.exports = {
  beforeAction,
};
