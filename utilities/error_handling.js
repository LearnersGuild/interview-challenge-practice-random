/**
 * Print error details and exit
 * @param {Error} error - error object
 * @param {string} message - message for error context
 */
const processFatalError = (error, message) => {
  console.error(message)
  console.error(error.toString())
  console.error('Exiting.')
  process.exit(1)
}

module.exports = {
  processFatalError,
}