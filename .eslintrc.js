module.exports = {
  root: true,
  parser: 'babel-eslint',
  env: {
    browser: true,
    node: true
  },
  extends: 'standard',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  rules: {},
  // Add cypress / jasmine global support
  globals: {
    afterEach: false,
    beforeEach: false,
    describe: false,
    expect: false,
    it: false,
    jasmine: false,
    pending: false,
    spyOn: false,
    waits: false,
    waitsFor: false,
    xdescribe: false,
    xit: false,
    beforeAll: false,
    afterAll: false,
    runs: false,
    cy: false,
    context: false,
    before: false,
    after: false
  }
}
