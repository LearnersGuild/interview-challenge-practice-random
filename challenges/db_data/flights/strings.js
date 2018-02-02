module.exports = {
  // cute phrases
  serverRunningPhrase: 'Flying high',
  removeButtonText: 'Give passenger a parachute',
  removeButtonId: 'eject-passenger',

  // example data
  exampleData: {
    mainTableMainColumn: '1147A',
    mainTableJsonData:
    `{
      "flightNumber": "A589",
      "airlineId": 1
    }`,  
  },

  // example results
  exampleResults: {
    manyTableMainColumn:
`[ 
  { name: 'Michael Jackson' },
  { name: 'Tito Jackson' },
  { name: 'Jackie Jackson' },
  { name: 'Baby Spice' },
  { name: 'Scary Spice' } 
]`,
    mainTableMainColumn:
`[
  { number: '1147A'},
  { number: '8896'},
  { number: '8422B'},
  { number: '4'}
]`,
    mainTableWithSecondary:
`[
  { 'number': '8896', 'airline_name': 'Learners Guild Charter Flights' },
  { 'number': '7', 'airline_name': 'Busy Bee Air' },
  { 'number': '8422B', 'airline_name': 'Learners Guild Charter Flights' },
  { 'number': '232', 'airline_name': 'Fly Right Airlines' },
  { 'number': '432', 'airline_name': 'Fly Right Airlines' },
  { 'number': '9007', 'airline_name': 'Busy Bee Air' },
  { 'number': '4', 'airline_name': 'Learners Guild Charter Flights' }
]`
  }
}
