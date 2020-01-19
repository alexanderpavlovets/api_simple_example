const {it} = require('../../lib/utils')
const {SwapiAPI} = require('../../lib/app')
const {expect} = require('chai')
const {filmsEndpointResponseKeys} = require('../../data')
const chance = require('chance').Chance()

describe('Component tests for /films/id/ endpoint', function(){
  const swapiApiClient = new SwapiAPI()

  it('[F008] Response has 200 status code', async function() {
    let totalFilmsAmount = null
    {
      const {body} = await swapiApiClient.getAllFilms()
      expect(body.count, '"count" property is not presented in response').to.exist
      totalFilmsAmount = body.count
    }
    {
      const randomExistingId = chance.integer({min: 1, max: totalFilmsAmount})
      const {status} = await swapiApiClient.getFilmById({id: randomExistingId})
      expect(status).to.equal(200, 'Response should have "200" status code')
    }
  })

  it('[F009] Response has correct structure', async function() {
    let totalFilmsAmount = null
    {
      const {body} = await swapiApiClient.getAllFilms()
      expect(body.count, '"count" property is not presented in response').to.exist
      totalFilmsAmount = body.count
    }
    {
      const randomExistingId = chance.integer({min: 1, max: totalFilmsAmount})
      const {body} = await swapiApiClient.getFilmById({id: randomExistingId})
      expect(body, 'Response structure is not equal to expected one')
        .to.have.all.keys(filmsEndpointResponseKeys.separateFilm)
    }
  })

  it('[F010] Response has 404 status code for "0" id', async function() {
    const {status} = await swapiApiClient.getFilmById({id: 0})
    expect(status).to.equal(404, 
      'Response should have 404 status code, when requesting non-existing film with "0" id')
  })

  it('[F011] Response has 404 status code for "max allowed + 1" id', async function() {
    let totalFilmsAmount = null
    {
      const {body} = await swapiApiClient.getAllFilms()
      expect(body.count, '"count" property is not presented in response').to.exist
      totalFilmsAmount = body.count
    }
    {
      const nonExisitingFilmId = totalFilmsAmount + 1
      const {status} = await swapiApiClient.getFilmById({id: nonExisitingFilmId})
      expect(status).to.equal(404, 
        `Response should have 404 status code, when requesting non-existing film with id ${nonExisitingFilmId}`)
    }
  })
})
