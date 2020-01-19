const {it} = require('../../lib/utils')
const {SwapiAPI} = require('../../lib/app')
const {expect} = require('chai')
const {filmsEndpointResponseKeys} = require('../../data')
const chance = require('chance').Chance()

describe('Component tests for /films/ endpoint', function(){
  const swapiApiClient = new SwapiAPI()

  it('[F001] Response has 200 status code', async function() {
    const {status} = await swapiApiClient.getAllFilms()
    expect(status).to.equal(200, 'Response should have "200" status code')
  })

  it('[F002] Response has correct structure', async function() {
    const {body} = await swapiApiClient.getAllFilms()
    expect(body, 'Response structure is not equal to expected one').to.have.all.keys(filmsEndpointResponseKeys.root)
  })

  it('[F003] Response has "results" array, with data in it', async function() {
    const {body} = await swapiApiClient.getAllFilms()
    expect(body.results, '"results" property should be not empty array').to.be.an('array').that.is.not.empty
  })

  it('[F004] Response has "count" property, with "7" value', async function() {
    const {body} = await swapiApiClient.getAllFilms()
    expect(body.count,).to.equal(7, 'Response should have "7" value in "count" property')
  })

  it('[F005] "count" property is equal to actual amount of all "results"', async function() {
    const {body} = await swapiApiClient.getAllFilms()
    const countPropertyValue = body.count
    let totalAmountOfResults = 0
    for (let i = 1; i <= Math.ceil(countPropertyValue / 10) ; i++) {
      const query = {page: i}
      const {body: {results}} = await swapiApiClient.getAllFilms({queries: query})
      totalAmountOfResults += results.length
    }
    expect(totalAmountOfResults).to.equal(countPropertyValue, '"count" property should equal to actual amount of "results"')
  })

  it('[F006] Separate film from "results" should have correct data structure', async function() {
    const {body} = await swapiApiClient.getAllFilms()
    const randomInteger = chance.integer({min: 0, max: body.results.length - 1})
    const randomPerson = body.results[randomInteger]
    expect(randomPerson, `Film's at "results[${randomInteger}]" data structure is not equal to expected one` )
      .to.have.all.keys(filmsEndpointResponseKeys.separateFilm)
  })

  it('[F007] Search functionality should return requested film', async function () {
    let randomFilm = null
    {
      const {body} = await swapiApiClient.getAllFilms()
      const randomInteger = chance.integer({min: 0, max: body.results.length - 1})
      randomFilm = body.results[randomInteger]
    }
    {
      const query = {search: randomFilm.title}
      const {body} = await swapiApiClient.getAllFilms({queries: query})
      expect(body.results, `Search with "${query}" query should return result`).to.be.an('array').that.is.not.empty
      body.results.every(function(foundFilm) {
        expect(foundFilm.title).to.equal(randomFilm.title, 'Found film should have the same title, as was requested to search')
      })
    }
  })
})
