const webpack = require('webpack');
const merge = require('webpack-merge');
const webpackCommon = require('./webpack.config.common');
const OfflinePlugin = require('offline-plugin')


module.exports = merge(webpackCommon, {
  devtool: 'none',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        unused: true,
        dead_code: true,
        warnings: false,
        screw_ie8: true
      }
    }),
    new OfflinePlugin({
      ServiceWorker: {
        navigateFallbackURL: '/',
      },
      AppCache: false,
    })
      // new webpack.optimize.OccurrenceOrderPlugin(),
      // new webpack.optimize.AggressiveMergingPlugin(),
      // // Disable due to issue with this plugin
      // // See https://github.com/webpack/webpack/issues/2644
      // // new webpack.optimize.DedupePlugin(),

  ]
});