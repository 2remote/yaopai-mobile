import Reflux from 'reflux';
import HttpFactory from '../HttpFactory';
import API from '../api';

var PhotographerActions = Reflux.createActions({
  'get' : {children : ['success','failed']},
  'list' : {children : ['success','failed']},
  'recommendList' : {children : ['success','failed']},
  'mark' : {children : ['success','failed']},
  'unMark' : {children : ['success','failed']},
  'query' : {children : ['success','failed']},
});
/*
  得到指定id的摄影师信息
*/
PhotographerActions.get.listen(function(id){
  var data = {
    Id : id,
    Fields : 'Id,Views,Marks,Sales,MarkExist,CityName,NickName,Avatar,Signature,TotalAlbums,Sales',
  };
  HttpFactory.post(API.PHOTOGRAPHER.get,data,this.success,this.failed);
});


/*
  list动作，查询摄影师
*/
PhotographerActions.list.listen(function(pageIndex = 1, pageSize = 10, city = null, albumsCount = 3, NickName = ""){
  var data = {
    Fields : 'ProvinceId,ProvinceName,CityId,CityName,CountyId,CountyName,' +
    'Id,NickName,Avatar,Signature,TotalAlbums,Marks,Sales,Albums.Id,Albums.Cut',
    PageIndex : pageIndex,
    PageSize : pageSize,
    CityId : city,
    NickName,
    AlbumsCount : albumsCount,
    ExistAlbums : true,
  };
  HttpFactory.post(API.PHOTOGRAPHER.list,data,this.success,this.failed);
});

/*
  得到推荐摄影师列表,目前默认取得3个
*/
PhotographerActions.recommendList.listen(function(count = 3, city = null){
  var data = {
    Fields : 'Id,HomeCover,ProvinceId,ProvinceName,CityId,CityName,' +
    'CountyId,CountyName,NickName,Avatar',
    PageIndex : 1,
    PageSize : count,
    city : city,
    HomeRecommended : true,
    HomeSortingDesc : true
  };
  HttpFactory.post(API.PHOTOGRAPHER.list,data,this.success,this.failed);
});

/*
  关注摄影师
*/
PhotographerActions.mark.listen(function(id){
  var data = {
    Id : id,
  };
  HttpFactory.post(API.PHOTOGRAPHER.mark,data,this.success,this.failed);
});

/*
  取消关注摄影师
*/
PhotographerActions.unMark.listen(function(id){
  var data = {
    Id : id,
  };
  HttpFactory.post(API.PHOTOGRAPHER.unMark,data,this.success,this.failed);
});

// 查询摄影师
<<<<<<< HEAD
<<<<<<< HEAD
PhotographerActions.query.listen(function (NickName = "", pageIndex = 1, pageSize = 10, Mark) {
=======
PhotographerActions.query.listen(function (Key = "", pageIndex = 1, pageSize = 10) {
>>>>>>> dev
=======
PhotographerActions.query.listen(function (Key = "", pageIndex = 1, pageSize = 10, Mark) {
>>>>>>> origin/收藏关注列表页面
  const data = {
    Fields : 'ProvinceId,ProvinceName,CityId,CityName,CountyId,CountyName,' +
    'Id,NickName,Avatar,Signature,TotalAlbums,Marks,Sales,Albums.Id,Albums.Cut',
    PageIndex : pageIndex,
    PageSize : pageSize,
    AlbumsCount : 3,
    ExistAlbums : true,
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> origin/收藏关注列表页面
    Mark,
    Key
<<<<<<< HEAD
>>>>>>> dev
=======
>>>>>>> origin/收藏关注列表页面
  }
  HttpFactory.post(API.PHOTOGRAPHER.list,data,this.success,this.failed)
})

export {PhotographerActions as default};
