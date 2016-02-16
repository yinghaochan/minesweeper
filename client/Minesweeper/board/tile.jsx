import React from 'react'
import { connect } from 'react-redux'
import { tileClick } from 'client/_redux/Minesweeper/clicks'

const Tile = React.createClass({
  handleClick(){
    const {dispatch, rowNum, colNum, tile} = this.props

    return dispatch(tileClick(rowNum, colNum, tile))
  },

  renderTile(){
    const { tile } = this.props

    if(!tile.get('flagged') && !tile.get('revealed')){
      return <button onClick={this.handleClick}>&nbsp;</button> 

    } else if(tile.get('flagged') && !tile.get('revealed')){
      return <button onClick={this.handleClick}>!!</button>

    } else if(tile.get('revealed')){
      const nearBy = tile.get('nearby')
      if(nearBy){
        return nearBy
      } else {
        return " "
      }
      return tile.get('isBomb') ? 'x' : tile.get('nearby')
    }
  },

  render(){
    const {tile} = this.props
    return (
        <td>
         {this.renderTile()}
        </td>
      )
  }
}) 

export default connect()(Tile)
