module.exports = {
  // cute phrases
  serverRunningPhrase: 'Baking up a storm',
  removeButtonText: 'Cut calories',
  removeButtonId: 'cut-calories',

  // example data
  exampleData: {
    mainTableMainColumnUrlEncoded: 'chocolate%20chip%20cookies',
    mainTableJsonData:
`{
  "recipeName": "Pineapple Upside-Down Cake",
  "typeId": 1
}`, 
  },

  // example results
    exampleResults: {
      manyTableMainColumn:
`[ 
  { name: 'flour' },
  { name: 'sugar' },
  { name: 'salt' },
  { name: 'butter' },
  { name: 'brown sugar' },
  { name: 'sugar' },
  { name: 'salt' },
  { name: 'eggs' },
  { name: 'vanilla extract' }
]`,
    mainTableMainColumn:
`[
  { name: 'chocolate chip cookies'},
  { name: 'peanut butter cookies'}
]`,
  mainTableWithSecondary:
`[
  {'name': 'chocolate chip cookies', language_name: 'Cookies'},
  {'name': 'pound cake', language_name: 'cake'},
  {'name': 'chocolate brownies', language_name: 'bars'},
  {'name': 'chocolate cake', language_name: 'cake'}
]`
  }
}
