var React = require('react');
var Router = require('react-router');
var Reflux = require('reflux');
var HamburgMenu = require('../HamburgMenu');
var DocumentTitle = require('react-document-title');

import {History,Location} from 'react-router';
import UserAvatarBox from '../UserAvatarBox' ;
import BookTicketList from './BookTicketList';

var UserActions = require('../../actions/UserActions');
var UserStore = require('../../stores/UserStore');
var OrderActions = require('../../actions/OrderActions');
var OrderStore = require('../../stores/OrderStore');
var _ = require('underscore');
import { makeUiButton } from '../Tools';

var UserCenterPage = React.createClass({
  mixins : [Reflux.listenTo(UserStore,'_onUserStoreChange'),Reflux.listenTo(OrderStore,'_onOrderStoreChange'),History],
  getInitialState : function(){
    return {
      orders : [],
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
      OrderActions.list(type,null);
    }
  },
  _onOrderStoreChange : function(data){
    if(data.flag == 'list'){
      if(data.hintMessage){
        console.log(data.hintMessage);
      }else{
        var orders = _.filter(data.orders,function(order){return order.Photographer != null});
        orders = _.sortBy(orders,function(order){return order.State});
        this.setState({orders : orders});
        console.log(data);
      }
    }
    if(data.flag == 'close'){
      if(data.success == true){
        OrderActions.list('out');
      }else{
        console.log(data.hintMessage);
      }
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
