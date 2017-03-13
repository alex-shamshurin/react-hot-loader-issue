import path from 'path'
import webpack from 'webpack'
import webpackCommons from './webpack-commons'
import InlineEnviromentVariablesPlugin from 'inline-environment-variables-webpack-plugin'
import AssetsPlugin from 'assets-webpack-plugin'
import env from '../ENV'
import OptimizeJsPlugin from "optimize-js-plugin"

const assetsPath = path.join(__dirname, '..', 'public', 'assets')
const publicPath = '/assets/'

const config = () => {
  // The configuration for the client
  const browserConfig = () => {
    const isServerConfig = false
    const configWebpack = webpackCommons(env, isServerConfig, webpack)
    const isAcceptance = env.APP_MODE === "acceptance"
    return {
      name   : 'browser',
      devtool: isAcceptance ? 'source-map' : 'nosources-source-map',
      context: path.join(__dirname, '..', 'app'),
      entry  : {
        app: ['./bootstrap.js', 'babel-polyfill', './client']
      },
      output : {
        path         : assetsPath,
        filename     : `[name]-[hash]-${env.VERSION}.js`,
        chunkFilename: `[name]-[hash]-${env.VERSION}.js`,
        publicPath   : publicPath
      },
      node   : {
        fs : 'empty',
        net: 'empty',
        tls: 'empty',
      },
      module : configWebpack.module,
      resolve: configWebpack.resolve,
      plugins: [
        new webpack.LoaderOptionsPlugin(configWebpack.loaderOptionsPlugin),
        new webpack.ProvidePlugin(configWebpack.providePlugin),
        new webpack.DefinePlugin(configWebpack.definePlugin),
        new InlineEnviromentVariablesPlugin('NODE_ENV'),
        new webpack.NormalModuleReplacementPlugin(/es6-promise$/, 'bluebird'),
        //new webpack.optimize.CommonsChunkPlugin({
        //  name     : 'commons',
        //  filename : 'commons.js',
        //  minChunks: 2,
        //}),
        new webpack.optimize.UglifyJsPlugin({
          sourceMap: isAcceptance,
          compress : {
            warnings    : false,
            screw_ie8   : true,
            conditionals: true,
            unused      : true,
            comparisons : true,
            sequences   : true,
            dead_code   : true,
            evaluate    : true,
            join_vars   : true,
            if_return   : true
          },
          output   : {
            comments: false
          }
        }),
        new OptimizeJsPlugin({
          sourceMap: isAcceptance
        }),
        new AssetsPlugin({path: path.join(__dirname, '..', 'public'), prettyPrint: true})
      ],
    }
  }
  
  //Server config
  const serverConfig = () => {
    const isServerConfig = true
    const configWebpack = webpackCommons(env, isServerConfig, webpack)
    return {
      name   : 'server-side rendering',
      context: path.join(__dirname, '..', 'app'),
      entry  : {
        server: ['./bootstrap.js', 'babel-polyfill', './server']
      },
      target : 'node',
      node   : {
        __dirname : false,
        __filename: false,
      },
      output : {
        path         : assetsPath,
        filename     : 'server.js',
        publicPath   : publicPath,
        libraryTarget: 'commonjs2'
      },
      module : configWebpack.module,
      resolve: configWebpack.resolve,
      plugins: [
        new webpack.optimize.LimitChunkCountPlugin({maxChunks: 1}),
        new webpack.NormalModuleReplacementPlugin(/es6-promise$/, 'bluebird'),
        new webpack.ProvidePlugin(configWebpack.providePlugin),
        new webpack.LoaderOptionsPlugin(configWebpack.loaderOptionsPlugin),
        new webpack.optimize.UglifyJsPlugin({
          sourceMap: false,
          compress : {
            warnings    : false,
            screw_ie8   : true,
            conditionals: true,
            unused      : true,
            comparisons : true,
            sequences   : true,
            dead_code   : true,
            evaluate    : true,
            join_vars   : true,
            if_return   : true
          },
          output   : {
            comments: false
          }
        }),
         new OptimizeJsPlugin({
          sourceMap: false
        }),
        new webpack.DefinePlugin(configWebpack.definePlugin),
        new webpack.IgnorePlugin(/vertx/),
        new InlineEnviromentVariablesPlugin('NODE_ENV'),
      ],
    }
  }
  
  return [browserConfig(), serverConfig()]
}

export default config()
