const users = require("../../../../use-cases/users");
const serializer = require("./serializer");

const create = async (call, callback) => {
  const payload = serializer(call);
  await users
    .create(payload)
    .then((res) => {
      callback(null, res);
    })
    .catch((err) => {
      callback(null, err);
    });
};

/**
 * name of object ex: "userCreate" bellow 
 * must follow service name in proto file
 */
module.exports = {
  userCreate: create,
};
