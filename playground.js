
const {SwapiAPI} = require('./lib/app')

const swapiApiClient = new SwapiAPI()

// swapiApiClient.getAllPeople().then(console.log)
// swapiApiClient.getAllFilms().then(console.log)
// swapiApiClient.getPersonById({id: 1}).then(console.log)
// swapiApiClient.getFilmById({id: 1}).then(console.log)

swapiApiClient.getAllPeople({queries: {search: 'r2'}}).then(console.log)