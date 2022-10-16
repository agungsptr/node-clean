const config = require("../config");
const logger = require("./logger");

const appName = `${config.APP_NAME}`.toLowerCase();

const logError = (err) => {
  if (appName.includes("test") || appName.includes("development")) {
    console.log(err);
  } else {
    const log = logger.createLogger();
    log.error(err);
  }
};

const logInfo = (msg) => {
  if (appName.includes("test") || appName.includes("development")) {
    console.log(msg);
  } else {
    const log = logger.createLogger();
    log.info(msg);
  }
};

module.exports = {
  logError,
  logInfo,
};
