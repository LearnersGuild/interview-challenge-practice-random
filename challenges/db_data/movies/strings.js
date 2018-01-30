module.exports = {
  // cute phrases
  serverRunningPhrase: 'aaaaaaand action!',
  removeButtonText: 'Remove genre',
  removeButtonId: 'remove-genre',

  // example data
  exampleData: {
    mainTableMainColumnUrlEncoded: 'Avatar',
    mainTableJsonData:
`{
  "movieTitle": "Snakes on a Plane",
  "languageId": 1
}`,
  },

  // example results
    exampleResults: {
      manyTableMainColumn:
`[
  { name: 'Family' },
  { name: 'Fantasy' },
  { name: 'Comedy' }
]`,
    mainTableMainColumn:
`[
  { title: 'In a Better World'},
  { title: 'Babette\'s Feast'}
]`,
mainTableWithSecondary:
`[
  {'title': 'True Grit', language_name: 'English'},
  {'title': 'Psycho', language_name: 'English'},
  {'title': 'Wedding Wonderland', language_name: 'English'},
  {'title': 'Spirited Away', language_name: 'Japanese'}
]`
  }
}