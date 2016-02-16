import React from 'react'
import { connect } from 'react-redux'
import Tile from './tile'
import BoardHeader from './boardHeader'

const Row = (props, context) => {
  const renderCols = () => {
    return props.row.map((tile, colNum) => {
      return (
        <Tile
          tile={tile} 
          rowNum={props.rowNum} 
          key={colNum}
          colNum={colNum} 
        /> 
      )
    })
  }
  return <tr className="tile">{ renderCols() }</tr> 
}


const Content = React.createClass({
  renderRows(){
    return this.props.board.map((cols, rowNum) => {
      return <Row row={cols} rowNum={rowNum} key={rowNum}/> 
    })
  },
  render(){
    return (
      <div className="board">
        <BoardHeader setBoard={this.props.setBoard}/> 
        <table>
          <tbody> 
            { this.renderRows() }
          </tbody> 
        </table>  
      </div>
      )
  }
})

function mapStateToProps (state){
  return {
    board: state.minesweeper.get('board'),
  }
}

export default connect(mapStateToProps)(Content)
