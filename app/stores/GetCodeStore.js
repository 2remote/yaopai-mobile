var Reflux = require('reflux');

var GetCodeActions = require('../actions/GetCodeActions');
var data = [];
var timer = null;

/*
  获取验证码store
*/
var GetCodeStore = Reflux.createStore({

  init: function() {
    console.log('GetCodeStore initialized');
    //记录发送验证码的时间
    this.getCode = {
      flag: '',
      left : 0,
      result : '',
    }
    this.listenTo(GetCodeActions.sendTelRegister.success,this.onTelRegisterSucess);
    this.listenTo(GetCodeActions.sendTelRegister,this.onBeginTelRegister);
    this.listenTo(GetCodeActions.sendTelRestPassword.success, this.onTelRestPasswordSuccess);
    this.listenTo(GetCodeActions.sendTelRestPassword, this.onBeginTelRestPassword);
  },
  onBeginTelRegister : function(){
    this.getCode.left = 60;
    var countLeft = function(){
      this.getCode.left = this.getCode.left -1;
      this.trigger(this.getCode);
      setTimeout(countLeft, 1000);
    }.bind(this);
    countLeft();
  },
  onTelRegisterSucess : function(data){
    this.getCode.flag = 'registerCode';
    if(data.Success){
      this.getCode.result = '验证码已发送';
    }else{
      this.getCode.result = data.ErrorMsg;
      this.getCode.left = 0;
    }
    this.trigger(this.getCode);
  },
  onBeginTelRestPassword: function () {
    this.getCode.left = 60;
    var countLeft = function () {
      this.getCode.left -= 1;
      this.trigger(this.getCode);
      timer = setTimeout(countLeft, 1000);
      /*清除定时器*/
      if (this.getCode.left <= 0) {
        clearTimeout(timer);
      }
    }.bind(this);
    countLeft();
  },
  onTelRestPasswordSuccess: function (data) {
    this.getCode.flag = 'resetCode';
    if(data.Success){
      this.getCode.result = '验证码已发送';
    }else{
      clearTimeout(timer)
      this.getCode.result = data.ErrorMsg;
      this.getCode.left = 0;
    }
    this.trigger(this.getCode);
  },
});

module.exports = GetCodeStore;
