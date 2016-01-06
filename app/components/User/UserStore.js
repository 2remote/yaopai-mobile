var React = require('react');
var Reflux = require('reflux');
var UserAction = require('./UserAction');

var UserStore = Reflux.createStore({
  currentUser : {
    userId : '',
    userName : '',
    userType : '',
    userState : '',
    isLogin : false
  },

  hintMsg : '',

  listenables: UserAction,
  /*
    登录和注册设计的后端json返回为：
    data:{
      success : '1' or '0' //登录成功为1，否则为0
      userData : userData or null //登录成功为用户数据，否则为空
      errMessage : ''  //登录失败时返回失败信息提醒
    }
  */

  onLoginCompleted: function(data) {
    if(data.success == '1'){
      this.setCurrentUser(data.userData);
      this.trigger(currentUser);
    }else{
      hintMsg = userData.errMessage;
      this.trigger(hintMsg);
    }
  },
  onRegisterCompleted:function(data){
    if(userData.success == '1'){
      this.setCurrentUser(data.userData);
      this.trigger(currentUser);
    }else{
      hintMsg = data.errMessage;
      this.trigger(hintMsg);
    }
  },
  onLogout: function(payload){
    this.setCurrentUser(null);
    this.trigger(currentUser);
  },

  setCurrentUser: function(userData){
    if(!userData){
      currentUser.userId = '';
      currentUser.userName = '';
      currentUser.isLogin = false;
      currentUser.userType = '';
      currentUser.userState = '';
    }else{
      currentUser.userId = userData.userId;
      currentUser.userName = userData.userName;
      currentUser.isLogin = true;
      currentUser.userType = userData.userType;
      currentUser.userState = userData.userState;
    }
  }
});
