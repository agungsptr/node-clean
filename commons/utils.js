const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
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

const queriesBuilder = (queries, eqlType = "EQ") => {
  const obj = {};
  for (const [key, val] of Object.entries(queries)) {
    if (eqlType === "EQ") {
      obj[key] = { $eq: val };
    } else {
      obj[key] = { $regex: val, $options: "i" };
    }
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

const issueJwt = (payload) => {
  return jwt.sign(payload, config.jwt.secretKey, {
    expiresIn: config.jwt.expired,
  });
};

const verifyJwt = (token) => {
  return token;
};

const objHierarchyMapper = (obj, childs, value, i = 0) => {
  if (i === childs.length - 1) {
    obj[childs[i]] = value;
  } else {
    obj[childs[i]] = {};
    obj = objHierarchyMapper(obj[childs[i]], childs, value, i + 1);
  }
  return obj;
};

module.exports = {
  responseBuilder,
  queriesBuilder,
  serializer,
  hashPassword,
  comparePassword,
  issueJwt,
  verifyJwt,
  objHierarchyMapper,
};
