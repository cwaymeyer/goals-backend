"use strict";

import db from "../db.js";
import User from "../models/user";
import {
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
} from "../expressError.js";
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

/** authenticate */

describe("authenticate", function () {
  test("works", async function () {
    const user = await User.authenticate("user1", "password1");
    expect(user).toEqual({ username: "user1" });
  });

  test("throws error with invalid credentials", async function () {
    await expect(User.authenticate("user1", "password2")).rejects.toThrow(
      new UnauthorizedError("Invalid username/password")
    );
  });
});

/** register */

describe("register", function () {
  test("works", async function () {
    const user = await User.register({
      username: "user2",
      password: "password2",
    });
    expect(user.username).toEqual("user2");
  });

  test("throws error with duplicate username", async function () {
    await expect(
      User.register({
        username: "user1",
        password: "password2",
      })
    ).rejects.toThrow(new BadRequestError("Username user1 already exists"));
  });

  test("throws error with empty field", async function () {
    await expect(
      User.register({
        username: "",
        password: "password2",
      })
    ).rejects.toThrow(new BadRequestError("Field cannot be left blank"));
  });
});

/** get user */

describe("get user", function () {
  test("works", async function () {
    const user = await User.get("user1");
    expect(user.username).toEqual("user1");
  });

  test("throws error with invalid username", async function () {
    await expect(User.get("user2")).rejects.toThrow(
      new NotFoundError("User user2 not found")
    );
  });
});

/** delete user */

describe("delete user", function () {
  test("works", async function () {
    await User.remove("user1");
    let users = await db.query("SELECT * FROM users WHERE username = $1", [
      "user1",
    ]);
    expect(users.rows).toEqual([]);
  });

  test("throws error with invalid username", async function () {
    await expect(User.remove("user2")).rejects.toThrow(
      new NotFoundError("User user2 not found")
    );
  });
});
