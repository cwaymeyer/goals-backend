"use strict";

import request from "supertest";
import app from "../app.js";
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

/** POST /auth/token (LOGIN) */

describe("POST /auth/token", function () {
  test("works", async function () {
    const response = await request(app).post("/auth/token").send({
      username: "testuser",
      password: "testpassword",
    });
    expect(response.status).toBe(200);
    expect(response.body.token).toBeTruthy();
  });

  test("fails with bad password", async function () {
    const response = await request(app).post("/auth/token").send({
      username: "testuser",
      password: "badpassword",
    });
    expect(response.status).toBe(401);
  });

  test("fails with missing data", async function () {
    const response = await request(app).post("/auth/token").send({
      password: "testpassword",
    });
    expect(response.status).toBe(401);
  });
});

/** POST /auth/register (SIGNUP) */

describe("POST /auth/register", function () {
  test("works", async function () {
    const response = await request(app).post("/auth/register").send({
      username: "anothertestuser",
      password: "testpassword",
    });
    expect(response.status).toBe(201);
    expect(response.body.token).toBeTruthy();
  });

  test("fails with missing data", async function () {
    const response = await request(app).post("/auth/register").send({
      password: "testpassword",
    });
    expect(response.status).toBe(400);
  });
});
