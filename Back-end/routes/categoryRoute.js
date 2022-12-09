"use strict";
const express = require("express");
const { body } = require("express-validator");
const { httpError } = require("../utils/errors");
const multer = require("multer");
const router = express.Router();

const {
  category_list_get,
  category_posts_get,
} = require("../controllers/categoryController");

router.route("/").get(category_list_get);
router.route("/:id").get(category_posts_get);

module.exports = router;
