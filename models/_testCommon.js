import bcrypt from "bcrypt";
import db from "../db";
import { BCRYPT_WORK_FACTOR } from "../config";

async function commonBeforeAll() {
  await db.query("DELETE FROM users");
  await db.query("DELETE FROM goals");

  const hashedPassword = await bcrypt.hash("password1", BCRYPT_WORK_FACTOR);

  // create user
  await db.query(
    `INSERT INTO users (username, password)
    VALUES ($1, $2) RETURNING username`,
    ["user1", hashedPassword]
  );

  // create goal
  await db.query(
    `INSERT INTO goals (name, username, start_weight, target_weight, timeline, start_date, end_date)
     VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
    ["testgoal1", "user1", 56, 150, 3, "1645477269350", "1653163269350"]
  );

  // get goal id for progress
  let goalRes = await db.query("SELECT * FROM goals");
  let goalId = goalRes.rows[0].id;

  // create progress
  await db.query(
    `INSERT INTO progress (goal_id, weight, reps, orm, date)
        VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [goalId, 50, 5, "56.3", "1645477469350"]
  );

  await db.query(
    `INSERT INTO progress (goal_id, weight, reps, orm, date)
        VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [goalId, 50, 6, "58.1", "1645477669350"]
  );
}

async function commonBeforeEach() {
  await db.query("BEGIN");
}

async function commonAfterEach() {
  await db.query("ROLLBACK");
}

async function commonAfterAll() {
  await db.end();
}

module.exports = {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
};
