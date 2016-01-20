import routes from 'client/Root/routes'
import ReduxWrapper from 'client/Root/reduxWrapper.jsx'
import { createHistory } from 'history'
import storeBuilder from 'client/Root/storeBuilder'



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

