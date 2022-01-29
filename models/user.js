"use strict";

import db from "../db";
import bcrypt from "bcrypt";
import {
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
} from "../expressError";
import { BCRYPT_WORK_FACTOR } from "../config";

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

  static async register({ username, password, full_name }) {
    const duplicateCheck = await db.query(
      `SELECT username FROM users WHERE username = $1`,
      [username]
    );

    if (duplicateCheck.rows[0]) {
      throw new BadRequestError("Username already exists");
    }

    const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);

    const result = await db.query(
      `INSERT INTO users (username, password, full_name) VALUES ($1, $2, $3) RETURNING *`,
      [username, hashedPassword, full_name]
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

    const goalRes = await db.query(`SELECT * FROM goals WHERE user_id = $1`, [
      user.id,
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
