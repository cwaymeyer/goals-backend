CREATE TABLE users (
    username VARCHAR(25) PRIMARY KEY NOT NULL,
    password TEXT NOT NULL
);

CREATE TABLE goals (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    username VARCHAR(25) REFERENCES users(username) ON DELETE CASCADE,
    start_weight INTEGER,
    target_weight INTEGER NOT NULL,
    timeline INTEGER NOT NULL,
    start_date BIGINT,
    end_date BIGINT
);

CREATE TABLE progress (
    id SERIAL PRIMARY KEY,
    goal_id INTEGER REFERENCES goals(id) ON DELETE CASCADE,
    weight INTEGER NOT NULL,
    reps INTEGER NOT NULL,
    orm DECIMAL,
    date BIGINT NOT NULL
);
