import React from 'react';
import Reflux from 'reflux';
import { History }  from 'react-router';
import DocumentTitle from 'react-document-title';

import DoubleCheckInfo from './DoubleCheckInfo';
import ExtraServiceBox from '../WorkDetailPage/ExtraServiceBox';
import ActionBar from './GrapherActionBar';
import OrderActions from '../../actions/OrderActions';
import OrderStore from '../../stores/OrderStore';

import './bookPage.scss'

var BookSuccessDialog = React.createClass({
  mixins: [Reflux.listenTo(OrderStore,'_onOrderStoreChange'),History],

  handleClose: function () {
    this.history.go(-2);
  },

  getInitialState: function() {
    return {
      order: {}
    };
  },
  componentDidMount: function() {
    if(!this.props.params.orderId){
      console.log('没有指定正确的订单id');
      this.history.go(-2);
    }else{
      console.log('begin to get order:'+this.props.params.orderId);
      OrderActions.get(this.props.params.orderId);
    }
  },
  _onOrderStoreChange : function(data){
    console.log(data);
    if(data.flag == 'get'){
      if(data.hintMessage){
        console.log(data.hintMessage);
      }else{
        this.setState({order : data.order});
      }
    }
  },

  render: function() {
    var serviceContent = '';
    if(this.state.order.Albums){
      serviceContent = <ExtraServiceBox services={this.state.order.Albums?this.state.order.Albums.Service:''}/>
    }
    return (
      <div className="bookSuccessDialog">
        <DocumentTitle title="订单成功" />
        <div className="headText" ref="headText" >订单成功！</div>
        <div className="subText">请尽快与摄影师取得联系，方便您更好的摄影服务</div>
        <span
          onClick={this.handleClose}
          ref="closeImage"
          className="icon close_icon close" />
        <div
          className="doubleCheckTicket">
          <DoubleCheckInfo order={this.state.order} />
          {serviceContent}
        </div>
        <div className="wave"></div>
        <ActionBar data={this.state.order.Photographer?this.state.order.Photographer.BusinessPhone:''} />
      </div>
    );
  }
});

export {BookSuccessDialog as default};
