"use strict";
const express = require("express");
const {
  user_list_get,
  user_get,
  user_put,
  user_delete,
  check_token,
  user_likes_get,
  user_update_put,
} = require("../controllers/userController");
const { body } = require("express-validator");
const router = express.Router();
const passport = require("../utils/pass");
const multer = require("multer");
const upload = multer({ dest: "uploads/", fileFilter });

router
  .route("/")
  .put(
    upload.single("image"),
    body("name").isLength({ min: 3 }).escape(),
    body("passwd").matches(/(?=.*\p{Lu}).{8,}/u),
    body("email").isEmail(),
    body("phone").isMobilePhone(),
    body("location").isLength({ min: 3 }).escape(),
    body('image'),
    user_update_put
  )
  .get(user_get)
  .delete(user_delete);

router.get("/token", check_token);

router.route("/likes/:id").get(user_likes_get);

module.exports = router;

// Delete this one later
// git hub
