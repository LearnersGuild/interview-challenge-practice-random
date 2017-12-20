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
 * Print error details and exit
 * @param {Error} error - error object
 * @param {string} message - message for error context
 */
const fatalError = (error, message) => {
    console.error(message)
    console.error(error.toString())
    console.error('Exiting.')
    process.exit(1)
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
    fatalError(error, `Problem reading YAML from ${filePath}`)
  }
}

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
      fatalError(error, `Could not make output dir ${outputDir}`)
    }
  }
  return outputDir
}

/**
 * Create a file with contents at the specified path
 * @param {string} filePath - full path to file
 * @param {string} contents - contents to write to file
 */
const createFile = (filePath, contents) => {
  fs.writeFile(filePath, contents, (err) => {
    if (err) {
      fatalError(err, `Problem writing file ${filePath}`)
    }
    console.log(filePath)
  })
}

/**
 * Create a directory
 * @param {string} dirPath - path to create directory
 */
const createDir = (dirPath) => {
  try {
    fs.mkdirSync(dirPath)
  } catch(error) {
    fatalError(error, `Could not create directory ${dirPath}`)
  }
}

/**
 * Copy a file
 * @param {string} sourcePath - path to source file
 * @param {string} destPath - path to destination file
 */
const copyFile = (sourcePath, destPath) => {
  try {
    fs.copySync(sourcePath, destPath)
    console.log(destPath)
  } catch(error) {
    fatalError(error, `Could not copy ${sourcePath} to ${destPath}`)
  }
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
    fatalError(error, `Could not render template ${templateFilePath}`)
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
 * @param {object} templateData - data for populating templates
 * @param {object} versions - randomized versions for db, p1, p2, p3
 * @returns {object} - Object containing data for the random versions
 */
const generateRandomData = (drivePath, outputDir, templateData, versions) => {
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
 * Create setup directory with the appropriate db data
 * @param {string} dbName - Name of db for this interview
 * @param {string} piecesDir - Path to the directory containing templates and YAML
 * @param {string} outputDir - Path to the output directory
 */
const createSetup = (dbName, piecesDir, outputDir) => {
  const setupSrcDir = path.join(piecesDir, 'code', 'setup')
  const dbDir = path.join(piecesDir, 'db_data', dbName)
  const schemaTemplatePath = path.join(setupSrcDir, 'schema.mustache')
  const dbConfig = readYaml(path.join(dbDir, `${dbName}.yaml`))
  
  // create output dir
  const setupDestDir = path.join(outputDir, 'setup')
  createDir(setupDestDir)
  const schemaOutPath = path.join(setupDestDir, 'schema.sql')

  // render schema from template
  const tables = Object.keys(dbConfig.tables).map(key => dbConfig['tables'][key])
  // account for commas that need to be all but the last item >_<
  tables.forEach((table) => {
    table.columns[table.columns.length - 1].last = true
  })
  const schema = renderMustache(schemaTemplatePath, { dbName, tables }, {})
  createFile(schemaOutPath, schema)

  // too much work to create seed file from yaml. 
  // for now, just copy over
  const seedSourcePath = path.join(dbDir, 'seed.sql')
  const seedDestPath = path.join(setupDestDir, 'seed.sql')
  copyFile(seedSourcePath, seedDestPath)

  // copy package.json over 
  const packageSrcPath = path.join(setupSrcDir, 'package.json')
  const packageDestPath = path.join(setupDestDir, 'package.json')
  copyFile(packageSrcPath, packageDestPath)
}

/**
 * Create part-1 directory with the appropriate data
 * @param {string} dbName - Name of db for this interview
 * @param {string} piecesDir - Path to the directory containing templates and YAML
 * @param {string} outputDir - Path to the output directory
 */
const createPart1 = (dbName, piecesDir, outputDir) => {
  const p1srcDir = path.join(piecesDir, 'code', 'part-1')
  const p1destDir = path.join(outputDir, 'part-1')
  const templateFile = path.join(p1srcDir, 'db.js')

  createDir(p1destDir)

  const dbjsContent = renderMustache(templateFile, { dbName }, {})
  createFile(path.join(p1destDir, 'db.js'), dbjsContent)

  const packageSrcPath = path.join(p1srcDir, 'package.json')
  const packageDestPath = path.join(p1destDir, 'package.json')
  copyFile(packageSrcPath, packageDestPath)
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
const randomizedData = generateRandomData(drivePath, outputDir, templateData, versions)

createInstructions(randomizedData, piecesDir)
createSetup(versions.db, piecesDir, outputDir)
createPart1(versions.db, piecesDir, outputDir)
