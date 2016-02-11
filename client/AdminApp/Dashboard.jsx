import React from 'react'
import {Messages as MessagesDB } from 'db'


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
        This page is not loaded till needed
      </div>
      )
  }
})


export default Content
