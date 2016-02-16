import { initialState } from './board'
import { FLAG, REVEAL, SET_BOARD } from './types'

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_BOARD:
      return state.set('board', action.payload)
    case FLAG:
      return state.setIn(['board', action.rowNum, action.colNum, 'flagged'], true)
    case REVEAL:
      return state.setIn(['board', action.rowNum, action.colNum, 'revealed'], true)
    default:
      return state
  }
}

