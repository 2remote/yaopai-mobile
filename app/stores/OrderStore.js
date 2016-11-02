import Reflux from 'reflux'

var OrderActions = require('../actions/OrderActions')

var OrderStore = Reflux.createStore({
  data : {
    orders : [],
    order : {}, //单个订单数据
    hintMessage : '',
    success : false,
    flag : '',
    filterType: '',
    wexinPayToken: {},
    wexinTicket: {},
    pageIndex: '',
    pageCount: '',
    total: '',
    waitingPayment: [],
    getWexinTokenSuccess: false,
    getWexinTicketSuccess: false,
  },
  init : function(){
    this.orders = []

    //listen to the OrderActions
    this.listenTo(OrderActions.list.success,this.onListOrders)
    this.listenTo(OrderActions.list.failed,this.onFailed)
    this.listenTo(OrderActions.get.success,this.onGetOrder)
    this.listenTo(OrderActions.get.failed,this.onFailed)
    this.listenTo(OrderActions.add.success,this.onBookOrder)
    this.listenTo(OrderActions.add.failed,this.onFailed)
    this.listenTo(OrderActions.confirm.success,this.onComfirmOrder)
    this.listenTo(OrderActions.confirm.failed,this.onFailed)
    this.listenTo(OrderActions.close.success,this.onCloseOrder)
    this.listenTo(OrderActions.close.failed,this.onFailed)
    this.listenTo(OrderActions.type,this.onType)
    /* 用户退款 */
    this.listenTo(OrderActions.refund.success,this.onRefundOrder)
    this.listenTo(OrderActions.refund.failed,this.onFailed)
    /* 摄影师接单 */
    this.listenTo(OrderActions.receive.success,this.onReceiveOrder)
    this.listenTo(OrderActions.receive.failed,this.onFailed)
    /* 摄影师发片 */
    this.listenTo(OrderActions.deliver.success,this.onDeliverOrder)
    this.listenTo(OrderActions.deliver.failed,this.onFailed)
    /* 用户收片 */
    this.listenTo(OrderActions.accept.success,this.onAcceptOrder)
    this.listenTo(OrderActions.accept.failed,this.onFailed)

    /* 微信支付 Token*/
    this.listenTo(OrderActions.wexinPayToken.success,this.onGetPayTokenSuccess)
    this.listenTo(OrderActions.wexinPayToken.failed,this.onFailed)

    /* 微信支付 Ticket*/
    this.listenTo(OrderActions.wexinTicket.success,this.onGetTicketSuccess)
    this.listenTo(OrderActions.wexinTicket.failed,this.onFailed)

    /* 查询当前登录用户预约的订单*/
    this.listenTo(OrderActions.orderOutSearch.success,this.onOrderOutSearchSuccess)
    this.listenTo(OrderActions.orderOutSearch.failed,this.onFailed)
  },
  onListOrders : function(data){
    //从服务器api接口获得定单的列表
    if(data.Success){
      this.data.pageIndex = data.PageIndex
      this.data.pageCount = data.PageCount
      this.data.total = data.Total
      this.data.orders = data.Result
      this.data.hintMessage = ''
      this.data.success = true
    }else{
      this.data.orders = []
      this.data.success = false
      this.data.hintMessage = data.ErrorMsg
    }
    this.data.flag = 'list'
    this.trigger(this.data)
  },
  onGetOrder : function(res){
    //从远端拿到订单信息，暂时不做，目前是一次性拿完数据
    if(res.Success){
      this.data.order = res
      this.data.hintMessage = ''
      this.data.success = true
    }else{
      this.data.order = {}
      this.data.hintMessage = res.ErrorMsg
      this.data.success = false
    }
    this.data.flag = 'get'
    this.trigger(this.data)
  },
  onComfirmOrder : function(res){
    if(res.Success){
      this.data.hintMessage = '确认订单成功！'
      this.data.success = true
    }else{
      this.data.hintMessage = res.ErrorMsg
      this.data.success = false
    }
    this.data.flag = 'confirm'
    this.trigger(this.data)
  },
  onBookOrder : function(res){
    if(res.Success){
      this.data.hintMessage = '预订成功！'
      this.data.order= {Id : res.Result}
      this.data.success = true
    }else{
      this.data.hintMessage = res.ErrorMsg
      this.data.success = false
    }
    this.data.flag = 'add'
    this.trigger(this.data)
  },
  onCloseOrder : function(res){
    if(res.Success){
      this.data.hintMessage = '关闭订单成功！'
      this.data.success = true
    }else{
      this.data.hintMessage = res.ErrorMsg
      this.data.success = false
    }
    this.data.flag = 'close'
    this.trigger(this.data)
  },
  onFailed : function(data){
    this.data.hintMessage = '网络错误！'
    this.data.flag = 'failed'
    this.trigger(this.data)
  },
  onType: function(filterType) {
    this.data.filterType = filterType
    this.data.flag = 'type'
    this.trigger(this.data)
  },
  onRefundOrder: function(data, id) {
    if(data.Success){
      // TODO: 这里要更新对应订单状态
      for(let count = 0; count < this.data.orders.length; count ++){
        if(id === this.data.orders[count].Id) {
          this.data.orders[count].State = 'Closed'
          break
        }
      }
      this.data.hintMessage = '退款成功！'
      this.data.success = true
    } else {
      this.data.success = false
      this.data.hintMessage = data.ErrorMsg
    }
    this.data.flag = 'refund'
    this.trigger(this.data)
  },
  onReceiveOrder: function(data, id, approve) {
    if(data.Success){
      // TODO: 这里要更新对应订单状态
      for(let count = 0; count < this.data.orders.length; count ++){
        if(id === this.data.orders[count].Id) {
          if(approve){
            this.data.orders[count].State = 'WaitingDelivery'
          } else {
            this.data.orders[count].State = 'Closed'
          }
          break
        }
      }
      this.data.hintMessage = '接单成功！'
      this.data.success = true
    }else{
      this.data.success = false
      this.data.hintMessage = data.ErrorMsg
    }
    this.data.flag = 'receive'
    this.trigger(this.data)
  },
  onDeliverOrder: function(data, id) {
    if(data.Success){
      // TODO: 这里要更新对应订单状态
      for(let count = 0; count < this.data.orders.length; count ++){
        if(id === this.data.orders[count].Id) {
          this.data.orders[count].State = 'WaitingAcceptance'
          break
        }
      }
      this.data.hintMessage = '发片成功！'
      this.data.success = true
    }else{
      this.data.success = false
      this.data.hintMessage = data.ErrorMsg
    }
    this.data.flag = 'deliver'
    this.trigger(this.data)
  },
  onAcceptOrder: function(data, id) {
    if(data.Success){
      // TODO: 这里要更新对应订单状态
      for(let count = 0; count < this.data.orders.length; count ++){
        if(id === this.data.orders[count].Id) {
          this.data.orders[count].State = 'Completed'
          break
        }
      }
      this.data.hintMessage = '收片成功！'
      this.data.success = true
    }else{
      this.data.success = false
      this.data.hintMessage = data.ErrorMsg
    }
    this.data.flag = 'accept'
    this.trigger(this.data)
  },
  onGetPayTokenSuccess: function(data) {
    if(data.Success) {
      this.data.wexinPayToken = data
      this.data.hintMessage = '拿到微信支付 Token'
      this.data.getWexinTokenSuccess = true
    } else {
      this.data.success = false
      this.data.hintMessage = data.ErrorMsg
    }
    this.data.flag = 'getPayToken'
    this.trigger(this.data)
  },

  onGetTicketSuccess: function(data) {
    if(data.Success) {
      this.data.wexinTicket = data
      this.data.hintMessage = '拿到微信支付 Ticket'
      this.data.getWexinTicketSuccess = true
    } else {
      this.data.success = false
      this.data.hintMessage = data.ErrorMsg
    }
    this.data.flag = 'getTicket'
    this.trigger(this.data)
  },

  onOrderOutSearchSuccess(data) {
    if(data.Success) {
      this.data.waitingPayment = data.Result
      this.data.hintMessage = '查询当前登录用户预约的订单'
      this.data.success = true
    } else {
      this.data.success = false
      this.data.hintMessage = data.ErrorMsg
    }
    this.data.flag = 'getUserOrderList'
    this.trigger(this.data)
  },
})

export {OrderStore as default}
