class CustomError extends Error {
  constructor(error) {
    super(error);
    this.name = this.constructor.name;
    this.list = error;
  }
}

module.exports = CustomError;
