const { Router } = require("express");
const students = require("./students");
const users = require("./users");
const auth = require("./auth");

const router = Router();

router.use(students);
router.use(users);
router.use(auth);

module.exports = router;
