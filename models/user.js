"use strict";

import db from "../db.js";
import bcrypt from "bcrypt";
import {
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
} from "../expressError.js";
import { BCRYPT_WORK_FACTOR } from "../config.js";

class User {
  /** Authenticate user with username and password
   *
   * Throws UnauthorizedError if user not found or incorrect password
   */

  static async authenticate(username, password) {
    const result = await db.query(`SELECT * FROM users WHERE username = $1`, [
      username,
    ]);

    const user = result.rows[0];

    if (user) {
      // compare hashed pw to new hash from pw
      const isValid = await bcrypt.compare(password, user.password);
      if (isValid) {
        delete user.password;
        return user;
      }
    }

    throw new UnauthorizedError("Invalid username/password");
  }

  /** Register user with data
   *
   * Throws BadRequest Error on duplicate username
   */

  static async register({ username, password }) {
    const duplicateCheck = await db.query(
      `SELECT username FROM users WHERE username = $1`,
      [username]
    );

    if (duplicateCheck.rows[0]) {
      throw new BadRequestError(`Username ${username} already exists`);
    }

    if (!username || !password) {
      throw new BadRequestError("Field cannot be left blank");
    }

    const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);

    const result = await db.query(
      `INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *`,
      [username, hashedPassword]
    );

    const user = result.rows[0];

    return user;
  }

  /** Given username, return data about user
   *
   * Throws NotFoundError is user not found
   */

  static async get(username) {
    const result = await db.query(`SELECT * FROM users WHERE username = $1`, [
      username,
    ]);

    const user = result.rows[0];

    if (!user) throw new NotFoundError(`User ${username} not found`);

    const goalRes = await db.query(`SELECT * FROM goals WHERE username = $1`, [
      username,
    ]);

    user.goals = goalRes.rows;

    return user;
  }

  /** Delete user from database, returns undefined */

  static async remove(username) {
    const result = await db.query(
      `DELETE FROM users WHERE username = $1 RETURNING username`,
      [username]
    );

    const user = result.rows[0];

    if (!user) throw new NotFoundError(`User ${username} not found`);
  }
}

export default User;
