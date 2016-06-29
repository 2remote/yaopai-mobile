import React from 'react';
import UserMarkLayout from './UserMarkLayout';
import { RouteTransition, presets } from 'react-router-transition'

class UserAttentionList extends React.Component{
  render() {
    return(
      <section className="attention-list">
        <UserMarkLayout />
        <RouteTransition { ...presets.slideRight } pathname="/center/mark/user_attention">
          collect
        </RouteTransition>
      </section>
    )
  }
}

export default UserAttentionList
