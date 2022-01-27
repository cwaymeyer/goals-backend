"use strict";

import { Client } from "pg";
import { getDatabaseUri } from "./config";

let DB_URI;

if (process.env.NODE_ENV === "test") {
  DB_URI = "postgresql:///goals_test";
} else if (process.env.NODE_ENV === "development") {
  DB_URI = "postgresql:///goals";
} else {
  DB_URI = process.env.DB_URI;
}

const db = new Client({
  connectionString: DB_URI,
});

db.connect();

export default db;
