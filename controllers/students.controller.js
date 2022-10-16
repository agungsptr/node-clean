const students = require("../use-cases/students");

module.exports = {
  create: async (req, res, next) => students.create(req, res, next),
  findOne: async (req, res, next) => students.findOne(req, res, next),
  findAll: async (req, res, next) => students.findAll(req, res, next),
  update: async (req, res, next) => students.update(req, res, next),
  remove: async (req, res, next) => students.remove(req, res, next),
};
