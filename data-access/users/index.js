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
      if (user) return { ...serialize(user), password: user.password };
    });
    ifEmptyThrowError(data, `Data with id: ${id} in Users is not found`);
    if (!isEmpty(payload.password)) {
      data.password = hashPassword(payload.password);
      delete payload.password;
    }

    const dataToUpdate = userBuilder({ ...data, ...payload });
    await Users.findByIdAndUpdate(id, dataToUpdate).then(
      delete dataToUpdate.password
    );
    return { id, ...dataToUpdate };
  } catch (e) {
    throw repackageError(e);
  }
};

const findUserCredential = async (queries) => {
  try {
    return Users.findOne(queriesBuilder(queries)).then((user) => {
      if (user)
        return {
          ...serialize(user),
          password: user.password,
          secretUuid: user.secretUuid,
        };
    });
  } catch (e) {
    throw repackageError(e);
  }
};

module.exports = {
  ...baseDataAccess,
  findUserCredential,
};
