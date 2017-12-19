const templateData = {
  flights: {
    a: {
      dbFuncName: 'getFlightPassengers',
      parameterName: 'flightNumber',
      parameterDescription: 'flight number',
      columnName: 'name',
      dataName: 'passenger',
      sampleDbResult: 
`[ 
  { name: 'Michael Jackson' },
  { name: 'Tito Jackson' },
  { name: 'Jackie Jackson' },
  { name: 'Baby Spice' },
  { name: 'Scary Spice' } 
]`,
      endpoint: 'flight_roster',
      endpointDescription: 'flight roster',
      exampleGetData: '1147A',
      buttonName: 'Give passenger a parachute'
    },
  },
  recipes: {
    a: {
      dbFuncName: 'getRecipeIngredients',
      parameterName: 'recipeName',
      parameterDescription: 'recipe name',
      columnName: 'name',
      dataName: 'ingredient',
      sampleDbResult: 
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
      endpoint: 'recipe_list',
      endpointDescription: 'recipe ingredient list',
      exampleGetData: 'chocolate%20chip%20cookies',
      buttonName: 'Cut calories'
    },
  },
}

module.exports = templateData