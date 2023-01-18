const moment = require("moment");

const fromGrpc = (call) => {
  return {
    firstName: call.request.first_name,
    lastName: call.request.last_name,
    username: call.request.username,
    password: call.request.password,
  };
};

const toGrpc = (data) => {
  return {
    id: data.id,
    first_name: data.firstName,
    last_name: data.lastName,
    username: data.username,
    password: data.password,
    created_at: moment(data.createdAt).toISOString(),
    updated_at: moment(data.updatedAt).toISOString(),
  };
};

module.exports = {
  fromGrpc,
  toGrpc,
};
