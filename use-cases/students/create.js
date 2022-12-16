const students = require("../../data-access/students");

const create = async (payload) => {
  return students.create(payload);
};

module.exports = create;
