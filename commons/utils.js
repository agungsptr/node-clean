const bcrypt = require("bcrypt");
const config = require("../config");
const { StatusCode } = require("./constants");

const responseBuilder = ({ statusCode, message, data = null }) => {
  const status = statusCode === StatusCode.OK ? "Success" : "Failed";
  return {
    statusCode,
    status,
    message,
    data,
  };
};

const conditionParser = (queries) => {
  const obj = {};
  for (const [key, val] of Object.entries(queries)) {
    obj[key] = { $regex: val, $options: "i" };
  }
  return obj;
};

const serializer = (_serializeSingle) => {
  return (data) => {
    if (!data) return null;
    if (Array.isArray(data)) {
      return data.map(_serializeSingle);
    }
    return _serializeSingle(data);
  };
};

const hashPassword = (password) => {
  const saltRounds = config.bcrypt.salt;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(password, salt);
  return hash;
};

const comparePassword = (password, hash) => {
  return bcrypt.compareSync(password, hash);
};

module.exports = {
  responseBuilder,
  conditionParser,
  serializer,
  hashPassword,
  comparePassword,
};
