"use strict";
const { httpError } = require("../utils/errors");
const { validationResult } = require("express-validator");
const sharp = require("sharp");
const { getCoordinates } = require("../utils/imageMeta");

const {
  getAllCategories,
  getCategoryPosts,
} = require("../models/categoryModel");

const category_list_get = async (req, res, next) => {
  try {
    const categories = await getAllCategories(next);
    if (categories.length < 1) {
      next(httpError("No posts found", 404));
      return;
    }
    res.json(categories);
  } catch (e) {
    console.error("category_list_get", e.message);
    next(httpError("Internal server error", 500));
  }
};

const category_posts_get = async (req, res, next) => {
  try {
    const categories = await getCategoryPosts(req.params.id, next);
    if (categories.length < 1) {
      next(httpError("No posts found", 404));
      return;
    }
    res.json(categories);
  } catch (e) {
    console.error("category_posts_get", e.message);
    next(httpError("Internal server error", 500));
  }
};

module.exports = {
  category_list_get,
  category_posts_get,
};
