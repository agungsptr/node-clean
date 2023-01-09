const { Router } = require("express");
const students = require("./students");
const users = require("./users");
const auth = require("./auth");

const router = Router();

router.use(auth);
router.use(users);
router.use(students);

module.exports = router;
