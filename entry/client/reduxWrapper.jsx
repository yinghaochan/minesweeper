import React from 'react'
import { Provider } from 'react-redux'

// import store
import store from '_redux/store'
// import devtools
import DevTools from './devTools.jsx'

let showDevTools
if (process.env.NODE_ENV !== 'production' && !process.env.IS_MIRROR) {
  // DEV: expose store as a global var
  window.store = store
  showDevTools = <DevTools />
} else {
  showDevTools = ''
}

let wrapper = React.createClass({
  componentDidMount: function() {
     console.log(this.props)
   },

  render() {
    let { children } = this.props

    return ( 
      <Provider store={store}>
        <div>
          {children}
          {showDevTools}
        </div>
      </Provider>
    )}
})

export default wrapper
