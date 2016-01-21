import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'

import TodoHeader from './components/TodoHeader'
import TodoItem from './components/TodoItem'

import { Tasks } from 'db'

import style from './css/TodoApp.import.css'


const TodoMain = React.createClass({

  mixins: [ReactMeteorData],

  getMeteorData() {
    const handle = Meteor.subscribe('tasks')
    let taskFilter = {}

    // don't use a ? operator here, it's not reactive (!!??)
    if (this.props.hideCompleted){
      taskFilter.checked = {$ne: true}
    }

    return {
      loadingStatus: ! handle.ready(),
      tasks: Tasks.find(taskFilter, {sort: {createdAt: -1}}).fetch(),
      incompleteCount: Tasks.find({checked: {$ne: true}}).count(),
      user: Meteor.user()
    }
  },

  renderTasks() {
    return this.data.tasks.map((task) => {
      return <TodoItem key={task._id} task={task} />
    })
  },

  render() {
    return (
        <div className={style.container}>
          <Link to="/admin">Admin</Link>
          <TodoHeader
            incompleteCount={this.data.incompleteCount}
            hideCompleted={this.props.hideCompleted}
          />
          {this.renderTasks()}
        </div>
    )
  }  
})


function mapStateToProps (state){
  return {
    hideCompleted: state.hideCompleted
  }
}

export default connect(mapStateToProps)(TodoMain)

