import React from 'react'
import { connect } from 'react-redux'

const Tile = React.createClass({
  render(){
    return (
        <td>
          <button>
            {this.props.data.get('isBomb') ? 'x' : this.props.data.get('nearby')}
          </button>
        </td>
      )
  }
}) 

export default connect()(Tile)
