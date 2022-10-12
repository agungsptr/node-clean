const Students = require("../../db/models/students.model");
const studentBuilder = require("../../models/students/");
const serialize = require("./serializer");
const { IfEmptyThrowError } = require("../../commons/checks");
const { conditionParser } = require("../../commons/utils");

const findAll = async (queries = {}) => {
  return Students.find(conditionParser(queries)).then(serialize);
};

const findOne = async (id) => {
  return Students.findById(id).then(serialize);
};

const create = async (bodyData) => {
  const data = studentBuilder(bodyData);
  return Students.create(data).then(serialize);
};

const update = async (id, bodyData) => {
  const data = await Students.findById(id).then(serialize);
  IfEmptyThrowError(data, `Data with id: ${id} in Students is not found`);

  const dataToUpdate = studentBuilder({ ...data, ...bodyData });
  await Students.findByIdAndUpdate(id, dataToUpdate);
  return { id, ...dataToUpdate };
};

const remove = async (id) => {
  await Students.findByIdAndDelete(id);
  return null;
};

const removeAll = async () => {
  await Students.deleteMany();
  return null;
};

module.exports = {
  findAll,
  findOne,
  create,
  update,
  remove,
  removeAll,
};
