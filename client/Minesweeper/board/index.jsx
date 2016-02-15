import React from 'react'
import { connect } from 'react-redux'
import Tile from './tile'

const Row = (props, context) => {
  const renderCols = () => {
    return props.row.map((tile, colNum) => {
      return (<Tile 
                    data={tile} 
                    rowNum={props.rowNum} 
                    colNum={colNum} 
                    key={colNum} 
                    />) 
    })
  }
  return <div> { renderCols() } </div> 
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
    // console.log(this.props.board);
    return (
      <div>
        { this.renderRows() }   
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
