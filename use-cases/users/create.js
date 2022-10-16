const usersDa = require("../../data-access/users");
const { ResponseWithError } = require("../../commons/errors");
const { responseBuilder } = require("../../commons/utils");
const { StatusCode, ResponseMessage } = require("../../commons/constants");

const create = async (req, res, next) => {
  try {
    const data = await usersDa.create(req.body);
    res
      .status(StatusCode.OK)
      .send(
        responseBuilder({
          statusCode: StatusCode.OK,
          data,
          message: ResponseMessage.Added,
        })
      );
    return next();
  } catch (e) {
    return ResponseWithError(res, e, StatusCode.BadRequest);
  }
};

module.exports = create;
