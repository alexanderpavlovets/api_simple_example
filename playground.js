
const {SwapiAPI} = require('./lib/app')

const swapiApiClient = new SwapiAPI()

swapiApiClient.getAllPeople().then(console.log)