import path from 'path'
import webpack from 'webpack'
import webpackCommons from './webpack-commons'
import extend from 'extend'
import InlineEnviromentVariablesPlugin from 'inline-environment-variables-webpack-plugin'
import env from '../ENV'

const assetsPath = path.join(__dirname, '..', 'public', 'assets')
const hotMiddlewareScript = 'webpack-hot-middleware/client?http://localhost:3000&path=/__webpack_hmr&timeout=20000&reload=true'
const isServerConfig = false
const configWebpack = webpackCommons(env, isServerConfig, webpack)

module.exports = extend(true, {}, configWebpack.config, {
  devtool: 'source-map',
  name   : 'browser',
  context: path.join(__dirname, '..', 'app'),
  entry  : {
    app: ['react-hot-loader/patch', hotMiddlewareScript, './bootstrap.js', 'babel-polyfill', './client']
  },
  output : {
    path         : assetsPath,
    filename     : '[name].js',
    chunkFilename: '[name].js',
    publicPath   : '/assets/'
  },
  node   : {
    fs : 'empty',
    net: 'empty',
    tls: 'empty',
  },
  module : configWebpack.module,
  resolve: configWebpack.resolve,
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.ProvidePlugin(configWebpack.providePlugin),
    new webpack.NormalModuleReplacementPlugin(/es6-promise$/, 'bluebird'),
    new webpack.DefinePlugin(configWebpack.definePlugin),
    new InlineEnviromentVariablesPlugin('NODE_ENV'),
    new webpack.LoaderOptionsPlugin(configWebpack.loaderOptionsPlugin)
  ],
})
