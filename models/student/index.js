const { validatorSchema } = require("../../commons/utils");
const studentSchema = require("./student.schema");
const studentValidator = validatorSchema(studentSchema);
const studentBuilder = require("./student");

module.exports = studentBuilder(studentValidator);
