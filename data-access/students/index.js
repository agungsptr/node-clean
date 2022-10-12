const Students = require("../../db/models/students.model");
const studentBuilder = require("../../models/students/");
const serialize = require("./serializer");
const { IfEmptyThrowError } = require("../../commons/checks");
const { mongoWhereGen } = require("../../commons/utils");

const findAll = async (queries = {}) => {
  return Students.find(mongoWhereGen(queries)).then(serialize);
};

const findOne = async (id) => {
  return Students.findById(id).then(serialize);
};

const create = async (bodyData) => {
  const data = studentBuilder(bodyData);
  return Students.create(data).then(serialize);
};

const update = async (id, bodyData) => {
  const data = await Students.findById(id);
  IfEmptyThrowError(data, `Data with id: ${id} in Students is not found`);

  const dataToUpdate = studentBuilder(bodyData);
  Object.assign(data, dataToUpdate);
  return data.save().then(serialize);
};

const remove = async (id) => {
  return Students.findByIdAndDelete(id)
    .then((resp) => {
      return {
        id: resp._id.toString(),
        status: "success",
      };
    })
    .catch((err) => {
      return {
        status: "fail",
      };
    });
};

const removeAll = async () => {
  return Students.deleteMany();
};

module.exports = {
  findAll,
  findOne,
  create,
  update,
  remove,
  removeAll,
};
