const { CustomError } = require("../../commons/errors");

const studentBuilder = (validator) => {
  return ({
    name,
    age,
    grade,
    prefect = false,
    createdBy,
    createdAt,
    updatedAt,
  }) => {
    const { error, value } = validator({
      name,
      age,
      grade,
      prefect,
      createdBy,
      createdAt,
      updatedAt,
    });
    if (error.length > 0) throw new CustomError(error);
    return value;
  };
};

module.exports = studentBuilder;
