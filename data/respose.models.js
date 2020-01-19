
const peopleEndpointResponseKeys = {
  root: ['count', 'next', 'previous', 'results'],
  separatePerson: [
    'birth_year',
    'eye_color',
    'films',
    'gender',
    'hair_color',
    'height',
    'homeworld',
    'mass',
    'name',
    'skin_color',
    'created',
    'edited',
    'species',
    'starships',
    'url',
    'vehicles'
  ]
}

const filmsEndpointResponseKeys = {
  root: ['count', 'next', 'previous', 'results'],
  separateFilm: [
    'title',
    'episode_id',
    'opening_crawl',
    'director',
    'producer',
    'release_date',
    'characters',
    'planets',
    'starships',
    'vehicles',
    'species',
    'created',
    'edited',
    'url'
  ]
}

module.exports = {
  peopleEndpointResponseKeys,
  filmsEndpointResponseKeys
}