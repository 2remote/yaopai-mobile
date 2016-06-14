import React from 'react';
import {History,Location, Link} from 'react-router';
import Reflux from 'reflux';
import SidePage from '../UI/SidePage';
import UserAvatarBox from '../UserAvatarBox' ;
import UserActions from '../../actions/UserActions';
import UserStore from '../../stores/UserStore';
import _ from 'underscore';
import { makeIconButton } from '../Tools';

var GrapherCenterPage = React.createClass({
  mixins : [Reflux.listenTo(UserStore,'_onUserStoreChange'),History],
  getInitialState : function(){
    return {
      orders : [],
      userInfo : {}
    }
  },
  _onUserStoreChange : function(data){
    if(!data.isLogin){
      this.history.pushState({nextPage : this.props.location.pathname},'/login_page');
    }else{
      let type = 'in';
      this.setState({userInfo : data});
    }
  },

  render: function() {
    var style = {
      page: {
        backgroundColor: '#f2f2f2',
        minHeight: '100%',
        position: 'absolute',
        width: '100%'
      },
      splitLine: {
        margin: '24px 0 12px 0'
      }
    };

    return (
      <div
        style={style.page}
        className="grapherCenterPage">
        <SidePage />
        <UserAvatarBox background={true} data={this.state.userInfo}/>
        {/*makeIconButton('order_icon', '订单管理', 'grapher_tickets', 'react-router')*/}
        {makeIconButton('order_icon', '订单管理', 'center/g/order', 'react-router')}
        {makeIconButton('wallet_icon', '我的钱包', 'center/g/purse', 'react-router')}
        {makeIconButton('home_icon', '我的主页', 'grapherDetail/'+ this.state.userInfo.userId, 'react-router')}
        {makeIconButton('customer_icon', '联系客服', 'tel:+86-0371-6533-7727')}
      </div>
    );
  }
});

export {GrapherCenterPage as default};
