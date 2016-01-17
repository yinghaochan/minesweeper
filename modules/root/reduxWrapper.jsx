import React from 'react'
import { Provider } from 'react-redux'

// import devtools
import DevTools from './dev/devTools'


let wrapper = React.createClass({

  render() {
    let showDevTools
    if (process.env.NODE_ENV !== 'production' && !process.env.IS_MIRROR) {
      showDevTools = <DevTools />
    } else {
      showDevTools = ''
    }

    return ( 
      <Provider store={this.props.store}>
        <div>
          {this.props.children}
          {showDevTools}
        </div>
      </Provider>
    )}
})

export default wrapper
