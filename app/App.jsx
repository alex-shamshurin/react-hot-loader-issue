import {Provider} from 'react-redux';
import {Router} from 'react-router';
import WithStylesContext from './WithStylesContext';

function App(store, routes, history, onUpdate) {
  return (
    <WithStylesContext onInsertCss={styles => styles._insertCss()}>
      <Provider store={store}>
        <Router history={history} onUpdate={onUpdate}>
          {routes}
        </Router>
      </Provider>
    </WithStylesContext>
  );
}

export default App;
