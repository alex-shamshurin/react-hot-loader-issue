import React from 'react'
import {Route, IndexRoute} from 'react-router/es'
import Root from './modules/Root'
import NotFound from './modules/errors/404/containers/Layout'

/*
 * @param {Redux Store}
 */
export default (store) => {
  return (
    <Route>
      <Route path="/" component={Root}>
        <IndexRoute getComponent={(location, cb) => {
          require.ensure([], require => {
            cb(null, require('./modules/main-page/containers/MainPageLayout').default);
          }, 'main-page')
        }}/>
      </Route>
      <Route path='*' component={NotFound}/>
    </Route>
  );
};
