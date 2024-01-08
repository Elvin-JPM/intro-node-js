const express = require("express");
const router = express.Router();
const Usuario = require("../models/Usuario.js");
const LoginController = require("../controllers/LoginController.js");

const loginController = new LoginController();

router.post("/", loginController.postJWT);

module.exports = router;
