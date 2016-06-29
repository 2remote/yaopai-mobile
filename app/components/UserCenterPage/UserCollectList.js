import React from 'react';
import UserMarkLayout from './UserMarkLayout';
import { RouteTransition, presets } from 'react-router-transition'

import Reflux from 'reflux';
import ReactMixin from 'react-mixin';
import AlbumsActions from '../../actions/AlbumsActions';
import AlbumsStore from '../../stores/AlbumsStore';

class UserCollectList extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      works: [],
    }
  }

  componentWillMount() {
    // 蛋疼的传参
    // 查询当前用户已关注作品
    AlbumsActions.search(null, "", null, null, null, true);
  }

  onSearchSuccess(data) {
    console.log(data)
    this.setState({
      works: data.workList,
    })
  }

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

ReactMixin.onClass(UserCollectList, Reflux.listenTo(AlbumsStore, 'onSearchSuccess'));
export default UserCollectList
