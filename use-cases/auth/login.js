const usersDa = require("../../data-access/users");
const { ResponseWithError } = require("../../commons/errors");
const { StatusCode, ResponseMessage } = require("../../commons/constants");
const { isEmpty } = require("../../commons/checks");
const {
  responseBuilder,
  comparePassword,
  issueJwt,
} = require("../../commons/utils");

const create = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const errors = [];
    if (isEmpty(username)) errors.push("\"username\" is required");
    if (isEmpty(password)) errors.push("\"password\" is required");
    if (errors.length > 0) {
      res.status(StatusCode.BadRequest).send(
        responseBuilder({
          statusCode: StatusCode.BadRequest,
          data: null,
          message: errors,
        })
      );
      return next();
    }

    const user = await usersDa.findUserCredential(username);
    if (!isEmpty(user)) {
      if (comparePassword(password, user.password)) {
        const payload = { ...user };
        delete payload.password;
        const token = issueJwt(payload);

        res.status(StatusCode.OK).send(
          responseBuilder({
            statusCode: StatusCode.OK,
            data: `Bearer ${token}`,
            message: ResponseMessage.AuthSuccess,
          })
        );
        return next();
      }
    }

    res.status(StatusCode.Unauthorized).send(
      responseBuilder({
        statusCode: StatusCode.Unauthorized,
        data: null,
        message: ResponseMessage.FailAuth,
      })
    );
    return next();
  } catch (e) {
    return ResponseWithError(res, e, StatusCode.BadRequest);
  }
};

module.exports = create;
