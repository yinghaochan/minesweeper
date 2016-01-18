// Setup the singleton store based on environment
import { persistState } from 'redux-devtools'
import { compose, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import reducers from './reducers'
import { createHistory } from 'history'
import { syncHistory } from 'redux-simple-router'


import DevTools from '../../entry/client/dev/devTools.jsx'

let store

export const storeBuilder = (initialState, history) => {
  
  // sync dispatched route actions to history
  const historyMiddleware = syncHistory(history)
  let finalCreateStore

  // Implement store with redux devtools in dev environment only
  if (process.env.NODE_ENV !== 'production' && !process.env.IS_MIRROR) {
    finalCreateStore = compose(
      // Enable middleware:
      applyMiddleware(historyMiddleware, thunk),
      // Enable devtools:
      DevTools.instrument(),

      // Lets you write ?debug_session=<name> in address bar to persist debug sessions
      persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
    )(createStore);

    store = finalCreateStore(reducers, initialState)

  } else {
    finalCreateStore = applyMiddleware(historyMiddleware, thunk)(createStore)
    store = finalCreateStore(reducers, initialState)
  }

  historyMiddleware.listenForReplays(store)

  return store
}

export default store
