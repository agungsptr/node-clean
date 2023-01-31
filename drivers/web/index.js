const express = require("express");
const bodyParser = require("body-parser");
const compression = require("compression");
const logger = require("morgan");
const routes = require("./routes");
const config = require("../../config");
const cors = require("cors");
const sanitize = require("sanitize");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

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

/** Set rate limit */
if (config.isProduction) {
  app.use(
    rateLimit({
      windowMs: config.rateLimit.minute * 60 * 1000,
      max: config.rateLimit.max,
      standardHeaders: true,
      legacyHeaders: false,
    })
  );
}

/** Set all routes */
app.use("/api", routes);

/** Runing app */
app.listen(config.APP_PORT, () => {
  console.log(`Listening on PORT: ${config.APP_PORT}`);
});

module.exports = app;
