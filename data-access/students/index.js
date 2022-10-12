const Students = require("../../db/models/students.model");
const studentBuilder = require("../../models/students/");
const serialize = require("./serializer");
const { IfEmptyThrowError } = require("../../commons/checks");
const { conditionParser } = require("../../commons/utils");
const { RepackageError } = require("../../commons/errors");

const findAll = async (queries = {}) => {
  try {
    return Students.find(conditionParser(queries)).then(serialize);
  } catch (e) {
    throw RepackageError(e.message);
  }
};

const findOne = async (id) => {
  try {
    return Students.findById(id).then(serialize);
  } catch (e) {
    throw RepackageError(e.message);
  }
};

const create = async (bodyData) => {
  try {
    const data = studentBuilder(bodyData);
    return Students.create(data).then(serialize);
  } catch (e) {
    throw RepackageError(e.message);
  }
};

const update = async (id, bodyData) => {
  try {
    const data = await Students.findById(id).then(serialize);
    IfEmptyThrowError(data, `Data with id: ${id} in Students is not found`);

    const dataToUpdate = studentBuilder({ ...data, ...bodyData });
    await Students.findByIdAndUpdate(id, dataToUpdate);
    return { id, ...dataToUpdate };
  } catch (e) {
    throw RepackageError(e.message);
  }
};

const remove = async (id) => {
  try {
    const data = await Students.findById(id).then(serialize);
    IfEmptyThrowError(data, `Data with id: ${id} in Students is not found`);

    await Students.findByIdAndDelete(id);
    return null;
  } catch (e) {
    throw RepackageError(e.message);
  }
};

const removeAll = async () => {
  try {
    await Students.deleteMany();
    return null;
  } catch (e) {
    throw RepackageError(e.message);
  }
};

module.exports = {
  findAll,
  findOne,
  create,
  update,
  remove,
  removeAll,
};
