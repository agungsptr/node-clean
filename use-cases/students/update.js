const studentsDa = require("../../data-access/students");
const { ResponseWithError } = require("../../commons/errors");

const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await studentsDa.update(id, req.body);
    res.status(200).send(data);
    return next();
  } catch (e) {
    return ResponseWithError(res, e, 400);
  }
};

module.exports = update;
