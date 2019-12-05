BEGIN;

DROP TABLE IF EXISTS users, groups;

CREATE TABLE users (
id SERIAL PRIMARY KEY,
name VARCHAR (20) NOT NULL,
energy INTEGER,
sociability INTEGER,
animal VARCHAR (10)
);

INSERT INTO users (name, energy, sociability, animal) VALUES ('Alf', 0, 1, 'octopus'), ('Bert', 1, 0, 'elephant'), ('Chad', 0, 0, 'platypus'), ('Dave', 1, 1, 'tortoise');

CREATE TABLE groups (
    id SERIAL PRIMARY KEY,
    name VARCHAR (20) NOT NULL
);

INSERT INTO groups (name) VALUES ('oafs'), ('jesters'), ('sires');

COMMIT;