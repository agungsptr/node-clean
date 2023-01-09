const students = require("../../../../use-cases/students");
const { responseWithError } = require("../../../../commons/errors");
const {
  responseBuilder,
  sanitizerPayload,
} = require("../../../../commons/utils");
const {
  StatusCode,
  ResponseMessage,
} = require("../../../../commons/constants");

const create = async (req, res, next) => {
  try {
    const payload = sanitizerPayload(req.body);
    payload.createdBy = req.user;
    const data = await students.create(payload);

    res.status(StatusCode.OK).send(
      responseBuilder({
        statusCode: StatusCode.OK,
        message: ResponseMessage.Added,
        data,
      })
    );
    return next();
  } catch (e) {
    return responseWithError(res, e, StatusCode.BadRequest);
  }
};

module.exports = create;
