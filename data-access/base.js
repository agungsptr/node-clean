const { IfEmptyThrowError } = require("../commons/checks");
const { conditionParser } = require("../commons/utils");
const { RepackageError } = require("../commons/errors");

const baseDataAccess = ({ model, modelName, modelBuilder, serialize }) => {
  const findAll = async (queries = {}) => {
    try {
      return model.find(conditionParser(queries)).then(serialize);
    } catch (e) {
      throw RepackageError(e.message);
    }
  };
  const findOne = async (id) => {
    try {
      return model.findById(id).then(serialize);
    } catch (e) {
      throw RepackageError(e.message);
    }
  };
  const create = async (bodyData) => {
    try {
      const data = modelBuilder(bodyData);
      return model.create(data).then(serialize);
    } catch (e) {
      throw RepackageError(e.message);
    }
  };
  const update = async (id, bodyData) => {
    try {
      const data = await model.findById(id).then(serialize);
      IfEmptyThrowError(
        data,
        `Data with id: ${id} in ${modelName} is not found`
      );

      const dataToUpdate = modelBuilder({ ...data, ...bodyData });
      await model.findByIdAndUpdate(id, dataToUpdate);
      return { id, ...dataToUpdate };
    } catch (e) {
      throw RepackageError(e.message);
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
      throw RepackageError(e.message);
    }
  };
  const removeAll = async () => {
    try {
      await model.deleteMany();
      return null;
    } catch (e) {
      throw RepackageError(e.message);
    }
  };

  return {
    findAll,
    findOne,
    create,
    update,
    remove,
    removeAll,
  };
};

module.exports = baseDataAccess;
