const users = require("../../data-access/users");
const moment = require("moment");

const update = async (id, payload) => {
  payload.updatedAt = moment().toDate();
  return users.update(id, payload);
};

module.exports = update;
