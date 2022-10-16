const userSchema = require("./user.schema");
const userValidator = require("../validator/")(userSchema);
const userBuilder = require("./user");

module.exports = userBuilder(userValidator);
