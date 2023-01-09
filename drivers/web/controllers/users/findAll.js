const users = require("../../../../use-cases/users");
const { responseWithError } = require("../../../../commons/errors");
const { responseBuilder } = require("../../../../commons/utils");
const {
  StatusCode,
  ResponseMessage,
} = require("../../../../commons/constants");

const findAll = async (req, res, next) => {
  try {
    const data = await users.findAll(req.query);

    res.status(StatusCode.OK).send(
      responseBuilder({
        statusCode: StatusCode.OK,
        message: ResponseMessage.Loaded,
        data,
      })
    );
    return next();
  } catch (e) {
    return responseWithError(res, e, StatusCode.BadRequest);
  }
};

module.exports = findAll;
