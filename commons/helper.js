const bcrypt = require("bcrypt");
const _ = require("lodash");
const config = require("../config");

const logger = require("./logger");

const appName = `${config.APP_NAME}`.toLowerCase();

function logError(err) {
  if (appName.includes("test") || appName.includes("development")) {
    console.log(err);
  } else {
    const log = logger.createLogger();
    log.error(err);
  }
}

function logInfo(msg) {
  if (appName.includes("test") || appName.includes("development")) {
    console.log(msg);
  } else {
    const log = logger.createLogger();
    log.info(msg);
  }
}

function hashPassword(password) {
  const saltRounds = config.bcrypt.salt;

  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(password, salt);

  return hash;
}

function comparePassword(password, hash) {
  return bcrypt.compareSync(password, hash);
}

function getInstanceAttributeChanges(instance, updateDict) {
  const instanceKeys = Object.keys(instance);
  const changes = {};

  for (const key of instanceKeys) {
    const existingValue = instance[key];
    const updateValue = updateDict[key];

    if (!_.isUndefined(updateValue) && !_.isEqual(existingValue, updateValue)) {
      changes[key] = {
        past: existingValue,
        now: updateValue,
      };
    }
  }

  return changes;
}

module.exports = {
  comparePassword,
  getInstanceAttributeChanges,
  hashPassword,
  logError,
  logInfo,
};
