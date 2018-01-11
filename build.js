const util = require('util')
const { exec } = require('child_process')
const path = require('path')
const { processFatalError } = require('./utilities/error_handling')
const { createFile, copyFile } = require('./utilities/file_utilities')
const { renderMustache } = require('./utilities/mustache_utiltities')
const { generateChallengeConfig } = require('./utilities/data_maker')

/* Functions ************************************************/

/**
 * Create challenge instructions and output to the outputDir/README.md
 * @param {object} config - configuration for this challenge
 */
const createInstructions = (config) => {
  const { paths, data } = config

  const partials = {
    'part-1': paths.readme.src.p1Template,
    'part-2': paths.readme.src.p2Template,
    'part-3': paths.readme.src.p3Template,
  }

  const templateData = Object.assign(data, {
    outputDir: paths.common.dest.rootDir,
    drivePath: paths.common.dest.drivePath,
  })

  const readmeContents = renderMustache(paths.readme.src.readmeTemplate, templateData, partials)
  createFile(paths.readme.dest.readmeFile, readmeContents)

  // copy ERD over
  // TODO

  // create Postico .fav file (?)
  // TODO
}

/**
 * Copy over package.json files for the project
 * @param {object} config - configuration for this challenge
 */
const createPackageJSON = (config) =>  {
  const { paths } = config

  Array(1, 2, 3).forEach ((partNum) => {
    copyFile(paths[`p${partNum}`].src.packageFile, paths[`p${partNum}`].dest.packageFile)
  })
}

/**
 * Create setup directory with the appropriate db data
 * @param {object} config - configuration for this challenge
 */
const createSetup = (config) => {
  const { dbConfig, paths } = config

  // render schema from template
  const tables = Object.keys(dbConfig.tables).map(key => dbConfig.tables[key])

  // account for commas that need to be all but the last item >_<
  tables.forEach((table) => {
    table.columns[table.columns.length - 1].last = true
  })
  const schema = renderMustache(paths.setup.src.schemaFile, { dbName: config.dbName, tables }, {})
  createFile(paths.setup.dest.schemaFile, schema)

  // too much work to create seed file from yaml. 
  // for now, just copy over
  copyFile(paths.setup.src.seedFile, paths.setup.dest.seedFile)

  // finally, package.json, customized with db name
  const package = renderMustache(paths.setup.src.packageTemplate, { dbName: config.dbName }, { })
  createFile(paths.setup.dest.setupPackageFile, package)

}

/**
 * Create part-1 directory with the appropriate data
 * @param {object} config - configuration for this particular challenge
 */
const createPart1 = (config) => {
  const { dbName, paths } = config
  const dbjsContent = renderMustache(paths.dbJs.src.dbJsConnectionTemplate, { dbName }, { })
  createFile(path.join(paths.p1.dest.dbJsDir, 'db.js'), dbjsContent)
}

/**
 * Create files for part-2 and part-3 with the appropriate data
 * @param {object} config - configuration for this particular challenge
 */
const createParts2and3 = (config) => {
  // gather data
  const { dbConfig, paths, data } = config
  const mainTableName = dbConfig.tables.main.tablename
  const joinTableName = dbConfig.tables.join.tablename
  const dbName = config.dbName

  // all the partials
  const partials = { 
    dbConnection: paths.dbJs.src.dbJsConnectionTemplate, 
    appStart: paths.appJs.src.appStartTemplate,
    defineAppAndView: paths.appJs.src.defineAppAndViewTemplate,
  }

  // make files for each part
  Array(2, 3).forEach(partNum => {
    const partData = data[`p${partNum}`]
    const partPaths = paths[`p${partNum}`]

    // db.js
    partials.jsDoc = partPaths.src.jsDocTemplate
    const templateData = Object.assign(partData, { mainTableName, joinTableName, dbName })
    const dbjsContent = renderMustache(partPaths.src.dbJsTemplate, templateData, partials)
    createFile(path.join(partPaths.dest.dbJsDir, 'db.js'), dbjsContent)

    // app.js
    const appJsContent = renderMustache(partPaths.src.appJsTemplate, partData, partials)
    createFile(partPaths.dest.appJsFile, appJsContent)

    // views (*.pug and *.ejs)
    

    // public


  })
}


/**
 * Create the challenge using other functions
 */
const createChallenge = (learnerName) => {
  const challengeData = generateChallengeConfig(learnerName)

  createInstructions(challengeData)
  createSetup(challengeData)
  createPackageJSON(challengeData)
  createPart1(challengeData)
  createParts2and3(challengeData)
 }

/* Main ******************************************************************/

/* Argument gathering */
if (process.argv.length < 3) {
  console.log(`
  USAGE: node build.js <learner_name>
  `)
  process.exit(1)
}

const learnerName = process.argv.slice(2).join('_')
createChallenge(learnerName)