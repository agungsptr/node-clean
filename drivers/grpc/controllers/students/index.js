const { objBuilder } = require("../../../../commons/utils");
const students = require("../../../../use-cases/students");
const serializer = require("./serializer");

const create = async (call, callback) => {
  const { createdBy } = call.request;
  const payload = serializer.fromGrpc(call);
  await students
    .create({...payload, createdBy})
    .then((res) => {
      callback(null, serializer.toGrpc(res));
    })
    .catch((err) => {
      callback(err, null);
    });
};

const findOne = async (call, callback) => {
  await students
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

  await students
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
  await students
    .update(id, payload)
    .then((res) => {
      callback(null, serializer.toGrpc(res));
    })
    .catch((err) => {
      callback(err, null);
    });
};

const remove = async (call, callback) => {
  await students
    .remove(call.request.id)
    .then((res) => {
      callback(null, {});
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
  studentFindOne: findOne,
  studentFindAll: findAll,
  studentUpdate: update,
  studentRemove: remove,
};
