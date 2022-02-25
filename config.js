"use strict";

import "colors";

const SECRET_KEY = process.env.SECRET_KEY || "secret";
const PORT = process.env.PORT || 3001;

function getDatabaseUri() {
  return process.env.NODE_ENV === "test"
    ? process.env.TEST_DB_URI || "goals_test"
    : process.env.DB_URI || "goals";
}

const BCRYPT_WORK_FACTOR = process.env.NODE_ENV === "test" ? 1 : 12;

console.log("PORT: ".magenta.bold, PORT);
console.log("DATABASE: ".magenta.bold, getDatabaseUri());
console.log("---");

export { SECRET_KEY, PORT, BCRYPT_WORK_FACTOR, getDatabaseUri };
