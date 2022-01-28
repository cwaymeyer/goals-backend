CREATE TABLE users (
    username VARCHAR(25) PRIMARY KEY,
    password TEXT NOT NULL,
    full_name VARCHAR(50) NOT NULL,
);

CREATE TABLE goals (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    username VARCHAR(25) REFERENCES users(username) ON DELETE CASCADE,
    target INTEGER,
    timeline INTEGER,
    start_date DATE,
    end_date DATE
);

CREATE TABLE progress (
    id SERIAL PRIMARY KEY,
    goal_id INTEGER REFERENCES goals(id) ON DELETE CASCADE,
    reps INTEGER,
    weight INTEGER,
    date DATE
);
