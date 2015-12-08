var React = require('react');
var Reflux = require('reflux');
var validator = require('validator');
import { Router, Route, Link, History,Location } from 'react-router';
var UserActions = require('../../actions/UserActions');
var UserStore = require('../../stores/UserStore');

var LoginForm = React.createClass({
  getInitialState : function(){
    return {
      userName : '',
      password : ''
    }
  },
  componentWillMount : function () {
    //页面加载前判断当前用户信息
    UserActions.currentUser();

  },
  _handleLogin : function(){
    var phone = this.state.userName;
    var password = this.state.password;
    if(!validator.isMobilePhone(phone, 'zh-CN')) {
      this.props.showMessage('请输入正确的手机号码');
      return;
    }
    if (!validator.isLength(password,6,18)) {
       this.props.showMessage('请输入正确的密码格式');
      return;
    }
    //登录数据
    var loginData = {
      loginname : phone,
      password : password,
      //autologin : this.state.rememberMe, //记住我的登录需要加上
      autoexpires : 10000
    };
    UserActions.login(loginData);
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
        width: 228,
        padding: '5px',
        marginTop: 39,
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
              type="text" 
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
            <Link ref="linkFind" to="/find_my_pass_page1">
              <input 
                style={style.findPass}
                ref="findMyPassButton"
                type="button" 
                value="忘记密码" />
            </Link>
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

module.exports = LoginForm;
