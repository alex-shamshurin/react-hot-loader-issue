import React from 'react'
import {renderToString} from 'react-dom/server'
import {createMemoryHistory, match, RouterContext} from 'react-router'
import {Provider} from 'react-redux'
import createRoutes from './routes'
import configureStore from './store/configureStore'
import header from './meta'
import PrettyError from 'pretty-error'
import waitAll from './sagas/waitAll'
import WithStylesContext from './WithStylesContext'
import fs from 'fs'
import path from 'path'

const clientConfig = {
  host: process.env.HOSTNAME || 'localhost',
  port: process.env.PORT || '3000'
}

let appEntry = "/assets/app.js"
if (process.env.NODE_ENV === 'production') {
  appEntry = JSON.parse(fs.readFileSync(path.resolve(__dirname, '..', 'webpack-assets.json'), 'utf8')).app.js
}

export default function render(req, res) {
  const history = createMemoryHistory(req.path)
  const pretty = new PrettyError()
  
  const store = configureStore({}, history)
  const routes = createRoutes(store)
  
  match({routes, location: req.url, history}, (error, redirectLocation, renderProps) => {
    if (error) {
      console.error('ROUTER ERROR:', pretty.render(error))
      res.status(500).json(error)
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {
      
      const css = []
      
      const preloaders = renderProps.components
      .filter((component) => component && component.preload)
      .map((component) => component.preload(renderProps.params, req, res))
      .reduce((result, preloader) => result.concat(preloader), [])
      
      store.runSaga(waitAll(preloaders), store.dispatch).done
      
      .then(() => {
        
        return renderToString(
          <WithStylesContext onInsertCss={styles => css.push(styles._getCss())}>
            <Provider store={store}>
              <RouterContext {...renderProps}/>
            </Provider>
          </WithStylesContext>
        )
      })
      .then(componentHTML => {
        const initialState = store.getState()
        res.status(200).send(`
          <!doctype html>
          <html ${header.htmlAttributes.toString()}>
            <head>
              ${header.title.toString()}
              ${header.meta.toString()}
              ${header.link.toString()}
               <style id="server-css">${css.join('')}</style>
            </head>
            <body>
              <div id="app">${componentHTML}</div>
              <script>window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}</script>
              <script type="text/javascript" charset="utf-8" src="${appEntry}"></script>
            </body>
          </html>
        `)
      })
      .catch(e => {
        console.log(e.stack)
      })
    } else {
      console.log('Sending 404, req.url: ', req.url)
      res.sendStatus(404)
    }
  })
}
