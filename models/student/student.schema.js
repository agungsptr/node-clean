const Joi = require("joi");

module.exports = Joi.object().keys({
  name: Joi.string().required(),
  age: Joi.number(),
  grade: Joi.number(),
  perfect: Joi.boolean(),
  createdBy: Joi.object({
    userId: Joi.string().required(),
    username: Joi.string().required(),
  }).required(),
  createdAt: Joi.date().timestamp(),
  updatedAt: Joi.date().timestamp(),
});
