const usersDa = require("../../data-access/users");
const { ResponseWithError } = require("../../commons/errors");
const { StatusCode, ResponseMessage } = require("../../commons/constants");
const { responseBuilder } = require("../../commons/utils");

const remove = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await usersDa.remove(id);
    res.status(StatusCode.OK).send(
      responseBuilder({
        statusCode: StatusCode.OK,
        data,
        message: ResponseMessage.Removed,
      })
    );
    return next();
  } catch (e) {
    return ResponseWithError(res, e, StatusCode.BadRequest);
  }
};

module.exports = remove;
