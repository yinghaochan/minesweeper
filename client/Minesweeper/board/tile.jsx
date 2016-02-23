import React from 'react'

import style from '../css/Sweep.import.css'

const Tile = React.createClass({
  propTypes: {
    tile: React.PropTypes.object.isRequired,
    game: React.PropTypes.object.isRequired,
    setFlag: React.PropTypes.func.isRequired,
    setReveal: React.PropTypes.func.isRequired,
  },

  handleClick(){
    const {lost, won, setFlag, setReveal } = this.props
    const { flagged, rowNum, colNum } = this.props.tile

    if(!lost && !won){
      if(!flagged){
        setFlag(rowNum, colNum)
      } else{
        setReveal(rowNum, colNum)
      }
    }
  },

  renderTile(){
    const { won, lost } = this.props.game
    const { flagged, revealed, bomb, adjacentBombs } = this.props.tile

    if((lost || won ) && bomb){
      return <button>X</button>

    } else if(!flagged && !revealed){
      return <button onClick={this.handleClick}>&nbsp;</button> 

    } else if(flagged && !revealed){
      return <button onClick={this.handleClick}>!!</button>

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
