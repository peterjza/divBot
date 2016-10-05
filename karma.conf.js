var webpackConfig = require('./webpack.config.js');

module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: [
      'app/Board/board.spec.js',
      'app/Robot/robot.spec.js'
    ],
    preprocessors: {

      './app/Board/board.spec.js': ['webpack'],
      './app/Robot/robot.spec.js': ['webpack']
    },
    webpack: webpackConfig,
    port: 9876,
    colors: true,
    autoWatch: true,
    browsers: ['PhantomJS'],
    singleRun: false,
    concurrency: Infinity
  })
}