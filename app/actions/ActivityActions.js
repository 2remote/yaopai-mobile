var Reflux = require('reflux');
var HttpFactory = require('../HttpFactory');
var API = require('../api');

var ActivityActions = Reflux.createActions({
  'list':{children : ['success','failed']},
  'get' : {children:['success','failed']},
  'search':{children : ['success','failed']},
});

ActivityActions.list.listen(function(pageIndex = 1,pageSize = 10){
  var data = {
    Fields : 'Id,Cover,Link',
    PageIndex : pageIndex,
    PageSize : pageSize,
  }
  HttpFactory.post(API.ACTIVITY.list,data,this.success,this.failed);
});

ActivityActions.search.listen(function(categoryId = null ,pageIndex = 1 ,pageSize = 10){
  var data = {
    PageIndex:pageIndex,
    PageSize:pageSize,
    CategoryId : categoryId,
    Fields : 'Id,Cover,Link'
  }
  HttpFactory.post(API.ACTIVITY.search,data,this.success,this.failed);
});

ActivityActions.get.listen(function(Id){
  var data ={
    Id: Id,
    Fields : 'Id,Title,Cover,Content,User.NickName,CityName,User.Avatar,User.Id',
  };
  HttpFactory.post(API.ACTIVITY.get,data,this.success,this.failed);
});

module.exports = ActivityActions;