const users = require("../../data-access/users");

const create = async (payload) => {
  return users.create(payload);
};

module.exports = create;
