var Reflux = require('reflux');
var HttpFactory = require('../HttpFactory');
var API = require('../api');

var AlbumsActions = Reflux.createActions({
  'get':{children : ['success','failed']},
  'add':{children : ['success','failed']},
  'update':{children : ['success','failed']},
  'delete':{children : ['success','failed']},
  'search':{children : ['success','failed']},
  'getMyAlbums' : {children : ['success','failed']},
  'getCategories' :{children:['success','failed']},
  'onSale' : {children:['success','failed']},
  'offSale' : {children:['success','failed']},
  'recommendList' : {children:['success','failed']},
  'getTagList' : {children:['success','failed']},
});

AlbumsActions.get.listen(function(id){
  var data = {
    Id : id,
    Fields : 'Id,Title,UserId,CategoryId,Description,Service,Price,Cover,Photos.Id,Photos.AlbumsId,Photos.Url,Photos.Description,User.Id,User.NickName,User.Avatar',
  };
  HttpFactory.post(API.ALBUMS.get,data,this.success,this.failed);
});

AlbumsActions.search.listen(function(categoryId = null ,pageIndex = 1 ,pageSize = 10, tags=null){
  var data = {
    PageIndex:pageIndex,
    PageSize:pageSize,
    CategoryId : categoryId,
    Tags: tags,
    Fields : 'Id,Title,UserId,CategoryId,Description,Service,Price,Cover,Photos.Id,Photos.AlbumsId,Photos.Url,Photos.Description,User.Id,User.NickName,User.Avatar'
  }
  HttpFactory.post(API.ALBUMS.search,data,this.success,this.failed);
});

AlbumsActions.getCategories.listen(function(){
  var data = {
    Fields : 'Id,Name,Sorting,Display,Views'
  };
  HttpFactory.post(API.ALBUMS.categories,data,this.success,this.failed);
});

AlbumsActions.recommendList.listen(function(count = 8){
  var data ={
    HomeRecommended : true,
    HomeSortingDesc : true,
    PageIndex : 1,
    PageSize : count,
    Fields : 'Id,Title,UserId,CategoryId,Description,Service,Price,Cover,Photos.Id,Photos.AlbumsId,Photos.Url,Photos.Description,User.Id,User.NickName,User.Avatar',
  };
  HttpFactory.post(API.ALBUMS.search,data,this.success,this.failed);
});

// http://api.aiyaopai.com/?api=Tag.List&fields=id,name,display,tags.id,tags.name,tags.display
AlbumsActions.getTagList.listen(function () {
  var data = {
    Fields : 'id,name,display,tags.id,tags.name,tags.display'
  }
  HttpFactory.post(API.TAG.list,data,this.success,this.failed);
});

module.exports = AlbumsActions;
