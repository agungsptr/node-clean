const { Router } = require("express");
const students = require("./students");
const users = require("./users");

const router = Router();

router.use(students);
router.use(users);

module.exports = router;
