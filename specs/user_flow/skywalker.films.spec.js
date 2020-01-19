const {it} = require('../../lib/utils')
const {SwapiAPI} = require('../../lib/app')
const {expect} = require('chai')

describe('Check "Luke Skywalker" filmography in /films/ endpoint', function(){
  const swapiApiClient = new SwapiAPI()

  it('[UF001] Find "Luke Skywalker" in every film he played', async function() {
    let lukeSkywalkerUrl = null
    let lukeSkywalkerFilmsIDs = null
    {
      const lukeSearchQuery = {search: 'Luke'}
      const {body} = await swapiApiClient.getAllPeople({queries: lukeSearchQuery})
      expect(body.results).to.be.an('array').that.has.length(1, 'Only 1 search result should be returned')
      const [lukeSkywalker] = body.results
      expect(lukeSkywalker.films, '"films" array should not be empty').to.be.an('array').that.is.not.empty
      lukeSkywalkerUrl = lukeSkywalker.url
      lukeSkywalkerFilmsIDs = lukeSkywalker.films.map(function(film) {
        // 'https://swapi.co/api/films/3/' -> '3'
        return film.match(/\/[\d]\/$/)[0].replace(/\//g, '')
      })
    }
    {
      for (let filmId of lukeSkywalkerFilmsIDs) {
        const {body} = await swapiApiClient.getFilmById({id: filmId})
        const charsInTheFilm = body.characters
        expect(charsInTheFilm, '"characters" array should not be empty').to.be.an('array').that.is.not.empty
        expect(charsInTheFilm).to.contain(lukeSkywalkerUrl, `Luke Skywalker's url should be presented in ${body.title} film`)
      }
    }
  })
})
