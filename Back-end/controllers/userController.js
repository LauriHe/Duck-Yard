"use strict";
const {
  getUser,
  getAllUsers,
  deleteUser,
  updateUser,
  getUserLikes,
  getUserLimited,
} = require("../models/userModel");
const { validationResult } = require("express-validator");
const { httpError } = require("../utils/errors");
const bcrypt = require("bcryptjs");

const sharp = require("sharp");

const user_list_get = async (req, res, next) => {
  try {
    const users = await getAllUsers(next);
    if (users.length < 1) {
      next(httpError("No users found", 404));
      return;
    }
    res.json(users);
  } catch (e) {
    console.error("user_list_get", e.message);
    next(httpError("Internal server error", 500));
  }
};

const user_get = async (req, res, next) => {
  try {
    const user = await getUser(req.user.id, next);
    if (user.length < 1) {
      next(httpError("No user found", 404));
      return;
    }
    res.json(user.pop());
  } catch (e) {
    console.error("user_get", e.message);
    next(httpError("Internal server error", 500));
  }
};

const user_get_limited = async (req, res, next) => {
  try {
    const user = await getUserLimited(req.body.id, next);
    if (user.length < 1) {
      next(httpError("No user found", 404));
      return;
    }
    res.json(user.pop());
  } catch (e) {
    console.error("user_get", e.message);
    next(httpError("Internal server error", 500));
  }
};

const user_put = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      console.error("user_post validation", errors.array());
      next(httpError("Invalid data", 400));
      return;
    }

    console.log("user_post", req.body, req.file);

    const thumbnail = await sharp(req.file.path)
      .resize(160, 160)
      .png()
      .toFile("./thumbnails/" + req.file.filename);

    const data = [
      req.body.name,
      req.body.passwd,
      req.body.email,
      req.body.phone,
      req.body.location,
      req.file.filename,
      req.body.roleid,
    ];

    const result = await adduser(data, next);
    if (result.affectedRows < 1) {
      next(httpError("Invalid data", 400));
      return;
    }
    if (thumbnail) {
      res.json({
        message: "Käyttäjä lisätty",
        user_id: result.insertId,
      });
    }
  } catch (e) {
    console.error("user_post", e.message);
    next(httpError("Internal server error", 500));
  }
};

const user_delete = async (req, res, next) => {
  try {
    const result = await deleteUser(req.params.id, next);
    if (result.affectedRows < 1) {
      next(httpError("No user deleted", 404));
      return;
    }
    res.json({
      message: "user deleted",
    });
  } catch (e) {
    console.error("user_delete", e.message);
    next(httpError("Internal server error", 500));
  }
};

const check_token = (req, res, next) => {
  if (!req.user) {
    next(httpError("token not valid", 403));
  } else {
    res.json({ user: req.user });
  }
};

const user_likes_get = async (req, res, next) => {
  try {
    const likes = await getUserLikes(req.params.id, next);
    if (likes.length < 1) {
      next(httpError("No likes found", 404));
      return;
    }
    res.json(likes);
  } catch (e) {
    console.error("user_get", e.message);
    next(httpError("Internal server error", 500));
  }
};

const user_update_put = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      console.error("user_update_put", errors.array());
      next(httpError("Invalid data", 400));
      return;
    }

    const salt = bcrypt.genSaltSync(10);
    const pwd = bcrypt.hashSync(req.body.passwd, salt);

    console.log("user_update_put", req.body, req.file);
    const thumbnail = await sharp(req.file.path)
      .resize(160, 160)
      .png()
      .toFile("./thumbnails/" + req.file.filename);

    const data = [
      req.body.name,
      pwd,
      req.body.email,
      req.body.phone,
      req.body.location,
      req.file.filename,
      req.user.id,
    ];

    console.log("user_put", data);
    const result = await updateUser(data, next);
    if (result.affectedRows < 1) {
      next(httpError("No user modified", 400));
      return;
    }
    if (thumbnail) {
      res.json({
        message: "Käyttäjä päivitetty",
        user_id: result.insertId,
      });
    }
  } catch (e) {
    console.error("user_put", e.message);
    next(httpError("Internal server error", 500));
  }
};

module.exports = {
  user_list_get,
  user_get,
  user_put,
  user_delete,
  check_token,
  user_likes_get,
  user_update_put,
  user_get_limited,
};
