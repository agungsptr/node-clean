const usersDa = require("../../data-access/users");
const { responseWithError } = require("../../commons/errors");
const { responseBuilder } = require("../../commons/utils");
const { StatusCode, ResponseMessage } = require("../../commons/constants");
const { ifEmptyThrowError } = require("../../commons/checks");

const findOne = async (req, res, next) => {
  try {
    const { id } = req.params;
    ifEmptyThrowError(id, "id is required");
    const data = await usersDa.findOne(id);
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

module.exports = findOne;
