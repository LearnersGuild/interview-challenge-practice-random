/**
 * 
 * @param {object} dbStrings - Strings for the db (example key: 'mainTableRootNameCaps')
 * @returns {object} - Object with strings from this challenge's db for this challenge version's questions/scaffolding
 */
const stringMaker = function(dbStrings) {

  const strings = {}

  strings.dbFuncName = `get${dbStrings.mainTableRootNameCaps}For${dbStrings.secondaryTableRootNameCaps}`
  strings.parameterName = `${dbStrings.secondaryTableRootNameCaps}Id`
  strings.dataColumnName = dbStrings.mainTableMainColumnName
  strings.dataColumnDescription = `${dbStrings.mainTableRootName} ${dbStrings.mainTableMainColumnName}`
  strings.sampleDbResult = ``

  return Object.assign(dbStrings, strings)

}

module.exports = stringMaker