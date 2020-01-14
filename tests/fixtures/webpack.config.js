const path = require('path');

module.exports = {
  mode: 'development',
  target: 'web',
  entry: {
    client: path.resolve(__dirname, './index.js'),
  },
  output: {
    filename: '[name].js',
  },
  module: {
    rules: [],
  },
};
