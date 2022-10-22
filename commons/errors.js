const config = require("../config");
const { StatusCode, ErrorMessage } = require("./constants");
const CustomError = require("./customError");
const helper = require("./helper");
const { responseBuilder } = require("./utils");

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

const ResponseWithError = (
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
    helper.logError(err.stack);
    return res.status(500).send(ErrorMessage.SomethingWentWrong);
  }
};

module.exports = {
  CustomError,
  repackageError,
  ResponseWithError,
};
