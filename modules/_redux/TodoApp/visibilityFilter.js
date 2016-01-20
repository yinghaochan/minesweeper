/////////////
// ACTIONS //
/////////////

export const hideCompleted = (boolean) => {
  return {
    type: 'HIDE_COMPLETED',
    payload: !!boolean,
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
