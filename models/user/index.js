const { validatorSchema } = require("../../commons/utils");
const userSchema = require("./user.schema");
const userValidator = validatorSchema(userSchema);
const userBuilder = require("./user");

module.exports = userBuilder(userValidator);
