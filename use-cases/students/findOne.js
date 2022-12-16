const students = require("../../data-access/students");

const findOne = async (id) => {
  return students.findOne(id);
};

module.exports = findOne;
