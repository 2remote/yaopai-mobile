import React from 'react';
import UserEntryLayout from './UserEntryLayout';
import UserActions from '../../actions/UserActions';
import { ButtonBlock } from '../UI/Button';
import InputGroup from '../UI/InputGroup';
import validator from 'validator';
import { RouteTransition, presets } from 'react-router-transition'

class LoginForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      userName : '',
      password : '',
    }
    this._handleLogin = this._handleLogin.bind(this)
    this._weChatLogin = this._weChatLogin.bind(this)
  }

  _weChatLogin() {
    UserActions.openLogin();
  }

  _handleLogin() {
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
  }

  render() {
    return (
      <div>
        <UserEntryLayout />
        <RouteTransition { ...presets.slideLeft } pathname="/login_page">
          <form>
            <InputGroup
              iconLeft="phone"
              updateValue={ userName => this.setState({userName}) }
              type="tel"
              pattern="[0-9]*"
              placeholder="请输入手机号"
            />

            <InputGroup
              iconLeft="mima01"
              updateValue={ password => this.setState({password}) }
              type="password"
              placeholder="请输入密码"
            />
            <aside className="aside">
              <a href="http://mp.weixin.qq.com/s?__biz=MzA4MzMxNTA1Mg==&mid=402209588&idx=1&sn=52c84ffcaba44931aaf1e49d1a41e3ed"
                className="fl"
              >
                YAOPAI 服务条款
              </a>
              <a className="fr" href="/#/findByMobileForm">
                忘记密码
              </a>
            </aside>

            <ButtonBlock
              buttonType="btn-dark"
              value="立即登录"
              handleSubmit={this._handleLogin}
            />
            <ButtonBlock
              buttonType="btn-green"
              value="微信登录"
              handleSubmit={this._weChatLogin}
            />
          </form>
        </RouteTransition>
      </div>
    );
  }
};

export default LoginForm;
