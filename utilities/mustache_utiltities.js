const fs = require('fs-extra')
const mustache = require('mustache')
const { processFatalError } = require('./error_handling.js')

/**
 * Render a mustache template with the given data and partials
 * @param {string} templateFilePath - path to main template file
 * @param {object} data             - data to use when rendering template
 * @param {object} partials         - keys: partial template names. values: partial template paths.
 */
const renderMustache = (templateFilePath, data, partials) => {
  try { 
    const templateString = fs.readFileSync(templateFilePath, 'utf-8')
    const partialStrings = {}
    Object.keys(partials).forEach(
      (key) => {
        partialStrings[key] = fs.readFileSync(partials[key], 'utf-8')
      }
    )

    return mustache.render(templateString, data, partialStrings)

  } catch(error) {
    processFatalError(error, `Could not render template ${templateFilePath}`)
  }
}

module.exports = {
  renderMustache,
}