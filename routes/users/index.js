const { Router } = require("express");
const users = require("../../controllers/users");
const middleware = require("../../middlewares");

const router = Router();
const baseUrl = "/user";

router.get(`${baseUrl}s`, middleware.auth, users.findAll);
router.get(`${baseUrl}/:id`, middleware.auth, users.findOne);
router.post(`${baseUrl}`, middleware.auth, users.create);
router.patch(`${baseUrl}/:id`, middleware.auth, users.update);
router.delete(`${baseUrl}/:id`, middleware.auth, users.remove);

module.exports = router;
