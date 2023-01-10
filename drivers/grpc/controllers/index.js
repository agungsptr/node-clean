const users = require("./users");
const students = require("./students");

module.exports = {
  ...users,
  ...students,
};
