"use strict";
const pool = require("../database/db");
const promisePool = pool.promise();

const getAllUsers = async () => {
  try {
    const [rows] = await promisePool.execute(`SELECT id, name, email, phone, location, image, roleid FROM duck_profile;`);
    return rows;
  } catch (e) {
    console.error("error", e.message);
  }
};

const getUser = async (userId) => {
  try {
    const [rows] = await promisePool.execute(
      `SELECT id, name, email, phone, location, image, roleid FROM duck_profile WHERE id = ?;`,
      [userId]
    );
    return rows;
  } catch (e) {
    console.error("error", e.message);
  }
};

const addUser = async (data) => {
  try {
    const [rows] = await promisePool.execute(`INSERT INTO duck_profile (name, passwd, email, phone, location, roleid) VALUES (?, ?, ?, ?, ?, ?);`, data);
    return rows;
  } catch (e) {
    console.error("error", e.message);
  }
};

const deleteUser = async (userId, user, next) => {
  try {
    let sql = "DELETE FROM duck_profile where id = ?";
    const params = [];
    if (user.role === 1) {
      params.push(userId);
    } else {
      params.push(user.id);
    }
    const [rows] = await promisePool.execute(sql, params);
    return rows;
  } catch (e) {
    console.error("deleteUser", e.message);
    next(httpError("Database error", 500));
  }
};

const getUserLogin = async (params, next) => {
  try {
    console.log(params);
    const [rows] = await promisePool.execute(
        'SELECT * FROM duck_profile WHERE email = ?;',
        params);
    return rows;
  } catch (e) {
    console.log('getUserLogin', e.message);
    next(httpError('Database error', 500));
  }
};

module.exports = {
  getAllUsers,
  getUser,
  addUser,
  deleteUser,
  getUserLogin,
};