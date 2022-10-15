const Students = require("../../db/models/students.model");
const studentBuilder = require("../../models/students/");
const serialize = require("./serializer");
const baseDataAccess = require("../base")({
  model: Students,
  modelName: "Students",
  modelBuilder: studentBuilder,
  serialize,
});

module.exports = { ...baseDataAccess };
