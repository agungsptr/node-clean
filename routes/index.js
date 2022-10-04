const { Router } = require("express");
const studentRoute = require("./students");

const router = Router();

router.use(studentRoute);

module.exports = router;
