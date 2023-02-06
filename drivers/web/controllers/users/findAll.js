const users = require("../../../../use-cases/users");
const { responseWithError } = require("../../../../commons/errors");
const { responseBuilder } = require("../../../../commons/utils");
const {
  StatusCode,
  ResponseMessage,
} = require("../../../../commons/constants");

const findAll = async (req, res, next) => {
  try {
    const { limit, page, ...q } = req.query;
    const result = await users.findAll(q, limit, page);

    res.status(StatusCode.OK).send(
      responseBuilder({
        statusCode: StatusCode.OK,
        message: ResponseMessage.Loaded,
        ...result,
      })
    );
    return next();
  } catch (e) {
    return responseWithError(res, e, StatusCode.BadRequest);
  }
};

module.exports = findAll;
