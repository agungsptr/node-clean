const usersDa = require("../../data-access/users");
const { ResponseWithError } = require("../../commons/errors");
const { responseBuilder } = require("../../commons/utils");
const { StatusCode, ResponseMessage } = require("../../commons/constants");

const findAll = async (req, res, next) => {
  try {
    const queries = req.query;
    const data = await usersDa.findAll(queries);
    res.status(StatusCode.OK).send(
      responseBuilder({
        statusCode: StatusCode.OK,
        data,
        message: ResponseMessage.Loaded,
      })
    );
    return next();
  } catch (e) {
    return ResponseWithError(res, e, StatusCode.BadRequest);
  }
};

module.exports = findAll;
