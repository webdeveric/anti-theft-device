module.exports = {
  collectCoverage: true,

  collectCoverageFrom: [ 'src/*.js' ],

  coverageDirectory: 'coverage',

  testEnvironment: 'node',

  setupFiles: [ '<rootDir>/tests/helpers.js' ],

  testMatch: [ '<rootDir>/tests/**/*.spec.js' ],
};
