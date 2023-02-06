const {
  ifEmptyThrowError,
  ifFalseThrowError,
  isValidObjId,
  isEmpty,
} = require("../commons/checks");
const { queriesBuilder } = require("../commons/utils");
const { repackageError } = require("../commons/errors");

const baseDataAccess = ({ model, modelName, modelBuilder, serialize }) => {
  const findAll = async (
    queries = { like: {}, eq: {} },
    options = { orderBy: { createdAt: 1 }, limit: 10, skip: 0 }
  ) => {
    try {
      const data = await model
        .find(queriesBuilder(queries.like, "LIKE"))
        .find(queriesBuilder(queries.eq, "EQ"))
        .sort(options.orderBy)
        .limit(options.limit)
        .skip(options.skip)
        .then(serialize);
      const total = await model
        .count(queriesBuilder(queries.like, "LIKE"))
        .count(queriesBuilder(queries.eq, "EQ"));
      return { data, total };
    } catch (e) {
      throw repackageError(e);
    }
  };

  const findOne = async (id) => {
    try {
      ifFalseThrowError(!isEmpty(id) && isValidObjId(id), "id is not valid");
      return model.findById(id).then(serialize);
    } catch (e) {
      throw repackageError(e);
    }
  };

  const findOneBy = async (
    queries = { like: {}, eq: {} },
    options = { orderBy: { createdAt: 1 } }
  ) => {
    try {
      return model
        .findOne(queriesBuilder(queries.eq, "EQ"))
        .findOne(queriesBuilder(queries.like, "LIKE"))
        .sort(options.orderBy)
        .then(serialize);
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
      ifFalseThrowError(!isEmpty(id) && isValidObjId(id), "id is not valid");
      const data = await model.findById(id).then(serialize);
      ifEmptyThrowError(
        data,
        `Data with id: ${id} in ${modelName} is not found`
      );
      const dataToUpdate = modelBuilder({ ...data, ...payload });
      await model.findByIdAndUpdate(id, dataToUpdate);
      return { id, ...dataToUpdate };
    } catch (e) {
      throw repackageError(e);
    }
  };

  const remove = async (id) => {
    try {
      ifFalseThrowError(!isEmpty(id) && isValidObjId(id), "id is not valid");
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
