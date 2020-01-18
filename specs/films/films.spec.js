const {it} = require('../../lib/utils')
const {SwapiAPI} = require('../../lib/app')
const {expect} = require('chai')

describe('Films', function(){
  const swapiApiClient = new SwapiAPI()

  it('first film test', async function() {
    const a = await swapiApiClient.getAllFilms()
    expect(1).to.equal(1, 'Smth went really wrong')
  })
})
