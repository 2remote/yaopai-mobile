import React from 'react';
import Reflux from 'reflux';
import UserActions from '../../actions/UserActions';
import validator from 'validator';
import { Router, Route, Link, History,Location } from 'react-router';

var LoginForm = React.createClass({
  getInitialState : function(){
    return {
      userName : '',
      password : ''
    }
  },

  componentWillMount : function () {
  },
  _weChatLogin : function(){
    UserActions.openLogin();
  },
  _handleLogin : function(){
    var phone = this.state.userName;
    var password = this.state.password;
    if(!validator.isMobilePhone(phone, 'zh-CN') || !validator.isLength(password,6,18)) {
      this.props.showMessage('请输入正确的手机号码和密码格式');
      return false;
    }
    //登录数据
    var loginData = {
      loginname : phone,
      password : password,
      //autologin : this.state.rememberMe, //记住我的登录需要加上
      autoexpires : 10000
    };
    console.log(loginData);
    this.props.onLogin(loginData);
    return false;
  },
  _handleUserNameChange : function(event){
    this.setState({userName : event.target.value});
  },
  _handlePasswordChange : function(event){
    this.setState({password : event.target.value});
  },
  render() {
    return (
      <div className="loginForm">
        <form ref="loginForm">
          <div>
            <input
              value={this.state.userName}
              onChange={this._handleUserNameChange}
              className="login-input"
              ref="mobileNumber"
              type="tel"
              pattern="[0-9]*"
              placeholder="手机号" />
          </div>
          <div>
            <input
              value={this.state.password}
              onChange = {this._handlePasswordChange}
              className="login-input"
              ref="passWord"
              type="password"
              placeholder="密码" />
          </div>
          <div>
            <Link to="/find_my_pass_page1">
              <input
                className="findPass"
                ref="findMyPassButton"
                type="button"
                value="忘记密码" />
            </Link>
          </div>
          <div>
            <a href="http://mp.weixin.qq.com/s?__biz=MzA4MzMxNTA1Mg==&mid=402209588&idx=1&sn=52c84ffcaba44931aaf1e49d1a41e3ed">
              <input
                className="provision"
                type="button"
                value="YAOPAI 服务条款" />
            </a>
          </div>

          <div
            className="login-btn"
            onClick={this._handleLogin}
            ref="loginButton">
            立即登录
          </div>
          <div
            className="wechat-login-btn"
            onClick={this._weChatLogin}
            ref="loginButton">
            微信登录
          </div>
        </form>
      </div>
    );
  }
});

export {LoginForm as default};
