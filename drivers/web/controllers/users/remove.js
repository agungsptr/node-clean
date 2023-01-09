const users = require("../../../../use-cases/users");
const { responseWithError } = require("../../../../commons/errors");
const {
  StatusCode,
  ResponseMessage,
} = require("../../../../commons/constants");
const { responseBuilder } = require("../../../../commons/utils");

const remove = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await users.remove(id);

    res.status(StatusCode.OK).send(
      responseBuilder({
        statusCode: StatusCode.OK,
        message: ResponseMessage.Removed,
        data,
      })
    );
    return next();
  } catch (e) {
    return responseWithError(res, e, StatusCode.BadRequest);
  }
};

module.exports = remove;
