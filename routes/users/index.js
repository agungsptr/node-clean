const users = require("../../controllers/users.controller");
const { Router } = require("express");
const { auth } = require("../../middleware");

const router = Router();
const baseUrl = "/user";

router.get(`${baseUrl}s`, auth, users.findAll);
router.get(`${baseUrl}/:id`, users.findOne);
router.post(`${baseUrl}`, users.create);
router.patch(`${baseUrl}/:id`, users.update);
router.delete(`${baseUrl}/:id`, users.remove);

module.exports = router;
