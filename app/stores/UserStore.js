var Reflux = require('reflux');
var UserActions = require('../actions/UserActions');

var UserStore = Reflux.createStore({
  userKey : 'yaopai_user',
  init: function() {
    console.log('UserStore initialized');

    /*
        需要增加从localStorage读取用户信息的方法来初始化userData
    */
    this.userData = {
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
    //从localStorage读取UserData
    var temp = localStorage.getItem(this.userKey);
    if(temp){
      temp = eval('('+temp+')');
      if(temp.loginToken && temp.loginToken != ''){
        //得到loginToken，自动登录
        UserActions.loginWithToken({token : temp.loginToken});
      }else{
        this.setCurrentUser(null);
        this.userData.flag = 'currentUser';
        this.trigger(this.userData);
      }
    }else{
      this.setCurrentUser(null);
      this.userData.hintMessage = '没有登录！';
      this.userData.flag = 'currentUser';
      this.trigger(this.userData);
    }
  },
  onLoginSuccess: function(data) {
    console.log(data);
    //测试本地须转换JSON，集成测试后不需要
    //data = eval("(" + data + ")");
    if (data.Success) {
      //用户登录成功，需要获得用户信息
      UserActions.currentUser();
      localStorage.setItem(this.userKey,JSON.stringify(this.userData));
      this.userData.hintMessage = '';
    } else {
      this.userData.hintMessage = data.ErrorMsg;
      this.userData.flag = "login";
      this.trigger(this.userData);
    }
  },
  /*
    onLoginFailed 主要监听网络访问错误
  */
  onLoginFailed: function(data) {
    this.userData.hintMessage = "网络出错啦！";
    this.userData.flag = "login";
    this.trigger(this.userData);
  },
  /*
    避免重复读取服务器api
  */
  onCurrentUser : function(){
    var now = new Date();
    var loginDate = this.userData.loginDate;
    if(this.userData.isLogin && this.userData.loginDate){
      if(typeof loginDate == 'string'){
        loginDate = StringToDate(loginDate);
      }
      //var inteval = parseInt((now - loginDate))/60000;
      //console.log('inteval is :'+inteval);
      if(parseInt((now - loginDate)/60000) <= 10){
        //小于十分钟之内的登录，不再向服务器请求当前用户
        this.userData.flag = 'currentUser';
        return this.trigger(this.userData);
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
      this.userData.flag = 'currentUser';
      this.trigger(this.userData);
    }else{
      console.log(data.ErrorMsg);
      //若未得到当前用户，尝试loginwithtoken
      this.getTokenToLogin();
    }
  },
  onGetCurrentUserFailed : function(data){
    this.userData.hintMessage = '网络出错啦！';
    this.userData.flag = 'currentUser';
    this.trigger(this.userData);
  },
  /*
    自动登录，如果用了loginToken，是否不用存user的其他信息？
  */
  onLoginWithTokenSuccess : function(data){
    console.log(data);
    if(data.Success){
      console.log('login with token success');
      localStorage.setItem(this.userKey,JSON.stringify(this.userData));
    }else{
      console.log('login with token failed');
      this.setCurrentUser(null);
      this.userData.LoginToken = '';
      localStorage.removeItem(this.userKey);
    }
    UserActions.currentUser();
    //this.userData.flag = "loginToken";
    //this.trigger(this.userData);
  },
  onLoginWithTokenFailed : function(data){
    this.userData.hintMessage = '网络出错啦！';
    this.userData.flag = 'loginToken';
    this.trigger(this.userData);
  },
  /*
    监听注册action，根据返回的data.success判断是否注册成功
  */
  onRegisterSuccess: function(data) {
    if (data.Success) {
      this.userData.hintMessage = '';
      this.setCurrentUser(data.User);
    } else {
      this.userData.hintMessage = data.ErrorMsg;
    }
    this.userData.flag = "register";
    this.trigger(this.userData);
  },
  /*
    onRegisterFailed 主要监听网络访问错误
  */
  onRegisterFailed: function(data) {
    this.userData.hintMessage = '网络出错啦！';
    this.userData.flag = "register"
    this.trigger(this.userData);
  },
  /*
    登出后清空userData的用户信息
  */
  onLogoutSuccess: function() {
    this.setCurrentUser(null);
    localStorage.removeItem(this.userKey);
    this.userData.flag = "logout";
    this.trigger(this.userData);
  },

  /*
    用户修改密码,flag :  modifyPassword
  */
  onModifyPasswordSuccess : function(data){
    if(data.Success){
      this.userData.hintMessage = "修改密码成功";
    }else{
      this.userData.hintMessage = data.ErrorMsg;
    }
    this.userData.flag="modifyPassword";
    this.trigger(this.userData);
  },
  onModifyPasswordFailed : function(data){
    console.log('网络出错，无法连接服务器！');
  },

  /*
    设定当前用户信息
  */
  setCurrentUser: function(userData) {
    if (!userData) {
      this.userData.userId = '';
      this.userData.userName = '';
      this.userData.local = true;
      this.userData.isLogin = false;
      this.userData.userType = '';
      this.userData.avatar = '';
      this.userData.loginDate = '';
    } else {
      this.userData.userId = userData.Id;
      this.userData.userName = userData.Name;
      this.userData.userType = userData.Type;
      if (userData.Avatar) {
        this.userData.avatar = userData.Avatar;
      } else {
        this.userData.avatar = '//user.file.aiyaopai.com/_randomAvatar/' + (parseInt(userData.Id) % 47 + 1 ) + '.png';
      };
      this.userData.local = userData.Local;
      this.userData.isLogin = true;
      this.userData.loginDate = new Date();
    }
  },
  onTelResetPassWordSuccess: function (data) {
    console.log(data);
    this.userData.flag = 'check';
    if (data.Success) {
      this.userData.hintMessage = '';
    } else {
      this.userData.hintMessage = data.ErrorMsg;
    }
    this.trigger(this.userData);
  },
  onTelResetPassWordFailed: function (data) {
    this.userData.hintMessage = '网络出错啦！';
    this.userData.flag = 'check'
  },
  onreceiveTelResetPassWordSuccess: function (data) {
    console.log(data);
    this.userData.flag = 'resetPassword';
    if (data.Success) {
      this.userData.hintMessage = '';
    } else {
      this.userData.hintMessage = data.ErrorMsg;
    }
    this.trigger(this.userData);
  },
  onreceiveTelResetPassWordFailed: function (data) {
    this.userData.hintMessage = '网络出错啦！';
    this.userData.flag = 'resetPassword';
  }

});

module.exports = UserStore;
