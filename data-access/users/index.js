const { isEmpty, ifEmptyThrowError } = require("../../commons/checks");
const { repackageError } = require("../../commons/errors");
const { hashPassword, queriesBuilder } = require("../../commons/utils");
const Users = require("../../db/models/users.model");
const userBuilder = require("../../models/users");
const serialize = require("./serializer");
const baseDataAccess = require("../base")({
  model: Users,
  modelName: "Users",
  modelBuilder: userBuilder,
  serialize,
});

baseDataAccess.update = async (id, payload) => {
  try {
    const data = await Users.findById(id).then((user) => {
      if (user) {
        const serializedData = serialize(user);
        serializedData.password = user.password;
        return serializedData;
      }
    });
    ifEmptyThrowError(data, `Data with id: ${id} in Users is not found`);
    if (!isEmpty(payload.password)) {
      data.password = hashPassword(payload.password);
      delete payload.password;
    }

    const dataToUpdate = userBuilder({ ...data, ...payload });
    await Users.updateOne({ id }, dataToUpdate);
    return { id, ...dataToUpdate };
  } catch (e) {
    throw repackageError(e);
  }
};

const findUserCredential = async (username) => {
  try {
    return Users.findOne(queriesBuilder({ username })).then((data) => {
      const serializedData = serialize(data);
      serializedData.password = data.password;
      return serializedData;
    });
  } catch (e) {
    throw repackageError(e);
  }
};

module.exports = {
  ...baseDataAccess,
  findUserCredential,
};
