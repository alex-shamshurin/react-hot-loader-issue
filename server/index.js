import express from 'express'
import webpack from 'webpack'
import expressConfig from './config/express'
import routesConfig from './config/routes'
import env from '../ENV'
const app = express()

if (process.env.NODE_ENV === 'development') {
  const webpackDevConfig = require('../webpack/webpack.config.dev-client')
  const compiler = webpack(webpackDevConfig)
  let compilerOptions = {
    noInfo    : true,
    publicPath: webpackDevConfig.output.publicPath,
  }
  
  app.use(require('webpack-dev-middleware')(compiler, compilerOptions))
  app.use(require('webpack-hot-middleware')(compiler))
}

/*
 * Bootstrap application settings
 */
expressConfig(app, env)
routesConfig(app)

app.listen(app.get('port'))

console.log('--------------------------')
console.log('===> 😊  Starting Server . . .')
console.log(`===>  Environment: ${process.env.NODE_ENV}`)
console.log(`===>  App mode: ${env.APP_MODE}`)
console.log(`===>  Listening on port: ${app.get('port')}`)
console.log(`===>  Version: ${env.VERSION}`)

if (process.env.NODE_ENV !== 'development') {
  console.log('===> 🚦  Note: In order for authentication to work in production')
  console.log('===>           you will need a secure HTTPS connection')
  // sess.cookie.secure = true; // Serve secure cookies
}
console.log('--------------------------')
