const { serializer } = require("../../commons/utils");

const _serializeSingle = (student) => {
  return {
    id: student._id,
    grade: student.grade,
    name: student.name,
    age: student.age,
    prefect: student.prefect,
    createdBy: student.createdBy,
    createdAt: student.createdAt,
    updatedAt: student.updatedAt,
  };
};

module.exports = serializer(_serializeSingle);
