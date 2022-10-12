const validator = (schema) => (payload) => {
  const { error, value } = schema.validate(payload, { abortEarly: false });
  let message = [];
  if (error) message = error.details.map((el) => el.message);
  return {
    error: message,
    value,
  };
};

module.exports = validator;
