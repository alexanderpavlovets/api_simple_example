const {request} = require('../utils')
const {urls} = require('../../config')

class SwapiAPI {
  constructor (host = urls.host) {
    this.request = request(host)
  }

  async getAllPeople() {
    return this.request.get({path: 'api/people/'})
  }

  async getPersonById(id) {
    return this.request.get({path: `api/popele/${id}/`})
  }
}

module.exports = {
  SwapiAPI
}