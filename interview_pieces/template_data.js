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
    p2viewTitle: "Flight Roster",
    p3viewTitleStart: 'Passengers on Flight',
    buttonId: 'eject-passenger',
    buttonText: 'Give passenger a parachute',
    listTitle: 'Passenger Names'
  },
  b: {
    dbFuncName: 'addFlightWithAirline',
    helperFuncName: 'getAirlineId',
    parameter1Name: 'flightNumber',
    parameter2Name: 'airlineName',
    parameter1Description: 'flight number',
    parameter2Description: 'airline name',
    parameter1ColumnName: 'flight_number',
    parameter2ColumnName: 'name',
    mainTableRootName: 'flight',
    secondaryTableRootName: 'airline',
    sampleDbResult: `{ id: 4 }`,
    postEndpoint: 'flights/add',
    examplePostData:
`{
  "flightNumber": "A589",
  "airlineName": "Learners Guild Charter Flights"
}`,
  p3dbFuncName: 'getAirlineNames',
  endpoint: 'airlines',
  p3viewTitle: 'Airlines'
  
  }
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
    p2viewTitle: 'Recipe Ingredient List',
    p3viewTitleStart: 'Ingredients for',
    buttonId: 'cut-calories',
    buttonText: 'Cut calories',
    listTitle: 'Recipe Ingredients'
  },
  b: {
    dbFuncName: 'addRecipeWithType',
    parameter1Name: 'recipeName',
    parameter2Name: 'typeName',
    parameter1Description: 'recipe name',
    parameter2Description: 'type name',
    mainTableRootName: 'recipe',
    sampleDbResult: `{ id: 4 }`,
  }
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
    p2viewTitle: 'Movie Genres',
    p3viewTitleStart: 'Genres for',
    buttonId: 'remove-genre',
    buttonText: 'Remove genre',
    listTitle: 'Genres'
  },
  b: {
    dbFuncName: 'addMovieWithLanguage',
    parameter1Name: 'movieTitle',
    parameter2Name: 'languageName',
    parameter1Description: 'movie title',
    parameter2Description: 'language name',
    mainTableRootName: 'movie',
    sampleDbResult: `{ id: 4 }`,
  }
}

const teams = {
  common: {
    serverRunningPhrase: 'Playing ball'
  },
  a: {
    dbFuncName: 'getTeamColors',
    parameterName: 'teamName',
    parameterDescription: 'team name',
    parameterColumnName: 'name',
    dataColumnName: 'name',
    dataName: 'color',
    mainTableRootName: 'team',
    sampleDbResult:
`
  { name: 'blue' },
  { name: 'gold' }
`,
    endpoint: 'team_colors',
    endpointDescription: 'team colors',
    exampleGetData: 'Warriors',
    p2viewTitle: 'Team Colors',
    p3viewTitleStart: 'Colors for the',
    buttonId: 'erase-the-rainbow',
    buttonText: 'Remove color',
    listTitle: 'Colors'
  },
  b: {
    dbFuncName: 'addTeamWithLocation',
    parameter1Name: 'teamName',
    parameter2Name: 'locationName',
    parameter1Description: 'team name',
    parameter2Description: 'location name',
    mainTableRootName: 'team',
    sampleDbResult: `{ id: 4 }`,
  }
}

module.exports = {
  flights,
  recipes,
  movies,
  teams
}