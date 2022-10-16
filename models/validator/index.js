const validator = (schema) => (payload) => {
  const { error, value } = schema.validate(payload, { abortEarly: false });
  let messages = [];
  if (error) messages = error.details.map((el) => el.message);
  return {
    error: messages,
    value,
  };
};

module.exports = validator;
