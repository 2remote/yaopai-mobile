var Reflux = require('reflux');
var API = require('../api');
var HttpFactory = require('../HttpFactory');

var UserActions = Reflux.createActions({
  'register' : {children:["success","failed"]},
  'login' : {children:["success","failed"]},
  'loginWithToken' : {children : ['success','failed']},
  'logout' : {children:["success"]},
  'openLogin' : {children:["success","failed"]},
  'currentServerUser' : {children:['success','failed']},
  'currentUserDetail' : {children:['success','failed']},
  'currentUser' : {children:[]},
  'changeUserNickName' : {children:[]}, // 不是Async，可以不写下面的listen，直接在store里指定
  'changeUserGender' : {children:[]},
  'changeUserNickNameOnServer' : {children:['success','failed']},
  'modifyPassword':{children:["success","failed"]},
  'verifyTelResetPassWord': {children: ['success', "failed"]},
  'receiveTelResetPassWord': {children: ['success', 'failed']},
});

/*
  https://xiattst.gitbooks.io/yaopai/content/API/User/Login.html
  
  loginname  string  Y 用户手机或邮箱号码
  password  string  Y 用户密码
  autologin boolean N 是否自动登录
  autoexpires integer N 自动登录过期时间，单位（分钟）
*/
UserActions.login.listen(function(data) {
  console.log("login begin");
  //$.post(API.user_api.login_url, data).then(this.success, this.failed);
  HttpFactory.post(API.USER.login,data,this.success,this.failed);
});

/*
  用Token登录
*/
UserActions.loginWithToken.listen(function(data){
  console.log("begin login with token");
  HttpFactory.post(API.USER.login_with_token,data,this.success,this.failed);
});

/*
  第三方登录
*/

UserActions.openLogin.listen(function(data){
  window.location.href = API.USER.weixin_login;
});
/*
  得到当前用户
*/
UserActions.currentServerUser.listen(function(data){
  console.log('get currentUser');
  HttpFactory.post(API.USER.current_user,data,this.success,this.failed);
});
/*
  得到当前用户详细信息
*/
UserActions.currentUserDetail.listen(function(){
  console.log('get currentUserDetail');
  var data = {
    Fields : 'Id,NickName,Sex,Avatar,ProvinceName,CityName,CountyName'
  }  
  HttpFactory.post(API.USER.currentUserDetail,data,this.success,this.failed);
});

/*
  修改 当前用户 昵称
*/
UserActions.changeUserNickNameOnServer.listen(function(nickname){
  console.log('get changeUserNickNameOnServer');
  var data = {
    NickName: nickname,
  }  
  HttpFactory.post(API.USER.changeInfo,data,this.success,this.failed);
});

/*
  用户注册
  data:｛tel,code,password｝
  {
      Result: true,    //是否通过验证并注册成功
      ErrorCode: 0,    //错误代码
      ErrorMsg: null    //错误信息
  }
*/
UserActions.register.listen(function(data) {
  // $.post(API.user_api.register_url, data).then(this.success, this.failed);
  HttpFactory.post(API.USER.register,data,this.success,this.failed);
});
/*
  修改密码
  ##请求data结构
  | 参数 | 类型 | 必填 |说明 |
  | -- | -- | -- |-- |
  | rawPassword | string | Y |用户原始密码 |
  | newPassword | string | Y |用户新密码 |
  返回值：
  {
    ErrorCode: 0, //错误代码
    ErrorMsg: null  //错误信息
    Success:true    //请求是否成功
  }
*/
UserActions.modifyPassword.listen(function(data){
  HttpFactory.post(API.USER.modify_password,data,this.success,this.failed);
});
/*
  用户登出
*/
UserActions.logout.listen(function(data) {
  console.log('begin to logout!');
  HttpFactory.post(API.USER.logout,data,this.success,this.failed);
});

/*用户重置密码验证码的验证*/
UserActions.verifyTelResetPassWord.listen(function (data) {
  console.log('check phone && code!');
  HttpFactory.post(API.USER.verifyTelResetPassWord, data, this.success, this.failed);
});

/*用户重置密码的密码提交*/
UserActions.receiveTelResetPassWord.listen(function (data) {
  console.log('new password start');
  HttpFactory.post(API.USER.receiveTelResetPassWord, data, this.success, this.failed);
});

module.exports = UserActions;
