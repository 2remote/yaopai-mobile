var Reflux = require('reflux');
var AlbumsActions = require('../actions/AlbumsActions');

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
    console.log('UploadWorksStore initialized');
    this.listenTo(AlbumsActions.add.success,this.onAddSuccess);
    this.listenTo(AlbumsActions.add.failed,this.onFailed);
    this.listenTo(AlbumsActions.get.success,this.onGetSuccess);
    this.listenTo(AlbumsActions.get.failed,this.onFailed);
    this.listenTo(AlbumsActions.update.success,this.onUpdateSuccess);
    this.listenTo(AlbumsActions.update.failed,this.onFailed);
    this.listenTo(AlbumsActions.delete.success,this.onDeleteSuccess);
    this.listenTo(AlbumsActions.delete.failed,this.onFailed);
    this.listenTo(AlbumsActions.search.success,this.onSearchSuccess);
    this.listenTo(AlbumsActions.search.failed,this.onFailed);
    this.listenTo(AlbumsActions.getMyAlbums.success,this.onGetMyAlbumsSuccess);
    this.listenTo(AlbumsActions.getMyAlbums.failed,this.onFailed);
    this.listenTo(AlbumsActions.getCategories.success,this.onGetCategoiesSuccess);
    this.listenTo(AlbumsActions.getCategories.failed,this.onFailed);
    this.listenTo(AlbumsActions.onSale.success,this.onSaleSuccess);
    this.listenTo(AlbumsActions.onSale.failed,this.onFailed);
    this.listenTo(AlbumsActions.offSale.success,this.offSaleSuccess);
    this.listenTo(AlbumsActions.offSale.failed,this.onFailed);
    this.listenTo(AlbumsActions.recommendList.success,this.onRecommendListSuccess);
    this.listenTo(AlbumsActions.recommendList.failed,this.onFailed);
  },
  onFailed : function(res){
    this.data.hintMessage = '网络错误';
    this.data.flag == 'failed';
    this.trigger(this.data);
  },
  onAddSuccess : function(res){
    if(res.Success){
      this.data.hintMessage = '';
    }else{
      this.data.hintMessage = res.ErrorMsg;
    }
    this.data.flag = 'add';
    this.trigger(this.data);
  },
  onGetSuccess : function(res){
    if(res.Success){
      this.data.hintMessage = '';
      this.data.workData = res;
    }else{
      this.data.hintMessage = res.ErrorMsg;
      this.data.workData = [];
    }
    this.data.flag = 'get';
    this.trigger(this.data);
  },
  onUpdateSuccess : function(res){
    if(res.Success){
      this.data.hintMessage = '';
    }else{
      this.data.hintMessage = res.ErrorMsg;
    }
    this.data.flag = 'update';
    this.trigger(this.data);
  },
  onDeleteSuccess : function(res){
    if(res.Success){
      this.data.hintMessage = '';
    }else{
      this.data.hintMessage = res.ErrorMsg;
    }
    this.data.flag = 'delete';
    this.trigger(this.data);
  },
  onSearchSuccess : function(res){
    if(res.Success){
      this.data.count = res.Count;
      this.data.pageCount = res.PageCount;
      this.data.pageIndex = res.PageIndex;
      this.data.pageSize = res.PageSize;
      this.data.total = res.Total;
      this.data.workList = res.Result;
      this.data.hintMessage = '';
    }else{
      this.data.workList = [];
      this.data.hintMessage = res.ErrorMsg;
    }
    this.data.flag = 'search';
    this.trigger(this.data);
  },
  onGetMyAlbumsSuccess : function(res){
    if(res.Success){
      this.data.workList = res.Result;
      this.data.hintMessage = '';
    }else{
      this.data.workList = [];
      this.data.hintMessage = res.ErrorMsg;
    }
    this.data.flag = 'getMyAlbums';
    this.trigger(this.data);
  },
  onGetCategoiesSuccess : function(res){
    if(res.Success){
      this.data.categories = res.Result;
      this.hintMessage = '';
    }else{
      this.data.hintMessage = res.ErrorMsg;
    }
    this.data.flag = 'getCategories';
    this.trigger(this.data);
  },
  onSaleSuccess : function(res){
    if(res.Success){
      this.data.hintMessage = '';
    }else{
      this.data.hintMessage = res.ErrorMsg;
    }
    this.data.flag = 'onSale';
    this.trigger(this.data);
  },
  offSaleSuccess : function(res){
    if(res.Success){
      this.data.hintMessage = '';
    }else{
      this.data.hintMessage = res.ErrorMsg;
    }
    this.data.flag = 'offSale';
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
