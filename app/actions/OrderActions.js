import Reflux from 'reflux'
import HttpFactory from '../HttpFactory'
import API from '../api'

var OrderActions = Reflux.createActions({
  'list' : {children:['success','failed']} ,
  'get' : {children:['success','failed']} ,
  'add' : {children:['success','failed']} ,
  'confirm' : {children:['success','failed']} ,
  'close' : {children:['success','failed']} ,
  'type': {},
  'refund': {children:['success','failed']}, // 用户申请退款
  'receive': {children:['success','failed']}, // 摄影师接单
  'deliver': {children:['success','failed']}, // 摄影师发片
  'accept': {children:['success','failed']}, // 用户收片
  'wexinPayToken': {children:['success','failed']}, // 微信支付 Token
  'wexinTicket': {children:['success','failed']}, // 微信支付 Ticket
})

/*
  type : ‘in’  查询摄影师被预约
  type : 'out' 查询预约
  state : 'pending','finished','closed'
  state : 订单状态，0：待确认，1：完成，2：关闭，为null表示不指定
*/
OrderActions.list.listen(function(type,state,pageIndex = 1,buyerName = ''){
  var s = null
  if(state == 'pending'){
    s = 0
  }
  if(state == 'finished'){
    s = 1
  }
  if(state == 'closed'){
    s = 2
  }
  var data = {
    State : s,
    pageSize: 100,
    pageIndex,
    buyerName,
    Fields : 'Id,UserId,BuyerName,BuyerTel,BuyerMemo,Price,AppointedTime,PhotographerId,CreationTime,State,Photographer.NickName,Photographer.Avatar,User.NickName,User.Avatar,User.Id,Albums.Cover,Albums.Title,Amount,CompleteTime,HasRefund,Refund.CompletionTime,Refund.Compensation'
  }
  if(type == 'out')
    HttpFactory.post(API.ORDER.outSearch,data,this.success,this.failed)
  else
    HttpFactory.post(API.ORDER.inSearch,data,this.success,this.failed)
})

OrderActions.get.listen(function(id){
  var data = {
    Id : id,
    Fields : 'Amount,Id,UserId,BuyerName,BuyerTel,BuyerMemo,AppointedTime,PhotographerId,AlbumsId,CreationTime,State,Photographer.NickName,Photographer.Avatar,User.NickName,User.Avatar,User.Id,Albums.Title,Albums.Cover,Albums.Price,Albums.Service,Albums.Description,PaymentTime,Price,CompleteTime,HasRefund,Refund.CompletionTime,Refund.Compensation'
  }
  HttpFactory.post(API.ORDER.get,data,this.success,this.failed)
})

/*
参数  类型  必填  说明
BuyerName string  Y 买家姓名
BueryTel  string  Y 买家电话
AppointedTime datetime  Y 预约时间
PhotographerId  integer Y 预约摄影师Id ，PhotographerId和AlbumsId必选其一
AlbumsId  integer Y 预约作品Id， 如只预约摄影师，可不传入该值
*/
OrderActions.add.listen(function(data){
  HttpFactory.post(API.ORDER.add,data,this.success,this.failed)
})

/*
Id  string  Y 订单Id
AppointedTime datetime  Y 预约时间
*/
OrderActions.confirm.listen(function(id,appointeTime){
  var data={
    Id : id,
    AppointedTime : appointeTime
  }
  HttpFactory.post(API.ORDER.confirm,data,this.success,this.failed)
})

/*
  订单Id传入
*/
OrderActions.close.listen(function(id){
  var data = {
    Id : id
  }
  HttpFactory.post(API.ORDER.close,data,this.success,this.failed)
})
/**
 * 用户申请退款
 */
OrderActions.refund.listen(function(id, reason, explain){
  var data = {
    Id: id,
    Reason: reason
  }
  if(explain) {
    data.Explication = explain
  }
  HttpFactory.post(API.ORDER.refund,data,data => this.success(data, id),this.failed)
})
/**
 * 摄影师接单
 */
OrderActions.receive.listen(function(id, approve){
  var data = {
    Id: id,
    Approved: approve
  }
  HttpFactory.post(API.ORDER.receive,data,data => this.success(data, id, approve),this.failed)
})
/**
 * 摄影师发片
 */
OrderActions.deliver.listen(function(id){
  var data = {
    Id: id
  }
  HttpFactory.post(API.ORDER.deliver,data,data => this.success(data, id),this.failed)
})
/**
 * 用户收片
 */
OrderActions.accept.listen(function(id){
  var data = {
    Id: id
  }
  HttpFactory.post(API.ORDER.accept,data,data => this.success(data, id),this.failed)
})

/**
 * 微信支付 Token
 */
OrderActions.wexinPayToken.listen(function(id){
  var data = {
    Id: id // 订单 ID
  }
  HttpFactory.post(API.ORDER.wexinPayToken,data,data => this.success(data, id),this.failed)
})

/**
 * 微信支付 Ticket
 */
OrderActions.wexinTicket.listen(function(){
  var data = {}
  HttpFactory.post(API.ORDER.wexinTicket,data,data => this.success(data),this.failed)
})
export {OrderActions as default}
