"use strict";

import express from "express";
import Goal from "../models/goal.js";
import Progress from "../models/progress.js";

const router = express.Router();

/** POST / { goal } => { goal }
 *
 * goal must include { name, username, start_weight, target_weight, timeline, start_date, end_date }
 *
 * returns { id, name, username, start_weight, target_weight, timeline, start_date, end_date }
 */

router.post("/", async (req, res, next) => {
  try {
    const goal = await Goal.create(req.body);
    return res.status(201).json({ goal });
  } catch (err) {
    return next(err);
  }
});

/** GET /[goal_id] => { goal }
 *
 * returns { id, name, username, target, timeline, start_date, end_date }
 */

router.get("/:goal_id", async (req, res, next) => {
  try {
    const goal = await Goal.get(req.params.goal_id);
    return res.json({ goal });
  } catch (err) {
    return next(err);
  }
});

/** DELETE /[goal_id] => { deleted: [goal_id] } */

router.delete("/:goal_id", async (req, res, next) => {
  try {
    await Goal.remove(req.params.goal_id);
    return res.json({ deleted: [req.params.goal_id] });
  } catch (err) {
    return next(err);
  }
});

/** POST /progress => { progress }
 *
 * progress must include { date, weight, reps }
 *
 * returns { id, user_id, date, weight, reps }
 */

router.post("/progress", async (req, res, next) => {
  try {
    await Progress.create(req.body);
    return res.status(201).json({ progress: req.body });
  } catch (err) {
    return next(err);
  }
});

/** GET /progress/[goal_id]/starting => { progress } */

router.get("/progress/:goal_id/starting", async (req, res, next) => {
  try {
    await Progress.getStarting(req.params.goal_id);
    return res.json({ progress: req.body });
  } catch (err) {
    return next(err);
  }
});

/** GET /progress/[goal_id]/latest => { progress } */

router.get("/progress/:goal_id/latest", async (req, res, next) => {
  try {
    await Progress.getLatest(req.params.goal_id);
    return res.json({ progress: req.body });
  } catch (err) {
    return next(err);
  }
});

export default router;
