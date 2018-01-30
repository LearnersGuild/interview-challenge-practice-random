module.exports = {
  // cute phrases
  serverRunningPhrase: 'Playing ball',
  removeButtonText: 'Remove color',
  removeButtonId: 'erase-the-rainbow',
  

  // example data
  exampleData: {
    mainTableMainColumnUrlEncoded: 'Warriors',
    mainTableJsonData:
    `{
      "teamName": "Bad News Bears",
      "locationId": 1
    }`,
  },

  // example results
  exampleResults: {
    manyTableMainColumn:
`[
  { name: 'blue' },
  { name: 'gold' }
]`,
    mainTableMainColumn:
`[
  { name: 'Warriors'},
  { name: 'Raiders'},
  { name: 'Athletics'}
]`,
    mainTableWithSecondary:
`[
  {'name': 'Warriors', location_name: 'Oakland'},
  {'name': 'Giants', location_name: 'San Francisco'},
  {'name': 'Athletics', location_name: 'Oakland'},
  {'name': 'Sharks', location_name: 'San Jose'}
]
`
  }
}