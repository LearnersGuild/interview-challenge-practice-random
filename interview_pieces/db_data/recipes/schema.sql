DROP TABLE IF EXISTS recipes_ingredients;
DROP TABLE IF EXISTS recipes;
DROP TABLE IF EXISTS ingredients;
DROP TABLE IF EXISTS types;

CREATE TABLE types (
  id SERIAL PRIMARY KEY,
  name VARCHAR(64)
);

CREATE TABLE ingredients (
  id SERIAL PRIMARY KEY,
  name VARCHAR(64) UNIQUE
);
 
CREATE TABLE recipes (
  id SERIAL PRIMARY KEY,
  name VARCHAR(64) UNIQUE,
  type_id INTEGER REFERENCES types
);

CREATE TABLE recipes_ingredients (
  id SERIAL PRIMARY KEY,
  recipe_id INTEGER REFERENCES recipes,
  ingredient_id INTEGER REFERENCES ingredients,
  amount FLOAT,
  amount_units VARCHAR(8)
);
