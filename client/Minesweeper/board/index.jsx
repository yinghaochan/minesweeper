import React from 'react'
import { connect } from 'react-redux'
import { reset, tileClick } from 'client/_redux/Sweep'
import Tile from './tile'
import BoardHeader from './boardHeader'


const Game = React.createClass({
  propTypes: {
    board: React.PropTypes.array,
    game: React.PropTypes.object.isRequired,
    config: React.PropTypes.object.isRequired,
    reset: React.PropTypes.func.isRequired,
    tileClick: React.PropTypes.func.isRequired,
  },

  componentWillMount(){
    const cfg = this.props.config
    this.props.reset(cfg.rows, cfg.cols, cfg.mineProbability)
  },

  renderTiles(rowData){
    return rowData.map((tile, colNum) => {
      return (
        <Tile 
          tile={tile} 
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
        <tr key={rowNum}> 
          { this.renderTiles(rowData) } 
        </tr>
        )
    })
  },

  render(){
    return (
      <div className="board">
        <BoardHeader 
          game={this.props.game} 
          config={this.props.config} 
          reset={this.props.reset} 
        /> 
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
    board: state.sweep.board,
    game: state.sweep.game,
    config: state.sweep.config,
  }
}

export default connect(mapStateToProps, { reset, tileClick })(Game)
