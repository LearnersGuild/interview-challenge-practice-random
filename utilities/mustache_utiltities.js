const fs = require('fs-extra')
const path = require('path')
const mustache = require('mustache')
const { processFatalError } = require('./error_handling.js')

/**
 * Render a mustache template with the given data and partials
 * @param {string} templateFilePath - path to main template file
 * @param {object} data             - data to use when rendering template
 * @param {object} partials         - keys: partial template names. values: partial template paths.
 * @returns {string}                - rendered template in string form
 */
const renderMustache = (templateFilePath, data, partials) => {
  // handle symlinks
  // let actualPath
  // try {
  //   fs.statSync(templateFilePath)
  //   actualPath = templateFilePath
  // } catch (e) {
  //   if (e.code === 'ENOENT') {
  //     actualPath = path.join(process.cwd(), fs.readlinkSync(templateFilePath))
  //   } else {
  //     throw e
  //   }
  // }

  const templateString = fs.readFileSync(templateFilePath, 'utf-8')
  const partialStrings = {}
  Object.keys(partials).forEach(
    (key) => {
      partialStrings[key] = fs.readFileSync(partials[key], 'utf-8')
    }
  )

  return mustache.render(templateString, data, partialStrings)
}

module.exports = {
  renderMustache,
}