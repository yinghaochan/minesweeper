// Setup the singleton store based on environment
import { compose, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import reducers from 'client/_redux/reducers'
import { syncHistory } from 'redux-simple-router'
import { persistState } from 'redux-devtools'
import DevTools from '../reduxDevtools/devTools'

export const storeBuilder = (initialState, history) => {
  
  // sync dispatched route actions to history
  let finalCreateStore
  let store
  let nextReducer
  
  // create history Middleware
  const historyMiddleware = syncHistory(history)

  // Implement store with redux devtools in dev environment only
  if (process.env.NODE_ENV !== 'production' && !process.env.IS_MIRROR) {
    // conditionally import devtools

    finalCreateStore = compose(
      // Enable middleware:
      applyMiddleware(thunk, historyMiddleware),
      // Enable devtools:
      DevTools.instrument(),

      // Lets you write ?debug_session=<name> in address bar to persist debug sessions
      persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
    )(createStore);

    // create store here so HMR can be implemented for reducers
    store = finalCreateStore(reducers, initialState)

    // HMR for changes to reducers
    if (module.hot) {
      module.hot.accept('client/_redux/reducers.js', () => {
        nextReducer = require('client/_redux/reducers.js')
        store.replaceReducer(nextReducer.default)
      })
    }

  } else {
    throw new Error('Running dev storeBuilder under the wrong process.env')
  }

  historyMiddleware.listenForReplays(store)

  // Shortcut to access store globally
  Meteor.store = store

  return store
}

export default storeBuilder
