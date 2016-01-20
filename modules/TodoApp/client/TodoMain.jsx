import { Component } from 'react';
import { Link } from 'react-router';
import ReactMixin from 'react-mixin';

import TodoHeader from './components/TodoHeader';
import TodoList from './components/TodoList';

import { Tasks } from '_db'
import style from './css/TodoApp.import.css'

// import redux stuff
import { connect } from 'react-redux'
import { toggleHideCompleted } from '_redux/TodoApp/visibilityFilter'

@ReactMixin.decorate(ReactMeteorData)
export default class TodoMain extends Component {

  state = {
    hideCompleted: false
  };

  getMeteorData() {
    Meteor.subscribe('tasks');

    let taskFilter = {};

    if (this.state.hideCompleted) {
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

  handleToggleHideCompleted = (e) => {
    this.props.dispatch(toggleHideCompleted())
  };

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
              toggleHideCompleted={this.handleToggleHideCompleted}
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

