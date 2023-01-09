const users = require("../../../../use-cases/users");
const { responseWithError } = require("../../../../commons/errors");
const {
  responseBuilder,
  sanitizerPayload,
} = require("../../../../commons/utils");
const {
  StatusCode,
  ResponseMessage,
} = require("../../../../commons/constants");

const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const payload = sanitizerPayload(req.body);
    const data = await users.update(id, payload);

    res.status(StatusCode.OK).send(
      responseBuilder({
        statusCode: StatusCode.OK,
        message: ResponseMessage.Updated,
        data,
      })
    );
    return next();
  } catch (e) {
    return responseWithError(res, e, StatusCode.BadRequest);
  }
};

module.exports = update;
