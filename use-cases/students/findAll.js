const studentsDa = require("../../data-access/students");
const { ResponseWithError } = require("../../commons/errors");

const findAll = async (req, res, next) => {
  try {
    const data = await studentsDa.findAll();
    res.status(200).send(data);
    return next();
  } catch (e) {
    return ResponseWithError(res, e, 400);
  }
};

module.exports = findAll;
