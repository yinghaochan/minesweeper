import Immutable from 'immutable'

const ADD_MINES = 'ADD_MINES'
const SET_MINE = 'SET_MINE'
const SET_BOARD = 'SET_BOARD'

// set initial config
export let config = Immutable.Map({
  rows: 20,
  cols: 15,
  mineProbability: 0.2,
})

// get dimensions from store if possible
const getConfig = function () {
  if(Meteor.store){
    return Meteor.store.getState().minesweeper.get('config')
  } else {
    return config
  }
}

const createBoard = function (rows, cols) {
  const config = getConfig()

  rows = rows || config.get('rows') 
  cols = cols || config.get('cols') 

  const square = Immutable.Map({
    revealed: false,
    isBomb: false,
    nearby: 0,
    flagged: false,
  })

  const row = Immutable.List(Array(cols)).map(() => square)

  return Immutable.List(Array(rows)).map(() => row)
}

export const setBoard = function () {
  return (dispatch, getState) => {
    const minesweeper = getState().minesweeper
    const config = getConfig()

    const tile = Immutable.Map({
      revealed: false,
      isBomb: false,
      nearby: 0,
      flagged: false,
    })

    // create matrix filled with tiles
    let board = 
    Array.from(new Array(config.get('rows')), () => 
      Array.from(new Array(config.get('cols')), () => 
        tile
        )
      )


    const incrNearby = function(rowNum, colNum) {
      for (var i = 0; i < 8; i++) {
        const absRow = rowNum - 1 + parseInt(i/3)
        const absCol = colNum - 1 + (i%3)

        if(i !== 4 && absRow > -1 && absCol > -1 && absRow < board.length && absCol < board[0].length){
          board[absRow][absCol] = board[absRow][absCol].update('nearby', (x) => x + 1)
        }
      }
    }


    for (var rowNum = 0; rowNum < config.get('rows'); rowNum++) {
      for (var colNum = 0; colNum < config.get('cols'); colNum++) {
        if(Math.random() < config.get('mineProbability')){
          board[rowNum][colNum] = board[rowNum][colNum].set('isBomb', true)
          incrNearby(rowNum, colNum)
        }
      }
    }
    dispatch({type: SET_BOARD, payload: Immutable.fromJS(board)})
  }
}

window.setBoard = setBoard

export const addMines = function () {
  return (dispatch, getState) => {

    const minesweeper = getState().minesweeper
    const mineProbability = minesweeper.getIn(['config', 'mineProbability'])

    // for (var i = 0; i < minesweeper.getIn(['config', 'rows']); i++) {
    //   for (var j = 0; j < minesweeper.getIn(['config','cols']); j++) {
    //     if(Math.random() < minesweeper.getIn(['config', 'mineProbability'])){
    //       dispatch({type: SET_MINE, row: i, col: j}) 
    //     }
    //   }
    // }

    const newBoard = minesweeper.get('board').map((row, i) => row.map((square, j) => {
      const isRevealed = square.get('revealed')
      if (Math.random() < mineProbability && !isRevealed){
        return square.set('isBomb', true)
      } else {
        return square.set('isBomb', false)
      }
    }))
    dispatch({type: ADD_MINES, payload: newBoard})
  }
}

window.addMines = addMines


//////////////
// REDUCERS //
//////////////

const initialState = Immutable.Map({
  config: config,
  board: createBoard(),
})

export default function (state = initialState, action) {
  const setMine = function(action) {
    const row = action.row
    const col = action.col
    const incrBy1 = x => x + 1

    if(!state.getIn(['board', row, col, 'revealed'])){
      return state.setIn(['board', row, col, 'isBomb'], true)
                  .updateIn(['board', row-1, col-1, 'nearby'], incrBy1)
                  .updateIn(['board', row-1, col, 'nearby'], incrBy1)
                  .updateIn(['board', row-1, col+1, 'nearby'], incrBy1)
                  .updateIn(['board', row, col-1, 'nearby'], incrBy1)
                  .updateIn(['board', row, col+1, 'nearby'], incrBy1)
                  .updateIn(['board', row+1, col-1, 'nearby'], incrBy1)
                  .updateIn(['board', row+1, col, 'nearby'], incrBy1)
                  .updateIn(['board', row+1, col+1, 'nearby'], incrBy1)
    }
  }
  switch (action.type) {
    case SET_BOARD:
    case ADD_MINES:
      return state.set('board', action.payload)
    case SET_MINE:
      return setMine(action);
    default:
      return state
  }
}

