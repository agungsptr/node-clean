const usersDa = require("../../data-access/users");
const { responseWithError } = require("../../commons/errors");
const { StatusCode, ResponseMessage } = require("../../commons/constants");
const { isEmpty } = require("../../commons/checks");
const { responseBuilder } = require("../../commons/utils");
const uuid = require("uuid");

const logout = async (req, res, next) => {
  try {
    const user = await usersDa.findUserCredential({ _id: req.user.userId });
    if (!isEmpty(user)) {
      await usersDa.update(user.id, { secretUuid: uuid.v4() });
    }
    res.status(StatusCode.OK).send(
      responseBuilder({
        statusCode: StatusCode.OK,
        data: null,
        message: ResponseMessage.LoggedOut,
      })
    );
    return next();
  } catch (e) {
    return responseWithError(res, e, StatusCode.BadRequest);
  }
};

module.exports = logout;
