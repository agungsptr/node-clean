const usersDa = require("../../data-access/users");
const { responseWithError } = require("../../commons/errors");
const { responseBuilder, payloadSanitizer } = require("../../commons/utils");
const { StatusCode, ResponseMessage } = require("../../commons/constants");

const create = async (req, res, next) => {
  try {
    const data = await usersDa.create({ ...payloadSanitizer(req.body) });
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
