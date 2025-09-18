const express = require('express');
const router = express.Router();
const {auth} = require("../middleware/auth.middleware")
// You can write the above line of code lilke this
// const router = require('express').Router();
const AuthController = require('../controllers/auth.controller');

//public route

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);

//protected route
router.get("/profile", auth, AuthController.getProfile);

module.exports = router