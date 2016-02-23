import React from 'react'

import style from '../css/Sweep.import.css'

const Tile = React.createClass({
  propTypes: {
    tile: React.PropTypes.object.isRequired,
    game: React.PropTypes.object.isRequired,
    setFlag: React.PropTypes.func.isRequired,
    setReveal: React.PropTypes.func.isRequired,
  },

  renderTile(){
    const { won, lost } = this.props.game
    const { flagged, revealed, bomb, adjacentBombs, rowNum, colNum } = this.props.tile
    const tileClick = this.props.tileClick.bind(this, rowNum, colNum)

    if((lost || won ) && bomb){
      return <button>X</button>

    } else if(!revealed){
      return <button onClick={tileClick}>{flagged ? '!!' : '\u00a0'}</button> 

    } else if(revealed && adjacentBombs){
      return adjacentBombs
      
    } else {
      return ''
        
    }
    
  },

  render(){
    return <td className={style.tile}>{ this.renderTile() }</td>
  }
}) 


export default Tile
