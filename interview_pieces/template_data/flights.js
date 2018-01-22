const { addCapsStrings } = require('../../utilities/capitalize')
const { readYaml } = require('../../utilities/file_utilities')

const flightDbData = readYaml('../db_data/flights/flights.yaml')

const flights = {}
flights.serverRunningPhrase = 'Flying high'
flights.removeButtonText = 'Give passenger a parachute'
flights.removeButtonId = 'eject-passenger'

flights.toCaps = {}
flights.toCaps.mainTableRootName = flightDbData.tables.main
flights.toCaps.secondaryTableRootName = flightDbData.tables.one
flights.toCaps.manyTableRootName = flightDbData.tables.many
flights.toCaps.mainTableMainColumnName = flightDbData.tables.main.columns[1].name

flights.exampleData = {}
flights.exampleData.mainTableMainColumn = '1147A'

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

const flightsWithCaps = addCapsStrings(flights)

module.exports = {
  flights: flightsWithCaps
}