const { serializer } = require("../../commons/utils");

const _serializeSingle = (data) => {
  return {
    id: data._id,
    firstName: data.firstName,
    lastName: data.lastName,
    username: data.username,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
  };
};

module.exports = serializer(_serializeSingle);
