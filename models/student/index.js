const studentSchema = require("./student.schema");
const studentValidator = require("../validator")(studentSchema);
const studentBuilder = require("./student");

module.exports = studentBuilder(studentValidator);
