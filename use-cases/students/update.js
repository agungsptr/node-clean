const students = require("../../data-access/students");
const moment = require("moment");

const update = async (id, payload) => {
  payload.updatedAt = moment().toDate();
  return students.update(id, payload);
};

module.exports = update;
