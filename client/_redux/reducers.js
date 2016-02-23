import { combineReducers } from 'redux'
import { routeReducer as routing } from 'redux-simple-router'

// import other reducers here
import hideCompleted from './TodoApp/visibilityFilter'
import minesweeper from './Minesweeper/reducers'
import sweep from './Sweep'
// You can access the store from Meteor.store (it's global)

export default combineReducers({
  routing,
  hideCompleted,
  minesweeper,
  sweep,
})


