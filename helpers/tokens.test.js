import jwt from "jsonwebtoken";
import createToken from "./tokens.js";
import { SECRET_KEY } from "../config.js";

describe("createToken", function () {
  test("works", function () {
    const token = createToken({ username: "test" });
    const payload = jwt.verify(token, SECRET_KEY);
    expect(payload).toEqual({
      iat: expect.any(Number),
      username: "test",
    });
  });
});
