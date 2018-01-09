const util = require('util')
const { exec } = require('child_process')
const path = require('path')
const { processFatalError } = require('./utilities/error_handling')
const { createOutputDir, createFile, createDir, copyFile } = require('./utilities/file_utilities')
const { renderMustache } = require('./utilities/mustache_utiltities')
const { generateRandomVersion, generateChallengeData } = require('./utilities/data_maker')

const learnerName = process.argv.slice(2).join(' ')

/* Functions ************************************************/

/**
 * Create challenge instructions and output to the outputDir/README.md
 * @param {object} data - data to send to the template
 */
const createInstructions = (data) => {

  const instructionsTemplateDir = data.paths.templates.instructionsDir

  const partials = {
    'part-1': path.join(instructionsTemplateDir, 'part-1', `part-1-${data.p1version}.mustache`),
    'part-2': path.join(instructionsTemplateDir, 'part-2', `part-2-${data.p2version}.mustache`),
    'part-3': path.join(instructionsTemplateDir, 'part-3', `part-3-${data.p3version}.mustache`),
  }

  const readme = renderMustache(data.paths.templates.readme, data, partials)
  const readmeOutPath = path.join(data.outputDir, 'README.md')
  createFile(readmeOutPath, readme)

  // copy ERD over
  // TODO

  // create Postico .fav file (?)
  // TODO
}

/**
 * Copy over package.json files for the project
 * @param {object} data - data for this challenge
 */
const createPackageJSON = (data) =>  {
  const { paths } = data

  Array(1, 2, 3).forEach ((partNum) => {
    copyFile(paths[`p${partNum}`].packageSrcPath, paths[`p${partNum}`].packageDestPath)
  })
}

/**
 * Create setup directory with the appropriate db data
 * @param {object} data - data for this challenge
 */
const createSetup = (data) => {
  const { dbConfig, paths } = data

  // render schema from template
  const tables = Object.keys(dbConfig.tables).map(key => dbConfig.tables[key])

  // account for commas that need to be all but the last item >_<
  tables.forEach((table) => {
    table.columns[table.columns.length - 1].last = true
  })
  const schema = renderMustache(paths.templates.schema, { dbName: data.dbName, tables }, {})
  createFile(paths.schemaOutPath, schema)

  // too much work to create seed file from yaml. 
  // for now, just copy over
  copyFile(data.paths.seedSourcePath, data.paths.seedDestPath)

  // finally, package.json, customized with db name
  const package = renderMustache(paths.templates.setupPackage, { dbName: data.dbName }, { })
  createFile(paths.setupPackageDestPath, package)

}

/**
 * Create part-1 directory with the appropriate data
 * @param {object} data - Data for this particular challenge
 */
const createPart1 = (data) => {
  const { dbName, paths } = data
  const dbjsContent = renderMustache(paths.templates.dbSetup, { dbName }, { })
  createFile(path.join(paths.p1.dbJsDestDir, 'db.js'), dbjsContent)
}

/**
 * Create db.js for part-2 and part-3 with the appropriate data
 * @param {object} data - Data for this particular challenge
 */
const createDbjsSolution = (data) => {
  const { dbConfig, paths } = data
  const mainTableName = dbConfig.tables.main.tablename
  const joinTableName = dbConfig.tables.join.tablename
  const dbName = data.dbName

  Array(2, 3).forEach(partNum => {
    const partData = data[`p${partNum}`]
    const templateData = Object.assign(partData, { mainTableName, joinTableName, dbName })
    const partials = { dbSetup: paths.templates.dbSetup, jsDoc: paths.templates.jsDoc }
    const dbjsContent = renderMustache(paths[`p${partNum}`].dbTemplate, templateData, partials)
    createFile(path.join(paths[`p${partNum}`].dbJsDestDir, 'db.js'), dbjsContent)
  })
}

/**
 * Create app.js for parts 2 and 3
 * @param {object} data - Data for this particular challenge
 */
const createApp = (data) => {
  const { paths } = data
  const { jsDoc, appStart, defineAppAndView } = paths.templates

  Array(2, 3).forEach((partNum) => {
    const partData = data[`p${partNum}`]
    const partPaths = paths[`p${partNum}`]
    const appJsContent = renderMustache(partPaths.appTemplate, partData, { jsDoc, appStart, defineAppAndView })
    createFile(partPaths.appDestPath, appJsContent)
  })
}

/**
 * Create the challenge using other functions
 */
const createChallenge = () => {
  // const drivePath = '/Volumes/INTERVIEW'
  const drivePath = '/var/tmp/randomInterviews'

  const outputDir = createOutputDir(drivePath, learnerName)
  const challengeData = generateChallengeData(outputDir, drivePath)

  createInstructions(challengeData)
  createSetup(challengeData)
  createPart1(challengeData)
  createPackageJSON(challengeData)
  createDbjsSolution(challengeData)
  createApp(challengeData)
}

/* Main ******************************************************************/

/* Argument gathering */
if (process.argv.length < 3) {
  console.log(`
  USAGE: node build.js <learner_name>
  `)
  process.exit(1)
}

createChallenge()