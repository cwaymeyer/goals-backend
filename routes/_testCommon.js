"use strict";

import db from "../db.js";
import User from "../models/user";
import Goal from "../models/goal";
import Progress from "../models/progress";
import createToken from "../helpers/tokens";

async function commonBeforeAll() {
  await db.query("DELETE FROM users");
  await db.query("DELETE FROM goals");

  await User.register({
    username: "testuser",
    password: "testpassword",
  });

  await Goal.create({
    name: "testuser goal",
    username: "testuser",
    start_weight: 56,
    target_weight: 100,
    timeline: 3,
    start_date: "1645477269350",
    end_date: "1653163269350",
  });

  let goalRes = await User.get("testuser");
  let goalId = goalRes.goals[0].id;

  await Progress.create({
    goal_id: goalId,
    weight: 50,
    reps: 5,
    orm: "56.3",
    date: "1645477469350",
  });

  await Progress.create({
    goal_id: goalId,
    weight: 50,
    reps: 6,
    orm: "58.1",
    date: "1645477669350",
  });
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

const testUserToken = createToken({ username: "testUser" });

module.exports = {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  testUserToken,
};
