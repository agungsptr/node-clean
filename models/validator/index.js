const validator = (schema) => (payload) => {
  const { error } = schema.validate(payload, { abortEarly: false });
  if (error) {
    const message = error.details.map((el) => el.message);
    return {
      error: message,
    };
  }
  return true;
};

module.exports = validator;
