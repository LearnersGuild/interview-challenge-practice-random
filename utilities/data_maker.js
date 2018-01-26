const path = require('path')
const fs = require('fs')
const { readYaml, createDir, createOutputDir } = require('../utilities/file_utilities')

// If the volume is mounted, use that. Otherwise, use random
const MOUNTED_DRIVE = '/Volumes/INTERVIEW'
const NONDRIVEPATH = '/var/tmp/randomInterviews'
const DRIVEPATH = fs.existsSync(MOUNTED_DRIVE) ? MOUNTED_DRIVE : NONDRIVEPATH

/**
 * Generate the random version components for parts 1, 2, 3 and database
 * @returns {object} - object with the randomly generated versions
 */
const generateRandomVersions = () => {
  const dbs = ['flights', 'teams', 'movies', 'recipes']
  const randomString = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 8);
  const p1 = 'a'
  const p2 = 'a'
  const p3 = 'a'
  // const db = dbs[Math.floor(Math.random()*dbs.length)]
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
 * 
 * @param {object} versions - Versions info for this challenge (as returned from generateRandomVersions)
 * @param {string} dbVersion - Version of the db for this challenge (e.g. 'flights')
 * @returns {object} - Object with strings from this challenge's db for this challenge version's questions/scaffolding
 */
const buildTemplateData = (versions, dbVersion) => {
  const data = {}
  const dbStrings = require(path.join(__dirname, '../challenges/db_data', dbVersion, 'strings.js'))
  Array(1, 2, 3).map(partNum => {
    const stringMaker = require(path.join(__dirname, '../challenges/versions', versions[`p${partNum}`], 'template_strings'))
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
  paths.common.src.rootDir = path.join(__dirname, '../challenges')
  paths.common.src.versionsRootDir = path.join(paths.common.src.rootDir, 'versions')
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

  // general data
  const data = buildTemplateData(versions, versions.db)

  // construct the necessary paths (and create dirs as needed)
  const paths = constructPaths(versions, outputDir, data, DRIVEPATH)

  // database config data
  const dbConfig = readYaml(path.join(paths.setup.src.dataDir, `schema.yaml`))
  dbConfig.dbName = versions.dbRandomName
  dbConfig.dbType = versions.db
  
  return {
    data,
    dbConfig,
    paths,
  }
}

module.exports = {
  generateChallengeConfig
}