"use strict";
const express = require("express");
const {
  user_get,
  user_delete,
  check_token,
  user_likes_get,
  user_update_put,
} = require("../controllers/userController");
const { body } = require("express-validator");
const router = express.Router();
const passport = require("../utils/pass");
const multer = require("multer");

const fileFilter = (req, file, cb) => {
  console.log("fileFilter", file);
  if (file.mimetype.includes("image")) {
    cb(null, true);
  } else {
    cb(httpError("Invalid file", 400));
  }
};
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
    body("image"),
    user_update_put
  )
  .get(user_get)
  .delete(user_delete);

router.get("/token", check_token);

router.route("/likes/:id").get(user_likes_get);

module.exports = router;
