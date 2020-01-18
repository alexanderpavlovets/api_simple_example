const querystring = require('querystring')
const url = require('url')

function formRequestUrl(requestUrlData) {
  let {host, path, queries} = requestUrlData
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
  // For the future. For now - always "null"
  return null
}

module.exports = {
  formRequestUrl,
  formRequestHeaders,
  formRequestBody
}