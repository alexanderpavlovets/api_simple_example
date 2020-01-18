
/**
 * Not time for docs
 */
function addStepInfoToAllure(stepData) {
  const {headers, body, response, error} = stepData
  global.allure.attachment('Request Headers', JSON.stringify(headers, null, '\t'), 'application/json')
  global.allure.attachment('Request Payload', JSON.stringify(body, null, '\t'), 'application/json')

  if(response) {
    global.allure.attachment('Response Status', JSON.stringify(response.status, null, '\t'), 'application/json')
    global.allure.attachment('Response Headers', JSON.stringify(response.headers, null, '\t'), 'application/json')
    global.allure.attachment('Response Body', JSON.stringify(response.body, null, '\t'), 'application/json')
  }

  if(error) {
    global.allure.attachment('Error message', error.message, 'application/json')
  }
}

/**
 * Not time for docs
 */
function addTestInfoToAllure(testData) {
  const {title} = testData
  const testId = title.match(/^\[(.*?)\]/)[1] // [P001] Returns 200 status code -> P001
  const testName = title.replace(`[${testId}] `, '') // [P001] Returns 200 status code -> Returns 200 status code
  global.allure.reporter.runningTest.name = `Id: ${testId}, Title: ${testName}`;

  global.allure.setDescription('Custom description');

  const severityOptions = ['blocker', 'critical', 'normal', 'minor'] // available options in allure
  global.allure.setSeverity(severityOptions[Math.floor(Math.random() * severityOptions.length)]);
  
  global.allure.addLink('Link to app', 'https://swapi.co/', 'myLink')
}

module.exports = {
  addStepInfoToAllure,
  addTestInfoToAllure
}