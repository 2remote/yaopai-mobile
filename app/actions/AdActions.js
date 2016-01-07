var Reflux = require('reflux');
var HttpFactory = require('../HttpFactory');
var API = require('../api');

var AdActions = Reflux.createActions({
  'list':{children : ['success','failed']},
});

AdActions.list.listen(function(pageIndex = 0,pageSize = 0){
  var data = {
    Fields : 'Id,Image,Url,Position,Action,ExtraId',
    PageIndex : pageIndex,
    PageSize : pageSize,
  }
  HttpFactory.post(API.AD.list,data,this.success,this.failed);
});

module.exports = AdActions;