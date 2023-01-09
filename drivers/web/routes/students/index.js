const { Router } = require("express");
const students = require("../../controllers/students");
const middleware = require("../../middlewares");

const router = Router();
const baseUrl = "/student";

router.get(`${baseUrl}s`, middleware.auth, students.findAll);
router.get(`${baseUrl}/:id`, middleware.auth, students.findOne);
router.post(`${baseUrl}`, middleware.auth, students.create);
router.patch(`${baseUrl}/:id`, middleware.auth, students.update);
router.delete(`${baseUrl}/:id`, middleware.auth, students.remove);

module.exports = router;
