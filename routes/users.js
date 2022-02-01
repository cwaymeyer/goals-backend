"use strict";

import express from "express";
import User from "../models/user.js";

const router = express.Router();

/** GET /[username] => { user }
 *
 * returns { id, username, email, goals }
 */

router.get("/:username", async (req, res, next) => {
  try {
    const user = await User.get(req.params.username);
    return res.json({ user });
  } catch (err) {
    return next(err);
  }
});

/** DELETE /[username] => { deleted: [username] } */

router.delete("/:username", async (req, res, next) => {
  try {
    await User.remove(req.params.username);
    return res.json({ deleted: req.params.username });
  } catch (err) {
    return next(err);
  }
});

export default router;
