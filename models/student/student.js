const CustomError = require("../../commons/customError");

const builder = (validator) => {
  return ({
    name,
    age,
    grade,
    perfect = false,
    createdBy,
    createdAt,
    updatedAt,
  }) => {
    const { error, value } = validator({
      name,
      age,
      grade,
      perfect,
      createdBy,
      createdAt,
      updatedAt,
    });
    if (error.length > 0) throw new CustomError(error);
    return value;
  };
};

module.exports = builder;
