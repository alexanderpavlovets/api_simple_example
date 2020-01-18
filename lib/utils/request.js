const fetch = require('node-fetch')
const {formRequestUrl, formRequestHeaders, formRequestBody} = require('./request.utils')

/**
 * 
 * @param {string} host - host 
 * @param {string} method - http method
 * @param {object} requestData - request data
 * @param {string} requestData.path - path to the resource 
 * @param {object} requestData.body - body of the request
 * @param {object} requestData.headers - headers of the request
 * @param {object} requestData.queries - queries of the request in format {name: value}
 */
async function fetchWrapper(host, method, requestData = {}) {
  const {path, body = null, headers = {}, queries} = requestData

  const requestUrl = formRequestUrl({host, path, queries})
  const requestHeaders = formRequestHeaders(headers)
  const requestBody = formRequestBody(body)

 const responseData = await fetch(requestUrl, {
   method,
   headers: requestHeaders,
   body: requestBody,
   timeout: 30 * 1000
  }).catch(err => {throw err})

  // Errors are returned as 'text/html', while JSON is default format according to the docs
  const responseBodyFormat = responseData.headers.get('content-type') === 'application/json' ? 'json' : 'text'

  return {
    status: responseData.status,
    headers:  responseData.headers,
    body: await responseData[responseBodyFormat]()
  }
}

function request(host) {
  return {
    get: fetchWrapper.bind(fetchWrapper, host, 'GET'),
    post: fetchWrapper.bind(fetchWrapper, host, 'POST'),
    put: fetchWrapper.bind(fetchWrapper, host, 'PUT'),
    delete: fetchWrapper.bind(fetchWrapper, host, 'DELETE')
  }
}

module.exports = {request}