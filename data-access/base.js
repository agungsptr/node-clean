const { IfEmptyThrowError } = require("../commons/checks");
const { conditionParser } = require("../commons/utils");
const { RepackageError } = require("../commons/errors");

const baseDataAccess = ({ model, modelName, modelBuilder, serialize }) => {
  const findAll = async (queries = {}) => {
    try {
      return model.find(conditionParser(queries)).then(serialize);
    } catch (e) {
      throw RepackageError(e);
    }
  };

  const findOne = async (id) => {
    try {
      return model.findById(id).then(serialize);
    } catch (e) {
      throw RepackageError(e);
    }
  };

  const findOneBy = async (queries = {}) => {
    try {
      return model.findOne(queries).then(serialize);
    } catch (e) {
      throw RepackageError(e);
    }
  };

  const create = async (payload) => {
    try {
      const data = modelBuilder(payload);
      return model.create(data).then(serialize);
    } catch (e) {
      throw RepackageError(e);
    }
  };

  const update = async (id, payload) => {
    try {
      const data = await model.findById(id).then(serialize);
      IfEmptyThrowError(
        data,
        `Data with id: ${id} in ${modelName} is not found`
      );

      const dataToUpdate = modelBuilder({ ...data, ...payload });
      await model.findByIdAndUpdate(id, dataToUpdate);
      return { id, ...dataToUpdate };
    } catch (e) {
      throw RepackageError(e);
    }
  };

  const remove = async (id) => {
    try {
      const data = await model.findById(id).then(serialize);
      IfEmptyThrowError(
        data,
        `Data with id: ${id} in ${modelName} is not found`
      );
      await model.findByIdAndDelete(id);
      return null;
    } catch (e) {
      throw RepackageError(e);
    }
  };

  const removeAll = async () => {
    try {
      await model.deleteMany();
      return null;
    } catch (e) {
      throw RepackageError(e);
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
