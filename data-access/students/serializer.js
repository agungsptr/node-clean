const { serializer } = require("../../commons/utils");
const moment = require("moment");

const _serializeSingle = (data) => {
  return {
    id: data._id,
    grade: data.grade,
    name: data.name,
    age: data.age,
    perfect: data.perfect,
    createdBy: data.createdBy,
    createdAt: moment(data.createdAt).toISOString(),
    updatedAt: moment(data.updatedAt).toISOString(),
  };
};

module.exports = serializer(_serializeSingle);
