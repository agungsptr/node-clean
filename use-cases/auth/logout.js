const users = require("../../data-access/users");
const uuid = require("uuid");

const logout = async (payload) => {
  const user = await users.findUserCredential({ _id: payload.userId });
  if (user) {
    await users.update(user.id, { secretUuid: uuid.v4() });
    return true;
  }
  return false;
};

module.exports = logout;
