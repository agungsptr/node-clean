const Joi = require("joi");

module.exports = Joi.object().keys({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  username: Joi.string().required(),
  password: Joi.string().required(),
  secretUid: Joi.string().uuid(),
  createdAt: Joi.date().timestamp(),
  updatedAt: Joi.date().timestamp(),
});
