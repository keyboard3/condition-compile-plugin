var path = require('path');
var webpack = require("webpack");
var ConditionCompileOptions = require('../..');
var webpackMajorVersion = require('webpack/package.json').version.split('.')[0];

module.exports = {
  context: __dirname,
  entry: './index.js',
  output: {
    path: path.join(__dirname, 'dist/webpack-' + webpackMajorVersion),
    publicPath: '',
    filename: '[name].js'
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        "RUN_ENV": JSON.stringify('development')
      }
    }),
    new ConditionCompileOptions(),
  ]
};