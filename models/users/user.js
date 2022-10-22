const { CustomError } = require("../../commons/errors");

const userBuilder = (validator) => {
  return ({
    firstName,
    lastName,
    username,
    password,
    createdAt,
    updatedAt,
  }) => {
    const { error, value } = validator({
      firstName,
      lastName,
      username,
      password,
      createdAt,
      updatedAt,
    });
    if (error.length > 0) throw new CustomError(error);
    return value;
  };
};

module.exports = userBuilder;
