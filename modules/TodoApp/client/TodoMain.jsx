import { Component } from 'react';
import { Link } from 'react-router';
import ReactMixin from 'react-mixin';

import TodoHeader from './components/TodoHeader';
import TodoList from './components/TodoList';

import { Tasks } from '_db'
import style from './css/TodoApp.import.css'

// import redux stuff
import { connect } from 'react-redux'

@ReactMixin.decorate(ReactMeteorData)
export default class TodoMain extends Component {

  getMeteorData() {
    Meteor.subscribe('tasks');

    let taskFilter = {};

    if (this.props.hideCompleted) {
      taskFilter.checked = {$ne: true};
    }

    const tasks = Tasks.find(taskFilter, {sort: {createdAt: -1}}).fetch();
    const incompleteCount = Tasks.find({checked: {$ne: true}}).count();

    return {
      tasks,
      incompleteCount,
      user: Meteor.user()
    };
  }

  render() {
    if (!this.data.tasks) {
      // loading
      return null;
    }
    console.log(this.props.hideCompleted);

    return (
        <div className={style.container}>
          <Link to="/admin">Admin</Link>
          <TodoHeader
              incompleteCount={this.data.incompleteCount}
              hideCompleted={this.props.hideCompleted}
          />
          <TodoList tasks={this.data.tasks} />
        </div>
    );
  }
};

function mapStateToProps (state){
  return {
    hideCompleted: state.hideCompleted
  }
}

export default connect(mapStateToProps)(TodoMain)

