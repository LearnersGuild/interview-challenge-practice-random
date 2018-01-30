INSERT INTO airlines (name) VALUES
  ('Fly Right Airlines'),
  ('Busy Bee Air'),
  ('Learners Guild Charter Flights')
;

INSERT INTO flights (number, airline_id) VALUES
  ('1147A', 3),
  ('8896', 3),
  ('7', 2),
  ('8422B', 3),
  ('232', 1),
  ('432', 1),
  ('9007', 2),
  ('4', 3)
;

INSERT INTO passengers (name) VALUES
  ('Michael Jackson'),
  ('Jermaine Jackson'),
  ('Marlon Jackson'),
  ('Tito Jackson'),
  ('Jackie Jackson'),
  ('Baby Spice'),
  ('Sporty Spice'),
  ('Scary Spice'),
  ('Posh Spice'),
  ('Ginger Spice')
;

INSERT INTO flights_passengers (passenger_id, flight_id) VALUES
  (1, 1),
  (1, 2),
  (1, 3),
  (1, 4),
  (1, 5),
  (1, 7),
  (1, 8),
  (2, 2),
  (2, 4),
  (2, 6),
  (2, 8),
  (3, 3),
  (3, 4),
  (3, 5),
  (3, 6),
  (3, 7),
  (3, 8),
  (4, 1),
  (4, 2),
  (5, 1),
  (5, 2),
  (5, 3),
  (5, 4),
  (5, 6),
  (6, 1),
  (6, 2),
  (6, 3),
  (6, 4),
  (6, 5),
  (6, 6),
  (6, 7),
  (6, 8),
  (7, 4),
  (8, 1),
  (8, 3),
  (8, 5),
  (9, 2),
  (9, 3),
  (9, 4),
  (9, 5),
  (9, 6)
;
