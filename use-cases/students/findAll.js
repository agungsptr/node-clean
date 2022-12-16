const students = require("../../data-access/students");

const findAll = async (queries) => {
  return students.findAll(queries);
};

module.exports = findAll;
