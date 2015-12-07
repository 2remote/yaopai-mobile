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
});

AlbumsActions.add.listen(function(data){
  HttpFactory.post(API.ALBUMS.add,data,this.success,this.failed);
});

AlbumsActions.get.listen(function(id){
  var data = {
    Id : id,
    Fields : 'Id,Title,UserId,CategoryId,Description,Service,Price,Cover,Photos.Id,Photos.AlbumsId,Photos.Url,Photos.Description,User.Id,User.NickName,User.Avatar',
  };
  HttpFactory.post(API.ALBUMS.get,data,this.success,this.failed);
});

AlbumsActions.update.listen(function(data){
  HttpFactory.post(API.ALBUMS.update,data,this.success,this.failed);
});
AlbumsActions.delete.listen(function(data){
  HttpFactory.post(API.ALBUMS.delete,data,this.success,this.failed);
});
AlbumsActions.search.listen(function(categoryId = null ,pageIndex = 1 ,pageSize = 10){
  var data = {
    PageIndex:pageIndex,
    PageSize:pageSize,
    CategoryId : categoryId,
    Fields : 'Id,Title,UserId,CategoryId,Description,Service,Price,Cover,Photos.Id,Photos.AlbumsId,Photos.Url,Photos.Description,User.Id,User.NickName,User.Avatar'
  }
  HttpFactory.post(API.ALBUMS.search,data,this.success,this.failed);
});
AlbumsActions.getMyAlbums.listen(function(data){
  HttpFactory.post(API.ALBUMS.search,data,this.success,this.failed);
});

AlbumsActions.getCategories.listen(function(){
  var data = {
    Fields : 'Id,Name,Sorting,Display,Views'
  };
  HttpFactory.post(API.ALBUMS.categories,data,this.success,this.failed);
});

AlbumsActions.onSale.listen(function(data){
  HttpFactory.post(API.ALBUMS.onSale,data,this.success,this.failed);
});
AlbumsActions.offSale.listen(function(data){
  HttpFactory.post(API.ALBUMS.offSale,data,this.success,this.failed);
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
module.exports = AlbumsActions;
