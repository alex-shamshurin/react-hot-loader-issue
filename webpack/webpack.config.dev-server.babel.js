import path from 'path'
import webpack from 'webpack'
import webpackCommons from './webpack-commons'
import extend from 'extend'
import InlineEnviromentVariablesPlugin from 'inline-environment-variables-webpack-plugin'
//import SmartBannerPlugin from 'smart-banner-webpack-plugin'
import env from '../ENV'

const assetsPath = path.join(__dirname, '..', 'public', 'assets')

console.log('VERSION', env.VERSION)

const isServerConfig = true
const configWebpack = webpackCommons(env, isServerConfig, webpack)

module.exports = extend(true, {}, configWebpack.config, {
  name   : 'server-side rendering',
  context: path.join(__dirname, '..', 'app'),
  entry  : {
    server: ['./bootstrap.js', './server'], //babel-polyfill автоматически для node
    //vendor: ['moment', 'react']
  },
  //entry     : [
  //  'webpack/hot/signal.js',
  //  './server'
  //],
  target : 'node',
  node   : {
    __dirname : false,
    __filename: false,
  },
  output : {
    path         : assetsPath,
    filename     : 'server.js',
    publicPath   : '/assets/',
    libraryTarget: 'commonjs2'
  },
  module : configWebpack.module,
  resolve: configWebpack.resolve,
  plugins: [
    //new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.LimitChunkCountPlugin({maxChunks: 1}),
    new webpack.ProvidePlugin(configWebpack.providePlugin),
    new webpack.NormalModuleReplacementPlugin(/es6-promise$/, 'bluebird'),
    new webpack.DefinePlugin(configWebpack.definePlugin),
    new InlineEnviromentVariablesPlugin('NODE_ENV'),
    new webpack.IgnorePlugin(/vertx/),
    new webpack.BannerPlugin({banner: 'require("source-map-support").install();', raw: true, entryOnly: false}),
    new webpack.LoaderOptionsPlugin(configWebpack.loaderOptionsPlugin)
  ]
})

