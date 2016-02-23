import React from 'react'
import { connect } from 'react-redux'
import Tile from './tile'
// import Square from './square'
import BoardHeader from './boardHeader'
import { tileClick } from 'client/_redux/Minesweeper/clicks'


const Grid = React.createClass({
  renderTiles(rowData, rowNum){
    return rowData.map((tile, colNum) => {
      return (
        <Tile 
          tile={tile} 
          rowNum={rowNum} 
          colNum={colNum} 
          key={colNum}
          tileClick={this.props.tileClick}
          game={this.props.game} 
        />
      )
    })
  },

  renderRows(){
    return this.props.board.map((rowData, rowNum) => {
      return (
        <tr className="tile" key={rowNum}> 
          { this.renderTiles(rowData, rowNum) } 
        </tr>
        )
    })
  },

  render(){
    return (
      <div className="board">
        <BoardHeader setBoard={this.props.setBoard} /> 
        <table>
          <tbody> 
            { this.props.board ? this.renderRows() : '' }
          </tbody> 
        </table>  
      </div>
      )
  }
})

function mapStateToProps (state){
  return {
    board: state.minesweeper.get('board'),
    game: state.minesweeper.get('game'),
    config: state.minesweeper.get('config'),
  }
}

export default connect(mapStateToProps, {tileClick})(Grid)
