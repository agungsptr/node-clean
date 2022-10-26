const studentsDa = require("../../data-access/students");
const { responseWithError } = require("../../commons/errors");
const { responseBuilder, payloadSanitizer } = require("../../commons/utils");
const { StatusCode, ResponseMessage } = require("../../commons/constants");
const { ifEmptyThrowError } = require("../../commons/checks");

const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    ifEmptyThrowError(id, "id is required");
    const data = await studentsDa.update(id, {
      ...payloadSanitizer(req.body),
      updatedAt: Date.now(),
    });
    res.status(StatusCode.OK).send(
      responseBuilder({
        statusCode: StatusCode.OK,
        data,
        message: ResponseMessage.Updated,
      })
    );
    return next();
  } catch (e) {
    return responseWithError(res, e, StatusCode.BadRequest);
  }
};

module.exports = update;
