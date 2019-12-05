BEGIN;

DROP TABLE IF EXISTS users, groups;

CREATE TABLE users (
id SERIAL PRIMARY KEY,
name VARCHAR (20) NOT NULL,
quality INTEGER
);

INSERT INTO users (name, quality) VALUES ('Alf', 0), ('Bert', 1), ('Chad', 0), ('Dave', 1);

CREATE TABLE groups (
    id SERIAL PRIMARY KEY,
    name VARCHAR (20) NOT NULL
);

INSERT INTO groups (name) VALUES ('oafs'), ('jesters'), ('sires');

COMMIT;