const { IsArray } = require("./checks");
const { StatusCode, Error } = require("./constants");
const CustomError = require("./customError");
const helper = require("./helper");
const { responseBuilder } = require("./utils");

function RepackageError(err) {
  if (err instanceof CustomError) {
    return err;
  } else {
    const error = new CustomError(err);
    let stack = err;
    if (IsArray(err)) {
      stack = err.join("\n- ");
    }
    error.stack += `\nCaused by:\n- ${stack}`;
    return error;
  }
}

function ResponseWithError(res, err, customErrorCode = StatusCode.BadRequest) {
  if (err instanceof CustomError) {
    return res.status(customErrorCode).send(
      responseBuilder({
        statusCode: customErrorCode,
        message: err.list,
      })
    );
  } else {
    helper.logError(err.stack);
    return res.status(500).send(Error.SomethingWentWrong);
  }
}

module.exports = {
  CustomError,
  RepackageError,
  ResponseWithError,
};
