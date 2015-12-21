var Reflux = require('reflux');
var HttpFactory = require('../HttpFactory');
var API = require('../api');

var AdActions = Reflux.createActions({
  'search':{children : ['success','failed']},
});

AdActions.list.listen(function(pageIndex = 1,pageSize = 10){
  var data = {
    Fields : 'Id,Image,Url',
    PageIndex : pageIndex,
    PageSize : pageSize,
  }
  HttpFactory.post(API.AD.list,data,this.success,this.failed);
});

module.exports = AdActions;