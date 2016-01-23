var React = require('react');
var Router = require('react-router');
var Reflux = require('reflux');
var HamburgMenu = require('../HamburgMenu');
var DocumentTitle = require('react-document-title');

import {History,Location} from 'react-router';
import UserAvatarBox from '../UserAvatarBox' ;

var UserActions = require('../../actions/UserActions');
var UserStore = require('../../stores/UserStore');

var _ = require('underscore');
import { makeUiButton } from '../Tools';

var UserCenterPage = React.createClass({
  mixins : [Reflux.listenTo(UserStore,'_onUserStoreChange'),History],
  getInitialState : function(){
    return {
      userInfo : {},
    }
  },
  _onUserStoreChange : function(data){
    if(!data.isLogin){
      this.history.pushState({netxPage : this.props.location.pathname},'/login_page');
    }else{
      let type = 'out';
      //得到当前用户的预约订单
      this.setState({userInfo : data})
      console.log(data);
    }
  },

  componentDidMount : function(){
    UserActions.currentUser();
  },

  render: function() {
    var style = {
      page: {
        backgroundColor: '#f2f2f2',
        textAlign: 'center',
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
        className="userCenterPage">
        <HamburgMenu />
        <DocumentTitle title="个人中心" />
        <UserAvatarBox background={true} data={this.state.userInfo}/>
        
        {makeUiButton('order_icon', '我的订单', 'user_tickets', 'react-router')}
        {makeUiButton('customer_icon', '联系客服', 'tel:+86-0371-6533-7727')}  
      </div>
    );
  }
});

module.exports = UserCenterPage;
