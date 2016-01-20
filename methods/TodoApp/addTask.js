import { Tasks } from 'db'

export default function (text) {
  // Make sure the user is logged in before inserting a task
  if (! Meteor.userId()) {
    throw new Meteor.Error('not-authorized');
  }

  Tasks.insert({
    text: text,
    createdAt: new Date(),
    owner: Meteor.userId(),
    username: Meteor.user().username
  });
}
