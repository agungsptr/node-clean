const users = require("../use-cases/users");

module.exports = {
  create: async (req, res, next) => users.create(req, res, next),
  findOne: async (req, res, next) => users.findOne(req, res, next),
  findAll: async (req, res, next) => users.findAll(req, res, next),
  update: async (req, res, next) => users.update(req, res, next),
  remove: async (req, res, next) => users.remove(req, res, next),
};
