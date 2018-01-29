/**
 * 
 * @param {object} dbStrings - Strings for the db (example key: 'mainTableRootNameCaps')
 * @returns {object} - Object with strings from this challenge's db for this challenge version's questions/scaffolding
 */
const stringMaker = function(dbStrings) {

  const strings = {}

  strings.dbFuncName = `get${dbStrings.mainTableRootNameCaps}${dbStrings.manyTableRootNameCaps}s`
  strings.parameterName = `${dbStrings.mainTableRootName}${dbStrings.mainTableMainColumnNameCaps}`
  strings.parameterDescription = `${dbStrings.mainTableRootName} ${dbStrings.mainTableMainColumnName}`
  strings.parameterColumnName = dbStrings.mainTableMainColumnName
  strings.dataColumnName = dbStrings.manyTableMainColumnName
  strings.dataName = dbStrings.manyTableRootName
  strings.sampleDbResult = dbStrings.exampleResults.manyTableMainColumn
  strings.endpoint = `${dbStrings.mainTableRootName}_${dbStrings.manyTableRootName}_list`
  strings.endpointDescription = `${dbStrings.manyTableRootName} list`
  strings.endpointFilesBaseName = strings.endpoint
  strings.listTitle = `${dbStrings.manyTableRootNameCaps} ${dbStrings.manyTableMainColumnNameCaps}`
  strings.exampleGetData = dbStrings.exampleData.mainTableMainColumnUrlEncoded

  return Object.assign(dbStrings, strings)

}

module.exports = stringMaker