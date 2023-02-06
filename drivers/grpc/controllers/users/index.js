const { objBuilder } = require("../../../../commons/utils");
const users = require("../../../../use-cases/users");
const serializer = require("./serializer");

const create = async (call, callback) => {
  const payload = serializer.fromGrpc(call);
  await users
    .create(payload)
    .then((res) => {
      callback(null, serializer.toGrpc(res));
    })
    .catch((err) => {
      callback(err, null);
    });
};

const findOne = async (call, callback) => {
  await users
    .findOne(call.request.id)
    .then((res) => {
      callback(null, serializer.toGrpc(res));
    })
    .catch((err) => {
      callback(err, null);
    });
};

const findAll = async (call, callback) => {
  const { queries, page, limit } = call.request.fields;

  const q = {};
  for (const [key, val] of Object.entries(queries.structValue.fields)) {
    q[key] = val.stringValue || val.numberValue || val.boolValue;
  }

  await users
    .findAll(q, limit.numberValue, page.numberValue)
    .then((res) => {
      callback(null, {
        page: res.page,
        data: res.data.map((e) => serializer.toGrpc(e)),
      });
    })
    .catch((err) => {
      callback(err, null);
    });
};

const update = async (call, callback) => {
  const { id } = call.request;
  const payload = objBuilder(serializer.fromGrpc(call));
  await users
    .update(id, payload)
    .then((res) => {
      callback(null, serializer.toGrpc(res));
    })
    .catch((err) => {
      callback(err, null);
    });
};

const remove = async (call, callback) => {
  await users
    .remove(call.request.id)
    .then((res) => {
      callback(null, {});
    })
    .catch((err) => {
      callback(err, null);
    });
};

/**
 * name of object ex: "userCreate" bellow
 * must follow service name in proto file
 */
module.exports = {
  userCreate: create,
  userFindOne: findOne,
  userFindAll: findAll,
  userUpdate: update,
  userRemove: remove,
};
