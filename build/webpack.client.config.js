const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const config = require('../config')

const base = require('./webpack.base.config')

const VueSSRClientPlugin = require("vue-server-renderer/client-plugin")
const HTMLPlugin = require("html-webpack-plugin")

module.exports = merge(base, {
  plugins: [
    new webpack.DefinePlugin({
      "process.env.VUE_ENV": "'client'"
    }),
    new HTMLPlugin({
      template: "index.html",
      minify: config.mode === 'production' ? {
        collapseWhitespace: true,
        removeComments: true,
        ignoreCustomComments: [/vue-ssr-outlet/]
      } : {}
    }),
    new VueSSRClientPlugin()
  ],
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    overlay: true
  },
  devtool: '#eval-source-map'
})

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'

  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
}
