const { Router } = require("express");
const auth = require("../../controllers/auth.controller");

const router = Router();
const baseUrl = "/auth";

router.post(`${baseUrl}/login`, auth.login);

module.exports = router;
