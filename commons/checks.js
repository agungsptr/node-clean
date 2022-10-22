const CustomError = require("./customError");
const ObjectId = require("mongoose").Types.ObjectId;

const isArray = (obj) => {
  return Array.isArray(obj);
};

const isEmpty = (obj) => {
  if (Array.isArray(obj) && obj.length === 0) {
    return true;
  } else {
    if (
      obj === null ||
      obj === undefined ||
      typeof obj === "undefined" ||
      obj === "" ||
      obj === "undefined"
    ) {
      return true;
    }
  }
  return false;
};

const isEmail = (email) => {
  const re = /\S+@\S+\.\S+/;
  return re.test(Trim(email.toLowerCase(), true));
};

const ifEmptyThrowError = (obj, errorMsg) => {
  if (isEmpty(obj)) {
    throw new CustomError(errorMsg);
  }
};

const ifFalseThrowError = (flag, errorMsg) => {
  if (flag === false) {
    throw new CustomError(errorMsg);
  }
};

const ifNotEmptyThrowError = (responseError, errorMsg) => {
  if (!isEmpty(responseError)) {
    throw new CustomError(errorMsg);
  }
};

const ifTrueThrowError = (flag, errorMsg) => {
  if (flag === true) {
    throw new CustomError(errorMsg);
  }
};

const imageFileTypeIsValid = (file) => {
  return (
    file &&
    file.mimetype !== "image/png" &&
    file.mimetype !== "image/jpg" &&
    file.mimetype !== "image/jpeg"
  );
};

const isValidObjId = (id) => {
  if (id instanceof ObjectId) return true;
  if (ObjectId.isValid(id)) {
    if (String(new ObjectId(id)) === id) {
      return true;
    }
  }
  return false;
};

module.exports = {
  isArray,
  isEmpty,
  isEmail,
  ifEmptyThrowError,
  ifNotEmptyThrowError,
  ifTrueThrowError,
  ifFalseThrowError,
  imageFileTypeIsValid,
  isValidObjId,
};
