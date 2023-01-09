const { sanitizerPayload } = require("../../../../commons/utils");
const users = require("../../../../use-cases/users");
const serializer = require("./serializer");

const create = async (call, callback) => {
  const serialize = serializer(call);
  const payload = sanitizerPayload(serialize);
  await users
    .create(payload)
    .then((res) => {
      callback(null, res);
    })
    .catch((err) => {
      callback(null, err);
    });
};

module.exports = {
  create,
};
