var Reflux = require('reflux');

var AreaActions = require('../actions/AreaActions');

var AreaStore = Reflux.createStore({
  data:{},

  init: function() {
    console.log('AreaStore initialized');
    
    this.listenTo(AreaActions.getProvince.success,this.onGetProvinceSuccess);
    this.listenTo(AreaActions.getProvince.failed,this.onGetProvinceFailed);
    this.listenTo(AreaActions.getCity.success,this.onGetCitySuccess);
    this.listenTo(AreaActions.getCity.failed,this.onGetCityFailed);
    this.listenTo(AreaActions.getDistrict.success,this.onGetDistrictSuccess);
    this.listenTo(AreaActions.getDistrict.failed,this.onGetDistrictFailed);
  },
  onGetProvinceSuccess : function(data){
    if(data.Success){
      this.data.province = data.Result;
    }else{
      this.data.hintMessage = data.ErrorMsg;
    }
    this.data.flag = "province";
    this.trigger(this.data);
    console.log(this.data);
  },
  onGetProvinceFailed : function(data){
    this.data.hintMessage = "网络出错了，请重试！";
    this.data.flag = "province"
    this.trigger(this.data);
  },
  onGetCitySuccess : function(data){
    if(data.Success){
      this.data.city = data.Result;
    }else{
      this.data.hintMessage = data.ErrorMsg;
    }
    this.data.flag = "city";
    this.trigger(this.data);
  },
  onGetProvinceFailed : function(data){
    this.data.hintMessage = "网络出错了，请重试！";
    this.data.flag = "city"
    this.trigger(this.data);
  },
  onGetDistrictSuccess : function(data){
    if(data.Success){
      this.data.district = data.Result;
    }else{
      this.data.hintMessage = data.ErrorMsg;
    }
    this.data.flag = "district";
    this.trigger(this.data);
  },
  onGetDistrictFailed : function(data){
    this.data.hintMessage = "网络出错了，请重试！";
    this.data.flag = "district"
    this.trigger(this.data);
  },

});

module.exports = AreaStore;
