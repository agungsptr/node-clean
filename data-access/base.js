const {
  ifEmptyThrowError,
  ifFalseThrowError,
  isValidObjId,
} = require("../commons/checks");
const { queriesBuilder } = require("../commons/utils");
const { repackageError } = require("../commons/errors");

const baseDataAccess = ({ model, modelName, modelBuilder, serialize }) => {
  const findAll = async (queries = {}) => {
    try {
      return model.find(queriesBuilder(queries, "LIKE")).then(serialize);
    } catch (e) {
      throw repackageError(e);
    }
  };

  const findOne = async (id) => {
    try {
      ifFalseThrowError(isValidObjId(id), "id is not valid");
      return model.findById(id).then(serialize);
    } catch (e) {
      throw repackageError(e);
    }
  };

  const findOneBy = async (queries = {}) => {
    try {
      return model.findOne(queriesBuilder(queries, "EQ")).then(serialize);
    } catch (e) {
      throw repackageError(e);
    }
  };

  const create = async (payload) => {
    try {
      const data = modelBuilder(payload);
      return model.create(data).then(serialize);
    } catch (e) {
      throw repackageError(e);
    }
  };

  const update = async (id, payload) => {
    try {
      ifFalseThrowError(isValidObjId(id), "id is not valid");
      const data = await model.findById(id).then(serialize);
      ifEmptyThrowError(
        data,
        `Data with id: ${id} in ${modelName} is not found`
      );
      const dataToUpdate = modelBuilder({ ...data, ...payload });
      await model.updateOne({ id }, dataToUpdate);
      return { id, ...dataToUpdate };
    } catch (e) {
      throw repackageError(e);
    }
  };

  const remove = async (id) => {
    try {
      ifFalseThrowError(isValidObjId(id), "id is not valid");
      const data = await model.findById(id).then(serialize);
      ifEmptyThrowError(
        data,
        `Data with id: ${id} in ${modelName} is not found`
      );
      await model.findByIdAndDelete(id);
      return null;
    } catch (e) {
      throw repackageError(e);
    }
  };

  const removeAll = async () => {
    try {
      await model.deleteMany();
      return null;
    } catch (e) {
      throw repackageError(e);
    }
  };

  return {
    findAll,
    findOne,
    findOneBy,
    create,
    update,
    remove,
    removeAll,
  };
};

module.exports = baseDataAccess;
