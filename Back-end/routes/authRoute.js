"use strict";
const express = require("express");
const router = express.Router();
const { login, user_post } = require("../controllers/authController");
const { body } = require("express-validator");

router.post("/login", login);

router.post(
  "/register",
  body("name").isLength({ min: 3 }).escape(),
  body("email").isEmail(),
  body("passwd").matches(/(?=.*\p{Lu}).{8,}/u),
  body("phone").isMobilePhone(),
  body("location").isLength({ min: 3 }).escape(),
  body("roleid").isNumeric(),
  user_post
);

module.exports = router;
