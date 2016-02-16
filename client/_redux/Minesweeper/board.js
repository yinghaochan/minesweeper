import Immutable from 'immutable'
import { SET_BOARD } from './types'
import { callAdjacent } from './helpers'
import { game, setTotal } from './game'

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
  nearby: 0,
  flagged: false,
})


/////////////
// ACTIONS //
/////////////

// init a blank board
export const newBoard = function () {
  const config = getConfig()
  const rows = config.get('rows') 
  const cols = config.get('cols') 

  const row = Immutable.List(Array(cols)).map(() => tile)
  return Immutable.List(Array(rows)).map(() => row)
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

    dispatch({type: SET_BOARD, payload: Immutable.fromJS(board)})
    dispatch(setTotal())
  }
}

export const initialState = Immutable.Map({
  game: game,
  config: config,
  board: newBoard(),
})
