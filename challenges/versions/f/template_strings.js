/**
 * 
 * @param {object} dbStrings - Strings for the db (example key: 'mainTableRootNameCaps')
 * @returns {object} - Object with strings from this challenge's db for this challenge version's questions/scaffolding
 */
const stringMaker = function(dbStrings) {

  const strings = {}

  strings.dbFuncName = `get${dbStrings.mainTableRootNameCaps}sWith${dbStrings.secondaryTableRootNameCaps}`
  strings.sampleDbResult = dbStrings.exampleResults.mainTableWithSecondary
  strings.secondaryFieldName = `${dbStrings.secondaryTableRootName}_${dbStrings.secondaryTableMainColumnName}`
  strings.secondaryFieldDescription = `${dbStrings.secondaryTableRootName} ${dbStrings.secondaryTableMainColumnName}`
  strings.endpoint = `${dbStrings.mainTableRootName}s`
  strings.endpointFilesBaseName = strings.endpoint
  strings.sampleDbResult = `${dbStrings.exampleResults.mainTableWithSecondary}`
  strings.buttonId = `obliterate-unworthy-${dbStrings.secondaryTableRootName}s`
  strings.buttonText = `Update ${dbStrings.secondaryTableRootNameCaps}`

  return Object.assign(dbStrings, strings)

}

module.exports = stringMaker