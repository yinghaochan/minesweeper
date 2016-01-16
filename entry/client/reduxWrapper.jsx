import React from 'react'
import { Provider } from 'react-redux'

// import devtools
import DevTools from './dev/devTools'


let wrapper = React.createClass({

  render() {
    console.log('reduxWrapper');
    console.log(this.props);
    let showDevTools
    if (process.env.NODE_ENV !== 'production' && !process.env.IS_MIRROR) {
      showDevTools = <DevTools />
    } else {
      showDevTools = ''
    }

    // var children = React.Children.map(this.props.children, function (child) {
    //   return <div> {child} </div>
    // })

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
