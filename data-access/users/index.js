const { repackageError } = require("../../commons/errors");
const { hashPassword, queriesBuilder } = require("../../commons/utils");
const Users = require("../../db/models/users.model");
const userBuilder = require("../../models/user");
const serialize = require("./serializer");
const {
  ifFalseThrowError,
  isValidObjId,
  isEmpty,
} = require("../../commons/checks");
const CustomError = require("../../commons/customError");
const baseDataAccess = require("../base")({
  model: Users,
  modelName: "Users",
  modelBuilder: userBuilder,
  serialize,
});

baseDataAccess.update = async (id, payload) => {
  try {
    ifFalseThrowError(!isEmpty(id) && isValidObjId(id), "id is not valid");
    const data = await Users.findById(id).then((user) => {
      if (user) {
        return { ...serialize(user), password: user.password };
      } else {
        throw new CustomError(`Data with id: ${id} in Users is not found`);
      }
    });

    if (payload.password) {
      data.password = hashPassword(payload.password);
      delete payload.password;
    }

    const dataToUpdate = userBuilder({ ...data, ...payload });
    await Users.findByIdAndUpdate(id, dataToUpdate);
    delete dataToUpdate.password;
    dataToUpdate.id = id;

    return dataToUpdate;
  } catch (e) {
    throw repackageError(e);
  }
};

const findUserCredential = async (queries) => {
  try {
    if ("_id" in queries) {
      ifFalseThrowError(isValidObjId(queries._id), "id is not valid");
    }
    return Users.findOne(queriesBuilder(queries)).then((user) => {
      if (user) {
        return {
          ...serialize(user),
          password: user.password,
          secretUuid: user.secretUuid,
        };
      } else {
        throw new CustomError("Users is not found");
      }
    });
  } catch (e) {
    throw repackageError(e);
  }
};

module.exports = { ...baseDataAccess, findUserCredential };
