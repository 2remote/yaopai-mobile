import React from 'react';
import Reflux from 'reflux';
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
  render: function() {
    var style = {
      loginForm: {
        position: 'relative',
        textAlign: 'center',
        margin: '0 auto',
        width: 225
      },
      input: {
        padding: '8px 10px',
        marginTop: '48px',
        backgroundColor: 'inherit',
        width: 200,
        fontSize: '1.2em',
        lineHeight: '19px',
        borderWidth: '0 0 2px',
        borderRadius: 0,
        borderColor: 'transparent transparent #c4c4c4'
      },
      login: {
        width: 222,
        padding: '5px',
        marginTop: 46,
        borderRadius: 30,
        border: 0,
        fontSize: '1.5em',
        backgroundColor: '#3c3c3c',
        color: '#ffffff',
        fontWeight: 'lighter'
      },
      findPass: {
        border: 0,
        backgroundColor: 'inherit',
        float: 'right',
        marginRight: 5,
        marginTop: 15
      },
      provision: {
        border: 0,
        backgroundColor: 'inherit',
        float: 'left',
        marginLeft: 5,
        marginTop: 15
      }
    };


    return (
      <div 
        style={style.loginForm}
        className="loginForm">
        <form ref="loginForm">
          <div>
            <input 
              value={this.state.userName}
              onChange={this._handleUserNameChange}
              style={style.input}
              ref="mobileNumber"
              type="number"
              pattern="[0-9]*"
              placeholder="手机号" />
          </div>
          <div>
            <input
              value={this.state.password}
              onChange = {this._handlePasswordChange}
              style={style.input}
              ref="passWord"
              type="password"
              placeholder="密码" />
          </div>
          <div>
            <Link to="/find_my_pass_page1">
              <input 
                style={style.findPass}
                ref="findMyPassButton"
                type="button" 
                value="忘记密码" />
            </Link>
          </div>
          <div>
            <a href="http://mp.weixin.qq.com/s?__biz=MzA4MzMxNTA1Mg==&mid=402209588&idx=1&sn=52c84ffcaba44931aaf1e49d1a41e3ed">
              <input 
                style={style.provision}
                type="button" 
                value="YAOPAI 服务条款" />
            </a>
          </div>

          <div
            style={style.login}
            onClick={this._handleLogin}
            ref="loginButton">
            登录 
          </div>

        </form>
      </div>
    );
  }
});

export {LoginForm as default};