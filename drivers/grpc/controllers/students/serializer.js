const moment = require("moment");

const fromGrpc = (call) => {
  return {
    name: call.request.name,
    age: call.request.age,
    grade: call.request.grade,
    perfect: call.request.perfect,
    createdBy: {
      userId: call.request.created_by.user_id,
      username: call.request.created_by.username,
    },
  };
};

const toGrpc = (data) => {
  return {
    id: data.id,
    name: data.name,
    age: data.age,
    grade: data.grade,
    perfect: data.perfect,
    created_by: {
      user_id: data.createdBy.userId,
      username: data.createdBy.username,
    },
    created_at: moment(data.createdAt).toISOString(),
    updated_at: moment(data.updatedAt).toISOString(),
  };
};

module.exports = {
  fromGrpc,
  toGrpc,
};
