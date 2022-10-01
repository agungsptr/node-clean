const studentsUc = require("../use-cases/students");

module.exports = {
  create: async (req, res, next) => studentsUc.create(req, res, next),
  findOne: async (req, res, next) => studentsUc.findOne(req, res, next),
  findAll: async (req, res, next) => studentsUc.findAll(req, res, next),
  update: async (req, res, next) => studentsUc.update(req, res, next),
  remove: async (req, res, next) => studentsUc.remove(req, res, next),
};
