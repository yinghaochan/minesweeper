import routes from './routes'
import ReduxWrapper from './reduxWrapper.jsx'
import { createHistory } from 'history'
import { storeBuilder } from '_redux/store'


// Setup the singleton store based on environment
import { persistState } from 'redux-devtools'
import { compose, createStore, applyMiddleware } from 'redux'
import { syncHistory } from 'redux-simple-router'
import thunk from 'redux-thunk'

import DevTools from './dev/devTools'
import reducers from '_redux/reducers'

let store = null

Meteor.startup(() => {
  const history = createHistory()

  const clientOptions = {
    wrapper: ReduxWrapper,
    history: history,
    createReduxStore: storeBuilder,
  }

  const serverOptions = {
    ...clientOptions,
  }

  ReactRouterSSR.Run(routes, clientOptions, serverOptions);


})

window.store = store
export default store
