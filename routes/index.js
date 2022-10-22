const { Router } = require("express");
const middlewares = require("../middlewares");
const students = require("./students");
const users = require("./users");
const auth = require("./auth");

const router = Router();

router.use(auth);
router.use(middlewares.auth, users);
router.use(middlewares.auth, students);

module.exports = router;
