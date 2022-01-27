"use strict";

require("dotenv").config();

const SECRET_KEY = process.env.SECRET_KEY;
const PORT = process.env.PORT || 3001;

function getDatabaseUri() {
  return process.env.NODE_ENV === "test"
    ? process.env.TEST_DB_URI || "goals_test"
    : process.env.DB_URI || "goals";
}

export default { SECRET_KEY, PORT, getDatabaseUri };
