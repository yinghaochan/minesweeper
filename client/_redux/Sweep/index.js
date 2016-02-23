///////////
// TYPES //
///////////

const types = {
  RESET_BOARD: 'RESET_BOARD',
  TILE_CLICK: 'TILE_CLICK',
  SET_CONFIG: 'SET_CONFIG',
}


//////////
// INIT //
//////////

// init a new game
export const game = {
  lost: false,
  won: false,
  detected: 0,     // number of correctly detected mines
  mines: 0,        
}

// set initial config
export const config = {
  rows: 15,
  cols: 15,
  mineProbability: 0.15,
}

// define initial state for a tile
export const tile = {
  revealed: false,
  bomb: false,
  adjacentBombs: 0,              // nearby bombs
  adjacentClear: [],             //  nearby cells with 0 adjacent bombs
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

const generateBoard = (rows, cols, mineProbability) => { 

  // create matrix filled with tiles
  let board = 
  Array.from(new Array(rows), (row, rowNum) => {
    Array.from(new Array(cols), (col, colNum) => {

      const bomb = Math.random() < mineProbability
      return Object.assign({}, tile, {bomb, rowNum, colNum, adjacentClear: []})
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

  // build the graph showing which adjacent tiles have nearby === 0
  board.forEach((row, rowNum) => {
    row.forEach((targetTile, colNum) => {

      if(targetTile.adjacentBombs === 0){
        callAdjacentCells(board, rowNum, colNum, (adjTile) => adjTile.adjacentClear.push(targetTile))
      }
    })
  })
  
  return board
}

const tileClick = (state, rowNum, colNum) => {
  
} 

const setFlag = (state, rowNum, colNum) => {
  return 
}

const setReveal = (state, rowNum, colNum) => {

}

/////////////
// ACTIONS //
/////////////

//////////////
// REDUCERS //
//////////////

export const initialState = {
  game: Object.assign({}, game),
  config: Object.assign({}, config),
  board: generateBoard(...config),
}

export default function (state = initialState, action) {
  switch (action.type) {
    default:
      return state
  }
}
