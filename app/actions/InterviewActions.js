var Reflux = require('reflux');
var HttpFactory = require('../HttpFactory');
var API = require('../api');

var InterviewActions = Reflux.createActions({
  'list':{children : ['success','failed']},
  'recommendList' : {children:['success','failed']},
  'search':{children : ['success','failed']},
});

InterviewActions.list.listen(function(pageIndex = 1,pageSize = 10){
  var data = {
    Fields : 'Id,Cover,Link',
    PageIndex : pageIndex,
    PageSize : pageSize,
  }
  HttpFactory.post(API.PHOTOGRAPHER.list,data,this.success,this.failed);
});

InterviewActions.search.listen(function(categoryId = null ,pageIndex = 1 ,pageSize = 10){
  var data = {
    PageIndex:pageIndex,
    PageSize:pageSize,
    CategoryId : categoryId,
    Fields : 'Id,Cover,Link'
  }
  HttpFactory.post(API.INTERVIEW.search,data,this.success,this.failed);
});

InterviewActions.recommendList.listen(function(count = 5){
  var data ={
    HomeRecommended : true,
    HomeSortingDesc : true,
    PageIndex : 1,
    PageSize : count,
    Fields : 'Id,Cover,Link',
  };
  HttpFactory.post(API.INTERVIEW.search,data,this.success,this.failed);
});

module.exports = InterviewActions;