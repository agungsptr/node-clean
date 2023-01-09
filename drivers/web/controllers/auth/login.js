const auth = require("../../../../use-cases/auth");
const { responseWithError } = require("../../../../commons/errors");
const {
  StatusCode,
  ResponseMessage,
} = require("../../../../commons/constants");
const { responseBuilder } = require("../../../../commons/utils");

const login = async (req, res, next) => {
  try {
    const login = await auth.login(req.body);
    if (login) {
      res.status(StatusCode.OK).send(
        responseBuilder({
          statusCode: StatusCode.OK,
          message: ResponseMessage.AuthSuccess,
          data: login,
        })
      );
      return next();
    }

    res.status(StatusCode.Unauthorized).send(
      responseBuilder({
        statusCode: StatusCode.Unauthorized,
        message: ResponseMessage.FailAuth,
        data: null,
      })
    );
    return next();
  } catch (e) {
    return responseWithError(res, e, StatusCode.BadRequest);
  }
};

module.exports = login;
