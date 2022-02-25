"use strict";

import request from "supertest";
import app from "../app.js";
import User from "../models/user";
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

/** POST /goals (CREATE GOAL) */

describe("POST /goals", function () {
  test("works", async function () {
    const response = await request(app).post("/goals").send({
      name: "testuser goal 2",
      username: "testuser",
      target_weight: 200,
      timeline: 3,
      start_date: "1648477269350",
      end_date: "1656163269350",
    });
    expect(response.status).toBe(201);
    expect(response.body.goal.id).toBeTruthy();
  });

  test("fails with missing data", async function () {
    const response = await request(app).post("/goals").send({
      username: "testuser2",
      target_weight: 100,
      start_date: "1645477269350",
      end_date: "1653163269350",
    });
    expect(response.status).toBe(400);
  });
});

/** GET /goals/get (GET GOAL) */

describe("GET /goals/get", function () {
  test("works", async function () {
    // get goal_id from user
    let goalRes = await User.get("testuser");
    let goalId = goalRes.goals[0].id;

    const response = await request(app).get(`/goals/${goalId}`);

    expect(response.status).toBe(200);
    expect(response.body.goal.id).toBe(goalId);
  });

  test("fails with invalid goal id", async function () {
    const response = await request(app).get(`/goals/0`);

    expect(response.status).toBe(404);
  });
});

/** DELETE /goals/:goal_id  (DELETE GOAL) */

describe("DELETE /goals/:goal_id", function () {
  test("works", async function () {
    // get goal_id from user
    let goalRes = await User.get("testuser");
    let goalId = goalRes.goals[0].id;

    const response = await request(app).delete(`/goals/${goalId}`);

    expect(response.status).toBe(200);
  });

  test("fails with invalid goal id", async function () {
    const response = await request(app).delete(`/goals/0`);

    expect(response.status).toBe(404);
  });
});

/** POST /goals/progress */

describe("POST /goals/progress", function () {
  test("works", async function () {
    // get goal_id from user
    let goalRes = await User.get("testuser");
    let goalId = goalRes.goals[0].id;

    const response = await request(app).post("/goals/progress").send({
      goal_id: goalId,
      weight: 50,
      reps: 10,
      orm: "66.7",
      date: "1645477869350",
    });

    expect(response.status).toBe(201);
    expect(response.body.progress).toBeTruthy();
  });

  test("fails with missing data", async function () {
    // get goal_id from user
    let goalRes = await User.get("testuser");
    let goalId = goalRes.goals[0].id;

    const response = await request(app).post("/goals/progress").send({
      goal_id: goalId,
      weight: 50,
      date: "1645477869350",
    });

    expect(response.status).toBe(400);
  });
});
