const CustomError = require("./customError");

function IsArray(obj) {
  return Array.isArray(obj);
}

function IsEmpty(obj) {
  if (
    obj === null ||
    obj === undefined ||
    typeof obj === "undefined" ||
    obj === "" ||
    obj === "undefined"
  ) {
    return true;
  } else if (Array.isArray(obj) && obj.length === 0) {
    return true;
  } else {
    return false;
  }
}

function IsTrue(obj) {
  return obj === true || obj === "true";
}

function IsEmail(email) {
  const re = /\S+@\S+\.\S+/;
  return re.test(Trim(email.toLowerCase(), true));
}

function IfEmptyThrowError(obj, errorMsg) {
  if (IsEmpty(obj)) {
    throw new CustomError(errorMsg);
  }
}

function IfFalseThrowError(flag, errorMsg) {
  if (flag === false) {
    throw new CustomError(errorMsg);
  }
}

function IfNotEmptyThrowError(responseError, errorMsg) {
  if (!IsEmpty(responseError)) {
    throw new CustomError(errorMsg);
  }
}

function IfTrueThrowError(flag, errorMsg) {
  if (flag === true) {
    throw new CustomError(errorMsg);
  }
}

function ImageFileTypeIsValid(file) {
  return (
    file &&
    file.mimetype !== "image/png" &&
    file.mimetype !== "image/jpg" &&
    file.mimetype !== "image/jpeg"
  );
}

module.exports = {
  IsArray,
  IsEmpty,
  IsTrue,
  IsEmail,
  IfEmptyThrowError,
  IfNotEmptyThrowError,
  IfTrueThrowError,
  IfFalseThrowError,
  ImageFileTypeIsValid,
};
