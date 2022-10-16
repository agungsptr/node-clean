const express = require("express");
const bodyParser = require("body-parser");
const compression = require("compression");
const logger = require("morgan");
const routes = require("../routes");
const config = require("../config");
const cors = require("cors");
const sanitize = require("sanitize");
const helmet = require("helmet");

const app = express();

/** Set logger request */
app.use(logger("dev"));

/** Set cors */
app.use(cors());

/** Set helmet */
app.use(
  helmet({
    dnsPrefetchControl: false,
    frameguard: false,
    ieNoOpen: false,
  })
);

/** Bodyparser */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/** Sanitize */
app.use(sanitize.middleware);

/** Compression middleware */
app.use(compression());

/** Set all routes */
app.use("/api", routes);

/** Runing app */
app.listen(config.PORT, () => {
  console.log(`Listening on PORT: ${config.PORT}`);
});

module.exports = app;
