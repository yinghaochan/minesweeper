// Setup the singleton store based on environment
import { persistState } from 'redux-devtools'
import { compose, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import reducers from './reducers'
import { createHistory } from 'history'
import { syncHistory } from 'redux-simple-router'

import DevTools from '../../entry/client/devTools'

let store
let finalCreateStore

// sync dispatched route actions to history
export const history = createHistory()
const historyMiddleware = syncHistory(history)

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
} else {
  finalCreateStore = applyMiddleware(thunk)(createStore)
}

store = finalCreateStore(reducers)
historyMiddleware.listenForReplays(store)

export default store
