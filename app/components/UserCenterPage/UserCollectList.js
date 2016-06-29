import React from 'react';
import UserMarkLayout from './UserMarkLayout';
import { RouteTransition, presets } from 'react-router-transition'

class UserCollectList extends React.Component{
  render() {
    return(
      <section className="collect-list">
        <UserMarkLayout />
        <RouteTransition { ...presets.slideLeft } pathname="/center/mark/user_collect">
          collect
        </RouteTransition>
      </section>
    )
  }
}

export default UserCollectList
