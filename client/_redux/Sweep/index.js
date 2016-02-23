import _ from 'lodash'

///////////
// TYPES //
///////////

const types = {
  RESET: 'RESET',
  TILE_CLICK: 'TILE_CLICK',
}


//////////
// INIT //
//////////

// init a new game
const game = {
  lost: false,
  won: false,
  cleared: 0,     
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

// run a callback on all adjacent cells
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

// count the number of mines in a board
const countMines = (board) => {
  return board.reduce((memo, row) => {
    return memo + row.reduce((memo, tile) => {
      return memo + (tile.bomb ? 1 : 0)
    }, 0)
  }, 0)
}
  

/////////////
// ACTIONS //
/////////////

export const reset = (rows, cols, mineProbability) => {
  const cfg = {rows, cols, mineProbability}
  
  const board = generateBoard(tile, rows, cols, mineProbability)
  return {type: types.RESET, config: cfg, payload: board}
}

export const tileClick = (rowNum, colNum) => {
  return {type: types.TILE_CLICK, rowNum, colNum}
}


//////////////
// REDUCERS //
//////////////

const initialState = {
  game: Object.assign({}, game),
  config: Object.assign({}, config),
  board: null,
}


export default function (state = initialState, action) {

  // clone deeply because Object.assign is shallow
  const nextState = action.type ? _.cloneDeep(state) : state


  // reset the game object
  const resetGame = (board) => {
    const newGame = {
      won: false,
      lost: false,
      cleared: 0,
      mines: countMines(board),
    }

    return newGame
  }


  // increment cleared counter and check for win
  const incrementCleared = () => {
    nextState.game.cleared++
    const numTiles = nextState.config.rows * nextState.config.rows

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


  // universal tileClick handler
  const tileClick = (rowNum, colNum) => {
    const target = nextState.board[rowNum][colNum]

    // do nothing if game has ended
    if(state.game.won || state.game.lost){
      return state
    }

    if(!target.flagged){
      target.flagged = true
    } else {
      revealTiles(null, rowNum, colNum, nextState.board)
    }
    
    return nextState
  }


  switch (action.type) {
    case types.RESET:
      return {config: action.config, board: action.payload, game: resetGame(action.payload)}

    case types.TILE_CLICK:
      return tileClick(action.rowNum, action.colNum)

    default:
      return state
  }
}
