import routes from 'client/Root/routes'
import Wrapper from 'client/Root/reduxWrapper'
import storeBuilder from 'client/Root/storeBuilder'

Meteor.startup(() => {
  // let Wrapper
  // let storeBuilder

  // // Skip loading of Wrapper with devtools in production 
  // if (process.env.NODE_ENV !== 'production' && !process.env.IS_MIRROR){
  //   Wrapper = require('client/Root/reduxWrapper').default
  //   storeBuilder = require('client/Root/storeBuilder.dev').default
  // } else {
  //   storeBuilder = require('client/Root/storeBuilder.prod').default
  //   Wrapper = Provider
  // }
  
  const clientOptions = {
    wrapper: Wrapper,
    createReduxStore: storeBuilder,
  }

  const serverOptions = {
    ...clientOptions,
  }

  ReactRouterSSR.Run(routes, clientOptions, serverOptions);


})

