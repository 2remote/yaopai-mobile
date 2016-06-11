import React from 'react';
import UserActions from '../../actions/UserActions';
import { ButtonBlock } from '../UI/Button';
import InputGroup from '../UI/InputGroup';
import validator from 'validator';
import { Link } from 'react-router';

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
    var style = {
      loginForm: {
        position: 'relative',
        textAlign: 'center',
        margin: '0 auto',
        // padding:'0px 20px',
      },
      input: {
        backgroundColor: 'inherit',
        width: '100%',
        fontSize: '14px',
        lineHeight: '50px',
        borderWidth: '0 0 1px',
        borderRadius: 0,
        color:'#fff',
        borderColor: 'transparent transparent #333'
      },
      login: {
        marginTop: 60,
        border: '1px solid #fff',
        fontSize: '14px',
        color: '#fff',
        height:'50px',
        lineHeight:'50px'
      },
      findPass: {
        border: 0,
        backgroundColor: 'inherit',
        float: 'right',
        marginRight: 5,
        marginTop: 15,
        color:'#777'
      },
      provision: {
        border: 0,
        backgroundColor: 'inherit',
        float: 'left',
        marginLeft: 5,
        marginTop: 15,
        color:'#777'
      }
    };

    return (
      <div
        style={style.loginForm}
        className="loginForm">
        <form ref="loginForm">
          <InputGroup
            iconLeft="phone"
            updateValue={ userName => this.setState({userName}) }
            type="tel"
            pattern="[0-9]*"
            placeholder="手机号"
          />

          <InputGroup
            iconLeft="phone"
            updateValue={ password => this.setState({password}) }
            type="password"
            placeholder="请输入密码"
          />
          <div>
            <Link to="/findByMobileForm">
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
      </div>
    );
  }
};

export default LoginForm;
