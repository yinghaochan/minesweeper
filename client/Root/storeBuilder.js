// Setup the singleton store based on environment
import { persistState } from 'redux-devtools'
import { compose, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import reducers from 'client/_redux/reducers'
import { syncHistory } from 'redux-simple-router'


import DevTools from './reduxDevtools/devTools'


export const storeBuilder = (initialState, history) => {
  
  // sync dispatched route actions to history
  const historyMiddleware = syncHistory(history)
  let finalCreateStore
  let store
  let nextReducer

  // Implement store with redux devtools in dev environment only
  if (process.env.NODE_ENV !== 'production' && !process.env.IS_MIRROR) {
    finalCreateStore = compose(
      // Enable middleware:
      applyMiddleware(thunk, historyMiddleware),
      // Enable devtools:
      DevTools.instrument(),

      // Lets you write ?debug_session=<name> in address bar to persist debug sessions
      persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
    )(createStore);

    store = finalCreateStore(reducers, initialState)
    if (module.hot) {
      module.hot.accept('./../_redux/reducers.js', () => {
        nextReducer = require('./../_redux/reducers.js')
        store.replaceReducer(nextReducer.default)
      }
      )
    }
  } else {
    finalCreateStore = applyMiddleware(historyMiddleware, thunk)(createStore)
    store = finalCreateStore(reducers, initialState)
  }

  historyMiddleware.listenForReplays(store)
  Meteor.store = store
  return store
}

export default storeBuilder
