module.exports = {
  testEnvironment: 'node',
  testTimeout: 60000,
  testMatch: ['**/tests/**/*.test.js'],
  transform: {
    '^.+\\.js$': 'babel-jest'
  },
  reporters: [
    'default',
    ['jest-junit', { outputDirectory: 'reports', outputName: 'junit.xml' }],
    ['jest-html-reporters', {
      publicPath: 'reports',
      filename: 'report.html',
      expand: true,
      pageTitle: 'API Test Report - Carrefour',
          "openReport": true,
    }]
  ]
};

