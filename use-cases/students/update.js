const studentsDa = require("../../data-access/students");
const { ResponseWithError } = require("../../commons/errors");
const { responseBuilder } = require("../../commons/utils");
const { StatusCode, ResponseMessage } = require("../../commons/constants");

const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await studentsDa.update(id, req.body);
    res
      .status(StatusCode.OK)
      .send(
        responseBuilder({
          statusCode: StatusCode.OK,
          data,
          message: ResponseMessage.Updated,
        })
      );
    return next();
  } catch (e) {
    return ResponseWithError(res, e, StatusCode.BadRequest);
  }
};

module.exports = update;
