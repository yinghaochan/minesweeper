import Immutable from 'immutable'
import { SET_BOARD, SET_CONFIG } from './types'
import { callAdjacent } from './helpers'
import { game, setTotal, resetGame } from './game'

////////////////
// BOARD INIT //
////////////////

// set initial config
let config = Immutable.Map({
  rows: 20,
  cols: 17,
  mineProbability: 0.14,
})

// define state for a tile
const tile = Immutable.Map({
  revealed: false,
  isBomb: false,
  nearby: 0, //nearby bombs
  flagged: false,
})

export const initialState = Immutable.Map({
  game: game,
  config: config,
  board: null,
})


/////////////
// ACTIONS //
/////////////


export const setConfig = function (rows, cols, prob) {
  return {type: SET_CONFIG, rows, cols, prob}
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

    for (var rowNum = 0; rowNum < config.get('rows'); rowNum++) {
      for (var colNum = 0; colNum < config.get('cols'); colNum++) {

        // set Bomb based on probability
        if(Math.random() < config.get('mineProbability')){

          // set the bomb
          board[rowNum][colNum] = board[rowNum][colNum].set('isBomb', true)

          // increment the nearby count on tiles that are adjacent
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
