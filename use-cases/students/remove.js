const studentsDa = require("../../data-access/students");
const { responseWithError } = require("../../commons/errors");
const { StatusCode, ResponseMessage } = require("../../commons/constants");
const { responseBuilder } = require("../../commons/utils");
const { ifEmptyThrowError } = require("../../commons/checks");

const remove = async (req, res, next) => {
  try {
    const { id } = req.params;
    ifEmptyThrowError(id, "id is required");
    const data = await studentsDa.remove(id);
    res
      .status(StatusCode.OK)
      .send(
        responseBuilder({
          statusCode: StatusCode.OK,
          data,
          message: ResponseMessage.Removed,
        })
      );
    return next();
  } catch (e) {
    return responseWithError(res, e, StatusCode.BadRequest);
  }
};

module.exports = remove;
