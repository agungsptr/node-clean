const Students = require("../../db/models/students.model");
const studentBuilder = require("../../models/students/");
const serialize = require("./serializer");

const findAll = async () => {
  return Students.find().then(serialize);
};

const findOne = async (id) => {
  return Students.find({ id }).then((result) => {
    return serialize(result[0]);
  });
};

const findBy = async (prop, val) => {
  return Students.find({ [prop]: val }).then(serialize);
};

const create = async (bodyData) => {
  const data = studentBuilder(bodyData);
  return Students.create(data).then(serialize);
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
  findBy,
  create,
  remove,
  removeAll,
};
