import React from 'react'
import { Provider } from 'react-redux'

// import devtools
import DevTools from '../reduxDevtools/devTools.jsx'

/*

This wraps the entire React app to place the store as a root component, and renders the devtools is dev mode 

 */

let Wrapper = React.createClass({

  render() {
    // in dev mode, pres ctrl+h to load redux devtools
    const showDevTools = process.env.NODE_ENV !== 'production' && !process.env.IS_MIRROR
     
    return ( 
      <Provider store={this.props.store}>
        <div>
          {this.props.children}
          {showDevTools ? <DevTools /> : ''}
        </div>
      </Provider>
    )}
})

export default Wrapper


