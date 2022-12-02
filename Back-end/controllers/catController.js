"use strict";
// postController
const {
  getpost,
  getAllposts,
  addpost,
  updatepost,
  deletepost,
} = require("../models/postModel");
const { httpError } = require("../utils/errors");
const { validationResult } = require("express-validator");
const sharp = require("sharp");
const { getCoordinates } = require("../utils/imageMeta");

const post_list_get = async (req, res, next) => {
  try {
    const kissat = await getAllposts(next);
    if (kissat.length < 1) {
      next(httpError("No posts found", 404));
      return;
    }
    res.json(kissat);
  } catch (e) {
    console.error("post_list_get", e.message);
    next(httpError("Internal server error", 500));
  }
};

const post_get = async (req, res, next) => {
  try {
    const post = await getpost(req.params.id, next);
    if (post.length < 1) {
      next(httpError("No post found", 404));
      return;
    }
    res.json(post.pop());
  } catch (e) {
    console.error("post_get", e.message);
    next(httpError("Internal server error", 500));
  }
};

const post_post = async (req, res, next) => {
  try {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // There are errors.
      // Error messages can be returned in an array using `errors.array()`.
      console.error("user_post validation", errors.array());
      next(httpError("Invalid data", 400));
      return;
    }

    console.log("post_post", req.body, req.file);

    const thumbnail = await sharp(req.file.path)
      .resize(160, 160)
      .png()
      .toFile("./thumbnails/" + req.file.filename);

    const coords = await getCoordinates(req.file.path);

    const data = [
      req.body.name,
      req.body.birthdate,
      req.body.weight,
      req.user.user_id,
      req.file.filename,
      JSON.stringify(coords),
    ];

    const result = await addpost(data, next);
    if (result.affectedRows < 1) {
      next(httpError("Invalid data", 400));
      return;
    }
    if (thumbnail) {
      res.json({
        message: "post added",
        post_id: result.insertId,
      });
    }
  } catch (e) {
    console.error("post_post", e.message);
    next(httpError("Internal server error", 500));
  }
};

const post_put = async (req, res, next) => {
  try {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // There are errors.
      // Error messages can be returned in an array using `errors.array()`.
      console.error("user_post validation", errors.array());
      next(httpError("Invalid data", 400));
      return;
    }

    let data = [];

    if (req.user.role === 0) {
      data = [
        req.body.name,
        req.body.birthdate,
        req.body.weight,
        req.body.owner,
        req.body.id,
      ];
    } else {
      data = [
        req.body.name,
        req.body.birthdate,
        req.body.weight,
        req.body.id,
        req.user.user_id,
      ];
    }

    console.log("post_put", data);

    const result = await updatepost(data, req.user, next);
    if (result.affectedRows < 1) {
      next(httpError("No post modified", 400));
      return;
    }

    res.json({
      message: "post modified",
    });
  } catch (e) {
    console.error("post_put", e.message);
    next(httpError("Internal server error", 500));
  }
};

const post_delete = async (req, res, next) => {
  try {
    const result = await deletepost(req.params.id, req.user, next);
    if (result.affectedRows < 1) {
      next(httpError("No post deleted", 400));
      return;
    }
    res.json({
      message: "post deleted",
    });
  } catch (e) {
    console.error("delete", e.message);
    next(httpError("Internal server error", 500));
  }
};

module.exports = {
  post_list_get,
  post_get,
  post_post,
  post_put,
  post_delete,
};
