const fs = require('fs-extra')
const yaml = require('js-yaml')
var dateFormat = require('dateformat');

const { processFatalError } = require('./error_handling.js')

/**
 * Read YAML from a file and return an object
 * @param {string} filePath - path to file containing YAML
 * @returns {object} - JS object represenation of YAML
 */
const readYaml = (filePath) => {
  try {
    return yaml.safeLoad(fs.readFileSync(filePath))
  } catch (error) {
    processFatalError(error, `Problem reading YAML from ${filePath}`)
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
  const dateString = dateFormat(now, "yyyy-mm-dd")
  const outputDir = `${drivePath}/${learnerName}_${dateString}`

  try {
    fs.mkdirSync(outputDir)
  } catch (error) {
    if (error.code == 'EEXIST') {
      // the directory already exists; empty it
      fs.emptyDirSync(outputDir)
    } else {
      processFatalError(error, `Could not make output dir ${outputDir}`)
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
      processFatalError(err, `Problem writing file ${filePath}`)
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
    processFatalError(error, `Could not create directory ${dirPath}`)
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
    processFatalError(error, `Could not copy ${sourcePath} to ${destPath}`)
  }
}

module.exports = {
  readYaml,
  createOutputDir,
  createFile,
  createDir,
  copyFile
}