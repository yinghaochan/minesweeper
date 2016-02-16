import { initialState } from './board'
import { SET_TOTAL, FLAG, REVEAL, SET_BOARD, LOSE } from './types'

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_BOARD:
      return state.set('board', action.payload)
    case FLAG:
      return state.setIn(['board', action.rowNum, action.colNum, 'flagged'], true)
    case REVEAL:
      return state.setIn(['board', action.rowNum, action.colNum, 'revealed'], true)
    case LOSE:
      return state.setIn(['game', 'lost'], true)
    case SET_TOTAL:
      return state.setIn(['game', 'total'], action.payload)
    default:
      return state
  }
}

