CREATE TABLE users (
    username VARCHAR(25) PRIMARY KEY,
    password TEXT NOT NULL
);

CREATE TABLE goals (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    username VARCHAR(25) REFERENCES users(username) ON DELETE CASCADE,
    start_weight INTEGER,
    target_weight INTEGER,
    timeline INTEGER,
    start_date BIGINT,
    end_date BIGINT
);

CREATE TABLE progress (
    id SERIAL PRIMARY KEY,
    goal_id INTEGER REFERENCES goals(id) ON DELETE CASCADE,
    weight INTEGER,
    reps INTEGER,
    orm DECIMAL,
    date BIGINT
);
