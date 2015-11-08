var Reflux = require('reflux');
var HttpFactory = require('../HttpFactory');
var API = require('../api');


var GetCodeActions = Reflux.createActions({
  'sendTelRegister' : {children:["success","failed"]},
  'sendTelRestPassword': {children: ["success", "failed"]},
  // Here you can list your actions
});

/*
  发送注册手机号码
  request : 
  {tel : string}
  response:
  {
    Result: true,    //信息是否发送成功
    ErrorCode: 0，    //错误代码
    ErrorMsg: null    //错误信息
}
*/
GetCodeActions.sendTelRegister.listen(function(data) {
  console.log("send request code.");
  HttpFactory.post(API.USER.sendTelRegister,data,this.success,this.failed);
});
GetCodeActions.sendTelRestPassword.listen(function (data) {
  console.log("send reset code!");
  HttpFactory.post(API.USER.sendTelRestPassword, data, this.success,this.failed);
});


module.exports = GetCodeActions;
