import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import path from 'path'
import flash from 'express-flash'
import compression from 'compression'
import methodOverride from 'method-override'
import cors from 'cors'

export default (app, env) => {
  app.set('port', (process.env.PORT || 3000))
  
  // disable `X-Powered-By` HTTP header
  app.disable('x-powered-by')
  app.use(compression())
  //cors enable
  app.use(cors())
  
  app.set('trust proxy', 'loopback')
  
  app.use(cookieParser())
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({extended: true}))  // for parsing application/x-www-form-urlencoded
  app.use(methodOverride())
  app.use(express.static(path.join(__dirname, '../..', 'public')))
  app.use(express.static(path.join(__dirname, '../..', 'public', 'assets')))
  app.use(express.static(path.join(__dirname, '../..', 'app', 'static')))
  
  app.use(flash())
}
