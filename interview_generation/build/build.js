const util = require('util')
const exec = require('child_process').exec
const fs = require('fs')
const path = require('path')
const mustache = require('mustache')
const templateData = require('./template_data')

const instructionsTemplateDir = 'instructions'
const puts = (error, stdout, stderr) => { util.puts(stdout) }

if (process.argv.length < 3) {
  console.log(`
  USAGE: node build.js <learner_name>
  `)
}

/**
 * 
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
    console.log(`Could not render template ${templateFilePath}:`)
    console.log(error.toString())
    console.log('Exiting')
    process.exit(1)
  }

}

const p1version = 'a'
const p2version = 'a'
const p3version = 'a'
const dbName = 'flights'

const finalData = {
  dbName,
  p1version,
  p2version,
  p3version,
  p1: templateData[dbName]['p1'][p1version],
}

const partials = {
  'part-1': path.join(instructionsTemplateDir, 'part-1', `part-1-${p1version}.mustache`)
}
const readmePath = path.join(instructionsTemplateDir, 'README.mustache')
const readme = renderMustache(readmePath, finalData, partials)

console.log(readme)