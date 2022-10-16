const { CustomError } = require("../../commons/errors");

const studentBuilder = (validator) => {
  return ({ name, age, grade, prefect = false }) => {
    const { error, value } = validator({ name, age, grade, prefect });
    if (error.length > 0) throw new CustomError(error);
    return value;
  };
};

module.exports = studentBuilder;
