import routes from 'Root/client/routes'
import ReduxWrapper from 'Root/client/reduxWrapper.jsx'
import { createHistory } from 'history'
import { storeBuilder } from '_redux/store'


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
