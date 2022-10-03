const { IsEmpty } = require("./checks");
const { StatusCode } = require("./constants");

const CheckDigits = (v) => {
  const s = v.split("").reduce((a, b) => parseInt(a, 10) + parseInt(b, 10), 0);
  return s.toString().length > 1
    ? CheckDigits(s.toString()).toString()
    : s.toString();
};

const UniqueInt = (len = 10) => {
  const unixts = process.hrtime().join("");
  let id =
    unixts
      .split("")
      .reverse()
      .join("")
      .substring(0, len - 1) + CheckDigits(unixts);
  id = id[0] === "0" ? id.split("").reverse().join("") : id;
  return parseInt(id, 10);
};

const Trim = (
  str = "",
  trimMiddle = false,
  trimMiddleToSingleSpace = false
) => {
  if (!IsEmpty(str)) {
    str = str.trim();
    if (trimMiddleToSingleSpace) {
      str = str.replace(/\s\s+/g, " ");
    }
    if (trimMiddle) {
      str = str.replace(/\s+/g, "");
    }
    return str;
  } else {
    return str;
  }
};

const responseBuilder = ({ statusCode, data, message }) => {
  const status = statusCode === StatusCode.OK ? "Success" : "Failed";
  return {
    statusCode,
    status,
    message,
    data,
  };
};

module.exports = {
  CheckDigits,
  UniqueInt,
  Trim,
  responseBuilder,
};
