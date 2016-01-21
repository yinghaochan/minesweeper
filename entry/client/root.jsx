import routes from 'client/Root/routes'
/*
    uses an alias called 'RootEnv/' that leads to 
    client/Root/development 
    or
    client/Root/production
 */
import Wrapper from 'RootEnv/reduxWrapper'
import storeBuilder from 'RootEnv/storeBuilder'

Meteor.startup(() => {
  
  const clientOptions = {
    wrapper: Wrapper,
    createReduxStore: storeBuilder,
  }

  const serverOptions = {
    ...clientOptions,
  }

  ReactRouterSSR.Run(routes, clientOptions, serverOptions);


})

