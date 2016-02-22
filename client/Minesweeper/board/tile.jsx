import React from 'react'
import { connect } from 'react-redux'
import { tileClick } from 'client/_redux/Minesweeper/clicks'

const Tile = React.createClass({

  handleClick(){
    const {dispatch, rowNum, colNum, tile} = this.props

    // disable the grid if you've lost / won
    return (this.props.lost || this.props.won) ? null : dispatch(tileClick(rowNum, colNum, tile))
  },

  renderTile(){
    const { tile, lost } = this.props
    const flagged = tile.get('flagged')
    const revealed = tile.get('revealed')

    if(lost && tile.get('isBomb')){
      return <button>x</button>

    } else if(!flagged && !revealed){
      return <button onClick={this.handleClick}>&nbsp;</button> 

    } else if(flagged && !revealed){
      return <button onClick={this.handleClick}>!!</button>

    } else if(revealed){
      const nearBy = tile.get('nearby')

      if(nearBy) return nearBy
      
      return ''
    }
  },

  render(){
    return <td className="tile">{ this.renderTile() }</td>
  }
}) 

function mapStateToProps (state) {
  return {
    lost: state.minesweeper.getIn(['game', 'lost']),
    won: state.minesweeper.getIn(['game', 'won']),
  }
}

export default connect(mapStateToProps)(Tile)
