const path = require('path')
const { capitalizeFirstLetter } = require('../../../utilities/capitalize')
const { readYaml } = require('../../../utilities/file_utilities')

const flightDbData = readYaml(path.join(__dirname, 'schema.yaml'))

const flights = {}

// cute phrases
flights.serverRunningPhrase = 'Flying high'
flights.removeButtonText = 'Give passenger a parachute'
flights.removeButtonId = 'eject-passenger'

// table names and capitalized counterparts
// table names need the final 's' removed to be the "RootName"
flights.mainTableRootName = flightDbData.tables.main.tablename.slice(0, -1)
flights.secondaryTableRootName = flightDbData.tables.one.tablename.slice(0, -1)
flights.manyTableRootName = flightDbData.tables.many.tablename.slice(0, -1)
flights.mainTableMainColumnName = flightDbData.tables.main.columns[1].name
flights.manyTableMainColumnName = flightDbData.tables.many.columns[1].name

flights.mainTableRootNameCaps = capitalizeFirstLetter(flights.mainTableRootName)
flights.secondaryTableRootNameCaps = capitalizeFirstLetter(flights.secondaryTableRootName)
flights.manyTableRootNameCaps = capitalizeFirstLetter(flights.manyTableRootName)
flights.mainTableMainColumnNameCaps = capitalizeFirstLetter(flights.mainTableMainColumnName)
flights.manyTableMainColumnNameCaps = capitalizeFirstLetter(flights.manyTableMainColumnName)

// example data
flights.exampleData = {}
flights.exampleData.mainTableMainColumn = '1147A'

// example results
flights.exampleResults = {}
flights.exampleResults.manyTableMainColumn =
`[ 
  { name: 'Michael Jackson' },
  { name: 'Tito Jackson' },
  { name: 'Jackie Jackson' },
  { name: 'Baby Spice' },
  { name: 'Scary Spice' } 
]`
flights.exampleResults.mainTableMainColumn =
`{
  flight_number: '1147A',
  flight_number: '8896',
  flight_number: '8422B',
  flight_number: '4'
}`,
flights.exampleResults.mainTableRow = 
`{
  "flightNumber": "A589",
  "airlineId": 1
}`
flights.exampleResults.counts =
`{
  id: 1, count: 3,
  id: 2, count: 2,
  id: 3, count: 4
}`

module.exports = flights