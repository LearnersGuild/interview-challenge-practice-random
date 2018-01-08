/**
 * Generate the random version components for parts 1, 2, 3 and database
 * @returns {object} - object with the randomly generated versions
 */
const generateRandomVersion = () => {
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
    dbName: versions.dbRandomName,
    p1version: versions.p1,
    p2version: versions.p2,
    p3version: versions.p3,
    p1: templateData[versions.db][versions.p1],
    p2: templateData[versions.db][versions.p2],
    p3: templateData[versions.db][versions.p3],
  }
}

module.exports = {
  generateRandomVersion, 
  generateRandomData
}