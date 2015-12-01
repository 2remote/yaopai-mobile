var Reflux = require('reflux');
var UserActions = require('../actions/UserActions');

var UserStore = Reflux.createStore({
  userKey : 'yaopai_user',
  init: function() {
    console.log('UserStore initialized');

    /*
        需要增加从localStorage读取用户信息的方法来初始化data
    */
    this.data = {
      userId: '',
      userName: '',
      loginToken : '',//用户选择rememberme的时候返回
      userType: '',
      userState: '',
      isLogin: false,
      hintMessage: '',
      flag : '',
      loginDate : '',
    };
    /*
      获取第三方登录的返回值，并得到当前用户
    */
    //UserActions.currentUser();
    /*
        可以用下面代码代替
        listenables: UserActions，

    */
    this.listenTo(UserActions.login.success, this.onLoginSuccess);
    this.listenTo(UserActions.login.failed, this.onLoginFailed);
    this.listenTo(UserActions.register.success, this.onRegisterSuccess);
    this.listenTo(UserActions.register.failed, this.onRegisterFailed);
    this.listenTo(UserActions.logout.success, this.onLogoutSuccess);
    this.listenTo(UserActions.loginWithToken.success,this.onLoginWithTokenSuccess);
    this.listenTo(UserActions.loginWithToken.failed,this.onLoginWithTokenFailed);
    this.listenTo(UserActions.currentServerUser.success,this.onGetCurrentUser);
    this.listenTo(UserActions.currentServerUser.failed,this.onGetCurrentUserFailed);
    this.listenTo(UserActions.currentUser,this.onCurrentUser);
    this.listenTo(UserActions.modifyPassword.success,this.onModifyPasswordSuccess);
    this.listenTo(UserActions.modifyPassword.failed,this.onModifyPasswordFailed);
    this.listenTo(UserActions.verifyTelResetPassWord.success, this.onTelResetPassWordSuccess);
    this.listenTo(UserActions.verifyTelResetPassWord.failed,this.onTelResetPassWordFailed);
    this.listenTo(UserActions.receiveTelResetPassWord.success, this.onreceiveTelResetPassWordSuccess);
    this.listenTo(UserActions.receiveTelResetPassWord.failed, this.onreceiveTelResetPassWordFailed);
  },
  //！！！这个方法只在从服务器得到不到当前用户的状态下调用！！！
  getTokenToLogin : function(){
    //从localStorage读取Data
    var temp = localStorage.getItem(this.userKey);
    if(temp){
      temp = eval('('+temp+')');
      if(temp.loginToken && temp.loginToken != ''){
        //得到loginToken，自动登录
        UserActions.loginWithToken({token : temp.loginToken});
      }else{
        this.setCurrentUser(null);
        this.data.flag = 'currentUser';
        this.trigger(this.data);
      }
    }else{
      this.setCurrentUser(null);
      this.data.hintMessage = '没有登录！';
      this.data.flag = 'currentUser';
      this.trigger(this.data);
    }
  },
  onLoginSuccess: function(data) {
    console.log(data);
    //测试本地须转换JSON，集成测试后不需要
    //data = eval("(" + data + ")");
    if (data.Success) {
      //用户登录成功，需要获得用户信息
      UserActions.currentUser();
      localStorage.setItem(this.userKey,JSON.stringify(this.data));
      this.data.hintMessage = '';
    } else {
      this.data.hintMessage = data.ErrorMsg;
      this.data.flag = "login";
      this.trigger(this.data);
    }
  },
  /*
    onLoginFailed 主要监听网络访问错误
  */
  onLoginFailed: function(data) {
    this.data.hintMessage = "网络出错啦！";
    this.data.flag = "login";
    this.trigger(this.data);
  },
  /*
    避免重复读取服务器api
  */
  onCurrentUser : function(){
    var now = new Date();
    var loginDate = this.data.loginDate;
    if(this.data.isLogin && this.data.loginDate){
      if(typeof loginDate == 'string'){
        loginDate = StringToDate(loginDate);
      }
      //var inteval = parseInt((now - loginDate))/60000;
      //console.log('inteval is :'+inteval);
      if(parseInt((now - loginDate)/60000) <= 10){
        //小于十分钟之内的登录，不再向服务器请求当前用户
        this.data.flag = 'currentUser';
        return this.trigger(this.data);
      }else{
        this.setCurrentUser(null);
        return UserActions.currentServerUser();
      }
    }
    UserActions.currentServerUser();
  },
  onGetCurrentUser : function(data){
    if(data.Success){
      this.setCurrentUser(data);
      this.data.flag = 'currentUser';
      this.trigger(this.data);
    }else{
      console.log(data.ErrorMsg);
      //若未得到当前用户，尝试loginwithtoken
      this.getTokenToLogin();
    }
  },
  onGetCurrentUserFailed : function(data){
    this.data.hintMessage = '网络出错啦！';
    this.data.flag = 'currentUser';
    this.trigger(this.data);
  },
  /*
    自动登录，如果用了loginToken，是否不用存user的其他信息？
  */
  onLoginWithTokenSuccess : function(data){
    console.log(data);
    if(data.Success){
      console.log('login with token success');
      localStorage.setItem(this.userKey,JSON.stringify(this.data));
    }else{
      console.log('login with token failed');
      this.setCurrentUser(null);
      this.data.LoginToken = '';
      localStorage.removeItem(this.userKey);
    }
    UserActions.currentUser();
    //this.data.flag = "loginToken";
    //this.trigger(this.data);
  },
  onLoginWithTokenFailed : function(data){
    this.data.hintMessage = '网络出错啦！';
    this.data.flag = 'loginToken';
    this.trigger(this.data);
  },
  /*
    监听注册action，根据返回的data.success判断是否注册成功
  */
  onRegisterSuccess: function(data) {
    if (data.Success) {
      this.data.hintMessage = '';
      this.setCurrentUser(data.User);
    } else {
      this.data.hintMessage = data.ErrorMsg;
    }
    this.data.flag = "register";
    this.trigger(this.data);
  },
  /*
    onRegisterFailed 主要监听网络访问错误
  */
  onRegisterFailed: function(data) {
    this.data.hintMessage = '网络出错啦！';
    this.data.flag = "register"
    this.trigger(this.data);
  },
  /*
    登出后清空data的用户信息
  */
  onLogoutSuccess: function() {
    this.setCurrentUser(null);
    localStorage.removeItem(this.userKey);
    console.log('removeItem', this.userKey);
    this.data.flag = "logout";
    this.trigger(this.data);
  },

  /*
    用户修改密码,flag :  modifyPassword
  */
  onModifyPasswordSuccess : function(data){
    if(data.Success){
      this.data.hintMessage = "修改密码成功";
    }else{
      this.data.hintMessage = data.ErrorMsg;
    }
    this.data.flag="modifyPassword";
    this.trigger(this.data);
  },
  onModifyPasswordFailed : function(data){
    console.log('网络出错，无法连接服务器！');
  },

  /*
    设定当前用户信息
  */
  setCurrentUser: function(data) {
    if (!data) {
      this.data.userId = '';
      this.data.userName = '';
      this.data.local = true;
      this.data.isLogin = false;
      this.data.userType = '';
      this.data.avatar = '';
      this.data.loginDate = '';
    } else {
      this.data.userId = data.Id;
      this.data.userName = data.Name;
      this.data.userType = data.Type;
      if (data.Avatar) {
        this.data.avatar = data.Avatar;
      } else {
        this.data.avatar = '//user.file.aiyaopai.com/_randomAvatar/' + (parseInt(data.Id) % 47 + 1 ) + '.png';
      };
      this.data.local = data.Local;
      this.data.isLogin = true;
      this.data.loginDate = new Date();
    }
  },
  onTelResetPassWordSuccess: function (data) {
    this.data.flag = 'check';
    if (data.Success) {
      this.data.hintMessage = '';
    } else {
      this.data.hintMessage = data.ErrorMsg;
    }
    this.trigger(this.data);
  },
  onTelResetPassWordFailed: function (data) {
    this.data.hintMessage = '网络出错啦！';
    this.data.flag = 'check';
  },
  onreceiveTelResetPassWordSuccess: function (data) {
    this.data.flag = 'resetPassword';
    if (data.Success) {
      this.data.hintMessage = '';
    } else {
      this.data.hintMessage = data.ErrorMsg;
    }
    this.trigger(this.data);
  },
  onreceiveTelResetPassWordFailed: function (data) {
    this.data.hintMessage = '网络出错啦！';
    this.data.flag = 'resetPassword';
  }

});

module.exports = UserStore;
