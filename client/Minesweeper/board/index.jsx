import React from 'react'


const Content = React.createClass({
  mixins:[ReactMeteorData],
  getMeteorData(){
    return{
      user:Meteor.user(),
    }
  },
  render(){
    return (
      <div>
        Board component
      </div>
      )
  }
})


export default Content
