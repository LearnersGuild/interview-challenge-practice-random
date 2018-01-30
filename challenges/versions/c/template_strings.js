/**
 * 
 * @param {object} dbStrings - Strings for the db (example key: 'mainTableRootNameCaps')
 * @returns {object} - Object with strings from this challenge's db for this challenge version's questions/scaffolding
 */
const stringMaker = function(dbStrings) {

  const strings = {}

  strings.dbFuncName = `get${dbStrings.mainTableRootNameCaps}sFor${dbStrings.secondaryTableRootNameCaps}Id`
  strings.parameterName = `${dbStrings.secondaryTableRootName}Id`
  strings.dataColumnName = dbStrings.mainTableMainColumnName
  strings.dataColumnDescription = `${dbStrings.mainTableRootName} ${dbStrings.mainTableMainColumnName}`
  strings.sampleDbResult = dbStrings.exampleResults.mainTableMainColumn
  strings.endpoint = `/${dbStrings.secondaryTableRootName}s/:${dbStrings.secondaryTableRootName}Id/${dbStrings.mainTableRootName}s`
  strings.endpointFilesBaseName = `${dbStrings.secondaryTableRootName}_${dbStrings.mainTableRootName}s`
  strings.endpointExample = `/${dbStrings.secondaryTableRootName}s/3/${dbStrings.mainTableRootName}s`
  strings.viewTitle = `${dbStrings.secondaryTableRootNameCaps} ${dbStrings.mainTableRootName}s`
  strings.buttonId = `add-${dbStrings.mainTableRootName}`

  return Object.assign(dbStrings, strings)

}

module.exports = stringMaker