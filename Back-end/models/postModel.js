"use strict";
const pool = require("../database/db");
const { httpError } = require("../utils/errors");
const promisePool = pool.promise();

const getAllposts = async (next) => {
  try {
    const [rows] =
      await promisePool.execute(`SELECT duck_post.*, duck_profile.location
    FROM duck_post INNER JOIN duck_profile 
    ON duck_profile.id = duck_post.profileid;`);
    return rows;
  } catch (e) {
    console.error("getAllposts", e.message);
    next(httpError("database error", 500));
  }
};

const getpost = async (postId, next) => {
  try {
    const [rows] = await promisePool.execute(
      `SELECT duck_post.id, duck_post.heading, duck_post.price, duck_post.image, duck_post.description, duck_post.profileid, duck_profile.name, duck_profile.email, duck_profile.location, duck_profile.image  
      FROM duck_post 
      INNER JOIN duck_profile 
      ON duck_profile.id = duck_post.profileid 
      WHERE duck_post.id = ?;`,
      [postId]
    );
    console.log(rows);
    return rows;
  } catch (e) {
    console.error("getpost", e.message);
    next(httpError("database error", 500));
  }
};

const addpost = async (data, next) => {
  try {
    const [rows] = await promisePool.execute(
      `INSERT INTO duck_post (heading, price, description) VALUES (?, ?, ?);`,
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

const addLike = async (data, next) => {
  try {
    const [rows] = await promisePool.execute(
      `INSERT INTO duck_likes VALUES (?, ?);`,
      data
    );
    return rows;
  } catch (e) {
    console.error("addLike", e.message);
    next(httpError("database error", 500));
  }
};

const deleteLike = async (data, next) => {
  try {
    const [rows] = await promisePool.execute(
      `DELETE FROM duck_likes where profileid = ? AND postid = ?;`,
      data
    );
    return rows;
  } catch (e) {
    console.error("deleteLike", e.message);
    next(httpError("database error", 500));
  }
};

const getpostLikes = async (postId, next) => {
  try {
    const [rows] = await promisePool.execute(
      `SELECT COUNT(*) AS "Number of likes" FROM duck_likes WHERE postid = ?`,
      [postId]
    );
    return rows;
  } catch (e) {
    console.error("getpostLikes", e.message);
    next(httpError("database error", 500));
  }
};

const getpostComments = async (postId, next) => {
  try {
    const [rows] = await promisePool.execute(
      `SELECT text FROM duck_comments INNER JOIN duck_post ON duck_post.id = duck_comments.postid WHERE duck_post.id = ?`,
      [postId]
    );
    return rows;
  } catch (e) {
    console.error("getpostComments", e.message);
    next(httpError("database error", 500));
  }
};

const getpostCategories = async (postId, next) => {
  try {
    const [rows] = await promisePool.execute(
      `SELECT duck_category.name 
      FROM duck_category INNER JOIN duck_includes 
      ON duck_category.id = duck_includes.categoryid
      where duck_includes.postid = ?;`,
      [postId]
    );
    return rows;
  } catch (e) {
    console.error("getpostCategories", e.message);
    next(httpError("database error", 500));
  }
};

module.exports = {
  getAllposts,
  getpost,
  addpost,
  updatepost,
  deletepost,
  addLike,
  deleteLike,
  getpostLikes,
  getpostCategories,
  getpostComments,
};
