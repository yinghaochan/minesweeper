import React from 'react'
import { Provider } from 'react-redux'

// import store
import store from '_redux/store'
// import devtools

let showDevTools
// if (process.env.NODE_ENV !== 'production' && !process.env.IS_MIRROR) {
//   // DEV: expose store as a global var
//   window.store = store
//   showDevTools = <DevTools />
// } else {
  showDevTools = ''
// }

let wrapper = React.createClass({

  render() {
    <Provider store={store}>
      <div>
        {{ this.props.children }}
        {{ showDevTools }}
      </div>
    </Provider>
  }
})


export default wrapper
