const serializer = (call) => {
  return {
    id: call.request.id,
    firstName: call.request.firstName,
    lastName: call.request.lastName,
    username: call.request.username,
    password: call.request.password,
    createdAt: call.request.createdAt,
    updatedAt: call.request.updatedAt,
  };
};

module.exports = serializer;
