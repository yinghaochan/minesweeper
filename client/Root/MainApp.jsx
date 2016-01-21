import { createClass, Component } from 'react';
import Helmet from 'react-helmet';

/*

Global components inside Router here! 

This always renders inside the routing context, no matter the route.

 */

export default createClass({
  render() {

    return (
      <div>
        <Helmet
          meta={[
            { name: 'viewport', content: 'width=device-width, initial-scale=1' }
          ]}
        />
        {this.props.children}

      </div>
    )
  }
})
