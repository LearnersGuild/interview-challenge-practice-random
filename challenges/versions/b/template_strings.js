/**
 * 
 * @param {object} dbStrings - Strings for the db (example key: 'mainTableRootNameCaps')
 * @returns {object} - Object with strings from this challenge's db for this challenge version's questions/scaffolding
 */
const stringMaker = function(dbStrings) {

  const strings = {}

  strings.dbFuncName = `add${dbStrings.mainTableRootNameCaps}With${dbStrings.secondaryTableRootNameCaps}`
  strings.parameter1Name = `${dbStrings.mainTableRootName}${dbStrings.mainTableMainColumnNameCaps}`
  strings.parameter2Name = `${dbStrings.secondaryTableRootName}Id`
  strings.parameter1Description = `${dbStrings.mainTableRootName} ${dbStrings.mainTableMainColumnName}`
  strings.parameter2Description = `${dbStrings.secondaryTableRootName} id`
  strings.parameter1ColumnName = dbStrings.mainTableMainColumnName
  strings.sampleDbResult = '{ id: 4 }'
  strings.postEndpoint = `${dbStrings.mainTableRootName}s/add`
  strings.examplePostData = dbStrings.exampleData.mainTableRow
  strings.p3dbFuncName = `get${dbStrings.secondaryTableRootNameCaps}${dbStrings.secondaryTableMainColumnNameCaps}s`
  strings.p3columnName = dbStrings.secondaryTableMainColumnNameCaps
  strings.endpoint = `${dbStrings.secondaryTableRootName}s`
  strings.endpointFilesBaseName = `${dbStrings.secondaryTableRootName}s`
  strings.p3itemDescription = dbStrings.secondaryTableRootName
  strings.p3viewTitle = `${dbStrings.secondaryTableRootNameCaps}s`

  return Object.assign(dbStrings, strings)

}

module.exports = stringMaker