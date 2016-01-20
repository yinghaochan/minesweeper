import { Tasks } from 'db'

export default function (taskId, setToPrivate) {
  var task = Tasks.findOne(taskId);

  // Make sure only the task owner can make a task private
  if (task.owner !== Meteor.userId()) {
    throw new Meteor.Error('not-authorized');
  }

  Tasks.update(taskId, { $set: { private: setToPrivate } });
}
