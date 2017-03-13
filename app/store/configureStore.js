import { createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import createSagaMiddleware, { END } from 'redux-saga'
import rootReducer from 'reducers'
import promiseMiddleware from 'middlewares/promiseMiddleware'
import createLogger from 'redux-logger'

/*
 * @param {Object}
 * @param {History Object}
 */
export default function configureStore(initialState, history) {
  // Installs hooks that always keep react-router and redux store in sync
  const sagaMiddleware = createSagaMiddleware()
  const middleware = [sagaMiddleware, promiseMiddleware, routerMiddleware(history)]
  let store

  if (__DEVCLIENT__) {
    const DevTools = require('../modules/DevTools').default
    middleware.push(createLogger())
    store = createStore(rootReducer, initialState, compose(
      applyMiddleware(...middleware),
      DevTools.instrument()
    ))
  } else {
    store = createStore(rootReducer, initialState, compose(applyMiddleware(...middleware), f => f))
  }

  if (module.hot && __DEVCLIENT__) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('reducers', () => {
      const nextReducer = require('reducers')
      store.replaceReducer(nextReducer)
    })
  }
  
  store.runSaga = sagaMiddleware.run
  store.close = () => store.dispatch(END)
  return store
}
