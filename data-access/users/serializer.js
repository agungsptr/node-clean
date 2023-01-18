const { serializer } = require("../../commons/utils");
const moment = require("moment");

const _serializeSingle = (data) => {
  return {
    id: data._id,
    firstName: data.firstName,
    lastName: data.lastName,
    username: data.username,
    createdAt: moment(data.createdAt).toISOString(),
    updatedAt: moment(data.updatedAt).toISOString(),
  };
};

module.exports = serializer(_serializeSingle);
