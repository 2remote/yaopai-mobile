var Reflux = require('reflux');
var HttpFactory = require('../HttpFactory');
var API = require('../api');

var OrderActions = Reflux.createActions({
  'list' : {children:['success','failed']} ,
  'get' : {children:['success','failed']} ,
  'add' : {children:['success','failed']} ,
  'confirm' : {children:['success','failed']} ,
  'close' : {children:['success','failed']} ,
});

/*
  type : ‘in’  查询摄影师被预约
  type : 'out' 查询预约
  state : 'pending','finished','closed'
  state : 订单状态，0：待确认，1：完成，2：关闭，为null表示不指定
*/
OrderActions.list.listen(function(type,state){
  var s = null;
  if(state == 'pending'){
    s = 0;
  };
  if(state == 'finished'){
    s = 1;
  };
  if(state == 'closed'){
    s = 2;
  };
  var data = {
    State : s,
    Fields : 'Id,UserId,BuyerName,BuyerTel,Price,AppointedTime,PhotographerId,IsSpecifiesAlbums,AlbumsId,CreationTime,State,Photographer.UserId,Photographer.NickName,Photographer.Avatar,User.NickName,User.Avatar,User.UserId',
  };
  if(type == 'out')
    HttpFactory.post(API.ORDER.outSearch,data,this.success,this.failed);
  else
    HttpFactory.post(API.ORDER.inSearch,data,this.success,this.failed);
});

OrderActions.get.listen(function(id){
  var data = {
    Id : id,
    Fields : 'Id,UserId,BuyerName,BuyerTel,AppointedTime,PhotographerId,IsSpecifiesAlbums,AlbumsId,CreationTime,State,Photographer.BusinessPhone,Photographer.NickName,Photographer.Avatar,User.NickName,User.Avatar,User.UserId,Albums.Title,Albums.Cover,Albums.Price,Albums.Service,Albums.Description',
  };
  HttpFactory.post(API.ORDER.get,data,this.success,this.failed);
});

/*
参数  类型  必填  说明
BuyerName string  Y 买家姓名
BueryTel  string  Y 买家电话
AppointedTime datetime  Y 预约时间
PhotographerId  integer Y 预约摄影师Id ，PhotographerId和AlbumsId必选其一
AlbumsId  integer Y 预约作品Id， 如只预约摄影师，可不传入该值
*/
OrderActions.add.listen(function(data){
  HttpFactory.post(API.ORDER.add,data,this.success,this.failed);
});

/*
Id  string  Y 订单Id
AppointedTime datetime  Y 预约时间
*/
OrderActions.confirm.listen(function(id,appointeTime){
  var data={
    Id : id,
    AppointedTime : appointeTime
  };
  HttpFactory.post(API.ORDER.confirm,data,this.success,this.failed);
});

/*
  订单Id传入
*/
OrderActions.close.listen(function(id){
  var data = {
    Id : id
  }
  HttpFactory.post(API.ORDER.close,data,this.success,this.failed);
});
module.exports = OrderActions;
