const students = require("../../../../use-cases/students");
const serializer = require("./serializer");

const create = async (call, callback) => {
  const payload = serializer.fromGrpc(call);
  await students
    .create(payload)
    .then((res) => {
      callback(null, serializer.toGrpc(res));
    })
    .catch((err) => {
      callback(err, null);
    });
};

/**
 * name of object ex: "studentCreate" bellow
 * must follow service name in proto file
 */
module.exports = {
  studentCreate: create,
};
