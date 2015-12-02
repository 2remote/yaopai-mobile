var Reflux = require('reflux');
var PhotographerActions = require('../actions/PhotographerActions');

var PhotographerStore = Reflux.createStore({
  data : {
    photographer : {},
    photographers : [],
    hitMessage : '',
    flag : '',
  },
  init: function() {
    console.log('PAuthStore initialized');
    this.listenTo(PhotographerActions.get.success,this.onGetSuccess);
    this.listenTo(PhotographerActions.get.failed,this.onFailed);
    this.listenTo(PhotographerActions.list.success,this.onListSuccess);
    this.listenTo(PhotographerActions.list.failed,this.onFailed);
    this.listenTo(PhotographerActions.recommendList.success,this.onRecommendListSuccess);
    this.listenTo(PhotographerActions.recommendList.failed,this.onFailed);
  },
  onGetSuccess : function(res){
    if(res.Success){
      this.data.photographer = res;
      this.data.hintMessage = '';
    }else{
      this.data.hintMessage = res.ErrorMsg;
    }
    this.data.flag = 'get';
    this.trigger(this.data);
  },
  onListSuccess : function(res){
    if(res.Success){
      this.data.photographers = res.Result;
      this.data.hintMessage = '';
    }else{
      this.data.hintMessage = res.ErrorMsg;
    }
    this.data.flag = 'list';
    this.trigger(this.data);
  },
  onFailed : function(data){
    console.log('网络出错了');
  },
  //推荐摄影师数据
  onRecommendListSuccess : function(res){
    if(res.Success){
      this.data.photographers = res.Result;
      this.data.hintMessage = '';
    }else{
      this.data.hintMessage = res.ErrorMsg;
    }
    this.data.flag = 'recommendList';
    this.trigger(this.data);
  },

});

module.exports = PhotographerStore;
