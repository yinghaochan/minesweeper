import { Tasks } from 'db'

export default function (taskId) {
  var task = Tasks.findOne(taskId);
  if (task.private && task.owner !== Meteor.userId()) {
    // If the task is private, make sure only the owner can delete it
    throw new Meteor.Error('not-authorized');
  }

  Tasks.remove(taskId);
}
