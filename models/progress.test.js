"use strict";

import db from "../db.js";
import Progress from "../models/progress";
import Goal from "../models/goal";
import User from "../models/user";
import { BadRequestError } from "../expressError.js";
import {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
} from "./_testCommon.js";

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/** create goal */

describe("create progress", function () {
  test("works", async function () {
    // get goal id
    let user = await User.get("user1");
    let goalId = user.goals[0].id;

    const progress = await Progress.create({
      goal_id: goalId,
      weight: 60,
      reps: 1,
      orm: 60,
      date: "1645477769350",
    });
    expect(progress.orm).toEqual("60");

    // check progress in goal object
    let goal = await Goal.get(goalId);
    expect(goal.progress[2].orm).toEqual("60");
  });

  test("throws error with missing data", async function () {
    // get goal id
    let user = await User.get("user1");
    let goalId = user.goals[0].id;

    await expect(
      Progress.create({
        goal_id: goalId,
        reps: 1,
        date: "1645477769350",
      })
    ).rejects.toThrow(new BadRequestError("Field cannot be left blank"));
  });
});
