const Users = require("../../db/models/users.model");
const userBuilder = require("../../models/users");
const serialize = require("./serializer");
const baseDataAccess = require("../base")({
  model: Users,
  modelName: "Users",
  modelBuilder: userBuilder,
  serialize,
});

module.exports = { ...baseDataAccess };
