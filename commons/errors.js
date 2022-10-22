const { StatusCode, ErrorMessage } = require("./constants");
const CustomError = require("./customError");
const helper = require("./helper");
const { responseBuilder } = require("./utils");

const RepackageError = (err) => {
  if (err instanceof CustomError) {
    return err;
  } else {
    const error = new Error();
    error.stack += `\nCaused by:\n${err.stack}`;
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
  RepackageError,
  ResponseWithError,
};
