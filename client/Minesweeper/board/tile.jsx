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
    if(this.props.lost && tile.get('isBomb')){
      return <button>x</button>

    } else if(!tile.get('flagged') && !tile.get('revealed')){
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
    }
  },

  render(){
    return (
        <td>
         {this.renderTile()}
        </td>
      )
  }
}) 

function mapStateToProps (state) {
  return {
    lost: state.minesweeper.getIn(['game', 'lost'])
  }
}

export default connect(mapStateToProps)(Tile)
