import React from 'react';
import Router from 'react-router';
import Reflux from 'reflux';
import HamburgMenu from '../HamburgMenu';
import DocumentTitle from 'react-document-title';

import {History,Location} from 'react-router';
import UserAvatarBox from '../UserAvatarBox' ;
import BookTicketList from './BookTicketList';

import UserActions from '../../actions/UserActions';
import UserStore from '../../stores/UserStore';
import OrderActions from '../../actions/OrderActions';
import OrderStore from '../../stores/OrderStore';
import _ from 'underscore';

var UserCenterPage = React.createClass({
  mixins : [Reflux.listenTo(UserStore,'_onUserStoreChange'),Reflux.listenTo(OrderStore,'_onOrderStoreChange'),History],
  getInitialState : function(){
    return {
      orders : [],
      userInfo : {}
    }
  },
  _onUserStoreChange : function(data){
    if(!data.isLogin){
      this.history.pushState({netxPage : this.props.location.pathname},'/login_page');
    }else{
      let type = 'out';
      //得到当前用户的预约订单
      this.setState({userInfo : data});
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

        <div 
          style={style.splitLine}
          ref="myBookTicketsLabel">
          <img 
            src="imgs/common/spliter-line.png"
            srcSet="imgs/common/spliter-line@2X.png 2x" />
          <div 
          style={{
            position: 'relative',
            marginTop: -21,
            color: '#4D4D4D'
          }}>我的订单</div>
        </div>

        <BookTicketList data={this.state.orders} />
      </div>
    );
  }
});

export {UserCenterPage as default};
