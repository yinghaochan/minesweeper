// write or import publications here
import * as DB from 'db'

// This code only runs on the server
Meteor.publish('tasks', function () {
  return DB.Tasks.find({
    $or: [
      { private: {$ne: true} },
      { owner: this.userId }
    ]
  })
})
