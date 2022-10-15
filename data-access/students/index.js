const Students = require("../../db/models/students.model");
const studentBuilder = require("../../models/students/");
const serialize = require("./serializer");
const base = require("../base");

module.exports = base({
  model: Students,
  modelName: "Students",
  modelBuilder: studentBuilder,
  serialize
});