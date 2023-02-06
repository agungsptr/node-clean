const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config");
const { StatusCode } = require("./constants");
const { isEmpty } = require("./checks");

const responseBuilder = ({ statusCode, message, data = null, page = null }) => {
  const status = statusCode === StatusCode.OK ? "Success" : "Failed";
  const result = {
    statusCode,
    status,
    message,
    data,
  };
  if (page) result.page = page;
  return result;
};

const queriesBuilder = (queries, eqlType = "EQ") => {
  const obj = {};
  if (isEmpty(queries)) return obj;
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

const comparePassword = async (password, hash) => {
  return bcrypt.compare(password, hash);
};

const issueJwt = (payload, userSecretUuid = "") => {
  return jwt.sign(payload, `${config.jwt.secretKey}${userSecretUuid}`, {
    expiresIn: config.jwt.expired,
  });
};

const tokenSplitter = (token) => {
  const splitted = token.split(" ");
  if (!token || (splitted && splitted.length !== 2)) {
    return false;
  }
  return splitted;
};

const verifyJwt = (token, userSecretUuid, cb) => {
  const secretKey = `${config.jwt.secretKey}${userSecretUuid}`;
  return jwt.verify(token, secretKey, {}, (err, decoded) => {
    if (err) {
      if (err.message.includes("invalid signature")) {
        return cb(null, err.message.replace(" ", "-"));
      }
      return cb(null, "invalid-token");
    }
    return cb(decoded, null);
  });
};

const sanitizerPayload = (payload) => {
  delete payload.createdBy;
  delete payload.createdAt;
  delete payload.updatedAt;
  delete payload.id;
  delete payload._id;
  return payload;
};

const validatorSchema = (schema) => (payload) => {
  const { error, value } = schema.validate(payload, { abortEarly: false });
  const messages = !isEmpty(error) ? error.details.map((el) => el.message) : [];
  return {
    error: messages,
    value,
  };
};

const paginationBuilder = async (limit, page, loader = async (skip) => {}) => {
  limit = parseInt(limit, 10) || 10;
  page = parseInt(page, 10) || 1;
  page = page > 0 ? page : 1;
  const skip = limit * (page - 1);

  /** Load data callback */
  const { data, total } = await loader(skip);
  const pageCount = Math.ceil(total / limit);

  let nextPage = null;
  let prevPage = null;
  if (page <= pageCount) {
    nextPage = page + 1 <= pageCount ? page + 1 : null;
    prevPage = page - 1 > 0 ? page - 1 : null;
  }

  return {
    page: {
      prevPage,
      page,
      nextPage,
      limit,
      pageCount,
      total,
    },
    data,
  };
};

const objBuilder = (data) => {
  /** Use to make object with only have attribute not null */
  const obj = {};
  if (isEmpty(data)) return obj;
  for (const [key, val] of Object.entries(data)) {
    if (!isEmpty(val)) obj[key] = val;
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
  tokenSplitter,
  sanitizerPayload,
  validatorSchema,
  paginationBuilder,
  objBuilder
};
