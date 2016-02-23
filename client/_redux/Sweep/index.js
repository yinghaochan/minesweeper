import _ from 'lodash'

///////////
// TYPES //
///////////

const types = {
  RESET: 'RESET',
  FLAG: 'FLAG',
  REVEAL: 'REVEAL',
}


//////////
// INIT //
//////////

// init a new game
const game = {
  lost: false,
  won: false,
  cleared: 0,     // number of correctly cleared cells
  mines: 0,        
}

// set initial config
const config = {
  rows: 15,
  cols: 15,
  mineProbability: 0.15,
}

// define initial state for a tile
const tile = {
  revealed: false,
  bomb: false,
  adjacentBombs: 0,
  flagged: false,
  rowNum: null,
  colNum: null,
}


//////////////////////
// HELPER FUNCTIONS //
//////////////////////

const callAdjacentCells = (board, rowNum, colNum, cb) => {
  for (var i = 0; i < 9; i++) {

    // compute the adjacent cell indexes
    const absRow = rowNum - 1 + parseInt(i / 3, 10)
    const absCol = colNum - 1 + (i % 3)

    // compute if within bounds
    const upperBound = absRow < board.length && absCol < board[0].length
    const lowerBound = absRow > -1 && absCol > -1

    // call if not self tile and within bounds
    if (i !== 4 && upperBound && lowerBound) {
      cb(board[absRow][absCol], absRow, absCol, board)
    }
  }
  // mutates board, no return
}

// generateBoard outside reducer because random() is impure
const generateBoard = (tile, rows, cols, mineProbability) => { 

  // create matrix filled with tiles
  let board = 
  Array.from(new Array(rows), (row, rowNum) => {
    return Array.from(new Array(cols), (col, colNum) => {

      // set Bomb based on probability
      const bomb = Math.random() < mineProbability
      return Object.assign({}, tile, {bomb, rowNum, colNum})
    })
  })

  // set the nearby bomb values
  board.forEach((row, rowNum) => {
    row.forEach((col, colNum) => {

      if(col.bomb){
        callAdjacentCells(board, rowNum, colNum, (tile) => tile.adjacentBombs++)
      }
    })
  })
  
  return board
}
 

/////////////
// ACTIONS //
/////////////

export const reset = (rows, cols, mineProbability) => {
  const cfg = {
    rows: parseInt(rows, 10), 
    cols: parseInt(cols, 10), 
    mineProbability: parseFloat(mineProbability),
  }
  const board = generateBoard(tile, cfg.rows, cfg.cols, cfg.mineProbability)
  return {type: types.RESET, config: cfg, payload: board}
}

export const setFlag = (rowNum, colNum) => {
  return {type: types.FLAG, rowNum, colNum}
}

export const setReveal = (rowNum, colNum) => {
  return {type: types.REVEAL, rowNum, colNum}
}


//////////////
// REDUCERS //
//////////////

const initialState = {
  game: Object.assign({}, game),
  config: Object.assign({}, config),
  board: generateBoard(tile, config.rows, config.cols, config.mineProbability),
}

export default function (state = initialState, action) {
  // clone deeply because Object.assign is shallow
  const nextState = action.type ? _.cloneDeep(state) : state

  const countMines = (board) => {
    return board.reduce((memo, row) => {
      return memo + row.reduce((memo, tile) => {
        return memo + (tile.bomb ? 1 : 0)
      }, 0)
    }, 0)
  }
  
  const resetGame = (board) => {
    const newGame = {
      won: false,
      lost: false,
      cleared: 0,
      mines: countMines(board),
    }

    return newGame
  }

  const incrementCleared = () => {
    nextState.game.cleared++
    const numTiles = nextState.config.rows * nextState.config.rows

    // check for win
    if(nextState.game.cleared === numTiles - nextState.game.mines){
      nextState.game.won = true
    }
  }

  // recursively reveal tiles if no adjacentBombs
  const revealTiles = (target, rowNum, colNum, board) => {
    target = target || board[rowNum][colNum]
 
    if(target.bomb){
      nextState.game.lost = true
      return nextState

    } else if(!target.revealed){
      target.revealed = true
      incrementCleared()

      if(target.adjacentBombs === 0){
        callAdjacentCells(board, rowNum, colNum, revealTiles) 
      }
      
    }
  }

  switch (action.type) {

    case types.RESET:
      return {config: action.config, board: action.payload, game: resetGame(action.payload)}

    case types.FLAG:
      nextState.board[action.rowNum][action.colNum].flagged = true
      return nextState

    case types.REVEAL:
      revealTiles(null, action.rowNum, action.colNum, nextState.board)
      return nextState

    default:
      return state
  }
}
