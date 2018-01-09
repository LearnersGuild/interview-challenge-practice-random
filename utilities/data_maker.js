const path = require('path')
const { readYaml, createDir } = require('../utilities/file_utilities')

/**
 * Generate the random version components for parts 1, 2, 3 and database
 * @returns {object} - object with the randomly generated versions
 */
const generateRandomVersions = () => {
  const randomString = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
  const p1 = 'a'
  const p2 = 'a'
  const p3 = 'a'
  const db = 'flights'
  const dbRandomName = `${db}_${randomString}`
  return {
    p1,
    p2,
    p3,
    db,
    dbRandomName,
  }
}

/**
 * construct the necessary paths (and create dirs as needed)
 * @param {object} versions - Randomized versions for this challenge
 * @param {string} outputDir - Path to output directory
 * @returns {object} - paths for this challenge
 */
const constructPaths = (versions, outputDir) => {
  // templates location
  const piecesDir = path.join(__dirname, '../interview_pieces')
  
  const paths = {}
  const codeDir = path.join(piecesDir, 'code')

  // construct paths for part-specific directory paths, and create the destination directories
  Array(1, 2, 3).forEach(partNum => {
    const partDir = `part-${partNum}`
    const destDir = path.join(outputDir, partDir)
    const srcDir = path.join(codeDir, partDir)
    createDir(destDir)

    const dbJsSrcDir = path.join(codeDir, 'db', versions[`p${partNum}`])
    const dbJsDestDir = path.join(destDir, 'db')
    createDir(dbJsDestDir)

    const dbTemplate = path.join(dbJsSrcDir, 'db.mustache')

    // add the generated paths to the larger paths object
    paths[`p${partNum}`] = {
      srcDir,
      destDir,
      dbJsSrcDir,
      dbJsDestDir,
      dbTemplate,
    }
  })

  // template paths
  const instructionsDir = path.join(piecesDir, 'instructions')
  paths.templates = {
    instructionsDir,
    readme: path.join(instructionsDir, 'README.mustache'),
    dbSetup: path.join(paths.p1.srcDir, 'db.mustache'),
    jsDoc: path.join(paths.p1.dbJsSrcDir, 'jsDoc.mustache'),
    schema: path.join(piecesDir, 'code', 'setup', 'schema.mustache'),
  }

  // db setup file paths
  paths.dbSrcDir = path.join(piecesDir, 'db_data', versions.db)

  const setupSrcDir = path.join(piecesDir, 'code', 'setup')
  const setupDestDir = path.join(outputDir, 'setup')
  createDir(setupDestDir)

  paths.seedSourcePath = path.join(paths.dbSrcDir, 'seed.sql')
  paths.seedDestPath = path.join(setupDestDir, 'seed.sql')

  paths.packageSrcPath = path.join(setupSrcDir, 'package.json')
  paths.packageDestPath = path.join(setupDestDir, 'package.json')
  paths.schemaOutPath = path.join(setupDestDir, 'schema.sql')

  // app.js file paths

  // views file paths

  // package.json file paths
  paths.packageSrcPath = path.join(paths.p1.srcDir, 'package.json')
  paths.packageDestPath = path.join(paths.p1.destDir, 'package.json')

  return paths
}


/**
 * Generate an object with random data matching the random versions
 * ALSO: create necessary destination directories for future use
 * @param {string} outputDir - Path to output directory
 * @param {string} drivePath - Path to drive root directory
 * @returns {object} - Object containing data for the random versions
 */
const generateChallengeData = (outputDir, drivePath) => {

  // get the randomized versions
  const versions = generateRandomVersions()

  // construct the necessary paths (and create dirs as needed)
  const paths = constructPaths(versions, outputDir)

  // template data location (relative path assuming this will be run from project top level)
  const templateData = require('../interview_pieces/template_data')
  
  // database config data
  const dbConfig = readYaml(path.join(paths.dbSrcDir, `${versions.db}.yaml`))

  return {
    outputDir,
    drivePath,
    dbName: versions.dbRandomName,
    p1version: versions.p1,
    p2version: versions.p2,
    p3version: versions.p3,
    p1: templateData[versions.db][versions.p1],
    p2: templateData[versions.db][versions.p2],
    p3: templateData[versions.db][versions.p3],
    dbConfig,
    paths
  }
}

module.exports = {
  generateRandomVersions, 
  generateChallengeData
}