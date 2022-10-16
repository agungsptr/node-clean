const { RepackageError } = require("../../commons/errors");
const Users = require("../../db/models/users.model");
const userBuilder = require("../../models/users");
const serialize = require("./serializer");
const baseDataAccess = require("../base")({
  model: Users,
  modelName: "Users",
  modelBuilder: userBuilder,
  serialize,
});

const findUserCredential = async (username) => {
  try {
    return Users.findOne({ username }).then((data) => {
      const serializedData = serialize(data);
      serializedData.password = data.password;
      return serializedData;
    });
  } catch (e) {
    throw RepackageError(e.message);
  }
};

module.exports = {
  ...baseDataAccess,
  findUserCredential,
};
