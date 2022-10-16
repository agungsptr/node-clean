const auth = require("../use-cases/auth");

module.exports = {
  login: async (req, res, next) => auth.login(req, res, next),
};
