import { REVEAL, FLAG, SET_STATUS } from './types'
import { callAdjacent } from './helpers'
import { incrResolved } from './game'

//////////////////////
// INTERNAL ACTIONS //
//////////////////////

const flagTile = function (rowNum, colNum) {
  return {type: FLAG, rowNum, colNum}
}

const revealTile = function (rowNum, colNum) {
  return (dispatch, getState) => {
    const config = getState().minesweeper.get('config')
    const tile = getState().minesweeper.getIn(['board', rowNum, colNum])

    if(!tile.get('revealed')){

      dispatch(incrResolved())
      dispatch({type: REVEAL, rowNum, colNum})

      // call this fn on all adjacent tiles if there are no nearby bombs
      if(tile.get('nearby') === 0){
        callAdjacent(rowNum, colNum, config.get('rows'), config.get('cols'), 
          (row, col) => dispatch(revealTile(row, col)))   
      }
    }
  }
}

/////////////
// ACTIONS //
/////////////

export const tileClick = function (rowNum, colNum, tile) {
  return (dispatch, getState) => {
    const board = getState().minesweeper.get('board')

    // check if the tiles correspond to the right row / col index
    if(tile.equals(board.getIn([rowNum, colNum]))){

      if(!tile.get('flagged')){
        dispatch(flagTile(rowNum, colNum))

        // increment if the flag is correct
        if(tile.get('isBomb')) {
          dispatch(incrResolved())
        }

        // Lose if you try to reveal a bomb
      } else if(tile.get('isBomb')){
        dispatch({type: SET_STATUS, status: 'lost', payload: true})
        alert('YOU LOST!!!')

        // reveal the tile if it's not a bomb
      } else {
        dispatch(revealTile(rowNum, colNum))
      }

    } else {
      throw new Error('tile select mismatch')
    }

  }
}
