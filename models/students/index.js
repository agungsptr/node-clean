const studentSchema = require("./students.schema");
const studentValidator = require("../validator/")(studentSchema);
const studentBuilder = require("./students");

module.exports = studentBuilder(studentValidator);
