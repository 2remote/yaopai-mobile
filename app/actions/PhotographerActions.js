var Reflux = require('reflux');
var HttpFactory = require('../HttpFactory');
var API = require('../api');

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
    Fields : 'Id,BusinessPhone,User.Id,User.NickName,User.Avatar'
  }
  HttpFactory.post(API.PHOTOGRAPHER.get,data,this.success,this.failed);
});
/*
  list动作，查询摄影师
*/
PhotographerActions.list.listen(function(pageIndex = 1,pageSize = 10, city = null){
  var data = {
    Fields : 'Id,BusinessPhone,ProvinceId,ProvinceName,RealName,CityId,CityName,CountyId,CountyName,User.Id,User.NickName,User.Avatar',
    PageIndex : pageIndex,
    PageSize : pageSize,
    city : city
  }
  HttpFactory.post(API.PHOTOGRAPHER.list,data,this.success,this.failed);
});

/*
  得到推荐摄影师列表,目前默认取得3个
*/
PhotographerActions.recommendList.listen(function(count = 3, city = null){
  var data = {
    Fields : 'Id,BusinessPhone,HomeCover,ProvinceId,ProvinceName,CityId,CityName,CountyId,CountyName,User.Id,User.NickName,User.Avatar',
    PageIndex : 1,
    PageSize : count,
    city : city,
    HomeRecommended : true,
    HomeSortingDesc : true,
  }
  HttpFactory.post(API.PHOTOGRAPHER.list,data,this.success,this.failed);
});

module.exports = PhotographerActions;
