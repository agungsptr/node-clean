const { Router } = require("express");
const studentRoute = require("./students.route");

const router = Router();

router.use(studentRoute);

module.exports = router;
