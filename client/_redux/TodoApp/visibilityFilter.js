/////////////
// ACTIONS //
/////////////

export const hideCompleted = (boolean) => {
  return {
    type: 'HIDE_COMPLETED',
    payload: !!boolean,
  }
}

export const toggleHideCompleted = () => {
  return (dispatch, getState) => {
    const state = getState()
    dispatch(hideCompleted(!state.hideCompleted))
  }
}
//////////////
// REDUCERS //
//////////////

const initialState = false

export default function (state = initialState, action) {
  switch (action.type) {
    case 'HIDE_COMPLETED':
      return action.payload
    default:
      return state
  }
}
