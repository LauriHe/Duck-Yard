"use strict";
const jwt = require("jsonwebtoken");
const passport = require("passport");
const { httpError } = require("../utils/errors");
const { validationResult } = require("express-validator");
const { addUser } = require("../models/userModel");
const bcrypt = require("bcryptjs");
const sharp = require("sharp");

const login = (req, res, next) => {
  passport.authenticate("local", { session: false }, (err, user, info) => {
    console.log("info: ", info);
    console.log("err1: ", err);
    if (err || !user) {
      next(httpError("Kirjautumivirhe", 403));
      return;
    }
    req.login(user, { session: false }, (err) => {
      if (err) {
        console.log("err2: ", err);
        next(httpError("Kirjautmiserhe 2", 403));
        return;
      }
      const token = jwt.sign(user, "fdjv8983Q1J");
      return res.json({ user, token });
    });
  })(req, res, next);
};

const user_post = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    console.log(req.file, "dawda");
    if (!errors.isEmpty()) {
      console.error("user_post validation", errors.array());
      next(httpError("Invalid data", 400));
      return;
    }

    const salt = bcrypt.genSaltSync(10);
    const pwd = bcrypt.hashSync(req.body.passwd, salt);

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
      req.body.roleid,
    ];
    console.log(data);
    const result = await addUser(data, next);
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

module.exports = {
  login,
  user_post,
};
