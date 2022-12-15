"use strict";
const express = require("express");
const {
  user_list_get,
  user_get,
  user_put,
  user_delete,
  check_token,
  user_likes_get,
  user_update_put
} = require("../controllers/userController");
const { body } = require("express-validator");
const router = express.Router();

router
  .route("/")
  .get(user_list_get)
  .put(
    body("name"),
    body("password"),
    body("email"),
    body("phone"),
    body("location"),
    user_update_put
  );

router.get("/token", check_token);

router.route("/:id").get(user_get).delete(user_delete);

router.route("/likes/:id").get(user_likes_get);

module.exports = router;

// Delete this one later
// git hub
