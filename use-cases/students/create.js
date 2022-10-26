const studentsDa = require("../../data-access/students");
const { responseWithError } = require("../../commons/errors");
const { responseBuilder, payloadSanitizer } = require("../../commons/utils");
const { StatusCode, ResponseMessage } = require("../../commons/constants");

const create = async (req, res, next) => {
  try {
    const data = await studentsDa.create({
      ...payloadSanitizer(req.body),
      createdBy: req.user,
    });
    res.status(StatusCode.OK).send(
      responseBuilder({
        statusCode: StatusCode.OK,
        data,
        message: ResponseMessage.Added,
      })
    );
    return next();
  } catch (e) {
    return responseWithError(res, e, StatusCode.BadRequest);
  }
};

module.exports = create;
