/**
 * Return the given word with the first letter capitalized
 * @param {string} word - word for which to capitalize the first letter
 * @returns {string} - word with the first letter capitalized
 */
const capitalizeFirstLetter = (word) => `${word[0].toUpperCase()}${word.slice(1)}`

module.exports = {
  capitalizeFirstLetter,
}