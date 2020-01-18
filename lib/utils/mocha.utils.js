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

// Used for adding information about test into allure, such as ID, Description, Severity, ect.
function itCallbackDecorator(title, func) {
  return async function() {
    if(global.allure) {
      addTestInfoToAllure({title})
    }

    // For printing out time of execution. People asked for this. TODO: Delete.
    const start = new Date() 
    try {
      await func()
      console.log(`"${this.test.title}" test case has ${new Date() - start}ms duration time`)
    } catch(err) {
      console.log(`"${this.test.title}" test case has ${new Date() - start}ms duration time`)
      throw err
    }
  }
}

module.exports = {
  it: itDecorated
}
