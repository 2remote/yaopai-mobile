var React = require('react');
import { Router, Route, Link } from 'react-router';
var validator = require('validator');
var classnames = require('classnames');
var $ = require('jquery');

var HintBox = require('./HintBox');
var TextInput = require('./TextInput');
var PasswordInput = require('./PasswordInput');

var LoginPage = React.createClass({
  getInitialState: function() {
    return {
      phoneNumber: '',
      password: '',
      message: '',
      validated: false
    }
  },

  handleUserInput: function(number){
    this.setState({phoneNumber: number});
  },

  handlePassInput: function(pass){
    this.setState({password: pass});
  },

  handleCheckPhoneNumber: function(testId){
    var phoneNumberValid = validator.isMobilePhone(this.state.phoneNumber, 'zh-CN');
    if(phoneNumberValid){
      var url = "/api/user/exist_check";
      $.ajax({
        url: url,
        method: 'POST',
        data: { mobile: this.state.phoneNumber },
        datatType: 'json',
        success: function(checked){
          if(checked){
            this.setState({message: '手机号存在'});
          }else{
            this.setState({message: '手机号不存在，请注册'});
          }
        }.bind(this),
        error: function(xhr, status, err){
          console.error(url, status, err.toString());
          this.setState({message: '手机号验证网络连接异常！'});
        }.bind(this)
      });
    }
    var message = classnames({
      '输入的手机号不合法！' : !phoneNumberValid,
      ''                  :  phoneNumberValid
    });
    this.setState({message: message});
  },

  handleCheckPass: function(){
    var passwordValid = !validator.equals(this.state.password, '');
    var message = classnames({
      '密码不能为空！'  : !passwordValid,
      ''              :  passwordValid 
    });
    this.setState({message: message});
  },

  handleLogin: function(){
    this.handleCheckPhoneNumber();
    this.handleCheckPass();

    var phoneNumberValid = validator.isMobilePhone(this.state.phoneNumber, 'zh-CN');
    var passwordValid = !validator.equals(this.state.password, '');
    this.setState({validated: (phoneNumberValid && passwordValid)}, function(){
      if(!this.state.validated){
        this.setState({message: '手机号或密码输入有误！'});
      }else{
        this.handleLoginToServer();
      }
    });
  },

  handleLoginToServer: function(){
    this.setState({message: '正在登陆。。。'});
    var url = "/api/user/login";
    $.ajax({
      url: url,
      method: 'POST',
      data: { mobile: this.state.phoneNumber, password: this.state.password },
      dataType: 'json',
      success: function(checked){
        this.setState({login: checked}, function(){
          if(this.state.login){
            alert('登陆成功。');
          }else{
            this.setState({message: '手机号或密码不正确！'});
          }
        });
      }.bind(this),
      error: function(xhr, status, err){
        console.error(url, status, err.toString());
        this.setState({message: '账户验证网络连接异常！'});
      }.bind(this)
    });
  },

  handleRegister: function(){

  },

  render: function(){
    return(
      <div className="loginPage" >
        <div className="loginBox" >
          <img src="../imgs/logo.png" />
          <HintBox message={this.state.message} /> <br />
          <TextInput 
            phoneNumber={this.state.phoneNumber}
            onUserInput={this.handleUserInput}
            onUserBlur={this.handleCheckPhoneNumber} /> <br />
          <PasswordInput 
            password={this.state.password} 
            onPassInput={this.handlePassInput}
            onUserBlur={this.handleCheckPass} /> <br />
          <button 
            className="loginButton"
            onClick={this.handleLogin} >
            登陆
          </button>
          <a
            className="registerButton"
            onClick={this.handleRegister} > 
            新建帐号
          </a>
        </div>
        <span className="splitLine">
          <img src="../imgs/splitLine.png" />
          <div className="splitContent">OR</div>
        </span>
        <div className="snsBox">
          <span className="wechat">
            <img src="../imgs/wechat.png" />
            <div className="snsBoxContent">微信帐号登录</div> 
            <Link to="/" >Index</Link>
          </span>
        </div>
      </div>
    );
  }
});

module.exports = LoginPage;