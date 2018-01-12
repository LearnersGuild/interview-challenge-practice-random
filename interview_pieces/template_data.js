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
    parameter1Name: 'flightNumber',
    parameter2Name: 'airlineId',
    parameter1Description: 'flight number',
    parameter2Description: 'airline id',
    parameter1ColumnName: 'flight_number',
    mainTableRootName: 'flight',
    secondaryTableRootName: 'airline',
    sampleDbResult: `{ id: 4 }`,
    postEndpoint: 'flights/add',
    examplePostData:
`{
  "flightNumber": "A589",
  "airlineId": 1
}`,
  p3dbFuncName: 'getAirlineNames',
  p3columnName: 'name',
  endpoint: 'airlines',
  p3itemDescription: 'airline',
  p3viewTitle: 'Airlines',
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
    parameter2Name: 'typeId',
    parameter1Description: 'recipe name',
    parameter2Description: 'type id',
    parameter1ColumnName: 'name',
    mainTableRootName: 'recipe',
    secondaryTableRootName: 'type',
    sampleDbResult: `{ id: 4 }`,
    postEndpoint: 'recipes/add',
    examplePostData:
`{
  "recipeName": "Pineapple Upside-Down Cake",
  "typeId": 1
}`,
    p3dbFuncName: 'getRecipeTypes',
    p3columnName: 'name',
    endpoint: 'recipe_types',
    p3itemDescription: 'recipe type',
    p3viewTitle: 'Recipe Types'
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
    p2viewTitle: 'Movie Genres',
    p3viewTitleStart: 'Genres for',
    buttonId: 'remove-genre',
    buttonText: 'Remove genre',
    listTitle: 'Genres'
  },
  b: {
    dbFuncName: 'addMovieWithLanguage',
    parameter1Name: 'movieTitle',
    parameter2Name: 'languageId',
    parameter1Description: 'movie title',
    parameter2Description: 'language id',
    parameter1ColumnName: 'title',
    mainTableRootName: 'movie',
    secondaryTableRootName: 'language',
    sampleDbResult: `{ id: 4 }`,
    postEndpoint: 'movies/add',
    examplePostData:
`{
  "movieTitle": "Snakes on a Plane",
  "languageId": 1
}`,
    p3dbFuncName: 'getLanguageNames',
    p3columnName: 'name',
    endpoint: 'languages',
    p3itemDescription: 'movie language',
    p3viewTitle: 'Movie Languages'
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
    parameter2Name: 'locationId',
    parameter1Description: 'team name',
    parameter2Description: 'location id',
    parameter1ColumnName: 'name',
    mainTableRootName: 'team',
    secondaryTableRootName: 'location',
    sampleDbResult: `{ id: 4 }`,
    postEndpoint: 'teams/add',
    examplePostData:
`{
  "teamName": "Bad News Bears",
  "locationId": 1
}`,
    p3dbFuncName: 'getLocationNames',
    p3columnName: 'name',
    endpoint: 'locations',
    p3itemDescription: 'team location',
    p3viewTitle: 'Team Locations'
  }
}

module.exports = {
  flights,
  recipes,
  movies,
  teams
}