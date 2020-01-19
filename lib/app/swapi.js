const {request} = require('../utils')
const {urls} = require('../../config')

class SwapiAPI {
  constructor (host = urls.host) {
    this.request = request(host)
  }

  /**
   * 
   * @param {object} param0 don't have time for docs
   */
  async getAllPeople({queries} = {}) {
    return this.request.get({path: 'api/people/', queries})
  }

  /**
   * 
   * @param {object} param0 don't have time for docs
   */
  async getPeopleById({id, queries}) {
    return this.request.get({path: `api/people/${id}/`, queries})
  }

  /**
   * 
   * @param {object} param0 don't have time for docs
   */
  async getAllFilms({queries} = {}) {
    return this.request.get({path: 'api/films/', queries})
  }

  /**
   * 
   * @param {object} param0 don't have time for docs
   */
  async getFilmById({id, queries}) {
    return this.request.get({path: `api/films/${id}/`, queries})
  }
}

module.exports = {
  SwapiAPI
}