const flights = {
  common: {
    serverRunningPhrase: 'Flying high'
  },
  a: {
    dbFuncName: 'getFlightPassengers',
    parameterName: 'flightNumber',
    parameterDescription: 'flight number',
    parameterColumnName: 'flight_number',
    dataColumnName: 'name',
    dataName: 'passenger',
    mainTableRootName: 'flight',
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
    buttonName: 'Give passenger a parachute',
    p2viewTitle: "Flight Roster",
    p3viewTitleStart: 'Passengers on Flight',
    buttonId: 'eject-passenger',
    buttonText: 'Give passenger a parachute',
    listTitle: 'Passenger Names'
  },
}

const recipes = {
  common: {
    serverRunningPhrase: 'Baking up a storm'
  },
  a: {
    dbFuncName: 'getRecipeIngredients',
    parameterName: 'recipeName',
    parameterDescription: 'recipe name',
    parameterColumnName: 'name',
    dataColumnName: 'name',
    dataName: 'ingredient',
    mainTableRootName: 'recipe',
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
    endpoint: 'ingredient_list',
    endpointDescription: 'recipe ingredient list',
    exampleGetData: 'chocolate%20chip%20cookies',
    buttonName: 'Cut calories',
    p2viewTitle: 'Recipe Ingredient List',
    p3viewTitleStart: 'Ingredients for',
    buttonId: 'cut-calories',
    buttonText: 'Adjust recipe',
    listTitle: 'Recipe Ingredients'
  },
}

const movies = {
  common: {
    serverRunningPhrase: 'aaaaaaand action!'
  },
  a: {
    dbFuncName: 'getMovieGenres',
    parameterName: 'movieTitle',
    parameterDescription: 'movie title',
    parameterColumnName: 'title',
    dataColumnName: 'name',
    dataName: 'genre',
    mainTableRootName: 'movie',
    sampleDbResult:
`[
  { name: 'Family' },
  { name: 'Fantasy' },
  { name: 'Comedy' }
]
`,
    endpoint: 'movie_genres',
    endpointDescription: 'movie genres',
    exampleGetData: 'Avatar',
    buttonName: 'Remove genre',
    p2viewTitle: 'Movie Genres',
    p3viewTitleStart: 'Genres for',
    buttonId: 'remove-genre',
    buttonText: 'Remove genre',
    listTitle: 'Genres'
  },    
}

const teams = {
  common: {
    serverRunningPhrase: 'Playing ball'
  },
//   a: {
//     dbFuncName: ,
//     parameterName: ,
//     parameterDescription: ,
//     parameterColumnName: ,
//     dataColumnName: ,
//     dataName: ,
//     mainTableRootName: ,
//     sampleDbResult:
// `
// `,
//     endpoint: ,
//     endpointDescription: ,
//     exampleGetData: ,
//     buttonName: ,
//     p2viewTitle: ,
//     p3viewTitleStart: ,
//     buttonId: ,
//     buttonText: ,
//     listTitle: '
//   },    
}

module.exports = {
  flights,
  recipes,
  movies,
  teams
}