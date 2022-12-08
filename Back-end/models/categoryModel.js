"use strict";
const pool = require("../database/db");
const { httpError } = require("../utils/errors");
const promisePool = pool.promise();

const getAllCategories = async (next) => {
  try {
    const [rows] = await promisePool.execute(`SELECT *  
    FROM duck_category`);
    return rows;
  } catch (e) {
    console.error("getAllCategories", e.message);
    next(httpError("database error", 500));
  }
};

const getCategoryPosts = async (categoryId) => {
  try {
    const [rows] = await promisePool.execute(
      `SELECT duck_includes.postid FROM duck_includes INNER JOIN duck_category ON duck_includes.categoryid = duck_category.id
    WHERE duck_category.id = ?`,
      [categoryId]
    );
    return rows;
  } catch (e) {
    console.error("getAllCategories", e.message);
    next(httpError("database error", 500));
  }
};

module.exports = {
  getAllCategories,
  getCategoryPosts,
};
