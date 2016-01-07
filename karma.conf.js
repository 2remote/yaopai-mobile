// needed given our Webpack configuration uses ES6 and JSX
require('babel-core/register');

module.exports = function karmaConfig (config) {
  config.set({
    frameworks: [
      // Set framework to mocha
      'mocha', 'sinon'
    ],

    reporters: [
      // Set reporter to print detailed results to console
      'spec',

      // Output code coverage files
      'coverage'
    ],

    files: [
      // Needed because React.js requires bind and phantomjs does not support it
      'node_modules/phantomjs-polyfill/bind-polyfill.js',

      // Grab all files in the tests directory that contain _test.
      'tests/**/*_test.*'
    ],

    preprocessors: {
      // Convert files with webpack and load sourcemaps
      'tests/**/*_test.*': ['webpack', 'sourcemap']
    },

    browsers: [
      // Run tests using PhantomJS
      'PhantomJS'
    ],

    singleRun: true,

    // Configure code coverage reporter
    coverageReporter: {
      dir: 'build/coverage/',
      type: 'html'
    },

    // Test webpack config
    webpack: require('./webpack.config.babel'),

    // Hide webpack build information from Output
    webpackMiddleware: {
      noInfo: true
    }
  });
};
