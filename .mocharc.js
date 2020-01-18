module.exports = {
  diff: true,
  spec: './specs/**/*.spec.js',
  timeout: 120 * 1000,
  reporter: process.env.SPEC_REPORTER ? 'spec' : 'mocha-allure2-reporter',
}