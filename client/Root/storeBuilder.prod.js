// Setup the singleton store based on environment
import { compose, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import reducers from 'client/_redux/reducers'
import { syncHistory } from 'redux-simple-router'

export const storeBuilder = (initialState, history) => {
  
  // sync dispatched route actions to history
  let finalCreateStore
  let store
  
  // create history Middleware
  const historyMiddleware = syncHistory(history)

  // Implement store with redux devtools in dev environment only
  if (process.env.NODE_ENV !== 'production' && !process.env.IS_MIRROR) {
    throw new Error('Running prod storeBuilder under the wrong process.env')
  } else {
    finalCreateStore = applyMiddleware(historyMiddleware, thunk)(createStore)
    store = finalCreateStore(reducers, initialState)
  }

  historyMiddleware.listenForReplays(store)

  // Shortcut to access store globally
  Meteor.store = store

  return store
}

export default storeBuilder
