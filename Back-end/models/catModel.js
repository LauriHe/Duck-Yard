"use strict";
const pool = require("../database/db");
const { httpError } = require("../utils/errors");
const promisePool = pool.promise();

const getAllposts = async (next) => {
  try {
    const [rows] =
      await promisePool.execute(`SELECT *  
    FROM duck_post`);
    return rows;
  } catch (e) {
    console.error("getAllposts", e.message);
    next(httpError("database error", 500));
  }
};

const getpost = async (postId, next) => {
  try {
    const [rows] = await promisePool.execute(
      `SELECT id, heading, price, image, description, profileid, duck_profile.name, duck_profile.email, duck_profile.lopostion, duck_profile.image,  
      FROM duck_post 
      INNER JOIN wop_user 
      ON wop_user.user_id = wop_post.owner 
      WHERE post_id = ?;`,
      [postId]
    );
    return rows;
  } catch (e) {
    console.error("getpost", e.message);
    next(httpError("database error", 500));
  }
};

const addpost = async (data, next) => {
  try {
    const [rows] = await promisePool.execute(
      `INSERT INTO wop_post (name, birthdate, weight, owner, filename, coords) VALUES (?, ?, ?, ?, ?, ?);`,
      data
    );
    return rows;
  } catch (e) {
    console.error("addpost", e.message);
    next(httpError("database error", 500));
  }
};

const updatepost = async (data, user, next) => {
  try {
    if ((user.role = 0)) {
      const [rows] = await promisePool.execute(
        `UPDATE wop_post SET name = ?, birthdate = ?, weight = ?, owner = ? WHERE post_id = ?`,
        data
      );
      return rows;
    } else {
      const [rows] = await promisePool.execute(
        `UPDATE wop_post SET name = ?, birthdate = ?, weight = ? WHERE post_id = ? AND owner = ?;`,
        data
      );
      return rows;
    }
  } catch (e) {
    console.error("updatepost", e.message);
    next(httpError("database error", 500));
  }
};

const deletepost = async (postId, user, next) => {
  try {
    let sql = "DELETE FROM wop_post where post_id = ?";
    const params = [];
    if (user.role === 0) {
      params.push(postId);
    } else {
      sql += " AND owner = ?;";
      params.push(postId, user.user_id);
    }
    const [rows] = await promisePool.execute(sql, params);
    return rows;
  } catch (e) {
    console.error("deletepost", e.message);
    next(httpError("Database error", 500));
  }
};

module.exports = {
  getAllposts,
  getpost,
  addpost,
  updatepost,
  deletepost,
};
