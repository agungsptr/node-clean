const config = require("../config");
const { StatusCode, ErrorMessage } = require("./constants");
const CustomError = require("./customError");
const { responseBuilder } = require("./utils");
const logger = require("./logger");

const appName = `${config.NODE_ENV}`.toLowerCase();

const logError = (err) => {
  if (appName.includes("test") || appName.includes("development")) {
    console.log(err);
  } else {
    const log = logger.createLogger();
    log.error(err);
  }
};

const repackageError = (err) => {
  if (err instanceof CustomError) {
    return err;
  } else {
    const error = new Error();
    error.stack += `\nCaused by:\n${err.stack}`;
    if (config.isDevelopment) console.log(error);
    return error;
  }
};

const responseWithError = (
  res,
  err,
  customErrorCode = StatusCode.BadRequest
) => {
  if (err instanceof CustomError) {
    return res.status(customErrorCode).send(
      responseBuilder({
        statusCode: customErrorCode,
        message: err.list,
      })
    );
  } else {
    logError(err.stack);
    return res.status(500).send(ErrorMessage.SomethingWentWrong);
  }
};

module.exports = {
  repackageError,
  responseWithError,
  logError,
};
