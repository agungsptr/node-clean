const {
  ifFalseThrowError,
  isValidObjId,
  isEmpty,
} = require("../../commons/checks");
const { paginationBuilder } = require("../../commons/utils");
const users = require("../../data-access/users");

const findAll = async (queries, limit, page) => {
  const { id, username, ...q } = queries;
  const eq = {};
  if ("id" in queries) {
    ifFalseThrowError(isValidObjId(id), "id is not valid");
    eq.id = id;
  }
  if (!isEmpty(username)) {
    eq.username = username;
  }

  return paginationBuilder(limit, page, async (skip) => {
    return users.findAll({ like: q, eq }, { limit, skip });
  });
};

module.exports = findAll;
