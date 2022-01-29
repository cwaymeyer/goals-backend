"use strict";

import express from "express";
import User from "../models/user";
import { createToken } from "../helpers/auth";

const router = express.Router();

/** POST /auth/token: { username, password } => { token }
 *
 * Returns JWT token which can be used to authenticate further requests
 */

router.post("/token", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.authenticate(username, password);
    const token = createToken(user);
    return res.json({ token });
  } catch (err) {
    return next(err);
  }
});

/** POST /auth/register: { user } => { token }
 *
 * user must include { username, password, full_name}
 *
 * Returns JWT token which can be used to authenticate further requests
 */

router.post("/register", async (req, res, next) => {
  try {
    const newUser = await User.register({ ...req.body });
    const token = createToken(newUser);
    return res.status(201).json({ token });
  } catch (err) {
    return next(err);
  }
});

export default router;
