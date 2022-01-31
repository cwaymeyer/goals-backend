import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../config.js";

/** return signed JWT from user data */

function createToken(user) {
  let payload = {
    username: user.username,
  };

  return jwt.sign(payload, SECRET_KEY);
}

export default createToken;
