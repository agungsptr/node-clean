const { Router } = require("express");
const users = require("../../controllers/users.controller");

const router = Router();
const baseUrl = "/user";

router.get(`${baseUrl}s`, users.findAll);
router.get(`${baseUrl}/:id`, users.findOne);
router.post(`${baseUrl}`, users.create);
router.patch(`${baseUrl}/:id`, users.update);
router.delete(`${baseUrl}/:id`, users.remove);

module.exports = router;
