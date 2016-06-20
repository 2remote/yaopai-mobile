import Reflux from 'reflux';
import PhotographerActions from '../actions/PhotographerActions';

var PhotographerStore = Reflux.createStore({
  data : {
    photographer : {},
    photographers : [],
    hitMessage : '',
    flag : '',
    markExist: false,
  },
  init: function() {
    console.log('PAuthStore initialized');
    this.listenTo(PhotographerActions.get.success,this.onGetSuccess);
    this.listenTo(PhotographerActions.get.failed,this.onFailed);
    this.listenTo(PhotographerActions.list.success,this.onListSuccess);
    this.listenTo(PhotographerActions.list.failed,this.onFailed);
    this.listenTo(PhotographerActions.recommendList.success,this.onRecommendListSuccess);
    this.listenTo(PhotographerActions.recommendList.failed,this.onFailed);
    this.listenTo(PhotographerActions.mark.success,this.onMarkSuccess);
    this.listenTo(PhotographerActions.mark.failed,this.onFailed);
    this.listenTo(PhotographerActions.unMark.success,this.onUnMarkSuccess);
    this.listenTo(PhotographerActions.unMark.failed,this.onFailed);
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
      this.data.pageCount = res.PageCount;
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

  // 关注摄影师
  onMarkSuccess: function(res){
    if(res.Success){
      this.data.markExist = true;
    }else{
      this.data.hintMessage = res.ErrorMsg;
    }
    this.data.flag = 'mark';
    this.trigger(this.data);
  },
  // 取消关注摄影师
  onUnMarkSuccess: function(res){
    if(res.Success){
      this.data.markExist = false;
    }else{
      this.data.hintMessage = res.ErrorMsg;
    }
    this.data.flag = 'unMark';
    this.trigger(this.data);
  },
});

export {PhotographerStore as default};
