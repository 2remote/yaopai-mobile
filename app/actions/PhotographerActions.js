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
PhotographerActions.list.listen(listQuery)
// 查询摄影师
PhotographerActions.query.listen(listQuery)

function listQuery(args = []) {
  const {
    key = "",
    pageIndex = 1,
    pageSize = 10,
    mark,
    city,
    albumsCount = 3,
  } = args

  const data = {
    Fields: 'ProvinceId,ProvinceName,CityId,CityName,CountyId,CountyName,' +
    'Id,NickName,Avatar,Signature,TotalAlbums,Marks,Sales,Albums.Id,Albums.Cut',
    pageIndex,
    pageSize,
    CityId: city,
    albumsCount,
    ExistAlbums: true,
    mark,
    key,
  }
  HttpFactory.post(API.PHOTOGRAPHER.list,data,this.success,this.failed)
}


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


export {PhotographerActions as default};
