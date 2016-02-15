import Immutable from 'immutable'
import { config } from './'


const initialState = {
  board: Immutable.List(),
  game:  Immutable.List(),
}


export default function (state = initialState, action) {
  switch (action.type) {
    case 'HIDE_COMPLETED':
      return action.payload
    default:
      return state
  }
}

