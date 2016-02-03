var Reflux = require('reflux');

var HttpFactory = require('../HttpFactory');
var API = require('../api');

var AreaActions = Reflux.createActions({
  'getProvince' : {children:['success','failed']},
  'getCity' : {children:['success','failed']},
  'getDistrict' : {children:['success','failed']}
  
});

AreaActions.getProvince.listen(function(){
  console.log('begin get province');
  var data = {ParentId : 0};
  HttpFactory.post(API.COMMON.area_list,data,this.success,this.failed);
  
});

AreaActions.getCity.listen(function(data){
  /*
    data 格式为 {ParentId : id}
  */
  HttpFactory.post(API.COMMON.area_list,data,this.success,this.failed);
});

AreaActions.getDistrict.listen(function(data){
  /*
    data 格式为 {ParentId : id}
  */
  HttpFactory.post(API.COMMON.area_list,data,this.success,this.failed);
});


module.exports = AreaActions;
