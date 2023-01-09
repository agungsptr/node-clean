const { Router } = require("express");
const auth = require("../../controllers/auth");
const middleware = require("../../middlewares");

const router = Router();
const baseUrl = "/auth";

router.post(`${baseUrl}/login`, auth.login);
router.post(`${baseUrl}/logout`, middleware.auth, auth.logout);

module.exports = router;
