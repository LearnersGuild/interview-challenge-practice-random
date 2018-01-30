INSERT INTO types (name) VALUES
  ('cake'),
  ('cookies'),
  ('bars')
;

INSERT INTO recipes (name, type_id) VALUES
  ('chocolate chip cookies', 2),
  ('pound cake', 1),
  ('chocolate brownies', 3),
  ('chocolate cake', 1),
  ('peanut butter cookies', 2),
  ('blondies', 3)
;

INSERT INTO ingredients (name) VALUES
  ('flour'), -- 1
  ('sugar'), -- 2
  ('vanilla extract'), -- 3
  ('chocolate chips'), -- 4
  ('butter'), -- 5
  ('salt'), -- 6
  ('baking soda'), -- 7
  ('brown sugar'), -- 8
  ('eggs'), -- 9
  ('bakers chocolate'), -- 10
  ('peanut butter') -- 11
;

INSERT INTO recipes_ingredients (recipe_id, ingredient_id, amount, amount_units) VALUES
  (1, 1, 2.25, 'cups'),
  (1, 2, 1, 'tsp'),
  (1, 6, 1, 'tsp'),
  (1, 5, 1, 'cup'),
  (1, 8, 0.75, 'cup'),
  (1, 2, 0.75, 'cup'),
  (1, 6, 1, 'tsp'),
  (1, 9, 2, ''),
  (5, 1, 2.25, 'cups'),
  (5, 2, 1, 'tsp'),
  (5, 6, 1, 'tsp'),
  (5, 5, 1, 'cup'),
  (5, 8, 0.75, 'cup'),
  (5, 2, 0.75, 'cup'),
  (5, 6, 1, 'tsp'),
  (5, 9, 2, ''),
  (5, 11, 0.5, 'cup'),
  (5, 3, 0.5, 'tsps'),
  (2, 5, 1, 'cup'),
  (2, 1, 1, 'cups'),
  (2, 2, 1, 'cup'),
  (2, 9, 4, ''),
  (2, 3, 2, 'tsps'),
  (2, 6, 0.5, 'tsps'),
  (4, 5, 1, 'cup'),
  (4, 1, 1, 'cups'),
  (4, 2, 1, 'cup'),
  (4, 9, 4, ''),
  (4, 10, 4, 'oz'),
  (4, 3, 2, 'tsps'),
  (4, 6, 0.5, 'tsps'),
  (3, 4, 1.5, 'cups'),
  (3, 5, 2, 'tbs'),
  (3, 2, 0.5, 'cups'),
  (3, 1, 0.67, 'cups'),
  (3, 7, 0.25, 'tsps'),
  (3, 6, 0.5, 'tsps'),
  (3, 9, 1, ''),
  (3, 10, 4, 'oz'),
  (6, 9, 1, ''),
  (6, 5, 2, 'tbs'),
  (6, 2, 0.5, 'cups'),
  (6, 1, 0.67, 'cups'),
  (6, 7, 0.25, 'tsps'),
  (6, 6, 0.5, 'tsps')
;
