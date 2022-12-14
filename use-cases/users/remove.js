const users = require("../../data-access/users");

const remove = async (id) => {
  return users.remove(id);
};

module.exports = remove;
