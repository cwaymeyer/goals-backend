"use strict";

import db from "../db.js";
import { BadRequestError } from "../expressError.js";

class Progress {
  /** Create a workout (from data) and add to db
   *
   * data should be { goal_id, weight, reps, orm, date }
   *
   * returns { id, goal_id, weight, reps, date }
   */

  static async create(data) {
    if (!data.weight || !data.reps || !data.date) {
      throw new BadRequestError("Field cannot be left blank");
    }

    const result = await db.query(
      `INSERT INTO progress(goal_id, weight, reps, orm, date) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [data.goal_id, data.weight, data.reps, data.orm, data.date]
    );

    const progress = result.rows[0];

    return progress;
  }
}

export default Progress;
