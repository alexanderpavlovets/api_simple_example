const querystring = require('querystring')
const url = require('url')

function formRequestUrl(requestUrlData) {
  const {host, path, queries} = requestUrlData
  if (queries) {
    queries = `?${querystring.stringify(queries)}`
    path = `${path}${queries}`
  }

  return url.resolve(host, path)
}

function formRequestHeaders(requestHeadersData) {
  // For the future. For now - always "{}"
  return requestHeadersData
}

function formRequestBody(requestBodyData) {
  // For the future. For now - always "undefined"
  return undefined
}

module.exports = {
  formRequestUrl,
  formRequestHeaders,
  formRequestBody
}