"use strict";

import db from "../db.js";
import Goal from "../models/goal";
import User from "../models/user";
import { NotFoundError, BadRequestError } from "../expressError.js";
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

describe("create goal", function () {
  test("works", async function () {
    const goal = await Goal.create({
      name: "goal1",
      username: "user1",
      start_weight: 60,
      target_weight: 100,
      timeline: 6,
      start_date: "1655477469350",
      end_date: "1655477669350",
    });
    expect(goal.name).toEqual("goal1");
  });

  test("throws error with missing data", async function () {
    await expect(
      Goal.create({
        username: "user1",
        start_weight: 60,
        target_weight: 100,
        timeline: 6,
        start_date: "1655477469350",
        end_date: "1655477669350",
      })
    ).rejects.toThrow(new BadRequestError("Field cannot be left blank"));
  });
});

/** get goal */

describe("get goal", function () {
  test("works", async function () {
    // get goal id
    let user = await User.get("user1");
    let goalId = user.goals[0].id;

    const goal = await Goal.get(goalId);
    expect(goal.name).toEqual("testgoal1");
  });

  test("throws error with invalid id", async function () {
    await expect(Goal.get(0)).rejects.toThrow(
      new NotFoundError("Goal (id 0) not found")
    );
  });
});

/** delete goal */

describe("delete goal", function () {
  test("works", async function () {
    // get goal id
    let user = await User.get("user1");
    let goalId = user.goals[0].id;

    await Goal.remove(goalId);
    let goals = await db.query("SELECT * FROM goals WHERE id = $1", [goalId]);
    expect(goals.rows).toEqual([]);
  });

  test("throws error with invalid data", async function () {
    await expect(Goal.remove(0)).rejects.toThrow(
      new NotFoundError("Goal (id 0) not found")
    );
  });
});
