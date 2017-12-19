const util = require('util')
const exec = require('child_process').exec
const fs = require('fs-extra')
const path = require('path')
const mustache = require('mustache')
var dateFormat = require('dateformat');
const templateData = require('./interview_pieces/template_data')

/* Data locations */
const piecesDir = './interview_pieces'
const instructionsTemplateDir = path.join(piecesDir, 'instructions')
// const drivePath = '/Volumes/INTERVIEWDRIVE'
const drivePath = '/var/tmp/randomInterviews'

/* Argument gathering */
if (process.argv.length < 3) {
  console.log(`
  USAGE: node build.js <learner_name>
  `)
  process.exit(1)
}

const learnerName = process.argv.slice(2).join(' ')

/* Functions ************************************************/

/**
 * Create the output directory based on learner name and date.
 * If the directory already exists, delete and recreate
 * @param {string} drivePath - path to the interview drive
 * @param {string} learnerName - name of the learner taking the interview
 * @returns {string} - The path to the created output directory
 */
const createOutputDir = (drivePath, learnerName) => {
  const now = new Date();
  const dateString = dateFormat(now, "yyyy-dd-mm")
  const outputDir = `${drivePath}/${learnerName}_${dateString}`

  try {
    fs.mkdirSync(outputDir)
  } catch (error) {
    if (error.code == 'EEXIST') {
      // the directory already exists; empty it
      fs.emptyDirSync(outputDir)
    } else {
      console.error(`Could not make output dir ${outputDir}`)
      console.error(error.toString())
      process.exit(1)
    }
  }
  return outputDir
}

const createFile = (filePath, contents) => {
  fs.writeFile(filePath, contents, (err) => {
    if (err) {
      console.error(`Problem writing ${filePath}`)
      console.error(err.toString())
      console.error('Exiting.')
      process.exit(1)
    }
    console.log(filePath)
  })
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

/**
 * Generate the random version components for parts 1, 2, 3 and database
 * @returns {object} - object with the randomly generated versions
 */
const generateRandomVersion = () => {
  const p1 = 'a'
  const p2 = 'a'
  const p3 = 'a'
  const db = 'recipes'
  return {
    p1,
    p2,
    p3,
    db,
  }
}

/**
 * Create challenge instructions and output to the outputDir/README.md
 * @param {string} outputDir - path to the output directory
 * @param {object} versions - versions of the challenge to generate
 */
const createInstructions = (drivePath, outputDir, versions) => {
  const finalData = {
    drivePath,
    outputDir,
    dbName: versions.db,
    p1version: versions.p1,
    p2version: versions.p2,
    p3version: versions.p3,
    p1: templateData[versions.db][versions.p1],
    p2: templateData[versions.db][versions.p2],
    p3: templateData[versions.db][versions.p3],
  }

  const partials = {
    'part-1': path.join(instructionsTemplateDir, 'part-1', `part-1-${versions.p1}.mustache`),
    'part-2': path.join(instructionsTemplateDir, 'part-2', `part-2-${versions.p2}.mustache`),
    'part-3': path.join(instructionsTemplateDir, 'part-3', `part-3-${versions.p3}.mustache`),
  }
  const readmeTemplatePath = path.join(instructionsTemplateDir, 'README.mustache')
  const readme = renderMustache(readmeTemplatePath, finalData, partials)
  const readmeOutPath = path.join(outputDir, 'README.md')
  createFile(readmeOutPath, readme)
}

/* Main ************************************************/

const outputDir = createOutputDir(drivePath, learnerName)
const versions = generateRandomVersion()
createInstructions(drivePath, outputDir, versions)