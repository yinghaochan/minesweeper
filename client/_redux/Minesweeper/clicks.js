import { REVEAL, FLAG } from './types'
import { callAdjacent } from './helpers'

const flagTile = function (rowNum, colNum) {
  return {type: FLAG, rowNum, colNum}
}

const revealTile = function (rowNum, colNum) {
  return (dispatch, getState) => {
    const config = getState().minesweeper.get('config')
    const tile = getState().minesweeper.getIn(['board', rowNum, colNum])

    if(!tile.get('revealed')){

      dispatch({type: REVEAL, rowNum, colNum})
      if(tile.get('nearby') === 0){
        callAdjacent(rowNum, colNum, config.get('rows'), config.get('cols'), 
          (row, col) => dispatch(revealTile(row, col)))   
      }
    }
  }
}

export const tileClick = function (rowNum, colNum, tile) {
  return (dispatch, getState) => {
    const board = getState().minesweeper.get('board')

    if(tile.equals(board.getIn([rowNum, colNum]))){
      if(!tile.get('flagged')){
        dispatch(flagTile(rowNum, colNum))
      } else if(tile.get('isBomb')){
        console.log('game ended');
      } else {
        dispatch(revealTile(rowNum, colNum))        
      }
    } else {
      throw new Error('tile select mismatch')
    }

  }
}
