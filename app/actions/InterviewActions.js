var Reflux = require('reflux');
var HttpFactory = require('../HttpFactory');
var API = require('../api');

var InterviewActions = Reflux.createActions({
  'recommendList' : {children:['success','failed']},
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