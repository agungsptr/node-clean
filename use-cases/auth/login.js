const users = require("../../data-access/users");
const {
  comparePassword,
  issueJwt,
  validatorSchema,
} = require("../../commons/utils");
const jwt = require("jsonwebtoken");
const moment = require("moment");
const Joi = require("joi");
const CustomError = require("../../commons/customError");

const login = async (payload) => {
  const { username, password } = payload;

  const schema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
  });
  const { error } = validatorSchema(schema)(payload);
  if (error.length > 0) throw new CustomError(error);

  const user = await users.findUserCredential({ username });
  if (user) {
    if (await comparePassword(password, user.password)) {
      const token = issueJwt(
        { id: user.id, username: user.username },
        user.secretUuid
      );
      return {
        expired: moment.unix(jwt.decode(token).exp),
        token: `Bearer ${token}`,
      };
    }
  }
  return false;
};

module.exports = login;
