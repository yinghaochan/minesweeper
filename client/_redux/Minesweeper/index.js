import Immutable from 'immutable'

const ADD_MINES = 'ADD_MINES'
const SET_MINE = 'SET_MINE'

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
    if(!state.getIn(['board',row,col,'revealed'])){
      return state.setIn(['board',row,col,'isBomb'], true)
                  // .updateIn(['board',row-1,col-1,'nearby'], x => x + 1)
                  // .updateIn(['board',row-1,col,'nearby'], x => x + 1)
                  // .updateIn(['board',row-1,col+1,'nearby'], x => x + 1)
                  // .updateIn(['board',row,col-1,'nearby'], x => x + 1)
                  // .updateIn(['board',row,col+1,'nearby'], x => x + 1)
                  // .updateIn(['board',row+1,col-1,'nearby'], x => x + 1)
                  // .updateIn(['board',row+1,col,'nearby'], x => x + 1)
                  // .updateIn(['board',row+1,col+1,'nearby'], x => x + 1)
    }
  }
  switch (action.type) {
    case ADD_MINES:
      return state.set('board', action.payload)
    case SET_MINE:
      return setMine(action);
    default:
      return state
  }
}

