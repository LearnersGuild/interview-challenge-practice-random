DROP DATABASE IF EXISTS movie_genres;
CREATE DATABASE movie_genres;

\c movie_genres

CREATE TABLE languages (
  id INTEGER PRIMARY KEY,
  abbreviation VARCHAR(2),
  name VARCHAR(128)
);

CREATE TABLE genres (
  id INTEGER PRIMARY KEY,
  name VARCHAR(64)
);

CREATE TABLE movies (
  id VARCHAR(64) PRIMARY KEY,
  title VARCHAR(64),
  average_rating VARCHAR(64),
  language_id INTEGER REFERENCES languages
);

CREATE TABLE movies_genres (
  id SERIAL PRIMARY KEY,
  movie_id VARCHAR(64) REFERENCES movies,
  genre_id INTEGER REFERENCES genres
);
