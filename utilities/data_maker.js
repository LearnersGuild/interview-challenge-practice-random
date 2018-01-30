const path = require('path')
const fs = require('fs')
const { readYaml, createDir, createOutputDir } = require('../utilities/file_utilities')
const { capitalizeFirstLetter } = require('../utilities/capitalize')

// Set these to null if you want random versions
const DB = 'movies'
const VERSION = 'b'

// If the volume is mounted, use that. Otherwise, use random
const MOUNTED_DRIVE = '/Volumes/INTERVIEW'
const NONDRIVEPATH = '/var/tmp/randomInterviews'
const DRIVEPATH = fs.existsSync(MOUNTED_DRIVE) ? MOUNTED_DRIVE : NONDRIVEPATH

// Global file locations
const SRC_ROOTDIR = path.join(__dirname, '../challenges')
const VERSIONS_PATH = path.join(SRC_ROOTDIR, 'versions')
const DBDATA_PATH = path.join(SRC_ROOTDIR, 'db_data')

/**
 * Generate the random version components for parts 1, 2, 3 and database
 * @returns {object} - object with the randomly generated versions
 */
const generateRandomVersions = () => {
  // get all possible dbs
  const dbs = fs.readdirSync(DBDATA_PATH)
  const db = DB || dbs[Math.floor(Math.random()*dbs.length)]
  const randomString = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 8);
  const dbRandomName = `${DB}_${randomString}`
  
  // get all possible versions; exclude directories starting with '_'
  const versions = fs.readdirSync(VERSIONS_PATH).filter(dir => dir[0] !== '_')
  const p1 = VERSION || versions[Math.floor(Math.random()*versions.length)]
  const p2 = VERSION || versions[Math.floor(Math.random()*versions.length)]
  const p3 = VERSION || versions[Math.floor(Math.random()*versions.length)]
  return {
    p1,
    p2,
    p3,
    db: DB,
    dbRandomName,
  }
}

/**
 * 
 * @param {object} versions - Versions info for this challenge (as returned from generateRandomVersions)
 * @param {string} dbVersion - Version of the db for this challenge (e.g. 'flights')
 * @param {object} dbConfigData - Configuration data for this challenge's database, from .yaml file
 * @returns {object} - Object with strings from this challenge's db for this challenge version's questions/scaffolding
 */
const buildTemplateData = (versions, dbVersion, dbConfigData) => {
  const data = {}

  // get specialized strings (examples, cute phrases) for this db
  const dbStrings = require(path.join(__dirname, '../challenges/db_data', dbVersion, 'strings.js'))

  // table names and capitalized counterparts
  // table names need the final 's' removed to be the "RootName"
  dbStrings.mainTableRootName = dbConfigData.tables.main.tablename.slice(0, -1)
  dbStrings.secondaryTableRootName = dbConfigData.tables.one.tablename.slice(0, -1)
  dbStrings.manyTableRootName = dbConfigData.tables.many.tablename.slice(0, -1)
  dbStrings.mainTableMainColumnName = dbConfigData.tables.main.columns[1].name
  dbStrings.manyTableMainColumnName = dbConfigData.tables.many.columns[1].name
  dbStrings.secondaryTableMainColumnName = dbConfigData.tables.one.columns[1].name

  dbStrings.mainTableRootNameCaps = capitalizeFirstLetter(dbStrings.mainTableRootName)
  dbStrings.secondaryTableRootNameCaps = capitalizeFirstLetter(dbStrings.secondaryTableRootName)
  dbStrings.manyTableRootNameCaps = capitalizeFirstLetter(dbStrings.manyTableRootName)
  dbStrings.mainTableMainColumnNameCaps = capitalizeFirstLetter(dbStrings.mainTableMainColumnName)
  dbStrings.manyTableMainColumnNameCaps = capitalizeFirstLetter(dbStrings.manyTableMainColumnName)
  dbStrings.secondaryTableMainColumnNameCaps = capitalizeFirstLetter(dbStrings.secondaryTableMainColumnName)

  // build specific strings needed for each part for this challenge
  Array(1, 2, 3).map(partNum => {
    const stringMaker = require(path.join(VERSIONS_PATH, versions[`p${partNum}`], 'template_strings'))
    data[`p${partNum}`] = stringMaker(dbStrings)
  })

  return data
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
  
  // source paths
  paths.common.src.rootDir = SRC_ROOTDIR
  paths.common.src.versionsRootDir = path.join(VERSIONS_PATH)
  paths.common.src.commonDir = path.join(paths.common.src.versionsRootDir, '_common')
  paths.common.src.commonSrcDir = path.join(paths.common.src.commonDir, 'src')

  // for consistency, store drivePath and root destination dir here
  paths.common.dest.drivePath = drivePath
  paths.common.dest.rootDir = destDir

  // project setup
  paths.setup = {}
  paths.setup.src = {}
  paths.setup.dest = {}
  paths.setup.src.setupDir = path.join(paths.common.src.commonSrcDir, 'setup')
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
  
  // instructions (README)
  paths.readme = {}
  paths.readme.src = {}
  paths.readme.dest = {}
  paths.readme.src.readmeTemplate = path.join(paths.common.src.commonDir, 'instructions/README.mustache')
  paths.readme.dest.readmeFile = path.join(paths.common.dest.rootDir, 'README.md')

  // erd files
  paths.readme.src.erdFile = path.join(paths.setup.src.dataDir, 'ERD.png')
  paths.readme.dest.erdFile = path.join(paths.common.dest.rootDir, 'part-1', `${versions.db}_ERD.png`)
  
  // app.js common files
  paths.appJs = {}
  paths.appJs.src = {}
  paths.appJs.src.commonDir = path.join(paths.common.src.commonSrcDir, 'app')
  paths.appJs.src.appStartTemplate = path.join(paths.appJs.src.commonDir, 'app_start.mustache')
  paths.appJs.src.defineAppAndViewTemplate = path.join(paths.appJs.src.commonDir, 'define_app_and_views.mustache')
  paths.appJs.src.p2appJs = path.join(paths.appJs.src.commonDir, 'p2-app.mustache')
  
  // db.js common files
  paths.dbJs = {}
  paths.dbJs.src = {}
  paths.dbJs.src.commonDir = path.join(paths.common.src.commonSrcDir, 'db')
  paths.dbJs.src.dbJsConnectionTemplate = path.join(paths.dbJs.src.commonDir, 'db_connection.mustache')
  
  // construct paths for part-specific directory paths, and create the destination directories
  Array(1, 2, 3).forEach(partNum => {
    const p = {}
    p.src = {}
    p.dest = {}
    
    // basic dirs
    p.src.versionDir = path.join(paths.common.src.versionsRootDir, versions[`p${partNum}`])
    p.src.codeDir = path.join(p.src.versionDir, 'src')

    // instructions
    paths.readme.src[`p${partNum}Template`] = path.join(paths.common.src.versionsRootDir, versions[`p${partNum}`], `instructions/p${partNum}.mustache`)

    // used in destination filenames
    const endpointFilesBaseName = data[`p${partNum}`].endpointFilesBaseName
    
    // top level destination part directory
    const partDir = `part-${partNum}`
    p.dest.rootDir = path.join(paths.common.dest.rootDir, partDir)
    createDir(p.dest.rootDir)
    
    // package.json paths
    p.src.packageFile = path.join(paths.common.src.commonDir, 'package_json', `p${partNum}.json`)
    p.dest.packageFile = path.join(p.dest.rootDir, 'package.json')
    
    // db.js paths
    p.src.dbJsDir = path.join(p.src.codeDir, 'db')
    p.src.dbJsTemplate = path.join(p.src.dbJsDir, 'db.mustache')
    p.src.jsDocTemplate = path.join(p.src.dbJsDir, 'jsDoc.mustache')
    p.dest.dbJsDir = path.join(p.dest.rootDir, 'db')
    createDir(p.dest.dbJsDir)

    // app.js file paths
    if (partNum < 3) {
      // app.js is version-independent for p2
      p.src.appJsTemplate = paths.appJs.src.p2appJs
    } else {
      p.src.appJsDir = path.join(p.src.codeDir, 'app')
      p.src.appJsTemplate = path.join(p.src.appJsDir, `p${partNum}.mustache`)
    }
    p.dest.appJsFile = path.join(p.dest.rootDir, 'app.js')

    // views file paths
    if (partNum > 1) {
      p.src.viewsDir = path.join(p.src.codeDir, 'views')
      p.src.pugTemplate = path.join(p.src.viewsDir, `p${partNum}-pug.mustache`)
      p.src.ejsTemplate = path.join(p.src.viewsDir, `p${partNum}-ejs.mustache`)
      p.dest.viewsDir = path.join(p.dest.rootDir, 'views')
      p.dest.pugFile = path.join(p.dest.viewsDir, `${endpointFilesBaseName}.pug`)
      p.dest.ejsFile = path.join(p.dest.viewsDir, `${endpointFilesBaseName}.ejs`)
      createDir(p.dest.viewsDir)
    }

    // public file paths
    if (partNum > 2) {
      p.src.publicDir = path.join(p.src.codeDir, 'public')
      p.src.cssTemplate = path.join(p.src.publicDir, `p${partNum}-css.mustache`)
      p.src.jsTemplate = path.join(p.src.publicDir, `p${partNum}-js.mustache`)
      p.dest.publicDir = path.join(p.dest.rootDir, 'public')
      p.dest.jsFile = path.join(p.dest.publicDir, `${endpointFilesBaseName}.js`)
      p.dest.cssFile = path.join(p.dest.publicDir, `${endpointFilesBaseName}.css`)
      createDir(p.dest.publicDir)
    }
 
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
  const outputDir = createOutputDir(DRIVEPATH, learnerName)

  // get the randomized versions
  const versions = generateRandomVersions()
  
  // database config data
  const dbConfig = readYaml(path.join(SRC_ROOTDIR, 'db_data', versions.db, `schema.yaml`))
  dbConfig.dbName = versions.dbRandomName
  dbConfig.dbType = versions.db

  // general data
  const data = buildTemplateData(versions, versions.db, dbConfig)

  // construct the necessary paths (and create dirs as needed)
  const paths = constructPaths(versions, outputDir, data, DRIVEPATH)
  
  return {
    data,
    dbConfig,
    paths,
  }
}

module.exports = {
  generateChallengeConfig
}