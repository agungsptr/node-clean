const studentsDa = require("../../data-access/students");
const { responseWithError } = require("../../commons/errors");
const { responseBuilder } = require("../../commons/utils");
const { StatusCode, ResponseMessage } = require("../../commons/constants");

const findAll = async (req, res, next) => {
  try {
    const queries = req.query;
    const data = await studentsDa.findAll(queries);
    res.status(StatusCode.OK).send(
      responseBuilder({
        statusCode: StatusCode.OK,
        data,
        message: ResponseMessage.Loaded,
      })
    );
    return next();
  } catch (e) {
    return responseWithError(res, e, StatusCode.BadRequest);
  }
};

module.exports = findAll;
