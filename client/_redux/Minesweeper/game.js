import Immutable from 'immutable'
import { INCR_RESOLVED, SET_TOTAL, RESET_GAME, SET_STATUS } from './types'

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

export const resetGame = function () {
  return {type: RESET_GAME, payload: game}
}

export const incrResolved = function () {
  return (dispatch, getState) => {
    const game = getState().minesweeper.get('game')

    if(game.get('resolved') + 1 === game.get('total')){
      dispatch({type: SET_STATUS, status: 'won', payload: true})
    }
    
    dispatch({type: INCR_RESOLVED})
  }
}
