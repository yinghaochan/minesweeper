import React from 'react'
import { Provider } from 'react-redux'

// import devtools
import DevTools from './dev/devTools'



let Wrapper = React.createClass({

  render() {
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

