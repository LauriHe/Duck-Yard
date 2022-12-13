"use strict";
const express = require("express");
const { body } = require("express-validator");
const { httpError } = require("../utils/errors");
const multer = require("multer");

const fileFilter = (req, file, cb) => {
  if (file.mimetype.includes("image")) {
    cb(null, true);
  } else {
    cb(httpError("Invalid file", 400));
  }
};

const upload = multer({ dest: "uploads/", fileFilter });
const {
  post_list_get,
  post_get,
  post_post,
  post_put,
  post_delete,
  post_likes_get,
  post_categories_get,
  post_comments_get,
  post_like,
} = require("../controllers/postController");
const router = express.Router();

router
  .route("/")
  .get(post_list_get)
  .post(
    upload.single("post"),
    body("heading").isLength({ min: 1 }).escape(),
    body("price").isNumeric(),
    body("description").isLength({ min: 1 }).escape(),
    post_post
  );

router
  .route("/:id")
  .get(post_get)
  .delete(post_delete)
  .put(
    body("name").isLength({ min: 1 }).escape(),
    body("birthdate").isDate(),
    body("weight").isNumeric(),
    post_put
  );

router.route("/like/").post(post_like);

router.route("/likes/:id").get(post_likes_get);

router.route("/comments/:id").get(post_comments_get);

router.route("/categories/:id").get(post_categories_get);

module.exports = router;
