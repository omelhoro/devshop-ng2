import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import invariant from 'redux-immutable-state-invariant';

import rootReducer from './index';
import immutable from 'immutable';

import {shoppingList} from './initState';

let initStateSaved = JSON.parse(localStorage['redux'] || '{}');


// const combinedState = immutable.fromJS({...initState, ...initStateSaved});
const combinedState = {...shoppingList, ...initStateSaved};

export default function configureStore(initialState = combinedState) {
  const store = createStore(rootReducer, initialState, compose(
    applyMiddleware(invariant(), thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  ));

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./index', () => {
      const nextReducer = require('./index');
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
