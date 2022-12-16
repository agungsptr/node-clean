const students = require("../../data-access/students");

const remove = async (id) => {
  return students.remove(id);
};

module.exports = remove;
