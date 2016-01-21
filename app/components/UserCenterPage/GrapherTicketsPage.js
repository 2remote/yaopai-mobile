var React = require('react');
var Router = require('react-router');
import {History,Location} from 'react-router';
var Reflux = require('reflux');
var HamburgMenu = require('../HamburgMenu');
import UserAvatarBox from '../UserAvatarBox' ;
import JobTicketList from './JobTicketList';
var UserActions = require('../../actions/UserActions');
var UserStore = require('../../stores/UserStore');
var OrderActions = require('../../actions/OrderActions');
var OrderStore = require('../../stores/OrderStore');
var _ = require('underscore');

var GrapherTicketsPage = React.createClass({
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
      let type = 'in';
      //得到当前摄影师的所有订单
      this.setState({userInfo : data});
      OrderActions.list(type,null);
    }
  },
  _onOrderStoreChange : function(data){
    if(data.flag == 'list'){
      if(!data.success){
        console.log(data.hintMessage);
      }else{
        //将订单按照状态排序，优先显示为完成订单
        var orders = _.sortBy(data.orders,function(order){return order.State})
        this.setState({orders : orders});
        console.log(data.orders);
      }
    }
    if(data.flag == 'confirm'){
      if(!data.success){
        console.log(data.hintMessage);
      }else{
        console.log('确认订单成功');
        //刷新页面获取新的数据
        OrderActions.list('in',null);
      }
    }
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
        className="grapherTicketsPage">
        <HamburgMenu />
        <UserAvatarBox background={true} data={this.state.userInfo}/>

        <div 
          style={style.splitLine}
          ref="myJobTicketsLabel">
          <img 
            src="imgs/common/spliter-line.png"
            srcSet="imgs/common/spliter-line@2X.png 2x" />
          <div 
            style={{
              position: 'relative',
              marginTop: -21,
              color: '#4D4D4D'
            }}>我的预约</div>
        </div>
        
        <JobTicketList data={this.state.orders}/>
      </div>
    );
  }
});

module.exports = GrapherTicketsPage;
