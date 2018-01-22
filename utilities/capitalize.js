/**
 * Return the given word with the first letter capitalized
 * @param {string} word - word for which to capitalize the first letter
 * @returns {string} - word with the first letter capitalized
 */
const capitalizeFirstLetter = (word) => `${word[0].toUpperCase()}${word.slice(1)}`

/**
 * Return object with 'toCaps' data "flattened" (added to main array), and their capitalized counterparts added
 * @param {object} data - object with data and a 'toCaps' key that contains an array of data that needs to be capitalized
 * @returns {object} - object with flattened data and capitalized strings
 * 
 * Example: 
 * INPUT: 
 *    { 
*        greeting: 'hello', 
*        toCaps: {
*          cat: 'cisco',
*          nephew: 'jonah',
*        }
 *    }
 * 
 * OUTPUT:
 * 
 *   { 
*        greeting: 'hello', 
*        cat: 'cisco',
*        nephew: 'jonah',
*        catCaps: 'Cisco',
*        nephewCaps: 'Jonah',
 *    }
 * 
 */
const addCapsStrings = (data) => {
  return Object.assign(data)
}

module.exports = {
  addCapsStrings,
}