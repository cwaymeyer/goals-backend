"use strict";

describe("config can come from env", function () {
  test("works", function () {
    process.env.NODE_ENV = "development";
    process.env.PORT = 5000;

    const config = require("./config");
    expect(config.PORT).toEqual("5000");
    expect(config.getDatabaseUri()).toEqual("goals");

    process.env.NODE_ENV = "test";
    expect(config.getDatabaseUri()).toEqual("goals_test");

    delete process.env.PORT;
  });
});
