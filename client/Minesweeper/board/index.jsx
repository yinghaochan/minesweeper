import React from 'react'
import { connect } from 'react-redux'
import Tile from './tile'
import { setBoard } from 'client/_redux/Minesweeper/board'

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
  return <tr>{ renderCols() }</tr> 
}

// const Row = React.createClass({
//   renderCols(){
//     return this.props.row.map(col => {
//       return <span> x </span>
//     })
//   },
//   render(){
//     return (
//       <div> 
//         { this.renderCols() }
//       </div>
//       )
//   }
// })

const BoardHeader = (props, context) => {
  return (
    <div>
      <table>
        <tr>
          <td onClick={props.setBoard}>Reset Game</td>
          <td>2</td>
          <td>3</td>
        </tr>
      </table>
    </div>
    )
}

const Content = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData(){
    return {
      user: Meteor.user(),
    }
  },
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

export default connect(mapStateToProps, {setBoard})(Content)
