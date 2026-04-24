PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS Book (
    id          TEXT PRIMARY KEY,
    title       TEXT NOT NULL,
    author      TEXT NOT NULL,
    year        INTEGER NOT NULL,
    isbn        TEXT NOT NULL UNIQUE,
    available   BOOLEAN NOT NULL DEFAULT 1
);

CREATE TABLE IF NOT EXISTS User (
    id            TEXT PRIMARY KEY,
    name          TEXT NOT NULL,
    email         TEXT NOT NULL UNIQUE,
    passwordHash  TEXT NOT NULL,
    role          TEXT NOT NULL CHECK (role IN ('USER', 'ADMIN'))
);

CREATE TABLE IF NOT EXISTS Loan (
    id          TEXT PRIMARY KEY,
    userId      TEXT NOT NULL,
    bookId      TEXT NOT NULL,
    loanDate    DATETIME NOT NULL,
    returnDate  DATETIME,
    status      TEXT NOT NULL CHECK (status IN ('ACTIVE', 'RETURNED')),

    FOREIGN KEY (userId) REFERENCES User(id) ON DELETE CASCADE,
    FOREIGN KEY (bookId) REFERENCES Book(id) ON DELETE CASCADE
);