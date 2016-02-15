import React from 'react'
import { connect } from 'react-redux'

const Tile = React.createClass({
  render(){
    return (
      <span>
        <button> x </button>
      </span>
      )
  }
}) 

export default connect()(Tile)
