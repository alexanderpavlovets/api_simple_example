const {it} = require('../../lib/utils')
const {SwapiAPI} = require('../../lib/app')
const {expect} = require('chai')
const {peopleEndpointResponseKeys} = require('../../data')
const chance = require('chance').Chance()

describe('Component tests for /people/ endpoint', function(){
  const swapiApiClient = new SwapiAPI()

  it('[P001] Response has 200 status code', async function() {
    const {status} = await swapiApiClient.getAllPeople()
    expect(status).to.equal(200, 'Response should have "200" status code')
  })

  it('[P002] Response has correct structure', async function() {
    const {body} = await swapiApiClient.getAllPeople()
    expect(body, 'Response structure is not equal to expected one').to.have.all.keys(peopleEndpointResponseKeys.root)
  })

  it('[P003] Response has "results" array, with data in it', async function() {
    const {body} = await swapiApiClient.getAllPeople()
    expect(body.results, '"results" property should be not empty array').to.be.an('array').that.is.not.empty
  })

  it('[P004] Response has "count" property, with "87" value', async function() {
    const {body} = await swapiApiClient.getAllPeople()
    expect(body.count,).to.equal(87, 'Response should have "87" value in "count" property')
  })

  it('[P005] Response should have 10 results per page', async function() {
    const {body} = await swapiApiClient.getAllPeople()
    expect(body.count).to.be.greaterThan(10, 'There are less than 10 people. Impossible to make a test.')
    expect(body.results.length).to.equal(10, 'Response should have 10 results on one page')
  })

  it('[P006] "count" property is equal to actual amount of all "results"', async function() {
    const {body} = await swapiApiClient.getAllPeople()
    const countPropertyValue = body.count
    let totalAmountOfResults = 0
    for (let i = 1; i <= Math.ceil(countPropertyValue / 10) ; i++) {
      const query = {page: i}
      const {body: {results}} = await swapiApiClient.getAllPeople({queries: query})
      totalAmountOfResults += results.length
    }
    expect(totalAmountOfResults).to.equal(countPropertyValue, '"count" property should equal to actual amount of "results"')
  })

  it('[P007] Separate person from "results" should have correct data structure', async function() {
    const {body} = await swapiApiClient.getAllPeople()
    const randomInteger = chance.integer({min: 0, max: body.results.length - 1})
    const randomPerson = body.results[randomInteger]
    expect(randomPerson, `Person's at "results[${randomInteger}]" data structure is not equal to expected one` )
      .to.have.all.keys(peopleEndpointResponseKeys.separatePerson)
  })

  it('[P008] Search functionality should return requested person', async function () {
    let randomPerson = null
    {
      const {body} = await swapiApiClient.getAllPeople()
      const randomInteger = chance.integer({min: 0, max: body.results.length - 1})
      randomPerson = body.results[randomInteger]
    }
    {
      const query = {search: randomPerson.name}
      const {body} = await swapiApiClient.getAllPeople({queries: query})
      expect(body.results, `Search with "${query}" query should return result`).to.be.an('array').that.is.not.empty
      body.results.every(function(foundPerson) {
        expect(foundPerson.name).to.equal(randomPerson.name, 'Found person should have the same name, as was requested to search')
      })
    }
  })
})
