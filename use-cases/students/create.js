const studentsDa = require("../../data-access/students");
const { ResponseWithError } = require("../../commons/errors");

const create = async (req, res, next) => {
  try {
    const data = await studentsDa.create(req.body);
    res.status(200).send(data);
    return next();
  } catch (e) {
    return ResponseWithError(res, e, 400);
  }
};

module.exports = create;
