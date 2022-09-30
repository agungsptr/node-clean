const { RepackageError } = require("../../commons/errors");

const studentBuilder = (validator) => {
  return ({ name, age, grade, prefect = false }) => {
    const { error } = validator({ name, age, grade, prefect });
    if (error) throw RepackageError(error);
    return { name, age, grade, prefect };
  };
};

module.exports = studentBuilder;
