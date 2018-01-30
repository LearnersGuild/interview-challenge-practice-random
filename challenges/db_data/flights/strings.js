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
  }
}
