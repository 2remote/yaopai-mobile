import React from 'react';
var Reflux = require('reflux');
var History = require('react-router').History;
var localStorage = require('web-storage')().localStorage;
var DocumentTitle = require('react-document-title');

import DoubleCheckInfo from './DoubleCheckInfo';
import ExtraServiceBox from '../WorkDetailPage/ExtraServiceBox';
import ActionBar from './GrapherActionBar';
var OrderActions = require('../../actions/OrderActions');
var OrderStore = require('../../stores/OrderStore');

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
    var style = {
      bookSuccessDialog: {
        textAlign: 'center',
        position: 'absolute',
        width: '100%',
        minHeight: '100%',
        backgroundImage: 'url(imgs/bookPageBg.png)',
        paddingBottom: 30
      },
      headText: {
        fontSize: '2em',
        color: '#3c3c3c',
        fontWeight: 'lighter',
        margin: '29px auto 0'
      },
      subText:{
        marginBottom: 7
      },
      close: {
        position: 'absolute',
        right: 29,
        top: 25,
        margin: -15,
        padding: 15,
        fontSize: 22
      },
      doubleCheckTicket: {
        backgroundColor: 'white',
        margin: '0 auto',
        width:'90%'
      },
      wave:{
        backgroundImage: 'url("imgs/bookIntroBg.png")',
        backgroundRepeat: 'repeat-x',
        backgroundPosition: 'bottom',
        width: '90%',
        margin: '0 auto',
        height: 20
      }
    };
    var serviceContent = '';
    if(this.state.order.Albums){
      serviceContent = <ExtraServiceBox services={this.state.order.Albums?this.state.order.Albums.Service:''}/>
    }
    return (
      <div 
        style={style.bookSuccessDialog}
        className="bookSuccessDialog">
        <DocumentTitle title="订单成功" />
        <div style={style.headText} ref="headText" >订单成功！</div>
        <div style={style.subText}>请尽快与摄影师取得联系，方便您更好的摄影服务</div>
        <span 
          style={style.close}
          onClick={this.handleClose}
          ref="closeImage"
          className="icon close_icon" />
        <div 
          style={style.doubleCheckTicket}
          className="doubleCheckTicket">
          <DoubleCheckInfo 
            order={this.state.order} />
          {serviceContent}
        </div>
        <div style={style.wave}></div>
        <ActionBar data={this.state.order.Photographer?this.state.order.Photographer.BusinessPhone:''} />
      </div>
    );
  }
});

module.exports = BookSuccessDialog;
