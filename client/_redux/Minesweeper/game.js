import Immutable from 'immutable'
import { SET_TOTAL } from './types'

export const game = Immutable.Map({
  started: false,
  lost: false,
  won: false,
  resolved: 0,
  total: 0,
})

export const setTotal = function () {
  return (dispatch, getState) => {
    const config = getState().minesweeper.get('config')
    const total = config.get('rows') * config.get('cols')

    dispatch({type: SET_TOTAL, payload: total})
  }
}


