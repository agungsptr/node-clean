const Constants = require("./constants");
const CustomError = require("./customError");
const helper = require("./helper");

function RepackageError(err) {
  if (err instanceof CustomError) {
    return err;
  } else {
    const error = new CustomError(err);
    const stack = err.join("\n- ");
    error.stack += `\nCaused by:\n- ${stack}`;
    return error;
  }
}

function ResponseWithError(res, err, customErrorCode = 400) {
  if (err instanceof CustomError) {
    return res.status(customErrorCode).send({
      statusCode: customErrorCode,
      status: "Failed",
      message: err.arrayOfErrors,
    });
  } else {
    helper.logError(err.stack);
    return res.status(500).send(Constants.Error.SomethingWentWrong);
  }
}

module.exports = {
  CustomError,
  RepackageError,
  ResponseWithError,
};
