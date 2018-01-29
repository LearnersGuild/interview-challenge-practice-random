# Practice Phase Interview Randomizer

## Summary

## To create an interview version for a learner

## To add a new interview version

1. `cp -r challenges/versions/_template <new version letter>` where `<new version letter>` is the next available challenge letter not already taken in that directory (e.g. `f`)

2. Inside the new directory, there will be:
  - A `template_strings.js` file
  - An `instructions` directory
  - A `src` directory

3. In the `template_strings.js` file, fill out the `string_maker` function
  - See the `template_strings.js` file in the `a` directory for an example
  - This function should generate strings needed for the challenge (for example, the database function name)
  - The strings should be composed of strings that come from: 
    - `challenges/db_data/<db_name>/strings.js`, and
    - `utilities/data_maker.js` `buildTemplateData` function (which draws from the `challenges/db_data/<db_name>/schema.yaml` file)
  - use these template strings to make the below files generic (i.e. applicable to whatever random database is selected for the challenge)

4. In the `instructions` directory
  - Write the `p*.mustache` files to contain markdown for that part's instructions
    - see existing `p*.mustache` files for examples

5. In the `src` directory
  - Complete the `/src/app/p3.mustache`
    - This should be the version of the `app.js` needed for part-3
    - The template partials are already there; you simply need to fill in the route (e.g. `app.get()`) for this section.
  - In the `db` directory, complete these two files:
    - `db.js`: The completed database function needed for parts 2 and 3 of the challenge (the partials are already written, as is the beginning of the definition of the function)
    - `jsDoc.mustache`: [JSDoc](http://usejsdoc.org/about-getting-started.html#adding-documentation-comments-to-your-code) for the database function defined in `db.js`
  - In the `public` directory:
    - Fill in `p3-css.mustache` and `p3-js.mustache` for this version. 
    - Depending on the challenge, one or both of these may be blank.
  - In the `views` directory:
    - Fill in the `p2-*.mustache` files to scaffold for part-2 (these should be minimal, as part-2 requires using `pug` or `ejs` to create a view)
    - Fill in the `p2-*.mustache` files to scaffold for part-3 (this will be more complete, as part-3 is DOM manipulation)

6. Update tests
  - TBD

## To add a new database version