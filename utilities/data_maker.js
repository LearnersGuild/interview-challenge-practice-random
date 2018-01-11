const path = require('path')
const { readYaml, createDir, createOutputDir } = require('../utilities/file_utilities')

/**
 * Generate the random version components for parts 1, 2, 3 and database
 * @returns {object} - object with the randomly generated versions
 */
const generateRandomVersions = () => {
  const randomString = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 8);
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
 * @param {string} destDir - Path to output directory
 * @param {object} data - data for this challenge (used in some file names)
 * @param {string} drivePath - Path to thumb drive root
 * @returns {object} - paths for this challenge
 */
const constructPaths = (versions, destDir, data, drivePath) => {
  const paths = {}
  paths.common = {}
  paths.common.src = {}
  paths.common.dest = {}
  
  // non-part-specific source paths
  paths.common.src.rootDir = path.join(__dirname, '../interview_pieces')
  paths.common.src.codeDir = path.join(paths.common.src.rootDir, 'code')
  paths.common.src.viewsDir = path.join(paths.common.src.rootDir, 'views')
  paths.common.src.publicDir = path.join(paths.common.src.rootDir, 'public')
  paths.common.src.jsDir = path.join(paths.common.src.publicDir, 'js')
  paths.common.src.css = path.join(paths.common.src.publicDir, 'css' )

  // for consistency, store drivePath and root destination dir here
  paths.common.dest.drivePath = drivePath
  paths.common.dest.rootDir = destDir

  // instructions (README)
  paths.readme = {}
  paths.readme.src = {}
  paths.readme.dest = {}
  paths.readme.src.rootDir = path.join(paths.common.src.rootDir, 'instructions')
  paths.readme.src.readmeTemplate = path.join(paths.readme.src.rootDir, 'README.mustache')
  paths.readme.src.p1Template = path.join(paths.readme.src.rootDir, `p1-${versions.p1}.mustache`)
  paths.readme.src.p2Template = path.join(paths.readme.src.rootDir, `p2-${versions.p2}.mustache`)
  paths.readme.src.p3Template = path.join(paths.readme.src.rootDir, `p3-${versions.p3}.mustache`)
  paths.readme.dest.readmeFile = path.join(paths.common.dest.rootDir, 'README.md')

  // project setup
  paths.setup = {}
  paths.setup.src = {}
  paths.setup.dest = {}
  paths.setup.src.setupDir = path.join(paths.common.src.codeDir, 'setup')
  paths.setup.src.packageTemplate = path.join(paths.setup.src.setupDir, 'package_json.mustache')
  paths.setup.dest.rootDir = path.join(paths.common.dest.rootDir, 'setup')
  paths.setup.dest.setupPackageFile = path.join(paths.setup.dest.rootDir, 'package.json')
  paths.setup.dest.schemaFile = path.join(paths.setup.dest.rootDir, 'schema.sql')
  createDir(paths.setup.dest.rootDir)

  // database setup
  paths.setup.src.dataDir = path.join(paths.common.src.rootDir, 'db_data', versions.db)
  paths.setup.src.seedFile = path.join(paths.setup.src.dataDir, 'seed.sql')
  paths.setup.src.schemaFile = path.join(paths.setup.src.setupDir, 'schema.mustache'),
  paths.setup.dest.seedFile = path.join(paths.setup.dest.rootDir, 'seed.sql')
  
  // app.js common files
  paths.appJs = {}
  paths.appJs.src = {}
  paths.appJs.src.rootDir = path.join(paths.common.src.codeDir, 'app')
  paths.appJs.src.commonDir = path.join(paths.appJs.src.rootDir, 'common')
  paths.appJs.src.appStartTemplate = path.join(paths.appJs.src.commonDir, 'app_start.mustache')
  paths.appJs.src.defineAppAndViewTemplate = path.join(paths.appJs.src.commonDir, 'define_app_and_views.mustache')
  
  // db.js common files
  paths.dbJs = {}
  paths.dbJs.src = {}
  paths.dbJs.src.rootDir = path.join(paths.common.src.codeDir, 'db')
  paths.dbJs.src.commonDir = path.join(paths.dbJs.src.rootDir, 'common')
  paths.dbJs.src.dbJsConnectionTemplate = path.join(paths.dbJs.src.commonDir, 'db_connection.mustache')
  
  // construct paths for part-specific directory paths, and create the destination directories
  Array(1, 2, 3).forEach(partNum => {
    const p = {}
    p.src = {}
    p.dest = {}
    
    // used in destination filenames
    const endpointString = data[versions.db][versions[`p${partNum}`]].endpoint
    
    // top level destination part directory
    const partDir = `part-${partNum}`
    p.dest.rootDir = path.join(paths.common.dest.rootDir, partDir)
    createDir(p.dest.rootDir)
    
    // package.json paths
    p.src.packageFile = path.join(paths.common.src.codeDir, 'package_json', `p${partNum}-package.json`)
    p.dest.packageFile = path.join(p.dest.rootDir, 'package.json')
    
    // db.js paths
    p.src.dbJsDir = path.join(paths.dbJs.src.rootDir, versions[`p${partNum}`])
    p.src.dbJsTemplate = path.join(p.src.dbJsDir, 'db.mustache')
    p.src.jsDocTemplate = path.join(p.src.dbJsDir, 'jsDoc.mustache')
    p.dest.dbJsDir = path.join(p.dest.rootDir, 'db')
    createDir(p.dest.dbJsDir)

    // app.js file paths
    p.src.appJsDir = path.join(paths.appJs.src.rootDir, versions[`p${partNum}`])
    p.src.appJsTemplate = path.join(p.src.appJsDir, `p${partNum}-app.mustache`)
    p.dest.appJsFile = path.join(p.dest.rootDir, 'app.js')

    // views file paths
    p.src.pugTemplate = path.join(paths.common.src.viewsDir, `p${partNum}.pug.mustache`)
    p.src.ejsTemplate = path.join(paths.common.src.viewsDir, `p${partNum}.ejs.mustache`)
    p.dest.viewsDir = path.join(p.dest.rootDir, 'views')
    p.dest.pugFile = path.join(p.dest.viewsDir, `${endpointString}.pug`)
    p.dest.ejsFile = path.join(p.dest.viewsDir, `${endpointString}.ejs`)
    createDir(p.dest.viewsDir)

    // public file paths
    p.src.cssFile = (paths.common.src.publicDir, `p${partNum}.css`)
    p.src.jsFile = (paths.common.src.publicDir, `p${partNum}.js`)
    p.dest.publicDir = path.join(p.dest.rootDir, 'public')
    p.dest.jsFile = path.join(p.dest.publicDir, `${endpointString}.js`)
    p.dest.cssFile = path.join(p.dest.publicDir, `${endpointString}.css`)
    createDir(p.dest.publicDir)
 
    // add the generated paths to the larger paths object
    paths[`p${partNum}`] = p
  })

  return paths
}


/**
 * Generate an object with random data matching the random versions
 * ALSO: create necessary destination directories for future use
 * @param {string} learnerName - Name of learner taking the challenge
 * @returns {object} - Object containing data for the random version
 */
const generateChallengeConfig = (learnerName) => {
  // const drivePath = '/Volumes/INTERVIEW'
  const drivePath = '/var/tmp/randomInterviews'
  const outputDir = createOutputDir(drivePath, learnerName)

  // get the randomized versions
  const versions = generateRandomVersions()

  // general data
  const templateData = require(path.join(__dirname, '../interview_pieces/template_data'))
  const data = {
    p1: Object.assign (templateData[versions.db][versions.p1], { version: versions.p1 }),
    p2: Object.assign (templateData[versions.db][versions.p2], { version: versions.p2 }),
    p3: Object.assign (templateData[versions.db][versions.p3], { version: versions.p3 }),
  }

  // construct the necessary paths (and create dirs as needed)
  const paths = constructPaths(versions, outputDir, templateData, drivePath)

  // database config data
  const dbConfig = readYaml(path.join(paths.setup.src.dataDir, `${versions.db}.yaml`))
  
  return {
    data,
    dbConfig,
    paths,
  }
}

module.exports = {
  generateChallengeConfig
}