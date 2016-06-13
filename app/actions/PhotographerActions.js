import Reflux from 'reflux';
import HttpFactory from '../HttpFactory';
import API from '../api';

var PhotographerActions = Reflux.createActions({
  'get' : {children : ['success','failed']},
  'list' : {children : ['success','failed']},
  'recommendList' : {children : ['success','failed']},
});
/*
  得到指定id的摄影师信息
*/
PhotographerActions.get.listen(function(id){
  var data = {
    Id : id,
    Fields : ',Id,Views,Marks,NickName,Avatar,Signature,TotalAlbums,Sales',
  };
  HttpFactory.post(API.PHOTOGRAPHER.get,data,this.success,this.failed);
});


/*
  list动作，查询摄影师
*/
PhotographerActions.list.listen(function(pageIndex = 1,pageSize = 10, city = null, albumsCount = 3){
  var data = {
    Fields : 'ProvinceId,ProvinceName,CityId,CityName,CountyId,CountyName,' +
    'Id,NickName,Avatar,Signature,TotalAlbums,Marks,Sales,Albums.Id,Albums.Cut',
    PageIndex : pageIndex,
    PageSize : pageSize,
    CityId : city,
    AlbumsCount : albumsCount,
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

export {PhotographerActions as default};