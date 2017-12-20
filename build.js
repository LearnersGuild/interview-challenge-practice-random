const util = require('util')
const exec = require('child_process').exec
const fs = require('fs-extra')
const path = require('path')
const yaml = require('js-yaml')
const mustache = require('mustache')
var dateFormat = require('dateformat');
const templateData = require('./interview_pieces/template_data')

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

/**
 * Read YAML from a file and return an object
 * @param {string} filePath - path to file containing YAML
 * @returns {object} - JS object represenation of YAML
 */
const readYaml = (filePath) => {
  try {
    return yaml.safeLoad(fs.readFileSync(filePath))
  } catch (error) {
    console.error(`Problem reading YAML from ${filePath}`)
    console.error(error.toString())
    console.error('Exiting.')
    process.exit(1)
  }
}

/**
 * Create a file with contents at the specified path
 * @param {string} filePath - full path to file
 * @param {string} contents - contents to write to file
 */
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
 * Generate an object with random data matching the random versions
 * @param {string} drivePath - Path to the drive containing interview files
 * @param {string} outputDir - Path to output directory
 * @param {object} versions - randomized versions for db, p1, p2, p3
 * @returns {object} - Object containing data for the random versions
 */
const generateRandomData = (drivePath, outputDir, versions) => {
  return {
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
}

/**
 * Create challenge instructions and output to the outputDir/README.md
 * @param {object} data - data to send to the template
 * @param {string} piecesDir - path to the directory containing the templates and data
 */
const createInstructions = (data, piecesDir) => {
  const instructionsTemplateDir = path.join(piecesDir, 'instructions')

  const partials = {
    'part-1': path.join(instructionsTemplateDir, 'part-1', `part-1-${data.p1version}.mustache`),
    'part-2': path.join(instructionsTemplateDir, 'part-2', `part-2-${data.p2version}.mustache`),
    'part-3': path.join(instructionsTemplateDir, 'part-3', `part-3-${data.p3version}.mustache`),
  }

  const readmeTemplatePath = path.join(instructionsTemplateDir, 'README.mustache')
  const readme = renderMustache(readmeTemplatePath, data, partials)
  const readmeOutPath = path.join(outputDir, 'README.md')
  createFile(readmeOutPath, readme)
}

/**
 * Create setup directory with the appropriate db datat
 * @param {string} dbName - Name of db for this interview
 * @param {string} piecesDir - Path to the directory containing templates and YAML
 * @param {string} outputDir - Path to the output directory
 */
const createSetup = (dbName, piecesDir, outputDir) => {
  const setupDir = path.join(piecesDir, 'code', 'setup')
  const schemaTemplatePath = path.join(setupDir, 'schema.mustache')
  const seedTemplatePath = path.join(setupDir, 'seed.mustache')
  
  const setupOutDir = path.join(outputDir, 'setup')
  fs.mkdirSync(setupOutDir)
  const schemaOutPath = path.join(setupOutDir, 'schema.sql')
  const seedOutPath = path.join(setupOutDir, 'seed.sql')

  const dbDir = path.join(piecesDir, 'db_data', dbName)
  const dbConfig = readYaml(path.join(dbDir, `${dbName}.yaml`))

  // why can't I just use Object.values here? 
  const tables = Object.keys(dbConfig.tables).map(key => dbConfig['tables'][key])

  const schema = renderMustache(schemaTemplatePath, { dbName, tables }, {})
  createFile(schemaOutPath, schema)
}

/* Main ******************************************************************/

/* Data locations */
const piecesDir = './interview_pieces'
// const drivePath = '/Volumes/INTERVIEWDRIVE'
const drivePath = '/var/tmp/randomInterviews'

/* Argument gathering */
if (process.argv.length < 3) {
  console.log(`
  USAGE: node build.js <learner_name>
  `)
  process.exit(1)
}


const outputDir = createOutputDir(drivePath, learnerName)
const versions = generateRandomVersion()
const randomizedData = generateRandomData(drivePath, outputDir, versions)

createInstructions(randomizedData, piecesDir)
createSetup(versions.db, piecesDir, outputDir)