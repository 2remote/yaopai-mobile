import React from 'react'
import Router from 'react-router'
import Reflux from 'reflux'
import SidePage from '../UI/SidePage'
import DocumentTitle from 'react-document-title'

import {History,Location} from 'react-router'
import UserAvatarBox from '../common/UserAvatarBox' 

import UserActions from '../../actions/UserActions'
import UserStore from '../../stores/UserStore'

import _ from 'underscore'
import { makeIconButton } from '../Tools'

var UserCenterPage = React.createClass({
  mixins : [Reflux.listenTo(UserStore,'_onUserStoreChange'),History],
  getInitialState : function(){
    return {
      userInfo : {}
    }
  },
  _onUserStoreChange : function(data){
    if(!data.isLogin){
      this.history.pushState({nextPage : this.props.location.pathname},'/login_page')
    }else{
      let type = 'out'
      //得到当前用户的预约订单
      this.setState({userInfo : data})
      if(data.userType == 1) {
        this.history.replaceState(null,'/center/g')
      }
    }
  },

  componentDidMount : function(){
    UserActions.currentUser()
  },

  render: function() {
    var style = {
      page: {
        backgroundColor: '#f2f2f2',
        minHeight: '100%',
        position: 'absolute',
        width: '100%'
      },
    }

    return (
      <div
        style={style.page}
        className="userCenterPage">
        <SidePage />
        <DocumentTitle title="个人中心" />
        <UserAvatarBox background={true} data={this.state.userInfo}/>

        {makeIconButton('order_icon', '我的订单', 'center/u/order', 'react-router')}
        {makeIconButton('mark', '收藏/关注', 'center/mark', 'react-router')}
        {makeIconButton('customer_icon', '联系客服', 'tel:+86-0371-6533-7727')}
      </div>
    )
  }
})

export {UserCenterPage as default}
