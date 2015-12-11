var Reflux = require('reflux');
var InterviewActions = require('../actions/InterviewActions');

var AlbumsStore = Reflux.createStore({
  data : {
    flag : '',
    hintMessage : '',
    workData : {},
    categories : [],
    workList : [],
    count : 0,  //当前查询条件下的列表总数
    pageCount : 0, //当前查询条件下的总页数
    pageIndex : 0, //当前页
    pageSize : 0, //companent设置页面大小
    total : 0, //当前查询条件下的作品总数
  },
  
  init: function() {
    console.log('Interview Store initialized');
    this.listenTo(InterviewActions.recommendList.success,this.onRecommendListSuccess);
    this.listenTo(InterviewActions.recommendList.failed,this.onFailed);
  },
  
  onFailed : function(res){
    this.data.hintMessage = '网络错误';
    this.data.flag = 'failed';
    this.trigger(this.data);
  },

  onRecommendListSuccess : function(res){
    if(res.Success){
      this.data.hintMessage = '';
      this.data.workList = res.Result;
    }else{
      this.data.hintMessage = res.ErrorMsg;
    }
    this.data.flag = 'recommendList';
    this.trigger(this.data);
  },
});

module.exports = AlbumsStore;
