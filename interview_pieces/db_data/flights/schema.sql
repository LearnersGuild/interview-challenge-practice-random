DROP TABLE IF EXISTS flights_passengers;
DROP TABLE IF EXISTS flights;
DROP TABLE IF EXISTS passengers;
DROP TABLE IF EXISTS airlines;

CREATE TABLE airlines (
  id SERIAL PRIMARY KEY,
  name VARCHAR(32)
);

CREATE TABLE flights (
  id SERIAL PRIMARY KEY,
  flight_number VARCHAR(8),
  airline_id INTEGER REFERENCES airlines
);

CREATE TABLE passengers (
  id SERIAL PRIMARY KEY,
  name VARCHAR(64)
);

CREATE TABLE flights_passengers (
  id SERIAL PRIMARY KEY,
  flight_id INTEGER REFERENCES flights,
  passenger_id INTEGER REFERENCES passengers
);
