const { Router } = require("express");
const students = require("../controllers/students.controller");

const router = Router();
const baseUrl = "/student";

router.get(`${baseUrl}s`, students.findAll);
router.get(`${baseUrl}/:id`, students.findOne);
router.post(`${baseUrl}`, students.create);

module.exports = router;
