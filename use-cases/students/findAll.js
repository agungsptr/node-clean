const { paginationBuilder } = require("../../commons/utils");
const students = require("../../data-access/students");

const findAll = async (queries, limit, page) => {
  return paginationBuilder(limit, page, async (skip) => {
    return students.findAll({ like: queries }, { limit, skip });
  });
};

module.exports = findAll;
