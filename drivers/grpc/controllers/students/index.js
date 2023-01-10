const students = require("../../../../use-cases/students");
const serializer = require("./serializer");

const create = async (call, callback) => {
  const payload = serializer(call);
  await students
    .create(payload)
    .then((res) => {
      callback(null, res);
    })
    .catch((err) => {
      callback(null, err);
    });
};

/**
 * name of object ex: "studentCreate" bellow 
 * must follow service name in proto file
 */
module.exports = {
  studentCreate: create,
};
