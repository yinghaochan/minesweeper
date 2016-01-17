/////////////
// ACTIONS //
/////////////

export const setVisibilityFilter = (filter) => {
  return {
    type: 'SET_VISIBILITY_FILTER',
    filter
  }
}
//////////////
// REDUCERS //
//////////////

export const visibilityFilter = (state = 'SHOW_ALL', action = {}) => {
  switch (action.type) {
    case 'SET_VISIBILITY_FILTER':
      return action.filter
    default:
      return state
  }
}
