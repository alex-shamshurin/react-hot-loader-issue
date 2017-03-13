import React from 'react'
import {render} from 'react-dom'
import {Router, browserHistory} from 'react-router'
import App from './App'
import {AppContainer} from 'react-hot-loader'
import {syncHistoryWithStore} from 'react-router-redux'
import createRoutes from './routes'
import configureStore from 'store/configureStore'
import rootSaga from './sagas'

// Grab the state from a global injected into
// server-generated HTML
const initialState = window.__INITIAL_STATE__

const store = configureStore(initialState, browserHistory)

store.runSaga(rootSaga, store.dispatch)

const history = syncHistoryWithStore(browserHistory, store)
const routes = createRoutes(store)


/**
 * Callback function handling frontend route changes.
 */
function onUpdate() {
  if (window && window.__INITIAL_STATE__ !== null) {
    window.__INITIAL_STATE__ = null
  }
}

let initialRendering = true

export const renderClient = (rootContainer, store, routes, history, onUpdate) => {
  render(
    <AppContainer>
      {rootContainer(store, routes, history, onUpdate)}
    </AppContainer>, document.getElementById('app'), () => {
      if (initialRendering) {
        const node = document.getElementById('server-css')
        if (node) {
          node.parentNode.removeChild(node)
          initialRendering = false
        }
      }
    }
  )
}

// enable debugger
if (process.env.NODE_ENV !== 'production') {
  window.React = React
}

if (module.hot) {
  console.log("IN MODULE.HOT")
  module.hot.accept('./App.jsx', () => {
    const NextRootContainer = require('./App.jsx')
    renderClient(NextRootContainer, store, routes, history, onUpdate)
  })
}

if (!window.Intl) {
  require.ensure([
    'intl',
    'intl/locale-data/jsonp/en.js',
    'intl/locale-data/jsonp/ru.js'
  ], function (require) {
    require('intl')
    require('intl/locale-data/jsonp/en.js')
    require('intl/locale-data/jsonp/ru.js')
    renderClient(App, store, routes, history, onUpdate)
  }, 'intl')
} else {
  renderClient(App, store, routes, history, onUpdate)
}
