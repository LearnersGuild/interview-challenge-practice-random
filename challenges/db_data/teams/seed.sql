INSERT INTO locations (name) VALUES
  ('San Francisco'),
  ('Oakland'),
  ('San Jose')
;

INSERT INTO colors (name) VALUES
  ('red'), -- 1
  ('gold'), -- 2
  ('silver'), -- 3
  ('black'), -- 4
  ('green'), -- 5
  ('white'), -- 6
  ('orange'), -- 7
  ('cream'), -- 8
  ('blue'), -- 9
  ('teal') -- 10
;

INSERT INTO teams (name, location_id, mascot) VALUES
  ('Warriors', 2, 'Thunder'),
  ('Forty-Niners', 1, 'Sourdough Sam'),
  ('Raiders', 2, 'Raider Rusher'),
  ('Giants', 1, 'Lou Seal'),
  ('Athletics', 2, 'Stomper'),
  ('Sharks', 3, 'S. J. Sharkie'),
  ('Earthquakes', 3, 'Q')
;

INSERT INTO teams_colors (team_id, color_id) VALUES
  (2, 1),
  (2, 2),
  (3, 3),
  (3, 4),
  (5, 2),
  (5, 5),
  (5, 6),
  (4, 7),
  (4, 8),
  (4, 4),
  (4, 2),
  (1, 2),
  (1, 9),
  (6, 10),
  (6, 7),
  (6, 4),
  (7, 9),
  (7, 4)
;
