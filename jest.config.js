module.exports = {
  collectCoverage: true,

  collectCoverageFrom: [ 'src/*.js' ],

  coverageDirectory: 'coverage',

  testEnvironment: 'node',

  testMatch: [ '<rootDir>/tests/**/*.js' ],
};
