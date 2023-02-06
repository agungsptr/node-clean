const moment = require("moment");
const { sanitizerPayload } = require("../../../../commons/utils");

const fromGrpc = (call) => {
  return sanitizerPayload(call.request);
};

const toGrpc = (data) => {
  data.createdAt = moment(data.createdAt).toISOString();
  data.updatedAt = moment(data.updatedAt).toISOString();
  return data;
};

module.exports = {
  fromGrpc,
  toGrpc,
};
