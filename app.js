"use strict";

import express from "express";
import { NotFoundError } from "./expressError.js";

import authRoutes from "./routes/auth.js";
import usersRoutes from "./routes/users.js";

const app = express();

app.use(express.json());

app.use("/auth", authRoutes);
app.use("/users", usersRoutes);

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
