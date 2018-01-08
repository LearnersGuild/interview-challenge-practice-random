const util = require('util')
const { exec } = require('child_process')
const path = require('path')
const templateData = require('./interview_pieces/template_data')
const { processFatalError } = require('./utilities/error_handling')
const { readYaml, createOutputDir, createFile, createDir, copyFile } = require('./utilities/file_utilities')
const { renderMustache } = require('./utilities/mustache_utiltities')
const { generateRandomVersion, generateRandomData } = require('./utilities/randomizer')

const learnerName = process.argv.slice(2).join(' ')

/* Functions ************************************************/

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
 * @param {object} dbConfig - db config for this interview
 * @param {string} piecesDir - Path to the directory containing templates and YAML
 * @param {string} outputDir - Path to the output directory
 */
const createSetup = (dbConfig, piecesDir, outputDir) => {
  const setupSrcDir = path.join(piecesDir, 'code', 'setup')
  const schemaTemplatePath = path.join(setupSrcDir, 'schema.mustache')
  
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
  const schema = renderMustache(schemaTemplatePath, { dbName: dbConfig.dbName, tables }, {})
  createFile(schemaOutPath, schema)

  // too much work to create seed file from yaml. 
  // for now, just copy over
  const seedSourcePath = path.join(dbConfig.dbSrcDir, 'seed.sql')
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
 * @param {object} paths - paths to source and dest dirs
 */
const createPart1 = (dbName, paths) => {
  const dbjsContent = renderMustache(paths.dbSetupTemplatePath, { dbName }, {  })
  createFile(path.join(paths.p1destDir, 'db.js'), dbjsContent)

  const packageSrcPath = path.join(paths.p1srcDir, 'package.json')
  const packageDestPath = path.join(paths.p1destDir, 'package.json')
  copyFile(packageSrcPath, packageDestPath)
}

/**
 * Create db.js for part-2 and part-3 with the appropriate data
 * @param {object} data - Data for this particular challenge
 * @param {object} dbConfig - db config for this interview
 * @param {object} paths - paths to source and dest dirs
 */
const createDbjsSolution = (data, dbConfig, paths) => {

  Array(2, 3).forEach(partNum => {
    const dbJsSrcDir = path.join(paths.codeDir, data[`p${partNum}version`], 'db')
    const dbTemplate = path.join(dbJsSrcDir, 'db.mustache')
    const jsDoc = path.join(dbJsSrcDir, 'jsDoc.mustache')
    const dbjsdata = Object.assign(data[`p${partNum}`], { mainTableName: data.mainTableName, joinTableName: data.joinTableName, dbName: data.dbName })
    const dbjsContent = renderMustache(dbTemplate, dbjsdata, { dbSetup: paths.dbSetupTemplatePath, jsDoc })

    const dbJsDestDir = path.join(paths[`p${partNum}destDir`], 'db')
    createDir(dbJsDestDir)
    createFile(path.join(dbJsDestDir, 'db.js'), dbjsContent)
  })
}

/**
 * Create parts directories with the appropriate data
 * @param {object} randomizedData - Data for this particular challenge
 * @param {object} dbConfig - db config for this interview
 * @param {string} piecesDir - Path to the directory containing templates and YAML
 * @param {string} outputDir - Path to the output directory
 */
const createParts = (randomizedData, dbConfig, piecesDir, outputDir) => {
  const paths = {}
  paths.codeDir = path.join(piecesDir, 'code')
  Array(1, 2, 3).forEach(partNum => {
    const partDir = `part-${partNum}`
    const destDir = path.join(outputDir, partDir)
    paths[`p${partNum}srcDir`] = path.join(paths.codeDir, partDir)
    paths[`p${partNum}destDir`] = destDir
    createDir(destDir)
  })
  paths.dbJsDestDir = path.join(paths.p2destDir, 'db')
  paths.dbSetupTemplatePath = path.join(paths.p1srcDir, 'db.mustache')

  randomizedData.mainTableName = dbConfig.tables.main.tablename
  randomizedData.joinTableName = dbConfig.tables.join.tablename

  createPart1(randomizedData.dbName, paths)
  createDbjsSolution(randomizedData, dbConfig, paths)
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
const dbSrcDir = path.join(piecesDir, 'db_data', versions.db)
const dbConfig = readYaml(path.join(dbSrcDir, `${versions.db}.yaml`))
dbConfig.dbSrcDir = dbSrcDir

createInstructions(randomizedData, piecesDir)
createSetup(dbConfig, piecesDir, outputDir)
createParts(randomizedData, dbConfig, piecesDir, outputDir)