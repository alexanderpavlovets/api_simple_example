const {addTestInfoToAllure} = require('./allure.utils')

const itDecorated = function(title, func) {
  it(title, itCallbackDecorator(title, func))
}

itDecorated.only = function(title, func) {
  it.only(title, itCallbackDecorator(title, func))
}

itDecorated.skip = function(title, func) {
  it.skip(title, itCallbackDecorator(title, func))
}

// Used for adding information about test, such as ID, Description, Severity, ect.
function itCallbackDecorator(title, func) {
  return async function() {
    if(global.allure) {
      addTestInfoToAllure({title})
    }

    try {
      await func()
    } catch(err) {
      throw err
    }
  }
}

module.exports = {
  it: itDecorated
}
