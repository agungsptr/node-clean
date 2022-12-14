const users = require("../../data-access/users");

const findOne = async (id) => {
  return users.findOne(id);
};

module.exports = findOne;
