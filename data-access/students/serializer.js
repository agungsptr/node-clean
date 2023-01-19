const { serializer } = require("../../commons/utils");

const _serializeSingle = (data) => {
  return {
    id: data._id,
    grade: data.grade,
    name: data.name,
    age: data.age,
    perfect: data.perfect,
    createdBy: data.createdBy,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
  };
};

module.exports = serializer(_serializeSingle);
