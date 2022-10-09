const express = require("express");
const bodyParser = require("body-parser");
const compression = require("compression");
const logger = require("morgan");
const routes = require("../routes");
const config = require("../config");

const app = express();

/** Set logger request */
app.use(logger("dev", { skip: () => process.env.NODE_ENV === "test" }));

/** Bodyparser */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/** Compression middleware */
app.use(compression());

/** Set all routes */
app.use("/api", routes);

/** Runing app */
app.listen(config.PORT, () => {
  console.log(`Listening on PORT: ${config.PORT}`);
});

module.exports = app;
