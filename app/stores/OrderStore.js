var React = require('react');
var Reflux = require('reflux');

var OrderActions = require('../actions/OrderActions');

var OrderStore = Reflux.createStore({
  data : {
    orders : [],
    order : {}, //单个订单数据
    hintMessage : '',
    success : false,
    flag : '',
  },
  init : function(){
    this.orders = [];
    
    //listen to the OrderActions
    this.listenTo(OrderActions.list.success,this.onListOrders);
    this.listenTo(OrderActions.list.failed,this.onFailed);
    this.listenTo(OrderActions.get.success,this.onGetOrder);
    this.listenTo(OrderActions.get.failed,this.onFailed);
    this.listenTo(OrderActions.add.success,this.onBookOrder);
    this.listenTo(OrderActions.add.failed,this.onFailed);
    this.listenTo(OrderActions.confirm.success,this.onComfirmOrder);
    this.listenTo(OrderActions.confirm.failed,this.onFailed);
    this.listenTo(OrderActions.close.success,this.onCloseOrder);
    this.listenTo(OrderActions.close.failed,this.onFailed);
  },
  onListOrders : function(data){
    //从服务器api接口获得定单的列表
    if(data.Success){
      this.data.orders = data.Result;
      this.data.hintMessage = '',
      this.data.success = true;
    }else{
      this.data.orders = [];
      this.data.success = false;
      this.data.hintMessage = data.ErrorMsg;
    }
    this.data.flag = 'list';
    this.trigger(this.data);
  },
  onGetOrder : function(res){
    //从远端拿到订单信息，暂时不做，目前是一次性拿完数据
    if(res.Success){
      this.data.order = res;
      this.data.hintMessage = '';
      this.data.success = true;
    }else{
      this.data.order = {};
      this.data.hintMessage = res.ErrorMsg;
      this.data.success = false;
    }
    this.data.flag = 'get';
    this.trigger(this.data);
  },
  onComfirmOrder : function(res){
    if(res.Success){
      this.data.hintMessage = '确认订单成功！';
      this.data.success = true;
    }else{
      this.data.hintMessage = res.ErrorMsg;
      this.data.success = false;
    }
    this.data.flag = 'confirm';
    this.trigger(this.data);
  },
  onBookOrder : function(res){
    if(res.Success){
      this.data.hintMessage = '预订成功！'
      this.data.order= {Id : res.Result};
      this.data.success = true;
    }else{
      this.data.hintMessage = res.ErrorMsg;
      this.data.success = false;
    }
    this.data.flag = 'add';
    this.trigger(this.data);
  },
  onCloseOrder : function(res){
    if(res.Success){
      this.data.hintMessage = '关闭订单成功！'
      this.data.success = true;
    }else{
      this.data.hintMessage = res.ErrorMsg;
      this.data.success = false;
    }
    this.data.flag = 'close';
    this.trigger(this.data);
  },
  onFailed : function(data){
    this.data.hintMessage = '网络错误！';
    this.data.flag = 'failed';
    this.trigger(this.data);
  }

});

module.exports = OrderStore;