import Immutable from 'immutable'
import { SET_BOARD, SET_SIZE } from './types'
import { callAdjacent } from './helpers'
import { game, setTotal, resetGame } from './game'

// set initial config
let config = Immutable.Map({
  rows: 20,
  cols: 17,
  mineProbability: 0.14,
})


// get dimensions from store if possible
const getConfig = function () {
  if(Meteor.store){
    return Meteor.store.getState().minesweeper.get('config')
  } else {
    return config
  }
}

const tile = Immutable.Map({
  revealed: false,
  isBomb: false,
  nearby: 0, //nearby bombs
  flagged: false,
})


/////////////
// ACTIONS //
/////////////


export const setSize = function (rows, cols) {
  return {type: SET_SIZE, rows, cols}
}

// set / reset a board and fill with mines
export const setBoard = function () {
  return (dispatch, getState) => {
    const minesweeper = getState().minesweeper
    const config = minesweeper.get('config')

    // create matrix filled with tiles
    // immutable has no matrix support, hence regular arrays
    let board = 
    Array.from(new Array(config.get('rows')), () => 
      Array.from(new Array(config.get('cols')), () => 
        tile
        )
      )

    // fn to increment nearby bomb count
    const increment = (row, col) => {
      board[row][col] = board[row][col].update('nearby', (x) => x + 1)
    }

    // set bombs based on mineProbability 
    for (var rowNum = 0; rowNum < config.get('rows'); rowNum++) {
      for (var colNum = 0; colNum < config.get('cols'); colNum++) {
        if(Math.random() < config.get('mineProbability') && !board[rowNum][colNum].get('revealed')){
          board[rowNum][colNum] = board[rowNum][colNum].set('isBomb', true)

          callAdjacent(rowNum, colNum, config.get('rows'), config.get('cols'), increment)
        }
      }
    }

    // reset the game obj
    dispatch(resetGame())

    // add the newly created board to state
    dispatch({type: SET_BOARD, payload: Immutable.fromJS(board)})

    // set the total number of tiles in game
    dispatch(setTotal())
  }
}

export const initialState = Immutable.Map({
  game: game,
  config: config,
  board: null,
})
