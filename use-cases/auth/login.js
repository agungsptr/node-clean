const usersDa = require("../../data-access/users");
const { responseWithError } = require("../../commons/errors");
const { StatusCode, ResponseMessage } = require("../../commons/constants");
const { isEmpty } = require("../../commons/checks");
const {
  responseBuilder,
  comparePassword,
  issueJwt,
  validatorSchema,
} = require("../../commons/utils");
const jwt = require("jsonwebtoken");
const moment = require("moment");
const Joi = require("joi");

const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const schema = Joi.object({
      username: Joi.string().required(),
      password: Joi.string().required(),
    });
    const { error } = validatorSchema(schema)(req.body);
    if (error.length > 0) {
      res.status(StatusCode.BadRequest).send(
        responseBuilder({
          statusCode: StatusCode.BadRequest,
          data: null,
          message: error,
        })
      );
      return next();
    }

    const user = await usersDa.findUserCredential({ username });
    if (!isEmpty(user)) {
      if (await comparePassword(password, user.password)) {
        const payload = { id: user.id, username: user.username };
        const token = issueJwt(payload, user.secretUuid);

        res.status(StatusCode.OK).send(
          responseBuilder({
            statusCode: StatusCode.OK,
            message: ResponseMessage.AuthSuccess,
            data: {
              expired: moment.unix(jwt.decode(token).exp),
              token: `Bearer ${token}`,
            },
          })
        );
        return next();
      }
    }

    res.status(StatusCode.Unauthorized).send(
      responseBuilder({
        statusCode: StatusCode.Unauthorized,
        data: null,
        message: ResponseMessage.FailAuth,
      })
    );
    return next();
  } catch (e) {
    return responseWithError(res, e, StatusCode.BadRequest);
  }
};

module.exports = login;
