const {it} = require('../../lib/utils')
const {SwapiAPI} = require('../../lib/app')
const {expect} = require('chai')
const {peopleEndpointResponseKeys} = require('../../data')
const chance = require('chance').Chance()

describe('Component tests for /people/id/ endpoint', function(){
  const swapiApiClient = new SwapiAPI()

  it('[P009] Response has 200 status code', async function() {
    let totalPeopleAmount = null
    {
      const {body} = await swapiApiClient.getAllPeople()
      expect(body.count, '"count" property is not presented in response').to.exist
      totalPeopleAmount = body.count
    }
    {
      const randomExistingId = chance.integer({min: 1, max: totalPeopleAmount})
      const {status} = await swapiApiClient.getPeopleById({id: randomExistingId})
      expect(status).to.equal(200, 'Response should have "200" status code')
    }
  })

  it('[P010] Response has correct structure', async function() {
    let totalPeopleAmount = null
    {
      const {body} = await swapiApiClient.getAllPeople()
      expect(body.count, '"count" property is not presented in response').to.exist
      totalPeopleAmount = body.count
    }
    {
      const randomExistingId = chance.integer({min: 1, max: totalPeopleAmount})
      const {body} = await swapiApiClient.getPeopleById({id: randomExistingId})
      expect(body, 'Response structure is not equal to expected one')
        .to.have.all.keys(peopleEndpointResponseKeys.separatePerson)
    }
  })

  it('[P011] Response has 404 status code for "0" id', async function() {
    const {status} = await swapiApiClient.getPeopleById({id: 0})
    expect(status).to.equal(404, 
      'Response should have 404 status code, when requesting non-existing person with id 0')
  })

  it('[P012] Response has 404 status code for "max allowed + 1" id', async function() {
    let totalPeopleAmount = null
    {
      const {body} = await swapiApiClient.getAllPeople()
      expect(body.count, '"count" property is not presented in response').to.exist
      totalPeopleAmount = body.count
    }
    {
      const nonExistingPeopleId = totalPeopleAmount + 1
      const {status} = await swapiApiClient.getPeopleById({id: nonExistingPeopleId})
      expect(status).to.equal(404, 
        `Response should have 404 status code, when requesting non-existing person with id ${nonExistingPeopleId}`)
    }
  })
})
