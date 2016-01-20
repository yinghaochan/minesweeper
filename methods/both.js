// import server and client methods here
import addTask from './TodoApp/addTask'
import deleteTask from './TodoApp/deleteTask'
import setChecked from './TodoApp/setChecked'
import setPrivate from './TodoApp/setPrivate'

/*
    import createShow from './createShow'
    import { updatePace, addAudience, removeAudience } from './Audience'

    Meteor.methods({
      createShow,
      updatePace,
      removeAudience,
    })

you can call it using Meteor.call('createShow')

*/


Meteor.methods({
  addTask,
  deleteTask,
  setChecked,
  setPrivate,
})
