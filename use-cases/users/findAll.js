const users = require("../../data-access/users");

const findAll = async (queries) => {
  return users.findAll(queries);
};

module.exports = findAll;
