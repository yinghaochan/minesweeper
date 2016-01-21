import { Component, PropTypes } from 'react';
import style from 'client/TodoApp/css/TodoApp.import.css';
import { connect } from 'react-redux'

import { toggleHideCompleted } from 'client/_redux/TodoApp/visibilityFilter'


const LoginButtons = BlazeToReact('loginButtons');

class TodoHeader extends Component {
  static propTypes = {
    hideCompleted: PropTypes.bool,
    incompleteCount: PropTypes.number.isRequired
  };

  handleSubmit(event) {
    // Prevent default browser form submit
    event.preventDefault();

    // Get value from form element
    var text = event.target.text.value;

    // Insert a task into the collection
    Meteor.call('addTask', text);

    // Clear form
    event.target.text.value = '';
  }

  render() {
    const { dispatch } = this.props

    let form = (
      <form className={style.newTask} onSubmit={this.handleSubmit.bind(this)}>
        <input type="text" name="text" placeholder="Type to add new tasks" />
      </form>
    )

    return (
      <header>
        <h1>
          <img src={require('../img/check.png')} alt="" />
          Todo List ({this.props.incompleteCount})
        </h1>

        <label className={style.hideCompleted}>
          <input type="checkbox" 
          checked={this.props.hideCompleted} 
          onChange={() => dispatch(toggleHideCompleted())} />
          Hide Completed Tasks
        </label>

        <LoginButtons />

        {form}
      </header>
    );
  }
}

export default connect()(TodoHeader)
