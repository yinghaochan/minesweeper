import Immutable from 'immutable'
import { INCR_RESOLVED, SET_TOTAL, RESET_GAME, SET_STATUS } from './types'

///////////////
// GAME INIT //
///////////////

export const game = Immutable.Map({
  lost: false,
  won: false,
  resolved: 0,     // number of correctly resolved tiles
  total: 0,        // total number of tiles
})

//////////////////////
// EXTERNAL ACTIONS //
//////////////////////

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
      alert('YOU WIN!!!')
    }
    
    dispatch({type: INCR_RESOLVED})
  }
}
