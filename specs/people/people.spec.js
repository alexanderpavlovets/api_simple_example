const {it} = require('../../lib/utils')
const {SwapiAPI} = require('../../lib/app')
const {expect} = require('chai')

describe('People', function(){
  const swapiApiClient = new SwapiAPI()

  it('first people test', async function() {
    const a = await swapiApiClient.getAllPeople()
    
    expect(1).to.equal(2, 'I am an error message')
  })
})
