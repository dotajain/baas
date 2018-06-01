const merge = require('webpack-merge');
const webpackCommon = require('./webpack.config.common');
const webpack = require('webpack');
const path = require('path');

const port = 8080;

module.exports = merge(webpackCommon, {
  entry: {
    app: [
      'react-hot-loader/patch',
      'webpack-dev-server/client',
      path.resolve(__dirname, 'hotReload')
    ]
    
  },
  devtool: 'inline-source-map',
  devServer: {
    hot: true,
    open: true,
    port: port,
    inline: true,
    historyApiFallback: true,
    stats: 'minimal',
    publicPath: '/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  ],
  performance: { hints: false }
});