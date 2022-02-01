"use strict";

import db from "../db.js";
import { NotFoundError } from "../expressError.js";

class Goal {
  /** Create a goal (from data) and add to db
   *
   * data should be { name, username, target, timeline, start_date, end_date }
   *
   * returns { id, name, username, target, timeline, start_date, end_date }
   */

  static async create(data) {
    const result = await db.query(
      `INSERT INTO goals(name, username, target, timeline, start_date, end_date) VALUES($1, $2, $3, $4, $5, $6) RETURNING *`,
      [
        data.name,
        data.username,
        data.target,
        data.timeline,
        data.start_date,
        data.end_date,
      ]
    );

    let goal = result.rows[0];

    return goal;
  }

  /** Given goal id, return data about goal
   *
   * Throws NotFoundError is goal not found
   */

  static async get(id) {
    const result = await db.query(`SELECT * FROM goals WHERE id = $1`, [id]);

    const goal = result.rows[0];

    if (!goal) throw new NotFoundError(`Goal (id ${id}) not found`);

    const progressRes = await db.query(
      `SELECT * FROM progress WHERE goal_id = $1`,
      [goal.id]
    );

    goal.progress = progressRes.rows;

    return goal;
  }

  /** Given goal id, delete goal from db
   *
   * Throws NotFoundError if goal not found
   */

  static async remove(id) {
    const result = await db.query(
      `DELETE FROM goals WHERE id = $1 RETURNING id`,
      [id]
    );

    const goal = result.rows[0];

    if (!goal) throw new NotFoundError(`Goal (id ${id}) not found`);
  }
}

export default Goal;
