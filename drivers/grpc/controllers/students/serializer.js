const serializer = (call) => {
  return {
    name: call.request.name,
    age: call.request.age,
    grade: call.request.grade,
    perfect: call.request.perfect,
    createdBy: {
      userId: call.request.createdBy.userId,
      username: call.request.createdBy.username,
    },
  };
};

module.exports = serializer;
