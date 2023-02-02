const CustomError = require("../../commons/customError");

const builder = (validator) => {
  return ({
    firstName,
    lastName,
    username,
    password,
    secretUuid,
    createdAt,
    updatedAt,
  }) => {
    const { error, value } = validator({
      firstName,
      lastName,
      username,
      password,
      secretUuid,
      createdAt,
      updatedAt,
    });
    if (error.length > 0) throw new CustomError(error);
    return value;
  };
};

module.exports = builder;
