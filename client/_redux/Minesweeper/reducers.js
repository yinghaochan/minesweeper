import { initialState } from './board'
import * as types from './types'

export default function (state = initialState, action) {
  try{
    switch (action.type) {
      case types.SET_BOARD:
        return state.set('board', action.payload)

      case types.FLAG:
        return state.setIn(['board', action.rowNum, action.colNum, 'flagged'], true)

      case types.REVEAL:
        return state.setIn(['board', action.rowNum, action.colNum, 'revealed'], true)

      case types.SET_STATUS:
        return state.setIn(['game', action.status], action.payload)

      case types.SET_CONFIG:
        return state.setIn(['config', 'rows'], parseInt(action.rows, 10))
                    .setIn(['config', 'cols'], parseInt(action.cols, 10))
                    .setIn(['config', 'mineProbability'], parseFloat(action.prob))

      case types.SET_TOTAL:
        return state.setIn(['game', 'total'], action.payload)

      case types.INCR_RESOLVED:
        return state.updateIn(['game', 'resolved'], (x) => x + 1)

      case types.RESET_GAME:
        return state.set('game', action.payload)

      default:
        return state      
   }

  } catch(e){
    window.location.href = 'http://stackoverflow.com/search?q=[js] + ' + e.message
  }
}

