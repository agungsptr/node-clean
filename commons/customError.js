class CustomError extends Error {
  constructor(errors) {
    super(errors);
    this.name = this.constructor.name;
    this.arrayOfErrors = errors;
  }
}

module.exports = CustomError;
