import path from 'path'
import poststylus from 'poststylus'
import autoprefixer from 'autoprefixer'
import postcssReporter from 'postcss-reporter'

const isWin = /^win/.test(process.platform)
let locaforageLocation

if (isWin) {
  locaforageLocation = /[\/\\]node_modules[\/\\]localforage[\/\\]dist[\/\\]localforage\.js$/
} else {
  locaforageLocation = /node_modules\/localforage\/dist\/localforage.js/
}

export default function configWebpack(env, isServerConfig, webpack) {

  const isDebug = env.APP_ENV === "development"
  const isVerbose = process.argv.includes('--verbose')

  const commonRules = [
    {
      test   : /\.js$|\.jsx$/,
      loader : 'babel-loader',
      query  : function () {
        const presets = [['latest', {es2015: {modules: false}}], 'stage-0', 'react']
        //if (env.APP_ENV !== "development") {
        //включает babel-plugin-transform-react-inline-elements при этом картинки через img не включаются в сборку
        //presets.push("react-optimize")
        //}
        const plugins = [
          "syntax-dynamic-import",
          "transform-promise-to-bluebird",
          'transform-decorators-legacy',
          "transform-object-rest-spread",
          "transform-react-jsx-img-import",
          "transform-class-properties",
          "transform-flow-strip-types"
        ]
        if (isDebug && !isServerConfig) {
          plugins.unshift("react-hot-loader/babel")
        }
        if (isDebug) {
          plugins.push('transform-react-jsx-source')
          plugins.push('transform-react-jsx-self')
        }
        if (!isDebug) {
          plugins.push('babel-plugin-transform-react-constant-elements')
          plugins.push('babel-plugin-transform-react-remove-prop-types')
          plugins.push('babel-plugin-transform-react-pure-class-to-function')
        }
        const cacheDirectory = isDebug && !isServerConfig
        return {presets: presets, plugins: plugins, cacheDirectory, babelrc: false}
      }(),
      include: path.join(__dirname, '..', 'app'),
      exclude: path.join(__dirname, '..', 'node_modules')
    },
    {test: /\.html$/, loader: 'html-loader'}
  ]
  const module = {
    rules  : commonRules.concat([
      {
        test   : /\.styl$/,
        enforce: "pre",
        loader : 'stylint-loader',
      },
      {
        test: /^((?!\.module).)*css$/,
        use : [
          'isomorphic-style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.module.css$/,
        use : [
          'style-loader',
          {
            loader : 'css-loader',
            options: {
              context        : path.join(__dirname, '..', 'app'),
              modules        : true,
              sourceMap      : true,
              localIdentName : isDebug ? '[path]-[local]___[hash:base64:5]' : '[hash:base64:5]',
              minimize       : !isDebug,
              discardComments: {removeAll: true},
            }
          }
        ],
      },
      //{
        //test: /^((?!\.module).)*scss$/,
        //use : [
          //'isomorphic-style-loader',
          //{
            //loader : 'css-loader',
            //options: {
              //importLoaders: 2,
            //}
          //},
          //{
            //loader: 'sass-loader',
            //options : {
              //includePaths: ["node_modules"]
            //}
          //},
          //{
            //loader: 'resolve-url-loader',
          //}
        //],
      //},
      {
        test: /^((?!\.module).)*styl$/,
        use : [
          'isomorphic-style-loader',
          {
            loader : 'css-loader',
            options: {
              importLoaders: 1,
            }
          },
          {
            loader: 'stylus-loader',
            query : 'paths[]=node_modules&include css'
          }
        ],
      },
      {
        test: /\.module.styl/,
        use : [
          'isomorphic-style-loader',
          {
            loader : 'css-loader',
            options: {
              context       : path.join(__dirname, '..', 'app'),
              importLoaders : 1,
              modules       : true,
              localIdentName: isDebug ? '[path]-[local]___[hash:base64:5]' : '[hash:base64:5]',
            }
          },
          {
            loader: 'stylus-loader',
            query : 'paths[]=node_modules&include css&resolve url'
          }
        ],
      },
      {
        test: /(^((?!-bg).)*png$|^((?!-bg).)*jpe?g$|^((?!-bg).)*gif$|^((?!-bg).)*svg$)$/i,
        use : [
          {
            loader : "url-loader",
            options: {
              hash  : 'sha512',
              digest: 'hex',
              name  : '[name].[ext]?[hash]',
              limit : 250000,
            }
          },
          {
            loader : "image-webpack-loader",
            options: {
              pngquant: {
                quality          : '65-90',
                speed            : 4,
                optimizationLevel: 7,
                interlaced       : false,
              },
              mozjpeg : {
                quality: 65
              }
            }
          }
        ]
      },
      {
        test   : /-bg\.(png|jpg|jpeg|gif|svg)$/i,
        loader : "url-loader",
        options: {
          hash  : 'sha512',
          digest: 'hex',
          name  : '[name].[ext]?[hash]',
          limit : 250000,
        }
      },
      {
        test   : /\.(woff2|ico)$/,
        loader : 'url-loader',
        options: {
          mimetype: 'application/font-woff',
          name    : '[name].[ext]?[hash]',
          limit   : 64000,
        }
      },
      {
        test   : /\.(woff|eot|ttf|wav|mp3|mp4)$/,
        loader : 'file-loader',
        options: {
          name: '[name].[ext]?[hash]',
        },
      },
      {
        test  : /\.(woff|eot|ttf|wav|mp3|mp4)$/,
        loader: 'file-loader',
        query : {
          name: '[name].[ext]?[hash]',
        },
      },
    ]),
    noParse: [locaforageLocation]
  }

  const resolve = {
    modules   : [
      path.join(__dirname, '..', 'app'),
      path.join(__dirname, '..', 'app', 'images'),
      path.join(__dirname, '..', 'app', 'lib'),
      path.join(__dirname, '..', 'app', 'fonts'),
      "node_modules"
    ],
    extensions: ['.js', '.jsx', '.json'],
  }

  const loaderOptionsPlugin = {
    minimize: !isDebug,
    context : __dirname,
    options : {
      stylus    : {
        use   : [
          require('jeet')(),
          require('kouto-swiss')(),
          require('bootstrap-styl')(),
          poststylus([
            autoprefixer(),
            'rucksack-css',
            postcssReporter({clearMessages: true})
          ])
        ],
        import: [
          '~jeet/stylus/jeet/index.styl',
          '~rupture/rupture/index.styl',
          path.resolve(__dirname, '..', './app/styles/stylus/variables.styl'),
          path.resolve(__dirname, '..', './app/styles/stylus/helpers/mixins.styl'),
          path.resolve(__dirname, '..', './app/styles/stylus/vendors/mixins-stylus.styl')
        ]
      },
      sassLoader: {
        includePaths: [path.resolve(__dirname, "..", "node_modules")]
      },
      context   : '/'
    }
  }

  const providePlugin = {
    'Promise'       : 'bluebird',
    'global.Promise': 'bluebird',
    'window.Promise': 'bluebird',
    React           : 'react',
    ReactDOM        : 'react-dom',
    Component       : 'exports?React.Component!react',
    PropTypes       : 'exports?React.PropTypes!react',
    Link            : 'react-router',
  }

  const definePlugin = {
    __DEVCLIENT__: env.APP_ENV === "development" && !isServerConfig,
    __DEVSERVER__: env.APP_ENV === "development" && isServerConfig,
    __SERVER__   : isServerConfig,
    __CLIENT__   : !isServerConfig,
    __VERSION__  : JSON.stringify(env.VERSION),
    __APP_MODE__ : JSON.stringify(env.APP_MODE),
  }

  const config = {
    bail : !isDebug,
    cache: isDebug,
    stats: {
      colors      : true,
      reasons     : isDebug,
      hash        : isVerbose,
      version     : isVerbose,
      timings     : true,
      chunks      : isVerbose,
      chunkModules: isVerbose,
      cached      : isVerbose,
      cachedAssets: isVerbose,
    },
  }

  return {
    resolve,
    loaderOptionsPlugin,
    module,
    providePlugin,
    definePlugin,
    config,
  }
}
