const { serializer } = require("../../commons/utils");
const moment = require("moment");

const _serializeSingle = (student) => {
  return {
    id: student._id,
    grade: student.grade,
    name: student.name,
    age: student.age,
    prefect: student.prefect,
    createdAt: moment(student.createdAt).format("YYYY-MM-DD HH:mm:ss"),
    updatedAt: moment(student.updatedAt).format("YYYY-MM-DD HH:mm:ss"),
  };
};

module.exports = serializer(_serializeSingle);
