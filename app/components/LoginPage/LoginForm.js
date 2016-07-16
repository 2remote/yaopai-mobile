import React from 'react';
import UserEntryLayout from './UserEntryLayout';
import UserActions from '../../actions/UserActions';
import { ButtonBlock } from '../UI/Button';
import InputGroup from '../UI/InputGroup';
import { RouteTransition, presets } from 'react-router-transition';
import Toaster from '../Toast';

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
    let userName = this.state.userName;
    let password = this.state.password;
    const telPattern = /^1[34578]\d{9}$/;
    const mailPattern = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (!userName) {
      this.showMessage('请输入手机号或邮箱');
      return;
    }
    if (!telPattern.test(userName) && !mailPattern.test(userName)) {
      this.showMessage('手机号或邮箱格式错误');
      return;
    }

    if (!password) {
      this.showMessage('请输入密码');
      return;
    }

    //登录数据
    let loginData = {
      loginname : userName,
      password : password,
      //autologin : this.state.rememberMe, //记住我的登录需要加上
      autoexpires : 10000
    };
    this.props.onLogin(loginData);
    return false;
  }

  showMessage(content) {
    this.refs.toast.show(content)
  }

  render() {
    return (
      <div>
        <UserEntryLayout />
        <Toaster ref="toast" />
        <RouteTransition { ...presets.slideLeft } pathname="/login_page">
          <form>
            <InputGroup
              iconLeft="phone"
              updateValue={ userName => this.setState({userName}) }
              type="text"
              placeholder="手机号/邮箱"
            />

            <InputGroup
              iconLeft="mima01"
              updateValue={ password => this.setState({password}) }
              type="password"
              placeholder="请输入密码"
            />
            <aside className="aside">
              <a href="/#/signupPage"
                className="fl"
              >
                注册新用户
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
