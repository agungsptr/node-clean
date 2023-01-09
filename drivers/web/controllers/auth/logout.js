const auth = require("../../../../use-cases/auth");
const { responseWithError } = require("../../../../commons/errors");
const {
  StatusCode,
  ResponseMessage,
} = require("../../../../commons/constants");
const { responseBuilder } = require("../../../../commons/utils");

const logout = async (req, res, next) => {
  try {
    const logout = await auth.logout(req.user);
    if (logout) {
      res.status(StatusCode.OK).send(
        responseBuilder({
          statusCode: StatusCode.OK,
          message: ResponseMessage.LoggedOut,
          data: null,
        })
      );
      return next();
    }
    res.status(StatusCode.BadRequest).send(
      responseBuilder({
        statusCode: StatusCode.BadRequest,
        message: "Failed logout",
        data: null,
      })
    );
    return next();
  } catch (e) {
    return responseWithError(res, e, StatusCode.BadRequest);
  }
};

module.exports = logout;
