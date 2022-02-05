"use strict";

import express from "express";
import cors from "cors";
import { NotFoundError } from "./expressError.js";

import authRoutes from "./routes/auth.js";
import usersRoutes from "./routes/users.js";
import goalsRoutes from "./routes/goals.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/users", usersRoutes);
app.use("/goals", goalsRoutes);

// Handle 404 errors
app.use(function (req, res, next) {
  return next(new NotFoundError());
});

// Generic error handler
app.use(function (err, req, res, next) {
  const status = err.status || 500;
  const message = err.message || "Internal Server Error";

  return res.status(status).json({ error: { message, status } });
});

export default app;
