const serializer = (call) => {
  return {
    firstName: call.request.firstName,
    lastName: call.request.lastName,
    username: call.request.username,
    password: call.request.password,
  };
};

module.exports = serializer;
