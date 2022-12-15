'use strict';
const express = require('express');
const router = express.Router();
const {login, user_post} = require('../controllers/authController');
const {body} = require('express-validator');
const multer = require("multer");

const fileFilter = (req, file, cb) => {
    console.log("fileFilter", file)
    if (file.mimetype.includes("image")) {
      cb(null, true);
    } else {
      cb(httpError("Invalid file", 400));
    }
  };
  const upload = multer({ dest: "uploads/", fileFilter });


router.post('/login', login);

router.post('/register',
    upload.single("image"),
    body('name').isLength({min: 3}).escape(),
    body('email').isEmail(),
    body('passwd').matches(/(?=.*\p{Lu}).{8,}/u),
    body('phone').isMobilePhone(),
    body('location'),
    body('image'),
    body('roleid'),
    user_post);

module.exports = router;