const Joi = require("joi");

module.exports = Joi.object().keys({
  name: Joi.string().required().messages({
    "any.required": "must have name as string",
  }),
  age: Joi.number().messages({
    "number.base": "age must be a number",
  }),
  grade: Joi.number().messages({
    "number.base": "grade must be a number",
  }),
  prefect: Joi.boolean().messages({
    "boolean.base": "prefect must be a boolean",
  }),
});
