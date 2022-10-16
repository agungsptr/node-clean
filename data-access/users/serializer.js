const { serializer } = require("../../commons/utils");

const _serializeSingle = (user) => {
  return {
    id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    username: user.username,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
};

module.exports = serializer(_serializeSingle);
