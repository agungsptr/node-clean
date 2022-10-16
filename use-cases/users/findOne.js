const usersDa = require("../../data-access/users");
const { ResponseWithError } = require("../../commons/errors");
const { responseBuilder } = require("../../commons/utils");
const { StatusCode, ResponseMessage } = require("../../commons/constants");

const findOne = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await usersDa.findOne(id);
    res
      .status(StatusCode.OK)
      .send(
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

module.exports = findOne;
